import type { Metadata } from "next";

/** Site-wide link preview image (1200x630), shared by Open Graph and X/Twitter. */
export const ogImage = {
  url: "/og/nue-digital.png",
  width: 1200,
  height: 630,
  alt: "NÜE Digital: Marketing + Consultancy, Rochester, NY. Built for what’s next.",
};

/** Per-page metadata with canonical and Open Graph. `title` is the full title tag. */
export function pageMeta({ path, title, description, noindex }: { path: string; title: string; description: string; noindex?: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "NÜE Digital", locale: "en_US", title, description, url: path, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
