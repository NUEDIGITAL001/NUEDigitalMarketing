/**
 * Metropolitan Architecture: a low-angle tower composition drawn in SVG.
 * Stands in for photography in the prototype (no stock image hosts were
 * reachable). Swap for licensed or AI-generated imagery via the hero's
 * `image` prop when assets are ready. Deterministic output.
 */
const VPX = 800;
const VPY = -900;
const BASE = 900;

function at(x: number, y: number) {
  // point on the line from (x, BASE) toward the vanishing point, at height y
  const t = (BASE - y) / (BASE - VPY);
  return x + (VPX - x) * t;
}

type Tower = { x1: number; x2: number; top: number; side: number; tone: number; floors: number; cols: number };

const TOWERS: Tower[] = [
  { x1: -220, x2: 210, top: 40, side: -70, tone: 0, floors: 34, cols: 9 },
  { x1: 260, x2: 560, top: -120, side: 60, tone: 1, floors: 46, cols: 7 },
  { x1: 600, x2: 1000, top: -300, side: 0, tone: 2, floors: 58, cols: 10 },
  { x1: 1040, x2: 1360, top: -80, side: -60, tone: 1, floors: 44, cols: 8 },
  { x1: 1400, x2: 1860, top: 60, side: 80, tone: 0, floors: 32, cols: 10 },
];

const FILLS = ["#0d1114", "#12171b", "#161c21"];

function lit(i: number, j: number, k: number) {
  // sparse deterministic lit windows
  return ((i * 73 + j * 31 + k * 17) % 23) === 0;
}

export function CityScape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1b2329" />
          <stop offset="0.55" stopColor="#0c1013" />
          <stop offset="1" stopColor="#080a0c" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="0.3">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#00C7D9" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.5" stopColor="#080a0c" stopOpacity="0" />
          <stop offset="1" stopColor="#080a0c" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />
      {TOWERS.map((t, i) => {
        const tx1 = at(t.x1, t.top);
        const tx2 = at(t.x2, t.top);
        const sideX = t.side;
        const front = `M${t.x1} ${BASE} L${t.x2} ${BASE} L${tx2} ${t.top} L${tx1} ${t.top} Z`;
        const sideEdge = sideX >= 0 ? t.x2 : t.x1;
        const sideTop = sideX >= 0 ? tx2 : tx1;
        const side = sideX
          ? `M${sideEdge} ${BASE} L${sideEdge + sideX} ${BASE} L${sideTop + sideX * 0.35} ${t.top + 30} L${sideTop} ${t.top} Z`
          : "";
        const mullions = Array.from({ length: t.cols + 1 }, (_, c) => t.x1 + ((t.x2 - t.x1) / t.cols) * c);
        const floors = Array.from({ length: t.floors }, (_, f) => {
          // perspective spacing: denser toward the top
          const p = f / t.floors;
          return BASE - (BASE - t.top) * (1 - Math.pow(1 - p, 1.35));
        });
        return (
          <g key={i} data-tower={i}>
            {side && <path d={side} fill="#0a0d10" />}
            <path d={front} fill={FILLS[t.tone]} />
            <path d={front} fill="url(#glass)" />
            <g stroke="#2a3238" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {mullions.map((x, m) => (
                <line key={m} x1={x} y1={BASE} x2={at(x, t.top)} y2={t.top} />
              ))}
              {floors.map((y, f) => (
                <line key={f} x1={at(t.x1, y)} y1={y} x2={at(t.x2, y)} y2={y} strokeOpacity={0.55} />
              ))}
            </g>
            <g fill="#D8F5F7">
              {floors.slice(1).map((y, f) =>
                mullions.slice(1).map((x, m) =>
                  lit(i, f, m) ? (
                    <rect
                      key={`${f}-${m}`}
                      x={at(mullions[m], y) + 2}
                      y={y - (y - (floors[f] ?? y)) * 0.15 - 6}
                      width={Math.max(4, at(x, y) - at(mullions[m], y) - 4)}
                      height={4}
                      opacity={0.18}
                    />
                  ) : null,
                ),
              )}
            </g>
            <line
              x1={sideX >= 0 ? t.x2 : t.x1}
              y1={BASE}
              x2={sideX >= 0 ? tx2 : tx1}
              y2={t.top}
              stroke="#00C7D9"
              strokeOpacity={i === 2 ? 0.7 : 0.25}
              strokeWidth={i === 2 ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
      <rect width="1600" height="900" fill="url(#fade)" />
    </svg>
  );
}
