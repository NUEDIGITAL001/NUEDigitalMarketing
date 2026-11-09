import type { ReactNode } from "react";

/** Framed schematic figure. Every visual is illustrative and carries no client data. */
export function Figure({ title, caption, children, viewBox = "0 0 480 360" }: { title: string; caption: string; children: ReactNode; viewBox?: string }) {
  return (
    <figure className="ticks border border-graphite bg-carbon/40 p-5 md:p-7">
      <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-label={title} fontFamily="var(--font-ui)">
        {children}
      </svg>
      <figcaption className="mono-data mt-4 text-titanium-light">{caption}</figcaption>
    </figure>
  );
}

export const C = {
  teal: "var(--color-teal)",
  ice: "var(--color-ice)",
  white: "var(--color-white)",
  graphite: "var(--color-graphite)",
  titanium: "var(--color-titanium)",
  tl: "var(--color-titanium-light)",
  obsidian: "var(--color-obsidian)",
  carbon: "var(--color-carbon)",
};
