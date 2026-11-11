/**
 * Motion and Momentum: electric teal light trails. Pure SVG; the flow
 * animation is a CSS dash offset loop that stops under reduced motion.
 */
export function LightTrail({
  className,
  d = "M-50 760 C 380 700, 620 520, 900 470 S 1420 300, 1700 120",
  animate = true,
  id = "trail",
}: {
  className?: string;
  d?: string;
  animate?: boolean;
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#00C7D9" stopOpacity="0" />
          <stop offset="0.55" stopColor="#00C7D9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D8F5F7" stopOpacity="1" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={d} fill="none" stroke="#00C7D9" strokeOpacity="0.35" strokeWidth="10" filter={`url(#${id}-glow)`} />
      <path data-trail-path d={d} fill="none" stroke={`url(#${id}-g)`} strokeWidth="2" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="#D8F5F7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="120 1880"
        style={animate ? { animation: "trail-flow 6s linear infinite" } : undefined}
      />
    </svg>
  );
}
