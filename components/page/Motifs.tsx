/**
 * Decorative animated motifs that sit under section headings. Purely
 * ornamental (aria-hidden); each is built from the brand's bars, rings
 * and grid language. Animation is CSS only and stops with reduced motion.
 */
const T = "var(--color-teal)";
const G = "var(--motif-line, var(--color-graphite))";

function Bars() {
  const h = [38, 62, 48, 86, 70, 104, 92, 128];
  return (
    <svg viewBox="0 0 240 150" className="motif">
      <line x1="0" y1="140" x2="240" y2="140" stroke={G} />
      {h.map((v, i) => (
        <rect key={i} className="motif-grow" style={{ animationDelay: `${i * 0.18}s` }} x={8 + i * 29} y={140 - v} width="16" height={v} fill={i === h.length - 1 ? T : G} />
      ))}
      <polyline className="motif-dash" points={h.map((v, i) => `${16 + i * 29},${132 - v}`).join(" ")} fill="none" stroke={T} strokeWidth="1.5" />
    </svg>
  );
}
function Rings() {
  return (
    <svg viewBox="0 0 240 150" className="motif">
      {[20, 40, 60, 80].map((r, i) => (
        <circle key={r} className="motif-pulse" style={{ animationDelay: `${i * 0.5}s` }} cx="120" cy="75" r={r} fill="none" stroke={i === 1 ? T : G} />
      ))}
      <circle cx="120" cy="75" r="5" fill={T} />
      <g className="motif-spin" style={{ transformOrigin: "120px 75px" }}>
        <circle cx="180" cy="75" r="4" fill={T} />
        <line x1="120" y1="75" x2="180" y2="75" stroke={T} strokeOpacity="0.4" />
      </g>
    </svg>
  );
}
function Dots() {
  const lit = new Set([3, 10, 17, 24, 25, 26, 33, 40]);
  return (
    <svg viewBox="0 0 240 150" className="motif">
      {Array.from({ length: 48 }, (_, i) => {
        const x = 15 + (i % 8) * 30, y = 15 + Math.floor(i / 8) * 24;
        return lit.has(i) ? (
          <rect key={i} className="motif-blink" style={{ animationDelay: `${(i % 7) * 0.3}s` }} x={x - 5} y={y - 5} width="10" height="10" fill={T} />
        ) : (
          <circle key={i} cx={x} cy={y} r="1.6" fill={G} />
        );
      })}
    </svg>
  );
}
function Wave() {
  const d = (o: number) => `M0 ${75 + o} C 40 ${25 + o}, 80 ${125 + o}, 120 ${75 + o} S 200 ${25 + o}, 240 ${75 + o}`;
  return (
    <svg viewBox="0 0 240 150" className="motif">
      {[-36, -18, 18, 36].map((o) => <path key={o} d={d(o)} fill="none" stroke={G} />)}
      <path className="motif-dash" d={d(0)} fill="none" stroke={T} strokeWidth="2" />
      <circle className="motif-blink" cx="120" cy="75" r="5" fill={T} />
    </svg>
  );
}
function Nodes() {
  const p: [number, number][] = [[30, 110], [80, 50], [130, 95], [175, 35], [215, 80]];
  return (
    <svg viewBox="0 0 240 150" className="motif">
      <polyline className="motif-dash" points={p.map((q) => q.join(",")).join(" ")} fill="none" stroke={T} strokeWidth="1.5" />
      {p.map(([x, y], i) => (
        <g key={i}>
          <circle className="motif-pulse" style={{ animationDelay: `${i * 0.4}s` }} cx={x} cy={y} r="12" fill="none" stroke={G} />
          <circle cx={x} cy={y} r="4.5" fill={i === p.length - 1 ? T : "var(--motif-node, var(--color-white))"} />
        </g>
      ))}
    </svg>
  );
}
function Stack() {
  return (
    <svg viewBox="0 0 240 150" className="motif">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="motif-slide" style={{ animationDelay: `${i * 0.25}s` }} x={20 + i * 14} y={22 + i * 30} width={200 - i * 28} height="16" fill={i % 2 === 0 ? T : G} />
      ))}
    </svg>
  );
}

const all = [Bars, Rings, Dots, Wave, Nodes, Stack];

export function Motif({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const M = all[h % all.length];
  return (
    <div aria-hidden="true" className="mt-10 hidden max-w-[300px] lg:block">
      <M />
    </div>
  );
}
