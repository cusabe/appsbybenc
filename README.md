# appsbybenc.com

Portfolio site for **Apps by Ben C**, a full-stack web and software developer in Canberra, Australia.

Built with Next.js (App Router), TypeScript and Tailwind CSS, and exported as a fully static site: it runs on Vercel today and could move to any static host (such as S3 + CloudFront) unchanged. Planned and built with Claude Code; the design system and decisions behind it are at [`/style-tile`](app/style-tile/page.tsx).

## Run locally

Needs Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then add the Web3Forms access key
npm run dev                   # http://localhost:3000
```

## Editing content

Almost all text lives in typed files in [`content/`](content), so it can be changed without touching components. Save a file and `npm run dev` updates the page straight away.

| File                                                 | What it holds                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| [`content/site.ts`](content/site.ts)                 | Name, hero text, navigation, LinkedIn/GitHub/review links, footer |
| [`content/projects.ts`](content/projects.ts)         | Featured projects and the client work grid, in display order      |
| [`content/testimonials.ts`](content/testimonials.ts) | Reviews, which six are featured, and how reviewers are credited   |
| [`content/about.ts`](content/about.ts)               | About section text and photos                                     |
| [`content/contact.ts`](content/contact.ts)           | Contact section text and form options                             |
| [`content/lighthouse.ts`](content/lighthouse.ts)     | Scores shown on the design system page                            |

Colours and other design tokens are CSS variables at the top of [`app/globals.css`](app/globals.css).

### Images

Put images in [`public/images/`](public/images) (project screenshots in `projects/`, named by the project's `slug`). Smaller copies for phones are made automatically by [`scripts/generate-image-sizes.mjs`](scripts/generate-image-sizes.mjs) before every `dev` and `build`; they're git-ignored, so only the originals are committed. Keep originals around 720–1280px wide, and strip location data from photos first.

### Case study pages

Draft case study text is in each featured project's `featured` block in `content/projects.ts`. The pages aren't built yet; `caseStudiesPublished` at the top of that file turns on the "Read the case study" links once they are.

## Contact form

The form posts directly to [Web3Forms](https://web3forms.com), which emails each message on, so no server is needed. It has a hidden honeypot field for spam, client-side validation, and sending, success and error states.

| Variable                      | Value                                              |
| ----------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_FORM_ENDPOINT`   | `https://api.web3forms.com/submit`                 |
| `NEXT_PUBLIC_FORM_ACCESS_KEY` | The form's access key from the Web3Forms dashboard |

The access key is designed to be public; the destination email address stays on Web3Forms' side and never appears in the site.

## Checks

```bash
npm run lint
npm run typecheck
npm run format:check   # npm run format to fix
```

## Build

```bash
npm run build     # static site written to out/
npm run preview   # serve out/ locally
```

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo. The defaults (Next.js, `npm run build`) are correct.
3. Under **Settings → Environment Variables**, add the two variables above.
4. Deploy, check the `*.vercel.app` preview, then add the custom domain under **Settings → Domains** and follow Vercel's DNS instructions.
5. In the Web3Forms dashboard, set the form's website URL to the live domain.

## Static export to S3 (alternative host)

`npm run build` produces a complete static site in `out/`, with clean URLs (`trailingSlash` emits `/page/index.html`).

1. Create an S3 bucket and put CloudFront in front of it (with Origin Access Control).
2. Upload: `aws s3 sync out/ s3://<bucket> --delete`
3. In CloudFront, set the default root object to `index.html`, add a CloudFront Function that maps `/path/` to `/path/index.html`, and use `404.html` as the custom error page.
4. Set the environment variables before building, since they're baked into the static files.
