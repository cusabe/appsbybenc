# Project Brief: appsbybenc.com rebuild

## How to use this brief (for Claude Code)

Read this whole file first. Then, **before writing any code**, propose a plan: folder structure, component list, content data model, and the order you'll build in. Wait for my approval. Build section by section, committing after each working step. Ask me when anything is ambiguous rather than guessing.

---

## 1. What this is

A personal portfolio site for **Ben C**, an independent full-stack web and software developer based in Canberra, Australia, trading as **Apps by Ben C**. It replaces a single-page Google Site at `www.appsbybenc.com`.

### Audiences, in priority order

1. **Employers and recruiters** hiring developers (salaried or contract).
2. **Freelance clients**, e.g. via Upwork.
3. **Small businesses** needing website help (a secondary, low-key mention only).

### The core message

A versatile, client-facing developer who ships production software: recent medtech and fintech launches, a long list of happy freelance clients, and an unusual research background (theoretical physics, gravitational-wave research, national statistics).

### Hosting context

Deployed on **Vercel's free Hobby plan** as a personal, non-commercial portfolio. The tone is "here's who I am and what I've built", **not** a sales page. No pricing, packages, shop or checkout.

---

## 2. Privacy rules (non-negotiable)

- Refer to the owner only as **"Ben C"**. Never write a full surname anywhere on the site, in metadata, alt text or structured data.
- Location: **"Canberra, Australia"** only. No suburb, street or postcode.
- **No phone number and no email address** in the page or source. Contact is via a form only.
- **No public CV download.** Instead: "Full CV and referees available on request" with a link to the contact form.
- External links allowed: LinkedIn, GitHub, Google reviews and client websites.
- Freelance projects show **year at most**, never start and end months.

---

## 3. Tech stack

- **Next.js (App Router) + TypeScript**, strict mode.
- **Tailwind CSS** for styling.
- **Must remain compatible with static export** (`output: 'export'` in `next.config`), so the site can move to S3 + CloudFront if ever needed. That means:
  - No API routes, server actions or runtime server features.
  - Use `next/image` with `unoptimized: true` (or a static-friendly loader), or plain optimised images.
- **Contact form:** a third-party form service that works from static sites (e.g. Formspree or Web3Forms). Include a honeypot field for spam, client-side validation, and clear success and error states. The form endpoint goes in an environment variable (`NEXT_PUBLIC_FORM_ENDPOINT`).
- **Content lives in typed data files** (e.g. `content/projects.ts`, `content/testimonials.ts`, `content/skills.ts`) so I can edit text without touching components.
- Lint + format: ESLint and Prettier.
- Keep dependencies minimal. Subtle animation via CSS or a small library (e.g. Motion) only if it's clearly worth it, and respect `prefers-reduced-motion`.

---

## 4. Design system: "Ngunnawal Skies"

Inspired by sunsets over northern Canberra. Warm, friendly and calm, but professional. Plenty of whitespace, soft gradients, rounded corners and gentle shadows.

### Light mode: "Sunset"

- Background: warm cream / off-white.
- Primary accent: **pastel sunset orange**. `TODO: exact hex sampled from my sunset photo` (placeholder: `#F6B48F`).
- Deeper accent for links, buttons and focus rings: burnt orange (placeholder: `#C2562B`). **Must pass WCAG AA contrast** against the background.
- Text: deep warm charcoal, not pure black.
- Hero: a soft sunset gradient (cream → pastel orange → hint of dusky pink/lilac).

### Dark mode: "Dusk"

- Background: deep indigo / navy.
- Secondary surfaces: dusky violet.
- The orange becomes a glow: accents, highlights, the hero gradient's horizon.
- Text: warm off-white.

### Rules

- Define all colours as CSS variables / Tailwind theme tokens. Respect the system preference and add a manual light/dark toggle.
- **Pastel orange is never used for body text** (insufficient contrast). Use it for backgrounds, borders, glows and decoration only.
- Typography: a friendly but clean sans-serif via `next/font` (suggest two or three options for me to choose from).
- Logo and favicon: my cartoon self-portrait. `TODO: add file to /public/logo.png`. Generate favicon sizes from it. Until then, use a simple "BC" monogram placeholder.
- The hero sunset photo from my old site can be used as a background or feature image. `TODO: add file to /public/sunset.jpg`.

---

## 5. Site structure

A single scrolling page with a sticky header and anchor navigation, plus one dynamic route for case studies.

1. **Header:** logo + "Apps by Ben C", nav links (Work, About, Testimonials, Contact) and the theme toggle. Collapses to a menu on mobile.
2. **Hero:**
   - Headline (draft): _"Hi, I'm Ben C, a full-stack developer in Canberra."_
   - Subline (draft): _"I build and ship production web apps, from medtech and fintech platforms to small-business websites that just work."_
   - Buttons: "See my work" and "Get in touch".
3. **Recent work (featured case studies):** three large cards, each linking to `/work/[slug]`.
4. **More client work:** a compact grid of smaller project cards (name, type, stack tags, year, link to the live site). Filterable by stack tag would be a nice touch.
5. **Skills and stack:** grouped tags (Front end, Back end, Cloud & infrastructure, Data, Client & product). Not skill bars or percentages.
6. **Testimonials:** a curated set of 4–6, each labelled with the project type and client name/business where I've confirmed permission.
7. **About:** a short story section covering the unusual background (see content below), how I use Claude Code and AI agents in my workflow, and "Open to full-time roles and contract work. I still help small businesses with their websites, too."
8. **Contact:** the form (name, email, message, and "What are you getting in touch about?" with options: Job opportunity / Freelance project / Website help / Other). Plus links to LinkedIn and GitHub, and "Full CV and referees available on request."
9. **Footer:** Acknowledgement of Country (draft: _"I live and work on Ngunnawal Country and pay my respects to Elders past and present."_), © Apps by Ben C, and a small "Built with Next.js and Claude Code" note.

### Case study pages (`/work/[slug]`)

Statically generated. Sections: The problem, My role, Stack, What I built, Outcome, and a testimonial if available. Keep each one short enough to read in about two minutes.

---

## 6. Content

### Featured case studies

1. **BnTRx, Integra Medical (medtech).** Led development of the company's flagship product from prototype through production launch, supporting its move into a revenue-generating commercial product. _Stack:_ React / Next.js on Vercel, Java on AWS, SQL. `TODO: add detail and outcome, and check what I can share.`
2. **Rocket Remit, mHITs (fintech).** Extended the production remittance platform from Australia/New Zealand into the United Kingdom market. _Stack:_ Angular.js, WordPress, Java Groovy/Grails on AWS, SQL. `TODO: add detail.`
3. **MojoDojo Music (digital startup).** Added a Stripe paywall to an existing AI-built React app for music teachers and students (Lovable / Supabase), leading to a successful launch. _Stack:_ React, Supabase, Stripe. `TODO: add detail.`

### More client work (cards)

- **RifleMedia** (real estate marketplace, via Aquent). WordPress theme and plugin development, PHP, sign-up and payment UX, Stripe API.
- **Hoplite** (defence recruitment coaching). WordPress with LMS and community chat boards, site migration, SEO, HubSpot CRM.
- **Parasol / Resuscitation Australia** (medical training). LMS integrated with CRM via Zapier for online sign-up and automated certification.
- **Viva Leisure** (gym chain). Back-end development in AWS / GraphQL, plus GraphQL-integrated React front-end work.
- **Canine Calm Walks** (pet-walking marketplace). React front end, Node.js back end, Stripe payments.
- **RepositPower** (renewable energy tech). GCP data pipelines (Dataflow, Apache Beam) processing terabyte-scale time-series data, Python and Java, BigTable/HBase schema optimisation.
- **Small-business websites.** A set of smaller cards: WordPress, Shopify, Squarespace, Wix and HTML/CSS sites for local businesses. `TODO: I'll supply the list with links.`

### Skills

- **Front end:** React, Next.js, Angular, Vue.js, TypeScript/JavaScript, HTML/CSS
- **Back end:** Node.js, Java, PHP, Python, REST APIs, GraphQL, SQL/NoSQL, Stripe
- **Cloud & infrastructure:** AWS, GCP, Vercel, Git, CI/CD
- **AI-assisted development:** Claude Code, directing AI coding agents
- **Data:** statistical analysis, survey design, data pipelines, reporting
- **Client & product:** UX design, requirements gathering, testing, stakeholder engagement

### About (draft, to be refined with me)

Before becoming a developer, I spent 15 years in research. I was a University Medallist in theoretical physics, co-authored early LIGO gravitational-wave publications, and led survey processing for the 2016 Census Post-Enumeration Survey at the Australian Bureau of Statistics. That background shows up in my development work: measurement became data analysis, survey design became user-centred UX, and delegating technical work became directing AI coding agents. I hold a Graduate Diploma in Computing (Software Engineering & Web Development) from ANU.

### Testimonials

`TODO: I'll paste the 4–6 strongest from my current site, with project labels and any client names I have permission to use.`

---

## 7. Quality bar

- **Lighthouse:** 95+ on Performance, Accessibility, Best Practices and SEO.
- **Accessibility:** semantic HTML, keyboard navigation, visible focus states, alt text, WCAG AA contrast in both themes, `prefers-reduced-motion` respected.
- **Responsive:** mobile-first, tested at 360px, 768px and 1280px+.
- **SEO:** page titles and descriptions, Open Graph and Twitter card images (sunset-themed), `sitemap.xml` and `robots.txt`. Structured data as `Person` with name "Ben C" only.
- **Clean code:** small typed components, no `any`, sensible folder structure. A `README.md` explaining how to edit content, run locally, deploy to Vercel, and do a static export for S3.

---

## 8. Out of scope (for now)

Blog, CMS, analytics beyond Vercel's free Web Analytics, e-commerce, pricing, booking systems, and user accounts.
