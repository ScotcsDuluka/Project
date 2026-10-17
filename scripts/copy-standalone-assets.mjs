import { access, cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

async function copyDirectory(source, destination) {
  try {
    await access(source);
  } catch {
    throw new Error(`Required build output not found: ${source}. Run npm run build first.`);
  }

  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true, force: true });
  console.log(`Copied ${source} -> ${destination}`);
}

await copyDirectory(
  resolve(projectRoot, ".next", "static"),
  resolve(projectRoot, ".next", "standalone", ".next", "static"),
);
await copyDirectory(
  resolve(projectRoot, "public"),
  resolve(projectRoot, ".next", "standalone", "public"),
);
