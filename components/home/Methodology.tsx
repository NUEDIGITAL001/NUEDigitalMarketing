import { ButtonLink } from "@/components/ui/Button";

/** Scene 04, The Methodology. Pinned horizontal track on desktop, vertical stepper elsewhere. */
const phases = [
  {
    name: "Discover",
    lead: "Understand the business before touching the marketing.",
    items: ["Goals, margins and capacity", "Current channels and spend", "Tracking and data audit", "Competitor and search landscape"],
  },
  {
    name: "Strategize",
    lead: "Choose where to focus and what success looks like.",
    items: ["Positioning and offer", "Channel priorities and budget", "Measurement plan", "90-day roadmap"],
  },
  {
    name: "Execute",
    lead: "Launch the work with the right people on each piece.",
    items: ["Website and landing pages", "SEO, local and AI search", "Paid search and social", "Content, email and creative"],
  },
  {
    name: "Optimize",
    lead: "Measure what produces customers and do more of it.",
    items: ["Lead and call tracking", "Monthly reporting tied to outcomes", "Testing and refinement", "Reallocating budget to what works"],
  },
];

export function Methodology() {
  return (
    <section
      id="scene-methodology"
      data-scene="04-methodology"
      aria-labelledby="method-title"
      className="relative overflow-hidden border-t border-graphite bg-obsidian"
    >
      <div data-method-pin className="lg:flex lg:min-h-svh lg:flex-col lg:justify-center">
        <div className="container-nue pt-24 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow" data-reveal>04 · Our methodology</p>
              <h2 id="method-title" className="display-m mt-5 max-w-[22ch]" data-reveal>
                A clear process from first conversation to growth.
              </h2>
            </div>
            <ButtonLink href="/methodology/" variant="text" track="method-full">
              The full methodology
            </ButtonLink>
          </div>
          <div aria-hidden="true" className="relative mt-10 hidden h-px bg-graphite lg:block">
            <span data-method-progress className="absolute inset-y-0 left-0 w-full origin-left bg-teal" />
          </div>
        </div>

        <div className="container-nue pb-24 lg:overflow-visible lg:pb-16">
          <ol data-method-track className="mt-10 lg:mt-8 grid gap-0 lg:flex lg:w-max lg:gap-6">
            {phases.map((p, i) => (
              <li
                key={p.name}
                className="relative grid grid-cols-[2.5rem_1fr] gap-5 border-l border-graphite pb-12 pl-6 last:pb-0 lg:block lg:w-[min(36vw,480px)] lg:border lg:bg-carbon/50 lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1 h-2.5 w-2.5 bg-teal lg:hidden"
                />
                <span className="mono-data text-teal">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-[0.08em] text-white lg:mt-5 lg:text-4xl">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-concrete">{p.lead}</p>
                  <ul className="mt-6 space-y-2 text-titanium-light">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-teal" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
