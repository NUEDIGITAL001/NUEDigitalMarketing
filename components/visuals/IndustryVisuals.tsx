import { Figure, C } from "./Figure";

/** Customer journey line with industry-specific stages; one stage highlighted. */
export function Journey({ title, stages, focus, caption }: { title: string; stages: string[]; focus: number; caption: string }) {
  const n = stages.length;
  const gap = 400 / (n - 1);
  return (
    <Figure title={title} caption={caption}>
      <path d={`M40 180 ${stages.map((_, i) => `L${40 + i * gap} ${i % 2 ? 140 : 220}`).join(" ")}`} fill="none" stroke={C.graphite} strokeWidth="2" />
      <path d={`M40 180 ${stages.slice(0, focus + 1).map((_, i) => `L${40 + i * gap} ${i % 2 ? 140 : 220}`).join(" ")}`} fill="none" stroke={C.teal} strokeWidth="2" />
      {stages.map((s, i) => {
        const x = 40 + i * gap;
        const y = i % 2 ? 140 : 220;
        const on = i === focus;
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={on ? 11 : 7} fill={on ? C.teal : C.obsidian} stroke={i <= focus ? C.teal : C.tl} strokeWidth="1.5" />
            <text x={x} y={i % 2 ? y - 24 : y + 32} fontSize="12" fill={on ? C.white : C.tl} textAnchor="middle" fontWeight={on ? 600 : 500}>{s}</text>
            <text x={x} y={y + 4} fontSize="9" fill={on ? C.obsidian : C.tl} textAnchor="middle">{i + 1}</text>
          </g>
        );
      })}
      <text x="40" y="320" fontSize="11" fill={C.teal}>● Where most businesses lose people</text>
    </Figure>
  );
}

export function BuyingCommittee() {
  const roles = [
    { x: 240, y: 60, l: "Engineering" },
    { x: 400, y: 150, l: "Procurement" },
    { x: 340, y: 290, l: "Operations" },
    { x: 140, y: 290, l: "Quality" },
    { x: 80, y: 150, l: "Leadership" },
  ];
  return (
    <Figure title="A B2B buying committee of five roles around one purchase decision" caption="Each role needs different proof">
      {roles.map((r) => <line key={r.l} x1="240" y1="180" x2={r.x} y2={r.y} stroke={C.graphite} strokeDasharray="3 6" />)}
      <rect x="180" y="155" width="120" height="50" fill={C.carbon} stroke={C.teal} />
      <text x="240" y="185" fontSize="13" fill={C.white} textAnchor="middle" fontWeight="600">Purchase</text>
      {roles.map((r) => (
        <g key={r.l}>
          <rect x={r.x - 56} y={r.y - 16} width="112" height="32" fill={C.obsidian} stroke={C.graphite} />
          <text x={r.x} y={r.y + 4} fontSize="12" fill={C.tl} textAnchor="middle">{r.l}</text>
        </g>
      ))}
    </Figure>
  );
}

export function Seasonality() {
  const pts = [40, 60, 90, 130, 160, 150, 140, 120, 90, 110, 150, 120];
  const m = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <Figure title="Illustrative seasonal demand curve with planned and urgent service peaks" caption="Illustrative · demand shape varies by trade">
      <line x1="40" y1="300" x2="450" y2="300" stroke={C.graphite} />
      <path d={`M40 ${300 - pts[0]} ${pts.map((p, i) => `L${40 + i * 37} ${300 - p}`).join(" ")}`} fill="none" stroke={C.teal} strokeWidth="2.5" />
      {m.map((x, i) => <text key={i} x={40 + i * 37} y="320" fontSize="11" fill={C.tl} textAnchor="middle">{x}</text>)}
      <rect x="170" y="60" width="90" height="240" fill={C.teal} opacity="0.06" />
      <text x="215" y="80" fontSize="11" fill={C.white} textAnchor="middle">Peak season</text>
      <text x="40" y="40" fontSize="11" fill={C.tl}>Search demand</text>
      <text x="300" y="150" fontSize="11" fill={C.ice}>Book ahead of the curve →</text>
    </Figure>
  );
}

export function DirectVsOta() {
  return (
    <Figure title="Comparison of a direct booking and an online travel agency booking showing commission paid" caption="Illustrative · commission rates vary by agreement">
      {[
        { y: 80, l: "OTA booking", w: [300, 80], c: [C.titanium, "#ff7a6b"] },
        { y: 200, l: "Direct booking", w: [380, 0], c: [C.teal, C.teal] },
      ].map((b) => (
        <g key={b.l}>
          <text x="40" y={b.y - 12} fontSize="13" fill={C.white} fontWeight="600">{b.l}</text>
          <rect x="40" y={b.y} width={b.w[0]} height="40" fill={b.c[0]} opacity="0.85" />
          {b.w[1] > 0 && <rect x={40 + b.w[0]} y={b.y} width={b.w[1]} height="40" fill={b.c[1]} opacity="0.85" />}
          <text x="52" y={b.y + 25} fontSize="12" fill={C.obsidian} fontWeight="600">Revenue kept</text>
          {b.w[1] > 0 && <text x={48 + b.w[0]} y={b.y + 25} fontSize="11" fill={C.obsidian}>Commission</text>}
        </g>
      ))}
      <text x="40" y="300" fontSize="11" fill={C.tl}>Plus: you own the guest relationship for return visits</text>
    </Figure>
  );
}
