import type { Metadata } from "next";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";
import type { SceneKind } from "@/lib/scenes";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/lab/",
  title: "Visual Options · NÜE Digital",
  description: "Internal review page for animated scene options.",
  noindex: true,
});

const options: { kind: SceneKind; name: string; note: string }[] = [
  { kind: "trails", name: "A · Light Trails", note: "Fibres of light rushing toward a vanishing point. Motion and momentum." },
  { kind: "contours", name: "B · Contour Field", note: "Flowing topographic lines with travelling glints. Calm, technical, premium." },
  { kind: "dots", name: "C · Dot Terrain", note: "A rolling landscape of pulsing contour dots, seen in perspective." },
  { kind: "tunnel", name: "D · Grid Tunnel", note: "A wireframe corridor moving toward a horizon of light. Progression." },
  { kind: "bars", name: "E · Neon Bars", note: "The three bars of the NÜE logo as layered beams of light." },
  { kind: "city", name: "F · Data City", note: "Isometric wireframe blocks with data pulses running the streets. Metropolitan structure." },
];

/** Internal page: every animated scene, full width, for side-by-side review. */
export default function Lab() {
  return (
    <div className="bg-obsidian pt-18">
      <div className="container-nue py-16">
        <p className="eyebrow">Internal · not indexed</p>
        <h1 className="display-l mt-5">Visual options</h1>
        <p className="body-l measure mt-6 text-concrete">
          Each scene below is live and reacts to scrolling. Tell us which letters you like and where, and which to drop.
        </p>
      </div>
      {options.map((o) => (
        <section key={o.kind} aria-label={o.name} className="relative isolate flex min-h-[92svh] items-end overflow-hidden border-t border-graphite">
          <SceneCanvas kind={o.kind} className="absolute inset-0 -z-10 h-full w-full" />
          <div className="container-nue pb-14">
            <h2 className="display-m">{o.name}</h2>
            <p className="measure mt-4 text-concrete">{o.note}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
