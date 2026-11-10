import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";
import { sceneKinds, type SceneKind } from "@/lib/scenes";

/** Interior page hero with breadcrumbs. Static (no motion dependency). */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
  seed = 5,
  scene,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  seed?: number;
  /** Animated backdrop. Defaults to one picked from the seed so pages differ. */
  scene?: SceneKind;
}) {
  const kind = scene ?? sceneKinds[seed % sceneKinds.length];
  return (
    <section className="relative isolate overflow-hidden border-b border-graphite bg-obsidian">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SceneCanvas kind={kind} className="scene-drift absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_10_12/0.94)_0%,rgb(8_10_12/0.72)_42%,rgb(8_10_12/0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgb(8_10_12/0.9))]" />
      </div>
      <div className="container-nue flex min-h-[78svh] flex-col justify-center pb-16 pt-36 lg:pb-24 lg:pt-44">
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
          {aside && <div className="hero-aside lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
