# appsbybenc.com

Portfolio site for Apps by Ben C. Built with Next.js (App Router), TypeScript and Tailwind CSS, and exported as a fully static site.

> A full README (editing content, deploying to Vercel, static export to S3) comes in Phase 8. See [PLAN.md](.claude/PLAN.md).

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values when needed
npm run dev                   # http://localhost:3000
```

## Build

```bash
npm run build     # static site written to out/
npm run preview   # serve out/ locally
```

## Checks

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Adding images

Drop files into `public/images/`. See the folder structure in [PLAN.md](.claude/PLAN.md).
