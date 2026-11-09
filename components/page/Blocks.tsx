import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { EMotif } from "@/components/brand/EMotif";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "obsidian",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "obsidian" | "carbon";
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-b border-graphite ${tone === "carbon" ? "bg-carbon" : "bg-obsidian"}`}>
      <div className="container-nue section-m">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={headingId} className="h2 mt-5 text-white">{title}</h2>
            {intro && <div className="mt-5 text-titanium-light">{intro}</div>}
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Numbered cards, used for problems, approach steps and principles. */
export function NumberedGrid({ items, cols = 2 }: { items: { title: string; body: string }[]; cols?: 2 | 3 }) {
  return (
    <ol className={`grid gap-px bg-graphite md:grid-cols-2 ${cols === 3 ? "xl:grid-cols-3" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="bg-obsidian p-7 [section.bg-carbon_&]:bg-carbon">
          <p className="mono-data text-teal">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 font-display text-xl font-semibold text-white">{it.title}</h3>
          <p className="mt-3 text-titanium-light">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex gap-4 border-b border-graphite pb-4 text-concrete">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-3 shrink-0 bg-teal" />
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
    <ul className="grid gap-px bg-graphite sm:grid-cols-2">
      {links.map((l) => (
        <li key={l.href} className="bg-obsidian [section.bg-carbon_&]:bg-carbon">
          <Link href={l.href} className="group flex h-full flex-col justify-between gap-4 p-6 hover:bg-graphite/40">
            <span className="font-display text-lg font-semibold text-white group-hover:text-ice">{l.label}</span>
            {l.blurb && <span className="text-sm text-titanium-light">{l.blurb}</span>}
            <span aria-hidden="true" className="text-teal transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Closing conversion band with the shared contact form. */
export function CtaBand({ title = "Let’s talk about what’s next.", lead, source }: { title?: string; lead?: string; source: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-carbon">
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
