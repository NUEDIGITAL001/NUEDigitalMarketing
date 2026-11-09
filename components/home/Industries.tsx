"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/lib/site";
import { ContourField } from "@/components/brand/ContourField";

/** Scene 05, Industries. Hover or focus a row to swap the detail panel. */
export function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section
      id="scene-industries"
      data-scene="05-industries"
      aria-labelledby="industries-title"
      className="relative overflow-hidden border-t border-graphite bg-carbon"
    >
      <div className="container-nue section-l">
        <p className="eyebrow" data-reveal>05 · Industries</p>
        <h2 id="industries-title" className="display-l mt-6 max-w-[18ch]" data-reveal>
          Growth looks different in every industry.
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="border-t border-graphite lg:col-span-7">
            {industries.map((ind, i) => (
              <li key={ind.href} className="border-b border-graphite">
                <Link
                  href={ind.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-cta={`industry-${ind.href.split("/")[2]}`}
                  className={`group flex items-baseline gap-5 py-5 transition-colors ${
                    active === i ? "text-white" : "text-titanium-light hover:text-white"
                  }`}
                >
                  <span className={`mono-data ${active === i ? "text-teal" : "text-titanium-light"}`}>0{i + 1}</span>
                  <span className="flex-1 font-display text-xl font-semibold md:text-2xl">{ind.label}</span>
                  <span
                    aria-hidden="true"
                    className={`text-teal transition-transform duration-(--dur-micro) ${active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                  >
                    →
                  </span>
                </Link>
                {/* mobile: show the challenge inline so nothing depends on hover */}
                <p className="pb-5 pl-11 text-sm text-titanium-light lg:hidden">{ind.challenge}</p>
              </li>
            ))}
          </ul>

          <div aria-live="polite" className="relative hidden overflow-hidden border border-graphite bg-obsidian lg:col-span-5 lg:block">
            <div aria-hidden="true" className="absolute inset-0 opacity-60">
              <ContourField className="h-full w-full" seed={active + 3} highlight={[active % 5]} lines={12} />
            </div>
            <div key={active} className="industry-swap relative flex h-full min-h-[420px] flex-col justify-end p-10">
              <p className="mono-data text-teal">The growth challenge</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug text-white">{current.challenge}</p>
              <Link href={current.href} className="ui-text mt-8 text-ice underline decoration-teal underline-offset-8">
                How we approach {current.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
