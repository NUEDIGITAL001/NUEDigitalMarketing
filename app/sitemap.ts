import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { approach, industries, legal, rochester, services } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
