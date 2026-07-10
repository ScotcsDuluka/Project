import type { NextConfig } from "next";

// GitHub Pages serves user/org sites at the root (username.github.io)
// and project sites at a subpath (username.github.io/repo-name).
// Set NEXT_PUBLIC_BASE_PATH env var when building for a project site.
// Example: NEXT_PUBLIC_BASE_PATH=/duluka-studio bun run build:static
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const isStaticExport = process.env.BUILD_STATIC === "true";

const nextConfig: NextConfig = {
  // For static export (GitHub Pages, Netlify static, Cloudflare Pages static)
  ...(isStaticExport
    ? {
        output: "export",
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        images: {
          unoptimized: true,
        },
        trailingSlash: true,
      }
    : {
        output: "standalone",
      }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
