import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { approach, industries, legal, rochester, services } from "@/lib/site";
import { allPosts } from "@/lib/blog";

/** Only list pages that exist and should be indexed. */
const paths = [
  "/",
  "/services/",
  ...services.map((s) => s.href),
  "/industries/",
  ...industries.map((i) => i.href),
  ...rochester.map((r) => r.href),
  ...approach.map((a) => a.href),
  "/contact/",
  "/faq/",
  ...legal.map((l) => l.href),
];

/**
 * Rebuilt on every deploy. Blog posts are read from content/blog, so a
 * new post appears here (with its date) as soon as it is published.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts();
  return [
    ...paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...(posts.length ? [{ url: `${site.url}/blog/`, lastModified: posts[0].updated ?? posts[0].date, changeFrequency: "weekly" as const, priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${site.url}${p.path}`, lastModified: p.updated ?? p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
