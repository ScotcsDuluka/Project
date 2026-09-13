#!/usr/bin/env bun
// ============================================================
// fetch-projects.ts — fetch repo metadata from GitHub API
// and write to src/data/projects.auto.json
//
// Run manually:
//   bun run scripts/fetch-projects.ts
//
// Or via GitHub Actions (see .github/workflows/fetch-projects.yml)
// Uses GITHUB_TOKEN env var if available (higher rate limit),
// otherwise falls back to unauthenticated (60 req/hr).
// ============================================================

import { writeFileSync, existsSync, readFileSync } from "fs";
import { join } from "path";

const GITHUB_USER = "ScotcsDuluka";
const OUTPUT_PATH = join(import.meta.dir, "..", "src", "data", "projects.auto.json");
const OLD_PATH = OUTPUT_PATH;

// Token from env (set by GitHub Actions) or empty for unauthenticated
const TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN || "";

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "duluka-studio-fetch-script",
};
if (TOKEN) {
  headers.Authorization = `Bearer ${TOKEN}`;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
  default_branch: string;
  fork: boolean;
}

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
  fetchedAt: string;
}

function log(msg: string) {
  console.log(`[fetch-projects] ${msg}`);
}

function err(msg: string) {
  console.error(`[fetch-projects] ERROR: ${msg}`);
}

async function fetchJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      err(`HTTP ${res.status} on ${url}`);
      if (res.status === 403) {
        const remaining = res.headers.get("x-ratelimit-remaining");
        const reset = res.headers.get("x-ratelimit-reset");
        err(`Rate limit — remaining: ${remaining}, resets at: ${reset}`);
      }
      return null;
    }
    return await res.json();
  } catch (e) {
    err(`Fetch failed for ${url}: ${(e as Error).message}`);
    return null;
  }
}

async function checkReadme(repoFullName: string): Promise<{ hasReadme: boolean; excerpt?: string }> {
  // Try main branch first, then master
  for (const branch of ["main", "master", "HEAD"]) {
    const url = `https://raw.githubusercontent.com/${repoFullName}/${branch}/README.md`;
    try {
      const res = await fetch(url, { headers: { ...headers, Accept: "text/plain" } });
      if (res.ok) {
        const text = await res.text();
        // Extract first meaningful line as excerpt (skip badges/headers)
        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith("<") && !l.startsWith("![") && !l.startsWith("[!"));
        // Find first heading or paragraph
        const excerpt = lines.find((l) => l.startsWith("#") && !l.startsWith("!["));
        const finalExcerpt = excerpt
          ? excerpt.replace(/^#+\s*/, "").substring(0, 200)
          : lines[0]?.substring(0, 200);
        return { hasReadme: true, excerpt: finalExcerpt };
      }
    } catch {
      // try next branch
    }
  }
  return { hasReadme: false };
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
  log(`Fetching repo list for ${GITHUB_USER}...`);
  const allRepos: GitHubRepo[] = [];
  let page = 1;
  while (true) {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner&sort=pushed&direction=desc`;
    const data = await fetchJson(url);
    if (!data || !Array.isArray(data) || data.length === 0) break;
    // Skip forks (we only want original repos)
    const own = data.filter((r: GitHubRepo) => !r.fork);
    allRepos.push(...own);
    if (data.length < 100) break;
    page++;
    // Safety limit
    if (page > 10) break;
    // Be nice to the API
    await new Promise((r) => setTimeout(r, 100));
  }
  log(`Found ${allRepos.length} non-fork repos`);
  return allRepos;
}

function loadExistingAuto(): AutoProjectData[] {
  try {
    if (existsSync(OLD_PATH)) {
      const raw = readFileSync(OLD_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

async function main() {
  log(`GitHub user: ${GITHUB_USER}`);
  log(`Auth: ${TOKEN ? "token (" + TOKEN.substring(0, 8) + "...)" : "anonymous"}`);
  log(`Output: ${OUTPUT_PATH}`);

  const repos = await fetchAllRepos();
  if (repos.length === 0) {
    err("No repos fetched — keeping existing auto.json if present");
    process.exit(0);
  }

  const existing = loadExistingAuto();
  const existingMap = new Map(existing.map((e) => [e.repo, e]));

  const results: AutoProjectData[] = [];
  let readmeChecks = 0;
  for (const repo of repos) {
    // Reuse cached readme check if repo hasn't been pushed recently
    const cached = existingMap.get(repo.full_name);
    const cacheFresh =
      cached && cached.pushedAt === repo.pushed_at && typeof cached.hasReadme === "boolean";

    let readmeInfo: { hasReadme: boolean; excerpt?: string };
    if (cacheFresh) {
      readmeInfo = { hasReadme: cached.hasReadme, excerpt: cached.readmeExcerpt };
    } else {
      readmeInfo = await checkReadme(repo.full_name);
      readmeChecks++;
      // Be nice — small delay between README fetches
      await new Promise((r) => setTimeout(r, 50));
    }

    results.push({
      slug: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      repo: repo.full_name,
      name: repo.name,
      description: repo.description,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      language: repo.language,
      topics: repo.topics || [],
      pushedAt: repo.pushed_at,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      archived: repo.archived,
      defaultBranch: repo.default_branch,
      hasReadme: readmeInfo.hasReadme,
      readmeExcerpt: readmeInfo.excerpt,
      fetchedAt: new Date().toISOString(),
    });

    log(`  ✓ ${repo.name} — stars: ${repo.stargazers_count}, readme: ${readmeInfo.hasReadme}`);
  }

  // Write to a temp file first, then move (atomic-ish)
  const tmpPath = OUTPUT_PATH + ".tmp";
  writeFileSync(tmpPath, JSON.stringify(results, null, 2) + "\n", "utf-8");

  // Compare with existing to avoid unnecessary commits
  let changed = true;
  if (existsSync(OLD_PATH)) {
    try {
      const oldRaw = readFileSync(OLD_PATH, "utf-8");
      const oldParsed = JSON.parse(oldRaw);
      // Compare ignoring fetchedAt timestamps
      const stripTs = (arr: any[]) =>
        arr.map(({ fetchedAt, ...rest }: any) => rest);
      const oldNorm = JSON.stringify(stripTs(oldParsed));
      const newNorm = JSON.stringify(stripTs(results));
      if (oldNorm === newNorm) {
        changed = false;
      }
    } catch {
      // file is invalid — treat as changed
    }
  }

  if (changed) {
    writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + "\n", "utf-8");
    log(`✅ Wrote ${results.length} repos to ${OUTPUT_PATH} (changed)`);
    log(`   Performed ${readmeChecks} README checks (${results.length - readmeChecks} cached)`);
  } else {
    log(`✅ No changes detected — keeping existing ${OUTPUT_PATH}`);
  }

  // Cleanup tmp
  try {
    if (existsSync(tmpPath)) {
      const { unlinkSync } = await import("fs");
      unlinkSync(tmpPath);
    }
  } catch {
    // ignore
  }
}

main().catch((e) => {
  err(`Unhandled: ${(e as Error).message}`);
  process.exit(1);
});
