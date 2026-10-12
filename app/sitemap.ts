import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Generated at build time (static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // The design system page is noindex for now, so it's left out.
  return [{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 }];
}
