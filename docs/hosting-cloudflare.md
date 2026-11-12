# Hosting on Cloudflare (Workers with static assets)

The site is a fully static Next.js export. `npm run build` writes plain
HTML, CSS and JS to `out/`. Cloudflare serves that folder and runs one small
Worker for the contact form.

| Piece | Where |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | `NODE_VERSION=22` (build variable) |
| Config | `wrangler.jsonc` (worker name must match the Cloudflare project: `nuedigitalmarketing`) |
| Contact form endpoint | `worker/index.ts` → `POST /api/contact` |
| Form logic and validation | `lib/contact.ts` |
| Redirects | `public/_redirects` |
| Response headers | `public/_headers` |

## Secrets (set in the Cloudflare dashboard, never in the repo)

Worker → Settings → Variables and Secrets (type: Secret):

- `RESEND_API_KEY`: sending-only Resend key
- `CONTACT_TO_EMAIL`: where inquiries go; several addresses separated by commas
- `CONTACT_FROM_EMAIL`: optional; defaults to `NÜE Digital Website <website@mail.nuedigitalmarketing.com>`

## Local preview

```
npm run build
npx wrangler dev
```

## Constraints of a static export

- No server actions or `redirects()` in `next.config.ts`. Add redirects to
  `public/_redirects`.
- `next/image` is unoptimised: export images at the size they are shown.
- Anything that must run on the server goes in `worker/index.ts`.

## Troubleshooting

- The build log shows the branch it built. Production builds must say
  `main` (the production branch since 2026-11-12), never an older branch.
- "Retry build" re-runs the same commit on the same branch. After changing
  the production branch, push a new commit to start a build on it.
- Form secrets belong under Settings → Runtime variables and secrets
  (Production), not under Builds.
