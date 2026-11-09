import type { Metadata } from "next";

/** Per-page metadata with canonical and Open Graph. `title` is the full title tag. */
export function pageMeta({ path, title, description, noindex }: { path: string; title: string; description: string; noindex?: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
