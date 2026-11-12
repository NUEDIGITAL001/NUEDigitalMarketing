# Hosting on Cloudflare Pages

The site is a fully static Next.js export. `npm run build` writes plain
HTML, CSS and JS to `out/`. Cloudflare Pages serves that folder and runs
one small function for the contact form.

| Piece | Where |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | `NODE_VERSION=22` (environment variable) |
| Contact form endpoint | `functions/api/contact.ts` → `POST /api/contact` |
| Form logic and validation | `lib/contact.ts` |
| Redirects | `public/_redirects` |
| Response headers | `public/_headers` |

## Secrets (set in the Cloudflare dashboard, never in the repo)

Pages project → Settings → Variables and Secrets, for Production (and
Preview if previews should send mail):

- `RESEND_API_KEY` — sending-only Resend key (type: Secret)
- `CONTACT_TO_EMAIL` — where inquiries go; several addresses separated by commas (type: Secret)
- `CONTACT_FROM_EMAIL` — optional; defaults to `NÜE Digital Website <website@mail.nuedigitalmarketing.com>`

A new deploy is needed after changing them.

## Local preview

```
npm run build
npx wrangler pages dev out
```

## Constraints of a static export

- No server actions, route handlers with request data, or `redirects()` in
  `next.config.ts`. Add redirects to `public/_redirects`.
- `next/image` is unoptimised: export images at the size they are shown.
- Anything that must run on the server goes in `functions/`.
