import { CityScape } from "@/components/brand/CityScape";
import { ContourField } from "@/components/brand/ContourField";
import { LightTrail } from "@/components/brand/LightTrail";
import { EMotif } from "@/components/brand/EMotif";
import { ButtonLink } from "@/components/ui/Button";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";

/** Scene 01, The Opening. Full viewport, not pinned. */
export function Opening() {
  return (
    <section
      id="scene-opening"
      data-scene="01-opening"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-parallax="0.12" className="absolute -inset-y-[8%] inset-x-0">
          <CityScape className="h-full w-full" />
        </div>
        <div data-parallax="0.25" className="absolute inset-0 opacity-70 mix-blend-screen">
          <ContourField className="h-full w-full" seed={2} highlight={[4]} lines={16} />
        </div>
        <SceneCanvas kind="surge" className="scene-drift absolute inset-0 h-full w-full mix-blend-screen" />
        <LightTrail className="absolute inset-0 h-full w-full" id="hero-trail" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_10_12/0.92)_0%,rgb(8_10_12/0.55)_45%,rgb(8_10_12/0.1)_100%)]" />
      </div>

      <div className="container-nue pb-20 pt-40 lg:pb-28">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow" data-hero-fade>Marketing + Consultancy · Rochester, NY</p>
            <h1 id="hero-title" className="display-xl mt-6">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">Built for</span>
              </span>
              {" "}
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  what&rsquo;s <span className="next-glow text-teal">next.</span>
                </span>
              </span>
            </h1>
            <p data-hero-fade className="body-l mt-8 font-display font-medium uppercase tracking-[0.16em] text-white">
              Strategy. Marketing. Execution. Growth.
            </p>
            <p data-hero-fade className="body-l measure mt-6 text-concrete">
              A consulting-led growth partner for businesses that want their marketing to produce
              measurable results, not just more activity.
            </p>
            <div data-hero-fade className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact/" track="hero-start-conversation">
                Start a Conversation
              </ButtonLink>
              <ButtonLink href="#scene-methodology" variant="secondary" track="hero-see-approach">
                See Our Approach
              </ButtonLink>
            </div>
          </div>
          <div className="hidden justify-end lg:col-span-4 lg:flex">
            <EMotif className="hero-e h-28 w-auto text-white" />
          </div>
        </div>
      </div>

      <a
        href="#scene-challenge"
        data-hero-fade
        className="mono-data absolute bottom-6 right-[var(--gutter)] hidden items-center gap-3 text-titanium-light hover:text-white md:flex"
      >
        Scroll
        <span aria-hidden="true" className="block h-10 w-px bg-gradient-to-b from-teal to-transparent" />
      </a>
    </section>
  );
}
