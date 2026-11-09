import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Only list pages that exist. Add each page here as it ships. */
const paths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
