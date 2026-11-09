/**
 * Contour Intelligence: topographic linework. Deterministic (no random)
 * so server and client render identical markup.
 */
function contourPath(i: number, w: number, h: number, seed: number) {
  const steps = 14;
  const base = (h / 22) * (i + 1);
  let d = "";
  for (let s = 0; s <= steps; s++) {
    const x = (w / steps) * s;
    const y =
      base +
      Math.sin(s * 0.55 + i * 0.32 + seed) * (18 + i * 1.6) +
      Math.cos(s * 0.23 + i * 0.5 + seed * 2) * (10 + i);
    if (s === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
    else {
      const px = (w / steps) * (s - 0.5);
      d += ` Q${px.toFixed(1)} ${(y - 6).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return d;
}

export function ContourField({
  className,
  lines = 20,
  seed = 1,
  highlight = [6, 13],
}: {
  className?: string;
  lines?: number;
  seed?: number;
  highlight?: number[];
}) {
  const w = 1600;
  const h = 900;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: lines }, (_, i) => (
        <path
          key={i}
          data-contour={i}
          d={contourPath(i, w, h, seed)}
          fill="none"
          stroke={highlight.includes(i) ? "var(--color-teal)" : "var(--color-titanium)"}
          strokeOpacity={highlight.includes(i) ? 0.55 : 0.22}
          strokeWidth={highlight.includes(i) ? 1.4 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
