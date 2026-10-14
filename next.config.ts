import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isCloudflareDeploy = process.env.CLOUDFLARE_DEPLOY === "true";
const isStaticExport = isGitHubPages || isCloudflareDeploy;
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: isGitHubPages && pagesBasePath ? pagesBasePath : undefined,
  assetPrefix: isGitHubPages && pagesBasePath ? pagesBasePath : undefined,
  trailingSlash: isStaticExport,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
