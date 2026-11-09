import { Figure, C } from "./Figure";

export function MethodLoop() {
  const p = [
    { l: "DISCOVER", x: 240, y: 50 },
    { l: "STRATEGIZE", x: 410, y: 180 },
    { l: "EXECUTE", x: 240, y: 310 },
    { l: "OPTIMIZE", x: 70, y: 180 },
  ];
  return (
    <Figure title="The four-phase NÜE methodology as a continuous loop" caption="Discover → Strategize → Execute → Optimize → repeat">
      <circle cx="240" cy="180" r="130" fill="none" stroke={C.graphite} strokeWidth="2" />
      <path d="M240 50 A130 130 0 1 1 110 180" fill="none" stroke={C.teal} strokeWidth="2" />
      {[0, 1, 2].map((i) => <rect key={i} x="200" y={150 + i * 24} width={i === 1 ? 76 : 80} height="12" fill={i === 1 ? C.white : C.teal} />)}
      {p.map((x, i) => (
        <g key={x.l}>
          <rect x={x.x - 58} y={x.y - 16} width="116" height="32" fill={C.obsidian} stroke={C.teal} />
          <text x={x.x} y={x.y + 5} fontSize="12" fill={C.white} textAnchor="middle" fontWeight="600" letterSpacing="1.5">{`0${i + 1} ${x.l}`}</text>
        </g>
      ))}
    </Figure>
  );
}
