import type { Metadata } from "next";
import Link from "next/link";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";
import { pageScenes } from "@/lib/scenes";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/lab/",
  title: "Visual Options · NÜE Digital",
  description: "Internal review page for every animated scene on the site.",
  noindex: true,
});

const scenes = Object.entries(pageScenes);

/** Internal page: every animated scene, full width, with the page it lives on. */
export default function Lab() {
  return (
    <div className="bg-obsidian pt-18">
      <div className="container-nue py-16">
        <p className="eyebrow">Internal · not indexed</p>
        <h1 className="display-l mt-5">Every scene, one per page</h1>
        <p className="body-l measure mt-6 text-concrete">
          {scenes.length} live scenes. Each one is used on a single page and nowhere else. Scroll to see them all, or follow a link to see one in place.
        </p>
      </div>
      {scenes.map(([path, s]) => (
        <section key={path} aria-label={s.name} className="relative isolate flex min-h-[92svh] items-end overflow-hidden border-t border-graphite">
          <SceneCanvas kind={s.scene} className="absolute inset-0 -z-10 h-full w-full" />
          <div className="container-nue pb-14">
            <h2 className="display-m">{s.name}</h2>
            <p className="mt-4 text-concrete">
              Used on <Link href={path} className="text-teal underline underline-offset-4 hover:text-white">{s.page}</Link>
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
