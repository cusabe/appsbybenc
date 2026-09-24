@AGENTS.md

# appsbybenc.com

Portfolio site for Ben C (trading as Apps by Ben C). Read these before working:

- @PROJECT_BRIEF.md: requirements, content, privacy rules (non-negotiable)
- @PLAN.md: folder structure, data model, and the phase-by-phase build order
- @PRIVATE.md: local-only personal notes (git-ignored; absent on a fresh clone). Keep personal details there, never in committed files.

These files live in `.claude/` by request; keep the repo root free of agent/planning docs (README.md stays at the root). The Next.js docs mentioned in AGENTS.md are at `node_modules/next/dist/docs/` from the repo root. `agentRules: false` in `next.config.ts` stops `next dev` recreating root AGENTS.md/CLAUDE.md.

## Working agreement

- Build one phase at a time. End each phase at a runnable checkpoint and wait for review before committing and moving on.
- Keep the site static-export compatible (`output: "export"`): no API routes, server actions or request-time server features.
- Privacy: "Ben C" only (never expand the name), "Canberra, Australia" only, no email or phone anywhere in source or output, and years only for freelance work.

## Commands

- `npm run dev`: local dev server
- `npm run build`: static export to `out/`
- `npm run preview`: serve `out/` locally
- `npm run lint` / `npm run typecheck` / `npm run format`
