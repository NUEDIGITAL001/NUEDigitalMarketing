import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { EMotif } from "@/components/brand/EMotif";
import { Motif } from "./Motifs";

const toneClass = { obsidian: "bg-obsidian", carbon: "bg-carbon", light: "tone-light" } as const;

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "obsidian",
  motif = true,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: keyof typeof toneClass;
  /** Decorative animated graphic under the heading on large screens. */
  motif?: boolean;
}) {
  const headingId = id ? `${id}-title` : undefined;
  const seed = `${id ?? ""}${eyebrow ?? ""}${typeof title === "string" ? title : ""}`;
  return (
    <section id={id} aria-labelledby={headingId} className={`section-glow relative isolate overflow-hidden border-b border-graphite ${toneClass[tone]}`}>
      <div className="container-nue section-m">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={headingId} className="h2 mt-5 text-white">{title}</h2>
            {intro && <div className="mt-5 text-titanium-light">{intro}</div>}
            {motif && <Motif seed={seed} />}
          </div>
          <div className="lg:col-span-8" data-reveal="late">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Numbered cards, used for problems, approach steps and principles. */
export function NumberedGrid({ items, cols = 2 }: { items: { title: string; body: string }[]; cols?: 2 | 3 }) {
  return (
    <ol className={`grid gap-4 md:grid-cols-2 ${cols === 3 ? "xl:grid-cols-3" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="card-nue group relative overflow-hidden border border-graphite bg-carbon/60 p-7">
          <span aria-hidden="true" className="card-bar absolute inset-x-0 top-0 h-[3px] bg-teal" />
          <p aria-hidden="true" className="card-num font-display text-6xl font-bold leading-none">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-5 font-display text-xl font-semibold text-white">{it.title}</h3>
          <p className="mt-3 text-titanium-light">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="card-nue flex items-start gap-4 border border-graphite bg-carbon/60 px-5 py-4 text-concrete">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0">
            <rect width="20" height="20" fill="var(--color-teal)" />
            <path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="var(--color-obsidian)" strokeWidth="2" />
          </svg>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-nue measure space-y-5 text-concrete">{children}</div>;
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-graphite">
      {faqs.map((f) => (
        <details key={f.q} className="group border-b border-graphite">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-lg font-semibold text-white marker:hidden hover:text-ice [&::-webkit-details-marker]:hidden">
            <h3>{f.q}</h3>
            <span aria-hidden="true" className="mt-1 text-teal transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="measure pb-6 text-titanium-light">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function LinkGrid({ links }: { links: { label: string; href: string; blurb?: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="link-card group flex h-full flex-col justify-between gap-4 border border-graphite bg-obsidian/60 p-6">
            <span className="font-display text-lg font-semibold text-white">{l.label}</span>
            {l.blurb && <span className="link-card-blurb text-sm text-titanium-light">{l.blurb}</span>}
            <span aria-hidden="true" className="link-card-arrow text-teal transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling band of related terms. Decorative: the same links appear in the page body. */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div aria-hidden="true" className="ticker overflow-hidden border-b border-graphite bg-teal py-4 text-obsidian">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.2em]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-10">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t}
                <span className="inline-block h-1.5 w-4 bg-obsidian" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Full-width teal band carrying one line that sums the page up. */
export function StatementBand({ children }: { children: ReactNode }) {
  return (
    <section aria-label="In short" className="relative isolate overflow-hidden bg-teal text-obsidian">
      <svg aria-hidden="true" viewBox="0 0 313 302" preserveAspectRatio="xMaxYMid meet" className="statement-bars absolute inset-y-0 right-(--gutter) -z-10 my-auto hidden h-[62%] md:block">
        <rect x="0" y="0" width="313" height="63" fill="rgb(8 10 12 / 0.16)" />
        <rect x="0" y="120" width="299" height="63" fill="rgb(255 255 255 / 0.55)" />
        <rect x="0" y="239" width="313" height="63" fill="rgb(8 10 12 / 0.16)" />
      </svg>
      <div className="container-nue py-20 lg:py-28">
        <p data-reveal className="max-w-[20ch] font-display text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.015em] md:max-w-[62%]">
          {children}
        </p>
      </div>
    </section>
  );
}

/** Closing conversion band with the shared contact form. */
export function CtaBand({ title = "Let’s talk about what’s next.", lead, source }: { title?: string; lead?: string; source: string }) {
  return (
    <section aria-labelledby="cta-title" className="cta-glow relative isolate overflow-hidden bg-carbon">
      <div className="container-nue section-m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <EMotif className="h-9 w-auto text-white" />
            <h2 id="cta-title" className="display-m mt-8">{title}</h2>
            <p className="mt-6 text-concrete">
              {lead ??
                "Tell us where your business is today and where you want it to go. We’ll talk it through and give you an honest recommendation."}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="ticks border border-graphite bg-obsidian/70 p-6 md:p-10">
              <ContactForm source={source} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
