/** Scene 03, The Difference. The three E bars extend into three columns. */
const pillars = [
  {
    n: "01",
    title: "Strategy first",
    body: "We start with the business: who you serve, what a good customer is worth and where growth is realistic. Channels come after the plan, not before it.",
  },
  {
    n: "02",
    title: "The right specialists",
    body: "Several decades of experience in digital marketing and paid advertising, plus a network of creators and specialists who are brought in when the plan calls for them.",
  },
  {
    n: "03",
    title: "Measured execution",
    body: "Every campaign is tied to calls, forms and bookings, so decisions are based on what produces customers rather than what produces activity.",
  },
];

export function Difference() {
  return (
    <section
      id="scene-difference"
      data-scene="03-difference"
      aria-labelledby="difference-title"
      className="relative overflow-hidden border-t border-graphite bg-carbon"
    >
      <div className="container-nue section-l">
        <p className="eyebrow" data-reveal>03 · The NÜE difference</p>
        <h2 id="difference-title" className="display-l mt-6 max-w-[18ch]" data-reveal>
          One partner connecting strategy, specialists and execution.
        </h2>

        <div className="mt-16 grid gap-px bg-graphite md:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.n} className="relative bg-carbon p-8 pt-10 lg:p-10 lg:pt-12">
              <span
                aria-hidden="true"
                data-diff-bar={i}
                className={`absolute left-0 top-0 h-1.5 w-full origin-left ${i === 1 ? "bg-white" : "bg-teal"}`}
              />
              <p className="mono-data text-teal">{p.n}</p>
              <h3 className="h3 mt-4 text-white">{p.title}</h3>
              <p className="mt-4 text-titanium-light">{p.body}</p>
            </article>
          ))}
        </div>

        <figure className="mt-20 grid gap-6 lg:grid-cols-12" data-reveal>
          <blockquote className="lg:col-span-9 lg:col-start-3">
            <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              &ldquo;When our different is better, <span className="text-teal">we win.</span>&rdquo;
            </p>
          </blockquote>
          <figcaption className="mono-data text-titanium-light lg:col-span-9 lg:col-start-3">
            The NÜE operating principle
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
