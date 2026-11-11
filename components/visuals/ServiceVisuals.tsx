import { Figure, C } from "./Figure";

const t = (x: number, y: number, s: string, o: { size?: number; fill?: string; anchor?: "start" | "middle" | "end"; weight?: number } = {}) => (
  <text x={x} y={y} fontSize={o.size ?? 12} fill={o.fill ?? C.tl} textAnchor={o.anchor ?? "start"} fontWeight={o.weight ?? 500}>
    {s}
  </text>
);

export function StrategyMatrix() {
  const dots = [
    { x: 340, y: 90, l: "Fix tracking", hi: true },
    { x: 380, y: 140, l: "Local visibility", hi: true },
    { x: 150, y: 110, l: "New website" },
    { x: 300, y: 250, l: "Brand refresh" },
    { x: 120, y: 260, l: "New channel test" },
  ];
  return (
    <Figure title="Priority matrix plotting initiatives by impact and effort" caption="Illustrative · priorities are set per business">
      <rect x="40" y="30" width="420" height="290" fill="none" stroke={C.graphite} />
      <line x1="250" y1="30" x2="250" y2="320" stroke={C.graphite} />
      <line x1="40" y1="175" x2="460" y2="175" stroke={C.graphite} />
      <rect x="250" y="30" width="210" height="145" fill={C.teal} opacity="0.07" />
      {t(260, 52, "DO FIRST", { fill: C.teal, size: 11 })}
      {t(50, 52, "PLAN", { size: 11 })}
      {t(260, 198, "SCHEDULE", { size: 11 })}
      {t(50, 198, "PARK", { size: 11 })}
      {t(250, 345, "Lower effort  →", { anchor: "middle", size: 11 })}
      <text x="22" y="175" fontSize="11" fill={C.tl} transform="rotate(-90 22 175)" textAnchor="middle">Impact on revenue  →</text>
      {dots.map((d) => (
        <g key={d.l}>
          <circle cx={d.x} cy={d.y} r={d.hi ? 7 : 5} fill={d.hi ? C.teal : C.obsidian} stroke={d.hi ? C.teal : C.tl} />
          {t(d.x + 12, d.y + 4, d.l, { fill: d.hi ? C.white : C.tl })}
        </g>
      ))}
    </Figure>
  );
}

export function SeoStack() {
  const layers = [
    { l: "Technical health", s: "Crawl, speed, structure, schema" },
    { l: "Content & intent", s: "Pages that answer real searches" },
    { l: "Authority & trust", s: "Links, mentions, reviews" },
  ];
  return (
    <Figure title="Three layers of SEO supporting search visibility" caption="How the three layers of SEO stack up">
      {layers.map((ly, i) => (
        <g key={ly.l}>
          <rect x="30" y={250 - i * 72} width="250" height="60" fill={i === 0 ? C.carbon : C.obsidian} stroke={C.graphite} />
          <rect x="30" y={250 - i * 72} width="4" height="60" fill={C.teal} />
          {t(48, 276 - i * 72, ly.l, { fill: C.white, size: 14, weight: 600 })}
          {t(48, 296 - i * 72, ly.s, { size: 11 })}
        </g>
      ))}
      <path d="M290 175 H 318" stroke={C.teal} strokeWidth="2" markerEnd="url(#seo-a)" />
      <defs><marker id="seo-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill={C.teal} /></marker></defs>
      <rect x="330" y="70" width="130" height="220" fill={C.obsidian} stroke={C.graphite} />
      {t(342, 92, "Search results", { size: 11, fill: C.white })}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="342" y={108 + i * 34} width={i === 0 ? 100 : 80} height="6" fill={i === 0 ? C.teal : C.graphite} />
          <rect x="342" y={120 + i * 34} width="106" height="4" fill={C.graphite} opacity="0.7" />
        </g>
      ))}
    </Figure>
  );
}

export function AnswerEngine() {
  return (
    <Figure title="An AI assistant answer citing sources, with one source highlighted as your business" caption="Illustrative · how AI answers cite sources">
      <rect x="30" y="30" width="300" height="44" rx="22" fill={C.carbon} stroke={C.graphite} />
      {t(52, 57, "“Who should I hire for … near Rochester?”", { fill: C.white, size: 13 })}
      <rect x="150" y="100" width="300" height="230" fill={C.obsidian} stroke={C.graphite} />
      {t(166, 124, "AI ANSWER", { fill: C.teal, size: 10 })}
      {[0, 1, 2, 3].map((i) => <rect key={i} x="166" y={138 + i * 16} width={i === 3 ? 170 : 260} height="6" fill={C.graphite} />)}
      {t(166, 220, "Sources", { size: 11 })}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="166" y={232 + i * 30} width="268" height="22" fill={i === 0 ? "transparent" : C.carbon} stroke={i === 0 ? C.teal : C.graphite} />
          <circle cx="180" cy={243 + i * 30} r="4" fill={i === 0 ? C.teal : C.titanium} />
          {t(192, 247 + i * 30, i === 0 ? "Your business · clear, cited, trusted" : i === 1 ? "Directory listing" : "Competitor", { size: 11, fill: i === 0 ? C.white : C.tl })}
        </g>
      ))}
    </Figure>
  );
}

export function LocalMap() {
  const pins = [[90, 90], [200, 140], [330, 80], [120, 250], [380, 230], [260, 290]];
  return (
    <Figure title="A local map with competing businesses and one highlighted listing in the top three" caption="Illustrative · local map results">
      <g stroke={C.graphite}>
        {[60, 140, 220, 300].map((y) => <line key={y} x1="20" y1={y} x2="300" y2={y + 30} />)}
        {[80, 170, 250].map((x) => <line key={x} x1={x} y1="20" x2={x - 40} y2="340" />)}
      </g>
      <path d="M20 200 C 120 170, 180 260, 300 210" stroke={C.titanium} strokeWidth="6" fill="none" opacity="0.4" />
      {pins.map(([x, y], i) => <circle key={i} cx={x * 0.7 + 10} cy={y} r="6" fill={C.obsidian} stroke={C.tl} />)}
      <g>
        <circle cx="160" cy="170" r="26" fill={C.teal} opacity="0.12" />
        <path d="M160 150 c-11 0 -18 8 -18 17 c0 13 18 29 18 29 s18 -16 18 -29 c0 -9 -7 -17 -18 -17z" fill={C.teal} />
        <circle cx="160" cy="167" r="6" fill={C.obsidian} />
      </g>
      <rect x="310" y="40" width="150" height="280" fill={C.obsidian} stroke={C.graphite} />
      {t(322, 62, "Top 3 nearby", { size: 11, fill: C.white })}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="322" y={76 + i * 70} width="126" height="58" fill={i === 0 ? "transparent" : C.carbon} stroke={i === 0 ? C.teal : C.graphite} />
          {t(332, 96 + i * 70, i === 0 ? "Your business" : "Competitor", { size: 12, fill: i === 0 ? C.white : C.tl })}
          {t(332, 116 + i * 70, i === 0 ? "★★★★★ · Open · Posts" : "★★★★ · Hours?", { size: 10, fill: i === 0 ? C.teal : C.titanium })}
        </g>
      ))}
    </Figure>
  );
}

export function PaidFunnel() {
  const steps = ["Search", "Ad", "Landing page", "Inquiry"];
  return (
    <Figure title="Paid search path from search to ad to landing page to inquiry, measured by cost per lead" caption="We manage to cost per qualified lead, not clicks">
      {steps.map((s, i) => {
        const w = 400 - i * 70;
        const x = 240 - w / 2;
        return (
          <g key={s}>
            <rect x={x} y={40 + i * 66} width={w} height="50" fill={i === 3 ? C.teal : C.obsidian} stroke={i === 3 ? C.teal : C.graphite} opacity={i === 3 ? 0.9 : 1} />
            {t(240, 70 + i * 66, s, { anchor: "middle", size: 14, weight: 600, fill: i === 3 ? C.obsidian : C.white })}
          </g>
        );
      })}
      {t(20, 340, "Negative keywords · ad copy tests · bid strategy · call tracking", { size: 11 })}
    </Figure>
  );
}

export function ContentCalendar() {
  const types = [C.teal, C.ice, C.titanium, C.graphite];
  const pattern = [0, 2, 1, 3, 0, 2, 3, 1, 0, 3, 2, 1, 0, 2, 1, 3, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 3];
  return (
    <Figure title="A four-week content calendar mixing education, behind the scenes, offers and community posts" caption="Illustrative cadence · planned around your goals">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => t(70 + i * 56, 40, d, { anchor: "middle", size: 11 }))}
      {pattern.map((p, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const has = (i * 7) % 3 !== 0;
        return (
          <rect key={i} x={46 + col * 56} y={54 + row * 56} width="48" height="48" fill={has ? types[p] : C.obsidian} opacity={has ? (p === 3 ? 0.9 : 0.75) : 1} stroke={C.graphite} />
        );
      })}
      {[["Education", 0], ["Behind the scenes", 1], ["Offer", 2], ["Community", 3]].map(([l, i], k) => (
        <g key={l as string}>
          <rect x={46 + k * 110} y="292" width="10" height="10" fill={types[i as number]} />
          {t(62 + k * 110, 301, l as string, { size: 11 })}
        </g>
      ))}
    </Figure>
  );
}

export function SiteWireframe() {
  return (
    <Figure title="A website wireframe with labelled areas for message, proof, services and call to action" caption="Every section has a job">
      <rect x="20" y="20" width="440" height="320" fill={C.obsidian} stroke={C.graphite} />
      <rect x="20" y="20" width="440" height="22" fill={C.carbon} />
      {[0, 1, 2].map((i) => <circle key={i} cx={34 + i * 12} cy="31" r="3" fill={C.titanium} />)}
      <rect x="40" y="60" width="240" height="18" fill={C.white} opacity="0.9" />
      <rect x="40" y="86" width="190" height="8" fill={C.graphite} />
      <rect x="40" y="108" width="90" height="26" fill={C.teal} />
      {t(300, 75, "← Clear message", { size: 11, fill: C.teal })}
      {t(140, 126, "← One primary action", { size: 11, fill: C.teal })}
      {[0, 1, 2].map((i) => <rect key={i} x={40 + i * 140} y="160" width="125" height="80" fill={C.carbon} stroke={C.graphite} />)}
      {t(40, 258, "Services, organised the way customers search", { size: 11 })}
      <rect x="40" y="275" width="400" height="44" fill={C.carbon} stroke={C.graphite} />
      {t(56, 302, "Proof · process · questions answered", { size: 11, fill: C.white })}
    </Figure>
  );
}

export function SplitTest() {
  return (
    <Figure title="Two landing page variants compared side by side with a test result bar" caption="Illustrative test · one change at a time">
      {["A", "B"].map((v, i) => (
        <g key={v}>
          <rect x={30 + i * 220} y="30" width="200" height="230" fill={C.obsidian} stroke={i === 1 ? C.teal : C.graphite} />
          {t(46 + i * 220, 54, `Variant ${v}`, { size: 11, fill: i === 1 ? C.teal : C.tl })}
          <rect x={46 + i * 220} y="70" width="150" height="14" fill={C.white} opacity="0.85" />
          <rect x={46 + i * 220} y="92" width="120" height="6" fill={C.graphite} />
          <rect x={46 + i * 220} y="112" width="168" height={i === 1 ? 70 : 40} fill={C.carbon} stroke={C.graphite} />
          {t(54 + i * 220, 130, i === 1 ? "Short form above the fold" : "Long form below", { size: 10 })}
          <rect x={46 + i * 220} y={i === 1 ? 196 : 166} width="90" height="22" fill={C.teal} opacity={i === 1 ? 1 : 0.5} />
        </g>
      ))}
      {t(30, 296, "Inquiry rate", { size: 11 })}
      <rect x="120" y="286" width="150" height="12" fill={C.titanium} opacity="0.6" />
      <rect x="120" y="306" width="230" height="12" fill={C.teal} />
      {t(278, 297, "A", { size: 11 })}
      {t(358, 317, "B", { size: 11, fill: C.teal })}
    </Figure>
  );
}

export function EmailSequence() {
  const steps = [
    { d: "Day 0", l: "Welcome & next step" },
    { d: "Day 3", l: "Answer a common question" },
    { d: "Day 7", l: "Proof of process" },
    { d: "Day 14", l: "Invitation to talk" },
    { d: "Monthly", l: "Useful newsletter" },
  ];
  return (
    <Figure title="An email nurture sequence over two weeks followed by a monthly newsletter" caption="Illustrative nurture sequence">
      <line x1="60" y1="40" x2="60" y2="330" stroke={C.graphite} strokeWidth="2" />
      {steps.map((s, i) => (
        <g key={s.d}>
          <circle cx="60" cy={56 + i * 66} r="8" fill={i === 4 ? C.obsidian : C.teal} stroke={C.teal} />
          {t(84, 52 + i * 66, s.d, { size: 11, fill: C.teal })}
          <rect x="84" y={60 + i * 66} width="300" height="26" fill={C.obsidian} stroke={C.graphite} />
          {t(96, 78 + i * 66, s.l, { size: 12, fill: C.white })}
        </g>
      ))}
    </Figure>
  );
}

export function ReviewLoop() {
  const nodes = [
    { x: 240, y: 60, l: "Great experience" },
    { x: 410, y: 180, l: "Timely request" },
    { x: 240, y: 300, l: "Public review" },
    { x: 70, y: 180, l: "Thoughtful reply" },
  ];
  return (
    <Figure title="A loop from great experience to review request to public review to response" caption="Reputation is a loop, not a campaign">
      <circle cx="240" cy="180" r="120" fill="none" stroke={C.graphite} strokeDasharray="4 8" />
      <path d="M240 60 A120 120 0 0 1 360 180" fill="none" stroke={C.teal} strokeWidth="2" />
      {t(240, 186, "★★★★★", { anchor: "middle", size: 22, fill: C.teal })}
      {nodes.map((n) => (
        <g key={n.l}>
          <rect x={n.x - 68} y={n.y - 16} width="136" height="32" fill={C.obsidian} stroke={C.graphite} />
          {t(n.x, n.y + 4, n.l, { anchor: "middle", size: 12, fill: C.white })}
        </g>
      ))}
    </Figure>
  );
}

export function Workflow() {
  const n = [
    { x: 30, y: 60, l: "New inquiry" },
    { x: 180, y: 60, l: "CRM record" },
    { x: 330, y: 60, l: "Score & route" },
    { x: 330, y: 170, l: "Instant reply" },
    { x: 180, y: 170, l: "Follow-up tasks" },
    { x: 30, y: 170, l: "Owner alert" },
    { x: 180, y: 280, l: "Weekly report" },
  ];
  const e = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6]];
  return (
    <Figure title="An automated workflow from new inquiry to CRM, routing, replies, follow-up and reporting" caption="Automation with a human in the loop">
      {e.map(([a, b], i) => (
        <line key={i} x1={n[a].x + 60} y1={n[a].y + 18} x2={n[b].x + 60} y2={n[b].y + 18} stroke={C.teal} strokeWidth="1.5" />
      ))}
      {n.map((x, i) => (
        <g key={x.l}>
          <rect x={x.x} y={x.y} width="120" height="36" fill={i === 2 ? C.carbon : C.obsidian} stroke={i === 2 ? C.teal : C.graphite} />
          {t(x.x + 60, x.y + 22, x.l, { anchor: "middle", size: 11, fill: C.white })}
        </g>
      ))}
    </Figure>
  );
}

export function Viewfinder() {
  return (
    <Figure title="A camera viewfinder with framing grid and a shot list" caption="Planned around the campaign, not the camera">
      <rect x="20" y="30" width="290" height="200" fill={C.obsidian} stroke={C.graphite} />
      {[1, 2].map((i) => <line key={`v${i}`} x1={20 + (290 / 3) * i} y1="30" x2={20 + (290 / 3) * i} y2="230" stroke={C.graphite} />)}
      {[1, 2].map((i) => <line key={`h${i}`} x1="20" y1={30 + (200 / 3) * i} x2="310" y2={30 + (200 / 3) * i} stroke={C.graphite} />)}
      {[[30, 40, 1, 1], [300, 40, -1, 1], [30, 220, 1, -1], [300, 220, -1, -1]].map(([x, y, dx, dy], i) => (
        <path key={i} d={`M${x} ${y + 14 * dy} V${y} H${x + 14 * dx}`} stroke={C.white} fill="none" strokeWidth="2" />
      ))}
      <circle cx="44" cy="54" r="5" fill="#ff5a4a" />
      {t(56, 58, "REC", { size: 11, fill: C.white })}
      <rect x="125" y="95" width="80" height="70" fill="none" stroke={C.teal} />
      {t(20, 262, "Hero image · team at work · product detail · short vertical clips", { size: 11 })}
      <rect x="330" y="30" width="130" height="200" fill={C.obsidian} stroke={C.graphite} />
      {t(342, 52, "Shot list", { size: 11, fill: C.white })}
      {["Website hero", "Service detail", "Team portrait", "Reel · 15s", "Ad · 6s"].map((s, i) => (
        <g key={s}>
          <rect x="342" y={68 + i * 30} width="10" height="10" fill={i < 2 ? C.teal : "none"} stroke={C.teal} />
          {t(360, 77 + i * 30, s, { size: 11 })}
        </g>
      ))}
    </Figure>
  );
}
