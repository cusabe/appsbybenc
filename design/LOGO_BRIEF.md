# Logo brief: "Apps by Ben C" wordmark

Requirements for redesigning the stacked "Apps by Ben C" wordmark for the new appsbybenc.com portfolio site. Written so it can be handed to a designer or another AI, and used to set up the Photoshop source.

---

## 1. Context

- **Who:** Ben C, an independent full-stack web and software developer in Canberra, Australia, trading as **Apps by Ben C**.
- **The site:** a personal portfolio for employers, recruiters and freelance clients. The tone is warm, friendly and calm, but professional.
- **Privacy:** the logo must only ever say **"Ben C"**. No other form of the name.
- **The current logo:** stacked, square, in the "Acme" font:

  ```
  Apps by
     Ben
       C
  ```

  The first letters **A**, **B** and **C** are in pastel orange with a black outline, forming a diagonal. That diagonal is the "easy as ABC" joke, and it's the part to keep.

- **The redesign in progress:** three directions, all keeping the A-B-C diagonal and adding an "easy as…" tagline:
  1. Clean and modern (contemporary sans-serif)
  2. Friendly and distinctive (humanist, a bit of personality)
  3. Keeps some of the original's playful character

  **Recommendation from the site build:** direction 2 sits best with the site's typography (see section 4). Direction 1 is closer to the site's heading font and may blend in rather than stand out.

---

## 2. Where the logo is used

There are two separate marks on the site, and the wordmark only needs to do one job.

| Mark                                            | Where                                                                                       | Status                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **"Ben See" glasses** (slate frames, blue eyes) | Favicon, and the small mark beside "Apps by Ben C" in the site header                       | Done: redrawn as SVG in the site code         |
| **Stacked ABC wordmark** (this brief)           | Footer (about 112–128px wide), and potentially the About section and the social share image | Placeholder in use; replace with the redesign |

So the wordmark:

- **Doesn't need to work at favicon size.** The glasses handle 16–48px.
- **Doesn't sit beside "Apps by Ben C" text.** The header uses the glasses plus plain text, so there's no duplication.
- **Does need to read clearly at about 110px wide** (the footer), and look good large (up to about 600px on the social share image).

---

## 3. Colour

The site's "Ngunnawal Skies" palette is sampled from a sunset photo over northern Canberra. The logo should use these values so it matches exactly.

| Role                             | Light theme                         | Dark theme               | Notes                                                                                                |
| -------------------------------- | ----------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| A-B-C letters (accent)           | `#F6B48F` peach, or `#EE8A68` coral | `#FFB07C` orange glow    | Your sheet's "Ngunnawal Skies" `#FFB37A` is almost identical to the dark-theme value; either is fine |
| Other letters                    | `#2E2A2C` cloud charcoal            | `#F5EDE4` warm off-white | Your "Stormcloud Grey" `#4A4F55` also works on light                                                 |
| Headings on the site (reference) | `#56697A` slate                     | `#9DB1C0` light slate    | The glasses frames use this; an option for "easy as…"                                                |
| Page background (reference)      | `#FFF8F1` cream                     | `#1B1E29` dusk navy      | The logo sits directly on these                                                                      |

**Important:** pastel orange (`#F6B48F`) is too pale to read as thin text on cream (contrast 1.7:1). It works for the chunky A, B and C as decoration, especially with an outline or a heavier weight. It won't work for a thin "easy as…" tagline in light mode. Use charcoal or slate for the tagline.

---

## 4. Typography notes

The site's fonts, which the logo should complement rather than copy:

- **Headings:** Plus Jakarta Sans (clean geometric sans)
- **Body:** Nunito Sans (soft, friendly)

Guidance:

- The wordmark font should have **more personality than Plus Jakarta Sans**, or it will look like a heading rather than a logo. That's why direction 2 fits best.
- **Avoid Inter and DM Sans** (the owner uses them in other recent apps).
- Keep letterforms **chunky enough to survive at about 110px wide**. Very thin weights or fine scripts will break up.
- The "easy as…" tagline in a light script or italic is a nice touch, but it must stay legible at footer size. Consider a version without the tagline for small use.

---

## 5. Deliverables

### Files

| File                       | Format                                 | Size                     | Purpose                                                |
| -------------------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------ |
| `logo-abc.svg`             | SVG, text converted to outlines        | Vector                   | **Preferred master.** Scales perfectly, tiny file size |
| `logo-abc-light.png`       | PNG-24 with **transparent** background | 1024 × 1024 px or larger | Charcoal letters and orange A-B-C, for the light theme |
| `logo-abc-dark.png`        | PNG-24 with **transparent** background | 1024 × 1024 px or larger | Off-white letters and orange A-B-C, for the dark theme |
| `logo-abc-notagline-*.png` | As above                               | As above                 | Optional: without "easy as…", for small use            |
| `logo-abc.psd`             | Photoshop                              | Master                   | Source file; keep it in `design/`, not the website     |

If you can only produce one, make it the **SVG**. The site can recolour an SVG for dark mode in code, so a single SVG replaces both PNGs.

### Photoshop setup checklist

- [ ] Canvas at least **1024 × 1024 px**, square (matches the current placement). A landscape version is a bonus for the social share image.
- [ ] **Transparent background**, with no white layer. The current PNG has a solid white background, which shows as a white box on the dark theme. The site build removes it in code, but the edges aren't perfect.
- [ ] Keep text as **editable type layers** in the PSD, then convert to shapes for the SVG and PNG exports.
- [ ] Put the orange letters and the charcoal letters on **separate layers or groups**, so the dark version is a one-step colour swap.
- [ ] Leave **clear space** around the mark of at least the height of the "C" on every side. Trim it in export, not in the design.
- [ ] Export as **PNG-24 with transparency** (not PNG-8, which gives jagged edges on dark backgrounds).
- [ ] Check it at **110px wide** on both `#FFF8F1` and `#1B1E29` before calling it done.

### Social share image (optional, later)

- **1200 × 630 px** landscape. The site will composite the wordmark over the sunset photo, so a transparent logo file is all that's needed.

---

## 6. Where to put the files

Drop them in the website project:

- **Final web files** (SVG and PNGs) go in `public/images/`.
- **Sources** (PSD and working files) go in `design/`. This folder isn't published.

The site code will then be updated to use the new files in the footer and style tile. The current placeholders are `public/images/logo-abc-light.png` and `logo-abc-dark.png`, generated from `design/originals/AppsByBenC-ps.png`.
