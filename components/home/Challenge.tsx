/** Scene 02, The Challenge. Pinned on desktop only (HomeMotion). */
const challenges = [
  {
    title: "Disconnected marketing",
    body: "Ads, social, the website and SEO run on separate tracks, so no one sees the whole picture or how each piece affects the others.",
  },
  {
    title: "Limited performance visibility",
    body: "Reports show activity instead of outcomes. It is hard to tell which spend actually produces customers.",
  },
  {
    title: "Ineffective execution",
    body: "Good ideas stall or launch half-finished because no one owns the plan from start to finish.",
  },
  {
    title: "Poor conversion tracking",
    body: "Calls, forms and bookings are not traced back to their source, so budget decisions become guesses.",
  },
  {
    title: "Missed opportunities",
    body: "Searches, reviews and inquiries go unanswered while competitors respond first.",
  },
];

// Node positions in the 520x520 diagram
const nodes = [
  { x: 90, y: 110 },
  { x: 400, y: 80 },
  { x: 260, y: 250 },
  { x: 110, y: 410 },
  { x: 430, y: 400 },
];
// links drawn in order as each challenge resolves
const links: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 4],
];

export function Challenge() {
  return (
    <section
      id="scene-challenge"
      data-scene="02-challenge"
      aria-labelledby="challenge-title"
      className="relative overflow-hidden border-t border-graphite bg-obsidian"
    >
      <div data-challenge-pin className="container-nue section-m lg:flex lg:min-h-svh lg:items-center lg:py-24">
        <div className="grid w-full gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>02 · The challenge</p>
            <h2 id="challenge-title" className="display-m mt-5 max-w-[20ch]" data-reveal>
              More marketing doesn&rsquo;t automatically mean more growth.
            </h2>
            <ol className="mt-10 border-t border-graphite">
              {challenges.map((c, i) => (
                <li
                  key={c.title}
                  data-challenge={i}
                  className="relative grid grid-cols-[3rem_1fr] gap-4 border-b border-graphite py-4"
                >
                  <span aria-hidden="true" data-challenge-bar className="absolute -left-4 top-4 bottom-4 hidden w-0.5 origin-top bg-teal lg:block" style={{ transform: "scaleY(0)" }} />
                  <span className="mono-data pt-1 text-teal">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white md:text-xl">{c.title}</h3>
                    <p className="mt-1 text-titanium-light">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:flex lg:items-center">
            <figure className="ticks mx-auto w-full max-w-[520px] border border-graphite bg-carbon/40 p-6">
              <svg viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-labelledby="challenge-fig">
                <title id="challenge-fig">
                  Five disconnected marketing activities becoming one connected system
                </title>
                <g stroke="var(--color-graphite)" strokeWidth="1">
                  {Array.from({ length: 13 }, (_, i) => (
                    <line key={`v${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="520" />
                  ))}
                  {Array.from({ length: 13 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 40 + 20} x2="520" y2={i * 40 + 20} />
                  ))}
                </g>
                {/* broken fragments: the "before" state */}
                <g data-broken stroke="var(--color-titanium)" strokeWidth="1.5" strokeDasharray="4 10" fill="none">
                  {links.map(([a, b], i) => (
                    <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
                  ))}
                </g>
                {/* connections: the "after" state, drawn by scroll */}
                <g stroke="var(--color-teal)" strokeWidth="2" fill="none">
                  {links.map(([a, b], i) => (
                    <line
                      key={i}
                      data-link={i}
                      x1={nodes[a].x}
                      y1={nodes[a].y}
                      x2={nodes[b].x}
                      y2={nodes[b].y}
                      pathLength={1}
                      strokeDasharray="1"
                      strokeDashoffset="0"
                    />
                  ))}
                </g>
                {nodes.map((n, i) => (
                  <g key={i} data-node={i}>
                    <circle cx={n.x} cy={n.y} r="22" fill="var(--color-obsidian)" stroke="var(--color-teal)" strokeWidth="1.5" />
                    <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fill="var(--color-white)" fontFamily="var(--font-ui)">
                      0{i + 1}
                    </text>
                  </g>
                ))}
              </svg>
              <figcaption className="mono-data mt-4 text-titanium-light">
                Disconnected activity → one connected growth system
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
