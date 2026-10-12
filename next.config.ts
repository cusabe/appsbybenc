import type { NextConfig } from "next";
import { imageWidths } from "./scripts/image-widths.mjs";

const nextConfig: NextConfig = {
  // Static export keeps the site portable (Vercel today, S3 + CloudFront if ever needed).
  // No API routes, server actions or runtime server features.
  output: "export",

  // Emit /work/bntrx/index.html instead of /work/bntrx.html, which S3 serves cleanly.
  trailingSlash: true,

  // The default image optimiser needs a server. Instead, smaller copies are
  // made at build time (scripts/generate-image-sizes.mjs) and this loader
  // points each image's srcset at them, so phones get small files.
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: imageWidths.filter((w) => w < 640),
    deviceSizes: imageWidths.filter((w) => w >= 640),
  },

  // Agent instructions live in .claude/; stop `next dev` recreating AGENTS.md/CLAUDE.md at the root.
  agentRules: false,
};

export default nextConfig;
