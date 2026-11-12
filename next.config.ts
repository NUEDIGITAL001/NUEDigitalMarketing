import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Fully static site: every page is plain HTML in out/, served by Cloudflare.
  // The contact form posts to functions/api/contact.ts. Redirects live in public/_redirects.
  output: "export",
  images: { unoptimized: true },
  assetPrefix: process.env.PREVIEW_ASSET_PREFIX || undefined,
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
