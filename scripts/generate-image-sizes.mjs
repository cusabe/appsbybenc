/**
 * Makes smaller copies of every JPEG and PNG in public/images, so phones
 * download small files and big screens get sharp ones. The site is a static
 * export, so Next.js can't resize images on request; this does it ahead of
 * time instead. Runs automatically before `dev`, `build` and `typecheck`.
 *
 * Output (both git-ignored):
 *   public/images/_sized/<path>-<width>.<ext>   resized copies
 *   lib/image-sizes.json                       original width of each image
 *
 * Only widths smaller than the original are made; lib/image-loader.ts falls
 * back to the original file for anything larger.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { imageWidths } from "./image-widths.mjs";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public", "images");
const outDir = path.join(imagesDir, "_sized");
const manifestPath = path.join(root, "lib", "image-sizes.json");

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== outDir) files.push(...(await listImages(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function isFresh(output, sourceStat) {
  try {
    return (await fs.stat(output)).mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

const manifest = {};
let made = 0;

for (const file of await listImages(imagesDir)) {
  const rel = path.relative(imagesDir, file).split(path.sep).join("/");
  const src = `/images/${rel}`;
  const { width } = await sharp(file).metadata();
  if (!width) continue;
  manifest[src] = width;

  const stat = await fs.stat(file);
  const ext = path.extname(rel);
  const base = rel.slice(0, -ext.length);

  for (const w of imageWidths.filter((w) => w < width)) {
    const output = path.join(outDir, `${base}-${w}${ext}`);
    if (await isFresh(output, stat)) continue;
    await fs.mkdir(path.dirname(output), { recursive: true });
    const resized = sharp(file).resize({ width: w });
    await (
      /png$/i.test(ext)
        ? resized.png({ compressionLevel: 9 })
        : resized.jpeg({ quality: 80, mozjpeg: true })
    ).toFile(output);
    made++;
  }
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `Responsive images: ${Object.keys(manifest).length} sources, ${made} new sizes made.`,
);
