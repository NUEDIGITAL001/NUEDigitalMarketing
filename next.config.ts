import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.PREVIEW_ASSET_PREFIX || undefined,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
