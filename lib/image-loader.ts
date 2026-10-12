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
  if (!original) return src;
  // Already this small or smaller: serve the original. The ?w= marker changes
  // nothing about the file, but tells Next.js the width was considered (it
  // warns in development when a loader returns the bare src).
  if (width >= original) return `${src}?w=${width}`;
  const dot = src.lastIndexOf(".");
  const path = src.slice("/images".length, dot);
  return `/images/_sized${path}-${width}${src.slice(dot)}`;
}
