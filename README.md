# NÜE Digital website

Marketing site for NÜE Digital (Marketing + Consultancy, Rochester, NY), built with Next.js (App Router), Tailwind CSS v4 and GSAP ScrollTrigger.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real values.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used by the contact form |
| `CONTACT_TO_EMAIL` | Private inbox that receives inquiries. Server-only, never shown on the site |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `NÜE Digital Website <hello@nuedigitalmarketing.com>` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Defaults to GTM-T6DQ49C2; set to `off` to disable |

Without `RESEND_API_KEY` and `CONTACT_TO_EMAIL` the form validates input but tells the visitor it is not connected yet.

## Structure

- `app/` routes, metadata, sitemap, robots, the contact server action
- `components/brand/` logo (vector, from the approved master files), E motif and SVG scene graphics
- `components/home/` the seven homepage scenes and `HomeMotion` (all scroll animation)
- `lib/site.ts` approved site facts and navigation

## Content rules

No invented credentials, awards, testimonials, client results or statistics. No ranking guarantees. Content must be readable with JavaScript off and with motion reduced.

## Motion

All content renders visible by default. `HomeMotion` sets start states only after GSAP loads. Pins (Scenes 02 and 04) are desktop only. The OS reduced-motion setting and the footer "Reduce motion" toggle both turn animation off.
