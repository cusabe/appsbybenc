# Build Plan: appsbybenc.com

This is the overall plan. We build it **one phase at a time**. Each phase ends at a checkpoint where you run the site, review it, tweak it, and approve it before we commit and move on. Anything in here can change between phases.

Companion to [PROJECT_BRIEF.md](PROJECT_BRIEF.md).

---

## 1. Key decisions

| Area               | Decision                                                                                 | Notes                                                                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Latest stable Next.js (App Router), TypeScript strict                                    | Version pinned at scaffold. Your machine has Node 24 / npm 11, which is fine.                                                                                                 |
| Styling            | Tailwind CSS v4                                                                          | Colours are CSS variables, mapped to Tailwind tokens via `@theme`.                                                                                                            |
| Static export      | `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`                    | `trailingSlash` makes the output S3-friendly (`/work/bntrx/index.html`).                                                                                                      |
| Case study pages   | `generateStaticParams` + `dynamicParams = false`                                         | Every slug is known at build time.                                                                                                                                            |
| Theme toggle       | Hand-written (no library)                                                                | A tiny inline script in `<head>` sets the theme before first paint, so there's no flash. It follows system preference until you click the toggle, then remembers your choice. |
| Fonts              | A pair via `next/font/google` (self-hosted at build time, no Google requests at runtime) | See section 5.                                                                                                                                                                |
| Contact form       | Web3Forms                                                                                | The access key is tied to your email **on Web3Forms' side**, so your email address never appears in the source.                                                               |
| Animation          | CSS only to start                                                                        | We add Motion later only if something clearly needs it. `prefers-reduced-motion` is respected throughout.                                                                     |
| OG / social images | Static PNGs in `public/og/`                                                              | Simpler and fully static-export-safe.                                                                                                                                         |
| Favicons           | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`                                  | A "BC" monogram until your logo arrives, then generated from the logo.                                                                                                        |
| Dependencies       | Next, React, Tailwind, ESLint, Prettier (+ Tailwind Prettier plugin)                     | Nothing else unless it earns its place.                                                                                                                                       |

### Small deviation from the brief

Web3Forms uses a fixed endpoint plus an access key, so there will be two env vars instead of one:

- `NEXT_PUBLIC_FORM_ENDPOINT` (defaults to `https://api.web3forms.com/submit`)
- `NEXT_PUBLIC_FORM_ACCESS_KEY`

The access key is designed to be public. It can only send mail to you.

---

## 2. Folder structure

```
PortfolioWebsite/                  (git repo "appsbybenc")
├─ .claude/                        # CLAUDE.md, AGENTS.md, this plan and the brief
├─ README.md
├─ .env.example                    # documents the env vars, no real values
├─ next.config.ts
├─ app/
│  ├─ layout.tsx                   # fonts, theme script, header/footer, metadata
│  ├─ page.tsx                     # the single scrolling home page
│  ├─ globals.css                  # colour tokens (light + dark), base styles
│  ├─ not-found.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ icon.png / apple-icon.png / favicon.ico
│  ├─ work/[slug]/page.tsx         # case study pages
│  └─ style-tile/page.tsx          # design playground; kept for a future "How I built this" section
├─ components/
│  ├─ layout/    Header, MobileMenu, ThemeToggle, Footer, SkipLink
│  ├─ sections/  Hero, FeaturedWork, ClientWork, Skills, Testimonials, About, Contact
│  ├─ work/      FeaturedCard, ProjectCard, TagFilter, CaseStudyLayout
│  ├─ contact/   ContactForm
│  ├─ seo/       PersonJsonLd
│  └─ ui/        Button, Tag, Container, Section, SectionHeading, Logo
├─ content/                        # ← you edit these, not the components
│  ├─ site.ts                      # name, tagline, hero text, nav, social links, acknowledgement
│  ├─ projects.ts                  # featured case studies + client work cards
│  ├─ testimonials.ts
│  ├─ skills.ts
│  └─ about.ts
├─ lib/
│  ├─ types.ts                     # content types (below)
│  └─ theme.ts                     # theme script + helpers
└─ public/
   └─ images/                      # ← DROP FOLDER for your assets
      ├─ logo.png                  # cartoon self-portrait (square, ≥ 512×512 ideally)
      ├─ ngunnawal-skies.jpg       # hero photo (supplied)
      ├─ projects/                 # one image per project, named by slug, e.g. bntrx.jpg
      └─ og/                       # social share images (1200×630)
```

---

## 3. Content data model

These types live in `lib/types.ts`. Some privacy rules are enforced by the types themselves.

```ts
export interface ImageRef {
  src: string; // e.g. "/images/projects/bntrx.jpg"
  alt: string;
}

export interface CaseStudy {
  problem: string;
  role: string;
  built: string[]; // bullet points
  outcome: string;
  testimonialId?: string;
}

export interface Project {
  slug: string; // URL-safe, e.g. "rocket-remit"
  name: string; // "Rocket Remit"
  client?: string; // "mHITs"
  category: string; // "Fintech", "Medtech", "Small business"…
  year?: number; // a year only, never months (privacy rule)
  stack: StackTag[];
  summary: string; // one or two sentences for the card
  url?: string; // live site
  image?: ImageRef;
  featured?: CaseStudy; // present → big card + /work/[slug] page
}

export interface Testimonial {
  id: string;
  quote: string;
  projectType: string; // always shown, e.g. "WordPress site rebuild"
  name?: string; // shown ONLY if permission is true
  business?: string; // shown ONLY if permission is true
  permission: boolean;
}

export interface SkillGroup {
  title: string; // "Front end", "Back end"…
  items: string[];
}
```

`StackTag` is a fixed list (React, Next.js, WordPress, Stripe, AWS…). That keeps the filter tidy, and a typo like "Nextjs" becomes a compile error instead of a stray filter button.

**One `projects.ts` for everything:** featured case studies are ordinary projects with a `featured` block. Moving a project between "featured" and "more work" means adding or removing that block.

---

## 4. Colour: an early heads-up

I checked the brief's placeholder colours for contrast (WCAG AA needs **4.5:1** for normal text):

| Pair                                                    | Ratio | Result                                               |
| ------------------------------------------------------- | ----- | ---------------------------------------------------- |
| Burnt orange `#C2562B` on cream `#FFF8F0`               | 4.28  | ❌ Fails AA for normal text (OK for large text only) |
| Darker burnt orange `#A8471F` on cream                  | 5.56  | ✅ Passes                                            |
| Pastel orange `#F6B48F` on cream                        | 1.68  | Decoration only, as the brief says                   |
| Charcoal `#2B2320` on cream                             | 14.6  | ✅                                                   |
| Pastel orange `#F6B48F` on indigo `#1B1A3A` (dark mode) | 9.43  | ✅ Works as a dark-mode accent                       |
| Off-white `#F5EDE4` on indigo                           | 14.4  | ✅                                                   |

**Proposal:** start with `#A8471F` for links and buttons. We'll tune it in Phase 2 alongside the pastel orange from your sunset photo. The style tile will show live contrast ratios so you can see what passes.

---

## 5. Fonts

A heading font plus a body font is still standard and suits this design.

- **Chosen (Phase 2):** **Plus Jakarta Sans** (headings) + **Nunito Sans** (body).
- Still a candidate: **Nunito** headings (rounded and friendly).
- Considered and dropped: Inter and DM Sans (used in recent apps), Bricolage Grotesque (too busy), Outfit (too heavy). The style tile records all of them.
- All headings (h1–h4) use the slate `--heading` colour.

Swapping is a two-line change in `layout.tsx`.

---

## 6. Build phases and checkpoints

Each phase ends with: ✅ it runs → 👀 you review → 🔧 we tweak → 💾 commit → next.

### Phase 1: Scaffold

- `git init` (repo name `appsbybenc`), `.gitignore`
- Next.js + TypeScript strict + Tailwind + ESLint + Prettier
- Static export config, `.env.example`, empty `public/images/` folders
- A placeholder home page
- **Checkpoint:** `npm run dev` shows a page, and `npm run build` produces an `out/` folder. First commit.

### Phase 2: Design tokens and style tile

- Light "Sunset" and dark "Dusk" palettes as CSS variables
- Theme toggle with no flash on load
- Font pair wired up
- `/style-tile` page: colour swatches with contrast ratios, type scale, buttons, tags, cards, focus rings, and the hero gradient in both themes
- **Checkpoint:** you tune the colours and pick fonts. We sample the orange and cloud charcoal from `ngunnawal-skies.jpg`.

### Phase 3: Layout shell: header, hero, footer

- Sticky header with logo/monogram, anchor nav, theme toggle, mobile menu, skip link
- Hero with the sunset gradient (and photo, if supplied) and the two buttons
- Footer with the Acknowledgement of Country
- **Checkpoint:** first real look and feel, checked at 360 / 768 / 1280px. **Drop in `logo.png`** if ready.

### Phase 4: Work sections

- `content/projects.ts` filled with everything from the brief (TODOs clearly marked)
- Featured case study cards (3)
- Client work grid with stack tag filter
- **Checkpoint:** review card design and wording. Add project images whenever you have them.

### Phase 5: Case study pages

- `/work/[slug]` with problem / role / stack / what I built / outcome / testimonial
- Back-link to the home page, prev/next between case studies
- **Checkpoint:** we refine the BnTRx, Rocket Remit and MojoDojo copy together (and check what you can share).

### Phase 6: Skills, testimonials, about

- Skills as grouped tags
- Testimonials (you paste them in; names shown only where `permission: true`)
- About section, with the draft story refined together
- **Checkpoint:** mostly a copywriting pass. We also decide whether any CV extracts belong here.

### Phase 7: Contact

- Form with name, email, reason, and message
- Honeypot, client-side validation, and loading / success / error states
- LinkedIn + GitHub links and "Full CV and referees available on request"
- **Checkpoint:** you create the Web3Forms key, put it in `.env.local`, and we send a real test message end to end.

### Phase 8: SEO, accessibility and performance polish

- Metadata, OG/Twitter images, `sitemap.xml`, `robots.txt`, `Person` JSON-LD ("Ben C" only)
- Keyboard pass, focus states, alt text, reduced motion, contrast in both themes
- Lighthouse runs (target 95+ on all four)
- **Privacy sweep:** search the built `out/` folder for surname, email, phone and months
- Decide whether `/style-tile` goes public now (drop `noindex`) or waits for the "How I built this" section
- README (edit content, run locally, deploy to Vercel, static export to S3)
- **Checkpoint:** Lighthouse scores and privacy sweep results reviewed together.

### Phase 9: Deploy

- Create the `appsbybenc` repo on GitHub and push
- Import it into Vercel (Hobby), and set the env vars
- Test on the `*.vercel.app` preview URL first
- Point `appsbybenc.com` at Vercel (DNS change at your domain registrar, replacing Google Sites)
- **Checkpoint:** live site checked on your phone and desktop.

---

## 7. Open questions

1. ~~Burnt orange~~: settled in Phase 2 (`#A8471F`, sampled palette).
2. ~~Fonts~~: settled in Phase 2.
3. **GitHub repo:** public or private? Either works with Vercel Hobby. Public doubles as a code sample for employers, but make sure nothing private is committed.
4. **Domain:** where is `appsbybenc.com` registered? We'll need access to its DNS settings in Phase 9.
5. **CV extracts:** decide by Phase 6.

---

## 8. Future ideas

- **"How I built this" pages:** a few pages on building the site with Claude Code. The style tile (`/style-tile`) is the first; it shows the palette, contrast checks and the font decisions.
- **Both hero styles:** the sunset photo is the main hero (zoomed in) and the footer band (panorama). The pure-CSS gradient is a candidate for the final Contact call to action (Phase 7), plus card art.
