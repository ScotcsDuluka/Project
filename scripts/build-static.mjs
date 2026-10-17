import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const nextCli = resolve(projectRoot, "node_modules", "next", "dist", "bin", "next");

if (!existsSync(nextCli)) {
  console.error("Next.js CLI not found. Run npm install first.");
  process.exit(1);
}

const env = { ...process.env, BUILD_STATIC: "true" };

// This repository is published at /Project/ on GitHub Pages.
// Set NEXT_PUBLIC_BASE_PATH explicitly to target a different hosting path.
if (!Object.prototype.hasOwnProperty.call(process.env, "NEXT_PUBLIC_BASE_PATH")) {
  env.NEXT_PUBLIC_BASE_PATH = "/Project";
}

console.log(`Building static site (base path: ${env.NEXT_PUBLIC_BASE_PATH || "/"})...`);
const result = spawnSync(process.execPath, [nextCli, "build", "--webpack"], {
  cwd: projectRoot,
  env,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exitCode = result.status ?? 1;
