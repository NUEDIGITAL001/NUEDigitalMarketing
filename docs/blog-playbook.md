# NÜE blog playbook

How every blog post is written, published and interlinked. Follow this each
time Matt asks for a post on a topic.

## Where things live

| What | Where |
|---|---|
| Posts (one Markdown file each) | `content/blog/<slug>.md` |
| Featured images (16:9, 1600x900) | `public/blog/<slug>.jpg` |
| Blog grid page | `app/blog/page.tsx` → `/blog/` |
| Single-post template | `app/blog/[slug]/page.tsx` → `/blog/<slug>/` |
| Loading, validation, categories | `lib/blog.ts` |
| Cover image generator | `scripts/blog-cover.mjs` |

Nothing else needs editing to publish. The grid, sitemap, schema, related
posts and the "Related reading" block on service pages all update from the
post file.

## Steps

1. **Pick the angle.** One question a business owner is actually asking. Check
   `content/blog/` so the topic and title are not a repeat. Choose the primary
   keyword by intent and the pages the post should support.
2. **Create `content/blog/<slug>.md`.** Slug: lowercase, hyphens, 3 to 7 words,
   no dates. Copy the front matter below.
3. **Write the body** (see rules).
4. **Make the featured image:**
   `NODE_PATH=/opt/node-tools/node_modules node scripts/blog-cover.mjs <slug> [rings|bars|network|beams]`
   Pick the style that fits the topic and differs from the previous post. If
   Matt supplies a photo, save it over the same file name instead.
5. **Check:** `npx tsc --noEmit`, `npm run lint`, `npm run build`. The build
   fails with a plain message if a field, category, image or link is wrong.
   Open the post and `/blog/` locally at desktop and phone width.
6. **Publish:** commit and push. The host deploys automatically. Tell Matt the
   URL, the pages it links to and the pages that now link back to it.

## Front matter

```yaml
---
title: "Title Case, Under 65 Characters, Keyword Near the Front"
description: "Meta description, 165 characters or fewer, says what the reader gets."
excerpt: "Card text. 1 to 2 catchy sentences, unique to this post, not a copy of the description."
date: 2026-11-11          # publish date, YYYY-MM-DD. Newest shows first.
updated: 2026-12-01       # optional, only after a real revision
category: Measurement     # exactly one from lib/blog.ts `categories`
cover: /blog/<slug>.jpg
coverAlt: "What the image shows, in plain words"
related:                  # 1 to 4 service, industry or Rochester pages (with trailing slash)
  - /services/seo/
takeaways:                # 3 to 4 one-sentence points
  - "..."
faqs:                     # optional, 2 to 4. Shown on the page and output as FAQ schema
  - q: "..."
    a: "..."
draft: true               # optional. Hides the post until removed
---
```

## Writing rules

- 600 to 1,200 words. Plain language, short paragraphs, no jargon.
- Open with the reader's problem, not with NÜE.
- Use `##` headings (they build the "In this article" list). Never use `#`.
- Never invent statistics, client results, testimonials, awards or
  credentials. No ranking or revenue promises. If a figure is cited, link to
  the primary source.
- Do not show pricing.
- Rochester or Western New York can be mentioned where it is natural. Do not
  write near-duplicate posts for different towns.
- End with one clear next step that links to `/contact/`.

## Interlinking (required)

- **Out:** link in the body to 2 to 4 relevant service, industry or Rochester
  pages, on descriptive anchor text, where the topic comes up naturally. Link
  to 1 or 2 earlier posts when they are relevant. Internal links start with
  `/` and end with `/`.
- **Back in:** every page listed under `related` automatically shows this post
  in its "Related reading" section, and the post shows those pages under "Put
  this into practice".
- **Sideways:** "Keep reading" on each post lists same-category posts first.
- When a new post is a better reference than an older one for some point,
  go back and add a link from the older post.

## What the template outputs automatically

- `BlogPosting` schema (publisher and author = NÜE Digital, tied to the
  services under `related`), `BreadcrumbList`, and `FAQPage` when `faqs` exist.
- Open Graph and X/Twitter preview using the featured image.
- Entry in `/sitemap.xml` with its last-modified date.
- Reading time and table of contents.

## Categories

Strategy, SEO, AI Search, Local SEO, Paid Media, Social Media, Websites,
Content & Email, Reputation, Measurement. Add a new one only in
`lib/blog.ts`, and only when several posts will use it.
