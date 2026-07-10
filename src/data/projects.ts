// ============================================================
// Duluka Studio — Project Data with Auto-Fetch + Fallback
// ============================================================
//
// Data flow:
//   1. projects.manual.ts    — hand-curated data (techStack, installSteps,
//                              license, warnings, etc.) — committed to git
//   2. projects.auto.json    — auto-fetched from GitHub API by
//                              `scripts/fetch-projects.ts` (run by GitHub Actions
//                              daily + on push). Contains: name, description,
//                              stars, forks, updatedAt, homepage, topics, hasReadme
//   3. projects.ts (this file) — merges manual + auto, with fallback:
//                              - If auto.json exists and has entry → use auto data
//                              - If auto.json missing or entry missing → fall back to manual
//                              - Manual detailed fields (techStack, etc.) always preserved
//
// Behavior when GitHub API is down / fetch script hasn't run:
//   - projects.auto.json may not exist or be stale
//   - The merge function handles missing/empty auto data gracefully
//   - The website always renders with at least the manual data
// ============================================================

export type ProjectCategory =
  | "Capture"
  | "Mobile Mod"
  | "Web"
  | "Media"
  | "Minecraft"
  | "Data"
  | "Profile"
  | "Other";

export interface ProjectRepo {
  slug: string;
  name: string;
  repo: string;
  url: string;
  homepage?: string;
  category: ProjectCategory;
  status: "Released" | "Active Dev" | "No README" | "Archived";
  icon: string;
  short: string;
  bullets: string[];
  // Detailed fields (manual — pulled from README by hand)
  techStack?: { label: string; items: string[] }[];
  dependencies?: { name: string; license: string; author: string; source: string }[];
  installSteps?: string[];
  usageExamples?: string[];
  requirements?: string[];
  warnings?: string[];
  license?: { name: string; url?: string; notice?: string };
  thirdPartyAttribution?: boolean;
  supportedDevices?: string[];
  apiCapture?: string[];
  encoderStatus?: { name: string; ready: boolean }[];
  tags: string[];
  hasReadme: boolean;
  // Auto-fetched fields (from GitHub API)
  stars?: number;
  forks?: number;
  watchers?: number;
  openIssues?: number;
  language?: string;
  topics?: string[];
  pushedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  archived?: boolean;
  defaultBranch?: string;
}

// ============================================================
// Manual data — hand-curated (DO NOT auto-overwrite)
// ============================================================
import {
  PROJECTS as MANUAL_PROJECTS,
  SERVER,
  DISCORD_INVITE,
  GITHUB_PROFILE,
  RULE_GROUPS,
  PENALTIES,
} from "./projects.manual";
import type {
  ProjectRepo as ManualProjectRepo,
  RuleGroup,
  Penalty,
} from "./projects.manual";

// Re-export everything that hasn't changed
export { SERVER, DISCORD_INVITE, GITHUB_PROFILE, RULE_GROUPS, PENALTIES };
export type { RuleGroup, Penalty };

// ============================================================
// Auto data — fetched from GitHub API (may be missing/stale)
// ============================================================
interface AutoProjectData {
  slug: string;
  repo: string;
  name: string;
  description: string | null;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  defaultBranch: string;
  hasReadme: boolean;
  readmeExcerpt?: string;
}

// Try to load auto-fetched data; if missing or invalid, use empty array
let AUTO_DATA: AutoProjectData[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const autoModule = require("./projects.auto.json");
  if (Array.isArray(autoModule)) {
    AUTO_DATA = autoModule as AutoProjectData[];
  }
} catch {
  // projects.auto.json doesn't exist yet (script hasn't run) — that's OK, use empty
  AUTO_DATA = [];
}

// ============================================================
// Helper: infer category from repo name + topics
// ============================================================
function inferCategory(
  repoName: string,
  topics: string[] = [],
  description: string | null = null
): ProjectCategory {
  const text = `${repoName} ${topics.join(" ")} ${description || ""}`.toLowerCase();
  if (text.includes("shadowplay") || text.includes("capture") || text.includes("recording")) {
    return "Capture";
  }
  if (text.includes("magisk") || text.includes("hyperos") || text.includes("aod") || text.includes("mod")) {
    return "Mobile Mod";
  }
  if (text.includes("minecraft") || text.includes("mcdmods") || text.includes("mcd-")) {
    return "Minecraft";
  }
  if (text.includes("lyrics") || text.includes("ttml") || text.includes("midi")) {
    return "Media";
  }
  if (text.includes("student") || text.includes("statistic") || text.includes("data")) {
    return "Data";
  }
  if (text.includes("web") || text.includes("launcher") || text.includes("custom")) {
    return "Web";
  }
  return "Other";
}

// ============================================================
// Helper: infer icon from category / repo name
// ============================================================
function inferIcon(category: ProjectCategory, repoName: string): string {
  const name = repoName.toLowerCase();
  if (name.includes("shadowplay")) return "Video";
  if (name.includes("hyperos") || name.includes("launcher")) return "Rocket";
  if (name.includes("aod") || name.includes("display")) return "Smartphone";
  if (name.includes("mcdmods") || name.includes("minecraft")) return "Blocks";
  if (name.includes("lyrics") || name.includes("ttml")) return "Music2";
  if (name.includes("extreme")) return "Zap";
  if (name.includes("student") || name.includes("statistic")) return "BarChart3";
  if (name.includes("duluspect")) return "Sparkles";
  if (name.includes("web-custom")) return "Code2";
  if (category === "Profile") return "User";
  return "FolderGit2";
}

// ============================================================
// Helper: infer status from repo metadata
// ============================================================
function inferStatus(
  archived: boolean,
  pushedAt: string,
  hasReadme: boolean
): ProjectRepo["status"] {
  if (archived) return "Archived";
  // If pushed within last 6 months → Active Dev
  const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
  if (new Date(pushedAt).getTime() > sixMonthsAgo) {
    return "Active Dev";
  }
  if (!hasReadme) return "No README";
  return "Released";
}

// ============================================================
// Build slug from repo name
// ============================================================
function slugify(repoName: string): string {
  return repoName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

// ============================================================
// Merge manual + auto data
// ============================================================
// Step 1: Start with manual projects as the base (always present)
const merged: ProjectRepo[] = MANUAL_PROJECTS.map((p) => {
  const auto = AUTO_DATA.find((a) => a.repo.toLowerCase().endsWith(`/${p.repo.split("/")[1]}`));
  if (!auto) {
    // No auto data — return manual as-is
    return p as ProjectRepo;
  }
  // Merge: auto provides fresh metadata, manual keeps detailed fields
  return {
    ...p,
    // Auto overrides these (fresher)
    name: auto.name || p.name,
    short: auto.description || p.short,
    homepage: auto.homepage || p.homepage,
    // Auto provides these new fields
    stars: auto.stars,
    forks: auto.forks,
    watchers: auto.watchers,
    openIssues: auto.openIssues,
    language: auto.language || undefined,
    topics: auto.topics,
    pushedAt: auto.pushedAt,
    createdAt: auto.createdAt,
    updatedAt: auto.updatedAt,
    archived: auto.archived,
    defaultBranch: auto.defaultBranch,
    // Status: use auto-inferred if manual says No README but README now exists
    status:
      p.status === "No README" && auto.hasReadme
        ? inferStatus(auto.archived, auto.pushedAt, true)
        : p.status,
    // Tags: merge manual + auto topics (dedupe)
    tags: Array.from(new Set([...p.tags, ...(auto.topics || [])])),
    // hasReadme from auto is more reliable
    hasReadme: auto.hasReadme || p.hasReadme,
  } as ProjectRepo;
});

// Step 2: Add auto projects that aren't in manual (new repos)
for (const auto of AUTO_DATA) {
  const existsInManual = MANUAL_PROJECTS.some(
    (m) => m.repo.toLowerCase().endsWith(`/${auto.repo.split("/")[1]}`)
  );
  if (existsInManual) continue;

  // New repo not in manual — create minimal entry
  const slug = slugify(auto.name);
  const category = inferCategory(auto.name, auto.topics, auto.description);
  merged.push({
    slug,
    name: auto.name,
    repo: auto.repo,
    url: `https://github.com/${auto.repo}`,
    homepage: auto.homepage || undefined,
    category,
    status: inferStatus(auto.archived, auto.pushedAt, auto.hasReadme),
    icon: inferIcon(category, auto.name),
    short: auto.description || `${auto.name} — see repository for details.`,
    bullets: auto.readmeExcerpt ? [auto.readmeExcerpt] : [],
    tags: auto.topics || [],
    hasReadme: auto.hasReadme,
    stars: auto.stars,
    forks: auto.forks,
    watchers: auto.watchers,
    openIssues: auto.openIssues,
    language: auto.language || undefined,
    topics: auto.topics,
    pushedAt: auto.pushedAt,
    createdAt: auto.createdAt,
    updatedAt: auto.updatedAt,
    archived: auto.archived,
    defaultBranch: auto.defaultBranch,
  });
}

export const PROJECTS: ProjectRepo[] = merged;

// Also re-export the ProjectRepo type for downstream imports
export type { ProjectRepo };
