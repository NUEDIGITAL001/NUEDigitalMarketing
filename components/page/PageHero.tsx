import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { ContourField } from "@/components/brand/ContourField";

/** Interior page hero with breadcrumbs. Static (no motion dependency). */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
  seed = 5,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  seed?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-graphite bg-obsidian">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50">
        <ContourField className="h-full w-full" seed={seed} highlight={[3]} lines={14} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_10_12/0.95)_0%,rgb(8_10_12/0.7)_55%,rgb(8_10_12/0.3)_100%)]" />
      </div>
      <div className="container-nue pb-16 pt-36 lg:pb-24 lg:pt-44">
        <nav aria-label="Breadcrumb">
          <ol className="mono-data flex flex-wrap items-center gap-2 text-titanium-light">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-titanium">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-white">{c.name}</Link>
                ) : (
                  <span aria-current="page" className="text-concrete">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={aside ? "mt-10 grid items-center gap-12 lg:grid-cols-12" : "mt-10"}>
          <div className={aside ? "lg:col-span-7" : ""}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-l mt-6 max-w-[22ch]">{title}</h1>
            {lead && <div className="body-l measure mt-8 text-concrete">{lead}</div>}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
