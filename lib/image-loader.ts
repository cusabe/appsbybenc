import sizes from "./image-sizes.json";

/**
 * next/image loader for the static export. Points each srcset width at the
 * pre-made copy from scripts/generate-image-sizes.mjs, or at the original
 * when the requested width is as large as (or larger than) the original.
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const original = (sizes as Record<string, number>)[src];
  if (!original || width >= original) return src;
  const dot = src.lastIndexOf(".");
  const path = src.slice("/images".length, dot);
  return `/images/_sized${path}-${width}${src.slice(dot)}`;
}
