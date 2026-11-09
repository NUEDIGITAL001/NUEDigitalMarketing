import { Figure, C } from "./Figure";

const towns = [
  ["Greece", -70, -40], ["Irondequoit", 30, -60], ["Webster", 95, -50], ["Penfield", 90, 0],
  ["Brighton", 25, 30], ["Pittsford", 70, 55], ["Henrietta", 5, 75], ["Gates", -75, 15],
  ["Chili", -80, 60], ["Fairport", 120, 45], ["Victor", 130, 100], ["Perinton", 115, 20],
] as const;

export function ServiceAreaMap() {
  const cx = 240, cy = 180;
  return (
    <Figure title="Service area rings: Rochester and Monroe County, Western New York in person, and the Eastern US remotely" caption="Rochester + Western NY in person · Eastern US remotely">
      <circle cx={cx} cy={cy} r="165" fill="none" stroke={C.graphite} strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r="120" fill={C.teal} opacity="0.04" stroke={C.graphite} />
      <circle cx={cx} cy={cy} r="20" fill={C.teal} />
      <text x={cx} y={cy + 4} fontSize="9" fill={C.obsidian} textAnchor="middle" fontWeight="700">ROC</text>
      {towns.map(([n, dx, dy]) => (
        <g key={n}>
          <circle cx={cx + dx} cy={cy + dy} r="3" fill={C.ice} />
          <text x={cx + dx + 6} y={cy + dy + 4} fontSize="10" fill={C.tl}>{n}</text>
        </g>
      ))}
      <text x={cx} y={cy - 128} fontSize="10" fill={C.teal} textAnchor="middle">WESTERN NY · IN PERSON</text>
      <text x={cx} y={cy + 160} fontSize="10" fill={C.tl} textAnchor="middle">EASTERN US · REMOTE</text>
      <path d="M0 40 C 80 60, 120 20, 200 0" stroke={C.titanium} strokeWidth="10" fill="none" opacity="0.25" />
      <text x="16" y="24" fontSize="10" fill={C.tl}>Lake Ontario</text>
    </Figure>
  );
}
