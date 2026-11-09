/** Scene 06, Measurement. An illustrative schematic: no client data, no numbers. */
const columns = [
  { label: "Sources", items: ["Search", "Maps & GBP", "Paid ads", "Social", "Email", "Referrals"] },
  { label: "Actions", items: ["Phone calls", "Form inquiries", "Bookings", "Directions"] },
  { label: "Reporting", items: ["Source attribution", "Lead quality", "Cost per inquiry"] },
  { label: "Decisions", items: ["Keep", "Adjust", "Reinvest"] },
];

export function Measurement() {
  return (
    <section
      id="scene-measurement"
      data-scene="06-measurement"
      aria-labelledby="measure-title"
      className="relative overflow-hidden border-t border-graphite bg-obsidian"
    >
      <div className="container-nue section-l">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>06 · Measurement</p>
            <h2 id="measure-title" className="display-l mt-6" data-reveal>
              If it can&rsquo;t be measured, it can&rsquo;t be improved.
            </h2>
            <p className="body-l mt-8 text-concrete" data-reveal>
              We connect every channel to the actions that matter, so you can see which work produces
              customers and where the next dollar should go.
            </p>
          </div>

          <figure className="ticks border border-graphite bg-carbon/40 p-6 lg:col-span-7 lg:p-8" data-reveal>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
              {columns.map((c, ci) => (
                <div key={c.label} className="relative">
                  <p className="mono-data border-b border-graphite pb-3 text-teal">
                    0{ci + 1} · {c.label}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        data-measure-item
                        className="border border-graphite bg-obsidian px-3 py-2 text-sm text-white"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                  {ci < columns.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-3 top-1 hidden text-teal md:block">→</span>
                  )}
                </div>
              ))}
            </div>
            <figcaption className="mono-data mt-6 text-titanium-light">
              Illustrative schematic · no client data
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
