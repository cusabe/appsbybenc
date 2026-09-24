import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export keeps the site portable (Vercel today, S3 + CloudFront if ever needed).
  // No API routes, server actions or runtime server features.
  output: "export",

  // Emit /work/bntrx/index.html instead of /work/bntrx.html, which S3 serves cleanly.
  trailingSlash: true,

  // The default image optimiser needs a server, so serve images as-is.
  images: {
    unoptimized: true,
  },

  // Agent instructions live in .claude/; stop `next dev` recreating AGENTS.md/CLAUDE.md at the root.
  agentRules: false,
};

export default nextConfig;
