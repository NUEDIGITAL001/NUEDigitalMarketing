import type { Metadata } from "next";

/** Site-wide link preview image (1200x630), shared by Open Graph and X/Twitter. */
export const ogImage = {
  url: "/og/nue-digital.png",
  width: 1200,
  height: 630,
  alt: "NÜE Digital: Marketing + Consultancy, Rochester, NY. Built for what’s next.",
};

/** Per-page metadata with canonical and Open Graph. `title` is the full title tag. */
export function pageMeta({
  path, title, description, noindex, image = ogImage, article,
}: {
  path: string; title: string; description: string; noindex?: boolean;
  /** Link preview image. Blog posts pass their featured image. */
  image?: { url: string; width: number; height: number; alt: string };
  article?: { published: string; modified: string; section: string };
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: article
      ? { type: "article", siteName: "NÜE Digital", locale: "en_US", title, description, url: path, images: [image], publishedTime: article.published, modifiedTime: article.modified, section: article.section }
      : { type: "website", siteName: "NÜE Digital", locale: "en_US", title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
