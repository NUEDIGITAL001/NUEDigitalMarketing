/**
 * Page-specific scenes. Each is used on exactly one page and is themed to
 * that page's subject, drawn in the same language as the original six:
 * light, wire structure, depth and directional movement.
 */
export type Draw = (c: CanvasRenderingContext2D, w: number, h: number, t: number, p: number) => void;

export const TEAL = "0,199,217";
export const ICE = "216,245,247";
export const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const T = (a: number) => `rgba(${TEAL},${Math.max(0, Math.min(1, a))})`;
const I = (a: number) => `rgba(${ICE},${Math.max(0, Math.min(1, a))})`;
const L = (c: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) => {
  c.beginPath();
  c.moveTo(x0, y0);
  c.lineTo(x1, y1);
  c.stroke();
};
const poly = (c: CanvasRenderingContext2D, pts: number[][]) => {
  c.beginPath();
  pts.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
  c.closePath();
};
const glow = (c: CanvasRenderingContext2D, x: number, y: number, r: number, a = 1) => {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, I(0.95 * a));
  g.addColorStop(0.35, T(0.5 * a));
  g.addColorStop(1, T(0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(x, y, r, 0, 6.3);
  c.fill();
};
const smooth = (x: number) => {
  const v = Math.max(0, Math.min(1, x));
  return v * v * (3 - 2 * v);
};

/** Growth strategy: glass terraces climbing, lit one step at a time. */
const ascent: Draw = (c, w, h, t, p) => {
  const n = 10, tw = Math.max(22, w / 24), ox = w * 0.6, oy = h * (0.52 - p * 0.05);
  const iso = (x: number, y: number, z: number) => [ox + (x - y) * tw, oy + (x + y) * tw * 0.5 - z * tw];
  const lit = Math.floor((t * 1.4) % (n + 3));
  for (let k = 0; k < n; k++) {
    const z = 0.3 + k * 0.55, on = k === lit, was = k < lit ? 0.12 : 0;
    const top = [iso(k, 0, z), iso(k + 1, 0, z), iso(k + 1, 4, z), iso(k, 4, z)];
    const left = [iso(k, 4, z), iso(k + 1, 4, z), iso(k + 1, 4, 0), iso(k, 4, 0)];
    const right = [iso(k + 1, 0, z), iso(k + 1, 4, z), iso(k + 1, 4, 0), iso(k + 1, 0, 0)];
    c.lineWidth = 1;
    c.strokeStyle = T(0.5 + k * 0.05);
    poly(c, left);
    c.fillStyle = "rgba(8,10,12,0.9)";
    c.fill();
    c.stroke();
    poly(c, right);
    c.fillStyle = T(0.05 + was);
    c.fill();
    c.stroke();
    poly(c, top);
    c.fillStyle = on ? I(0.8) : T(0.14 + was * 1.8);
    c.fill();
    c.stroke();
    if (on) glow(c, (top[0][0] + top[2][0]) / 2, (top[0][1] + top[2][1]) / 2, tw * 5, 0.7);
  }
};

/** SEO: sheets of work stacking up, pierced by a single beam. */
const strata: Draw = (c, w, h, t, p) => {
  const cx = w * 0.64, n = 9, a = w * 0.3, b = h * 0.085;
  const beam = c.createLinearGradient(0, 0, 0, h);
  beam.addColorStop(0, T(0));
  beam.addColorStop(0.5, I(0.9));
  beam.addColorStop(1, T(0));
  for (let i = 0; i < n; i++) {
    const y = h * (0.9 - i * 0.085) + Math.sin(t * 0.8 + i * 0.7) * 6 - p * i * 6;
    const rise = smooth(((t * 0.25 + i * 0.11) % 1) * 3);
    c.strokeStyle = T(0.25 + (i / n) * 0.55);
    c.fillStyle = T(0.03 + (i / n) * 0.06 * rise);
    poly(c, [[cx - a, y], [cx, y - b], [cx + a, y], [cx, y + b]]);
    c.fill();
    c.stroke();
    c.strokeStyle = I(0.5 + 0.4 * Math.sin(t * 2 + i));
    c.beginPath();
    c.ellipse(cx, y, 22 + 10 * Math.sin(t * 1.5 + i), 7, 0, 0, 6.3);
    c.stroke();
  }
  c.fillStyle = beam;
  c.fillRect(cx - 1.5, 0, 3, h);
  glow(c, cx, h * 0.22, 60, 0.8);
};

/** AI search: a web of knowledge with answers travelling to one node. */
const neural: Draw = (c, w, h, t) => {
  const n = 46, pts: number[][] = [];
  for (let i = 0; i < n; i++)
    pts.push([w * (0.3 + rand(i) * 0.7) + Math.sin(t * 0.3 + i) * 12, h * (0.06 + rand(i + 50) * 0.88) + Math.cos(t * 0.25 + i * 1.7) * 12]);
  const hub = [w * 0.66, h * 0.5];
  const lim = w * 0.15;
  c.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
      if (d > lim) continue;
      c.strokeStyle = T(0.4 * (1 - d / lim));
      L(c, pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
    }
    const s = (t * (0.18 + rand(i + 9) * 0.2) + rand(i + 3)) % 1;
    if (i % 3 === 0) {
      c.strokeStyle = T(0.12);
      L(c, pts[i][0], pts[i][1], hub[0], hub[1]);
      glow(c, pts[i][0] + (hub[0] - pts[i][0]) * s, pts[i][1] + (hub[1] - pts[i][1]) * s, 7, 0.9);
    }
    c.fillStyle = T(0.9);
    c.beginPath();
    c.arc(pts[i][0], pts[i][1], 2 + rand(i + 20) * 2, 0, 6.3);
    c.fill();
  }
  glow(c, hub[0], hub[1], 46 + 8 * Math.sin(t * 2), 1);
};

/** Local SEO: a radar sweep over the map, lighting up each location. */
const radar: Draw = (c, w, h, t, p) => {
  const cx = w * 0.63, cy = h * (0.62 - p * 0.05), R = Math.min(w * 0.42, h * 0.9), k = 0.36, sweep = t * 0.9;
  c.lineWidth = 1;
  for (let i = 1; i <= 6; i++) {
    c.strokeStyle = T(0.14 + i * 0.05);
    c.beginPath();
    c.ellipse(cx, cy, (R * i) / 6, ((R * i) / 6) * k, 0, 0, 6.3);
    c.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.283;
    c.strokeStyle = T(0.1);
    L(c, cx, cy, cx + Math.cos(a) * R, cy + Math.sin(a) * R * k);
  }
  for (let i = 0; i < 34; i++) {
    const a = sweep - i * 0.022;
    c.strokeStyle = T(0.7 * (1 - i / 34));
    c.lineWidth = 2;
    L(c, cx, cy, cx + Math.cos(a) * R, cy + Math.sin(a) * R * k);
  }
  for (let i = 0; i < 9; i++) {
    const a = rand(i) * 6.283, r = R * (0.25 + rand(i + 4) * 0.7);
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * k;
    const d = (((sweep - a) % 6.283) + 6.283) % 6.283;
    const hit = Math.max(0, 1 - d / 2.4);
    const ph = 26 + hit * 44;
    c.lineWidth = 1.5;
    c.strokeStyle = T(0.35 + hit * 0.6);
    L(c, x, y, x, y - ph);
    glow(c, x, y - ph, 6 + hit * 16, 0.4 + hit * 0.6);
    c.strokeStyle = T(hit * 0.8);
    c.beginPath();
    c.ellipse(x, y, (1 - hit) * 46 + 6, ((1 - hit) * 46 + 6) * k, 0, 0, 6.3);
    c.stroke();
  }
};

/** Paid search: scattered demand funnelled into one clean beam. */
const funnel: Draw = (c, w, h, t) => {
  const cy = h * 0.5, gate = w * 0.66, gap = 0.035;
  c.lineCap = "round";
  for (let i = 0; i < 170; i++) {
    const s = (t * (0.1 + rand(i) * 0.14) + rand(i + 7)) % 1;
    const y0 = (rand(i + 3) - 0.5) * h * 0.95;
    const sq = (x: number) => 1 - (1 - gap) * smooth(x / 0.92);
    const x = w * 0.05 + (gate - w * 0.05) * s, x2 = x + 14 + s * 34;
    const s2 = Math.min(1, (x2 - w * 0.05) / (gate - w * 0.05));
    c.strokeStyle = rand(i + 11) > 0.85 ? I(0.2 + s * 0.8) : T(0.15 + s * 0.6);
    c.lineWidth = 1 + s * 1.4;
    L(c, x, cy + y0 * sq(s), Math.min(x2, gate), cy + y0 * sq(s2));
  }
  c.strokeStyle = T(0.8);
  c.lineWidth = 2;
  L(c, gate, cy - h * 0.34, gate, cy - h * gap);
  L(c, gate, cy + h * gap, gate, cy + h * 0.34);
  const beam = c.createLinearGradient(gate, 0, w, 0);
  beam.addColorStop(0, I(1));
  beam.addColorStop(1, T(0.35));
  c.fillStyle = beam;
  c.fillRect(gate, cy - 2.5, w - gate, 5);
  c.fillStyle = T(0.14);
  c.fillRect(gate, cy - 14, w - gate, 28);
  glow(c, gate, cy, 50 + 10 * Math.sin(t * 3), 1);
  glow(c, gate + ((t * 0.5) % 1) * (w - gate), cy, 16, 1);
};

/** Social: audiences in orbit around the brand. */
const orbit: Draw = (c, w, h, t, p) => {
  const cx = w * 0.64, cy = h * (0.5 - p * 0.04);
  for (let i = 0; i < 7; i++) {
    const rx = Math.min(w, h * 1.5) * (0.09 + i * 0.055), ry = rx * (0.3 + rand(i) * 0.25), tilt = -0.5 + rand(i + 3) * 1.0 + Math.sin(t * 0.1 + i) * 0.05;
    c.strokeStyle = T(0.18 + (i % 2) * 0.16);
    c.lineWidth = 1;
    c.beginPath();
    c.ellipse(cx, cy, rx, ry, tilt, 0, 6.3);
    c.stroke();
    const sats = 1 + (i % 3);
    for (let s = 0; s < sats; s++) {
      const a = t * (0.5 - i * 0.05) * (i % 2 ? 1 : -1) + s * 2.1 + i;
      const x = Math.cos(a) * rx, y = Math.sin(a) * ry;
      const X = cx + x * Math.cos(tilt) - y * Math.sin(tilt), Y = cy + x * Math.sin(tilt) + y * Math.cos(tilt);
      glow(c, X, Y, 6 + (Math.sin(a) + 1) * 6, 0.5 + (Math.sin(a) + 1) * 0.25);
    }
  }
  glow(c, cx, cy, 70 + 8 * Math.sin(t * 1.6), 1);
  c.fillStyle = I(1);
  c.fillRect(cx - 14, cy - 10, 28, 4);
  c.fillRect(cx - 14, cy - 2, 26, 4);
  c.fillRect(cx - 14, cy + 6, 28, 4);
};

/** Website design: layers of a page floating apart in depth, being scanned. */
const blueprint: Draw = (c, w, h, t, p) => {
  const pw = Math.min(w * 0.4, 560), ph = pw * 0.68;
  for (let i = 4; i >= 0; i--) {
    const spread = 34 + Math.sin(t * 0.5) * 10 + p * 30;
    c.save();
    c.transform(1, -0.2, 0.32, 1, w * 0.47 + i * spread, h * 0.34 + i * spread * -0.42 + ph * 0.25);
    c.lineWidth = 1;
    c.fillStyle = "rgba(8,10,12,0.78)";
    c.strokeStyle = T(i === 0 ? 1 : 0.75 - i * 0.08);
    c.fillRect(0, 0, pw, ph);
    c.strokeRect(0, 0, pw, ph);
    if (i === 4) for (let g = 1; g < 12; g++) L(c, (pw * g) / 12, 0, (pw * g) / 12, ph);
    if (i === 3) {
      c.strokeRect(pw * 0.06, ph * 0.2, pw * 0.5, ph * 0.5);
      c.strokeRect(pw * 0.62, ph * 0.2, pw * 0.32, ph * 0.22);
      c.strokeRect(pw * 0.62, ph * 0.48, pw * 0.32, ph * 0.22);
    }
    if (i === 2) for (let r = 0; r < 5; r++) L(c, pw * 0.08, ph * (0.3 + r * 0.09), pw * (0.3 + rand(r) * 0.2), ph * (0.3 + r * 0.09));
    if (i === 1) {
      c.fillStyle = T(0.85);
      c.fillRect(pw * 0.08, ph * 0.78, pw * 0.2, ph * 0.09);
    }
    if (i === 0) {
      L(c, 0, ph * 0.1, pw, ph * 0.1);
      const sy = ((t * 0.3) % 1) * ph;
      const g = c.createLinearGradient(0, sy - 40, 0, sy);
      g.addColorStop(0, T(0));
      g.addColorStop(1, T(0.35));
      c.fillStyle = g;
      c.fillRect(0, Math.max(0, sy - 40), pw, Math.min(40, sy));
      c.strokeStyle = I(1);
      L(c, 0, sy, pw, sy);
    }
    c.restore();
  }
};

/** Landing pages: one beam in, one focused spectrum out. */
const prism: Draw = (c, w, h, t) => {
  const cx = w * 0.56, cy = h * 0.5, s = Math.min(h * 0.3, w * 0.16);
  const tri = [[cx, cy - s], [cx + s * 0.95, cy + s * 0.7], [cx - s * 0.95, cy + s * 0.7]];
  const inP = [cx - s * 0.48, cy - s * 0.15], outP = [cx + s * 0.48, cy - s * 0.15];
  c.globalCompositeOperation = "lighter";
  c.strokeStyle = I(0.95);
  c.lineWidth = 3;
  L(c, 0, cy + h * 0.16, inP[0], inP[1]);
  c.strokeStyle = T(0.5);
  c.lineWidth = 1.5;
  L(c, inP[0], inP[1], outP[0], outP[1]);
  for (let i = 0; i < 11; i++) {
    const a = -0.3 + (i / 10) * 0.75, len = w;
    const g = c.createLinearGradient(outP[0], outP[1], outP[0] + Math.cos(a) * len * 0.5, outP[1] + Math.sin(a) * len * 0.5);
    const al = 0.35 + 0.35 * Math.sin(t * 1.3 + i * 0.9) ** 2;
    g.addColorStop(0, `hsla(${166 + i * 4},95%,62%,${al})`);
    g.addColorStop(1, `hsla(${166 + i * 4},95%,55%,0.04)`);
    c.strokeStyle = g;
    c.lineWidth = 2 + (i % 3) * 2;
    L(c, outP[0], outP[1], outP[0] + Math.cos(a) * len, outP[1] + Math.sin(a) * len);
    const q = (t * 0.35 + rand(i)) % 1;
    glow(c, outP[0] + Math.cos(a) * len * 0.6 * q, outP[1] + Math.sin(a) * len * 0.6 * q, 8, 0.8);
  }
  c.globalCompositeOperation = "source-over";
  const fill = c.createLinearGradient(tri[2][0], 0, tri[1][0], 0);
  fill.addColorStop(0, "rgba(255,255,255,0.1)");
  fill.addColorStop(1, T(0.18));
  poly(c, tri);
  c.fillStyle = fill;
  c.fill();
  c.strokeStyle = I(0.9);
  c.lineWidth = 1.5;
  c.stroke();
  glow(c, inP[0], inP[1], 22, 0.9);
};

/** Content and email: ribbons of story flowing past, layer over layer. */
const ribbons: Draw = (c, w, h, t, p) => {
  for (let i = 0; i < 6; i++) {
    const base = h * (0.2 + i * 0.13) - p * 30 * (i % 2 ? 1 : -1), th = h * (0.05 + rand(i) * 0.07);
    const y = (x: number) => base + Math.sin(x * 0.004 + t * (0.35 + i * 0.05) + i * 1.3) * h * 0.09 + Math.sin(x * 0.011 - t * 0.2 + i) * h * 0.025;
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, T(0));
    g.addColorStop(0.45 + 0.3 * Math.sin(t * 0.3 + i), T(0.3));
    g.addColorStop(1, T(0.02));
    c.beginPath();
    c.moveTo(0, y(0));
    for (let x = 16; x <= w; x += 16) c.lineTo(x, y(x));
    for (let x = w; x >= 0; x -= 16) c.lineTo(x, y(x) + th * (0.6 + 0.4 * Math.sin(x * 0.006 + i)));
    c.closePath();
    c.fillStyle = g;
    c.fill();
    c.beginPath();
    c.moveTo(0, y(0));
    for (let x = 16; x <= w; x += 16) c.lineTo(x, y(x));
    c.strokeStyle = T(0.75);
    c.lineWidth = 1.2;
    c.stroke();
    const gx = ((t * (60 + i * 14) + i * 300) % (w + 100)) - 50;
    glow(c, gx, y(gx), 12, 0.9);
  }
};

/** Reputation: every voice sends a ripple, and the ripples overlap. */
const resonance: Draw = (c, w, h, t) => {
  const cols = 64, rows = 30, src = [[0.42, 0.3], [0.78, 0.55], [0.58, 0.85]];
  for (let r = 0; r < rows; r++) {
    for (let k = 0; k < cols; k++) {
      const x = w * (0.22 + (k / (cols - 1)) * 0.8), y = h * (0.04 + (r / (rows - 1)) * 0.92);
      let v = 0;
      for (const s of src) v += Math.cos(Math.hypot(x - s[0] * w, (y - s[1] * h) * 1.6) * 0.045 - t * 2.2);
      const a = Math.pow((v / 3 + 1) / 2, 3);
      c.fillStyle = a > 0.62 ? I(a) : T(0.1 + a * 0.9);
      c.beginPath();
      c.arc(x, y, 0.8 + a * 3.2, 0, 6.3);
      c.fill();
    }
  }
  for (const s of src) glow(c, s[0] * w, s[1] * h, 30, 0.8);
};

/** Automation: signals routing themselves through a circuit. */
const circuit: Draw = (c, w, h, t) => {
  const g = 34;
  for (let i = 0; i < 30; i++) {
    let x = Math.round((w * (0.18 + rand(i) * 0.5)) / g) * g, y = Math.round((h * rand(i + 5)) / g) * g;
    const pts = [[x, y]];
    let len = 0;
    for (let s = 0; s < 6; s++) {
      const d = (2 + Math.floor(rand(i * 7 + s) * 6)) * g;
      if (s % 2 === 0) x += d;
      else y += (rand(i * 3 + s) > 0.5 ? 1 : -1) * d * 0.5;
      pts.push([x, y]);
      len += s % 2 === 0 ? d : d * 0.5;
    }
    c.strokeStyle = T(0.26);
    c.lineWidth = 1.2;
    c.beginPath();
    pts.forEach((q, k) => (k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
    c.stroke();
    c.fillStyle = T(0.7);
    c.fillRect(pts[0][0] - 3, pts[0][1] - 3, 6, 6);
    c.strokeStyle = T(0.7);
    c.strokeRect(x - 5, y - 5, 10, 10);
    let d = ((t * (0.16 + rand(i + 2) * 0.2) + rand(i + 9)) % 1) * len;
    for (let k = 1; k < pts.length; k++) {
      const seg = Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]);
      if (d <= seg) {
        const q = d / seg;
        const px = pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * q, py = pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * q;
        glow(c, px, py, 12, 1);
        break;
      }
      d -= seg;
    }
  }
};

/** Photography and video: a lens iris breathing open and closed. */
const aperture: Draw = (c, w, h, t) => {
  const cx = w * 0.65, cy = h * 0.5, R = Math.min(h * 0.42, w * 0.28), open = 0.35 + 0.3 * Math.sin(t * 0.7);
  c.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    c.strokeStyle = T(0.3 + i * 0.2);
    c.beginPath();
    c.arc(cx, cy, R * (1 + i * 0.09), 0, 6.3);
    c.stroke();
  }
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * 6.283 + t * 0.12, r0 = R * 1.2, r1 = R * (i % 6 === 0 ? 1.29 : 1.24);
    c.strokeStyle = T(i % 6 === 0 ? 0.9 : 0.35);
    L(c, cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
  }
  const blades = 9;
  for (let i = 0; i < blades; i++) {
    const a = (i / blades) * 6.283 - t * 0.1, a2 = a + 6.283 / blades;
    const tip = a + 1.25, r = R * open;
    poly(c, [[cx + Math.cos(a) * R, cy + Math.sin(a) * R], [cx + Math.cos(a2) * R, cy + Math.sin(a2) * R], [cx + Math.cos(tip) * r, cy + Math.sin(tip) * r]]);
    c.fillStyle = `rgba(14,20,24,0.92)`;
    c.fill();
    c.strokeStyle = T(0.75);
    c.stroke();
  }
  glow(c, cx, cy, R * open * 1.3, 0.85);
  c.strokeStyle = I(0.9);
  c.lineWidth = 2;
  const b = R * 1.42, k = 22;
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => {
    L(c, cx + sx * b, cy + sy * b * 0.72, cx + sx * (b - k), cy + sy * b * 0.72);
    L(c, cx + sx * b, cy + sy * b * 0.72, cx + sx * b, cy + sy * (b * 0.72 - k));
  });
};

/** Healthcare and dental: steady vital-sign traces receding into depth. */
const vitals: Draw = (c, w, h, t, p) => {
  const ecg = (u: number) => {
    const x = ((u % 1) + 1) % 1;
    if (x > 0.3 && x < 0.34) return -0.18 * Math.sin(((x - 0.3) / 0.04) * Math.PI);
    if (x > 0.38 && x < 0.41) return ((x - 0.38) / 0.03) * 1;
    if (x > 0.41 && x < 0.45) return 1 - ((x - 0.41) / 0.04) * 1.45;
    if (x > 0.45 && x < 0.48) return -0.45 + ((x - 0.45) / 0.03) * 0.45;
    if (x > 0.58 && x < 0.7) return 0.22 * Math.sin(((x - 0.58) / 0.12) * Math.PI);
    return 0;
  };
  for (let i = 7; i >= 0; i--) {
    const d = i / 7, y0 = h * (0.74 - d * 0.5) - p * d * 40, amp = h * 0.2 * (1 - d * 0.65), per = w * 0.3 * (1 - d * 0.5), x0 = w * 0.12 * d;
    c.beginPath();
    for (let x = x0; x <= w; x += 4) {
      const y = y0 - ecg((x - x0) / per - t * 0.35) * amp;
      if (x === x0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.strokeStyle = i === 0 ? I(0.95) : T(0.55 * (1 - d) + 0.08);
    c.lineWidth = i === 0 ? 2.2 : 1;
    c.shadowColor = `rgba(${TEAL},0.9)`;
    c.shadowBlur = i === 0 ? 16 : 0;
    c.stroke();
  }
  c.shadowBlur = 0;
  for (let g = 0; g < 14; g++) {
    c.strokeStyle = T(0.06);
    L(c, (w * g) / 13, 0, (w * g) / 13, h);
  }
};

/** Orthodontics: scattered points easing into one perfect arc. */
const align: Draw = (c, w, h, t) => {
  const n = 30, cx = w * 0.63, top = h * 0.24, span = Math.min(w * 0.34, h * 0.75);
  const prog = smooth((Math.sin(t * 0.55) + 1) / 2 * 1.3);
  const arc = (u: number) => [cx + (u - 0.5) * 2 * span, top + Math.pow((u - 0.5) * 2, 2) * h * 0.5];
  c.strokeStyle = T(0.3 + prog * 0.6);
  c.lineWidth = 1.5 + prog * 1.5;
  c.beginPath();
  for (let k = 0; k <= 60; k++) {
    const q = arc(k / 60);
    if (k) c.lineTo(q[0], q[1]);
    else c.moveTo(q[0], q[1]);
  }
  c.stroke();
  for (let i = 0; i < n; i++) {
    const q = arc(i / (n - 1));
    const x = q[0] + (rand(i) - 0.5) * w * 0.22 * (1 - prog), y = q[1] + (rand(i + 9) - 0.5) * h * 0.5 * (1 - prog);
    c.strokeStyle = T(0.25 * (1 - prog));
    c.lineWidth = 1;
    L(c, x, y, q[0], q[1]);
    c.strokeStyle = T(0.6 + prog * 0.4);
    c.fillStyle = prog > 0.92 ? I(0.95) : "rgba(8,10,12,0.9)";
    c.beginPath();
    c.rect(x - 10, y - 13, 20, 26);
    c.fill();
    c.stroke();
    if (prog > 0.92) glow(c, x, y, 26, 0.55);
  }
};

/** Veterinary and pet resorts: a living flock moving as one. */
const flock: Draw = (c, w, h, t) => {
  const cx = w * 0.6, cy = h * 0.5;
  c.strokeStyle = T(0.14);
  c.lineWidth = 1;
  for (let r = 0; r < 3; r++) {
    c.beginPath();
    for (let k = 0; k <= 160; k++) {
      const u = t * 0.42 - k * 0.04 - r * 0.25;
      const x = cx + Math.cos(u) * w * 0.3 + Math.cos(u * 2.3) * w * 0.05, y = cy + Math.sin(u * 2) * h * 0.26 + Math.sin(u * 0.7) * h * 0.08 + r * 14;
      if (k) c.lineTo(x, y);
      else c.moveTo(x, y);
    }
    c.stroke();
  }
  glow(c, cx + Math.cos(t * 0.42) * w * 0.3 + Math.cos(t * 0.42 * 2.3) * w * 0.05, cy + Math.sin(t * 0.84) * h * 0.26 + Math.sin(t * 0.294) * h * 0.08, 46, 0.6);
  for (let i = 0; i < 520; i++) {
    const u = t * 0.42 - i * 0.0085;
    const bx = cx + Math.cos(u) * w * 0.3 + Math.cos(u * 2.3) * w * 0.05, by = cy + Math.sin(u * 2) * h * 0.26 + Math.sin(u * 0.7) * h * 0.08;
    const sp = 22 + (i / 520) * 110;
    const x = bx + Math.sin(i * 12.9 + t * 0.9) * sp * rand(i), y = by + Math.cos(i * 78.2 + t * 1.1) * sp * rand(i + 4);
    const a = 1 - i / 560;
    c.fillStyle = i % 9 === 0 ? I(a) : T(a * 0.85);
    c.beginPath();
    c.ellipse(x, y, 2 + rand(i + 2) * 4.5, 1 + rand(i + 2) * 1.4, u, 0, 6.3);
    c.fill();
  }
};

/** Home services: a street of wire-frame homes with one lit at a time. */
const rooftops: Draw = (c, w, h, t, p) => {
  const vx = w * 0.18, vy = h * (0.42 - p * 0.05), n = 7, lit = Math.floor(t * 0.8) % n;
  c.strokeStyle = T(0.2);
  L(c, 0, h * 0.8, w, h * 0.8 + 30);
  for (let k = n - 1; k >= 0; k--) {
    const s = 1 / (1 + k * 0.42), bw = w * 0.2 * s, bh = h * 0.3 * s;
    const x = vx + (w * 0.84 - vx) * s, base = vy + (h * 0.82 - vy) * s;
    const f = [[x, base], [x + bw, base], [x + bw, base - bh], [x + bw / 2, base - bh * 1.55], [x, base - bh]];
    const bk = f.map((q) => [q[0] + (vx - q[0]) * 0.16, q[1] + (vy - q[1]) * 0.16]);
    const on = k === lit;
    c.lineWidth = on ? 1.8 : 1;
    c.strokeStyle = on ? I(0.95) : T(0.3 + s * 0.4);
    poly(c, bk);
    c.stroke();
    f.forEach((q, i) => L(c, q[0], q[1], bk[i][0], bk[i][1]));
    poly(c, f);
    c.fillStyle = "rgba(8,10,12,0.88)";
    c.fill();
    c.stroke();
    c.fillStyle = on ? I(0.9) : T(0.16);
    c.fillRect(x + bw * 0.16, base - bh * 0.62, bw * 0.22, bh * 0.26);
    c.fillRect(x + bw * 0.62, base - bh * 0.62, bw * 0.22, bh * 0.26);
    c.strokeRect(x + bw * 0.42, base - bh * 0.42, bw * 0.16, bh * 0.42);
    if (on) glow(c, x + bw / 2, base - bh * 0.5, bw * 0.9, 0.55);
  }
};

/** Automotive: the open road at night, light rushing past. */
const speed: Draw = (c, w, h, t, p) => {
  const vx = w * 0.62, vy = h * (0.44 - p * 0.05);
  const hg = c.createRadialGradient(vx, vy, 0, vx, vy, w * 0.5);
  hg.addColorStop(0, T(0.4));
  hg.addColorStop(1, T(0));
  c.fillStyle = hg;
  c.save();
  c.translate(vx, vy);
  c.scale(1, 0.2);
  c.beginPath();
  c.arc(0, 0, w * 0.5, 0, 6.3);
  c.fill();
  c.restore();
  c.lineCap = "round";
  const lanes = [-1.5, -0.5, 0.5, 1.5];
  c.strokeStyle = T(0.6);
  c.lineWidth = 1.5;
  L(c, vx, vy, vx - w * 1.2, h * 1.05);
  L(c, vx, vy, vx + w * 1.2, h * 1.05);
  for (const ln of lanes) {
    for (let k = 0; k < 9; k++) {
      const s0 = Math.pow((k / 9 + t * 0.55) % 1, 2.6), s1 = Math.min(1, s0 * 1.4 + 0.004);
      c.strokeStyle = I(0.25 + s0 * 0.75);
      c.lineWidth = 1 + s0 * 7;
      L(c, vx + ln * w * 0.42 * s0, vy + (h * 1.05 - vy) * s0, vx + ln * w * 0.42 * s1, vy + (h * 1.05 - vy) * s1);
    }
  }
  for (let i = 0; i < 40; i++) {
    const side = i % 2 ? 1 : -1, s0 = Math.pow((rand(i) + t * (0.35 + rand(i + 3) * 0.3)) % 1, 2.2), s1 = Math.min(1.2, s0 * 1.5);
    const lift = 0.2 + rand(i + 8) * 0.9;
    c.strokeStyle = `hsla(${172 + rand(i) * 26},95%,60%,${0.2 + s0 * 0.7})`;
    c.lineWidth = 1 + s0 * 4;
    L(c, vx + side * w * 0.75 * s0, vy - h * 0.5 * lift * s0, vx + side * w * 0.75 * s1, vy - h * 0.5 * lift * s1);
  }
};

/** Manufacturing: a precision lattice turning in space. */
const lattice: Draw = (c, w, h, t, p) => {
  const n = 5, cx = w * 0.65, cy = h * 0.5, sz = Math.min(h * 0.2, w * 0.12), ay = t * 0.28, ax = 0.5 + Math.sin(t * 0.2) * 0.2 + p * 0.3;
  const P: number[][] = [];
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++)
      for (let z = 0; z < n; z++) {
        const X = (x - 2) * sz * 0.5, Y = (y - 2) * sz * 0.5, Z = (z - 2) * sz * 0.5;
        const x1 = X * Math.cos(ay) + Z * Math.sin(ay), z1 = -X * Math.sin(ay) + Z * Math.cos(ay);
        const y2 = Y * Math.cos(ax) - z1 * Math.sin(ax), z2 = Y * Math.sin(ax) + z1 * Math.cos(ax);
        const f = 700 / (700 + z2);
        P.push([cx + x1 * f * 1.9, cy + y2 * f * 1.9, z2]);
      }
  const id = (x: number, y: number, z: number) => x * n * n + y * n + z;
  c.lineWidth = 1;
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++)
      for (let z = 0; z < n; z++) {
        const a = P[id(x, y, z)], al = 0.12 + 0.4 * (1 - (a[2] + sz * 2) / (sz * 4));
        c.strokeStyle = T(al);
        if (x < n - 1) L(c, a[0], a[1], P[id(x + 1, y, z)][0], P[id(x + 1, y, z)][1]);
        if (y < n - 1) L(c, a[0], a[1], P[id(x, y + 1, z)][0], P[id(x, y + 1, z)][1]);
        if (z < n - 1) L(c, a[0], a[1], P[id(x, y, z + 1)][0], P[id(x, y, z + 1)][1]);
      }
  P.forEach((q, i) => {
    const hot = (i + Math.floor(t * 6)) % 23 === 0;
    if (hot) glow(c, q[0], q[1], 14, 0.9);
    c.fillStyle = hot ? I(1) : T(0.8);
    c.beginPath();
    c.arc(q[0], q[1], hot ? 3 : 1.6, 0, 6.3);
    c.fill();
  });
};

/** Hospitality: towers at night, rooms lighting up one by one. */
const towers: Draw = (c, w, h, t, p) => {
  const tw: [number, number, number, number, number][] = [[0.42, 0.2, 9, 26, -0.1], [0.6, 0.06, 11, 32, 0.08], [0.8, 0.3, 8, 22, -0.06]];
  tw.forEach(([fx, fy, cols, floors, skew], ti) => {
    const cw = Math.max(9, w * 0.014), ch = (h * (1 - fy)) / floors;
    c.save();
    c.transform(1, skew, 0, 1, w * fx, h * fy - p * 20 * (ti + 1));
    c.fillStyle = "rgba(8,10,12,0.85)";
    c.fillRect(0, 0, cols * cw, floors * ch + 80);
    c.strokeStyle = T(0.45);
    c.lineWidth = 1;
    c.strokeRect(0, 0, cols * cw, floors * ch + 80);
    for (let f = 0; f < floors; f++)
      for (let k = 0; k < cols; k++) {
        const ph = rand(ti * 999 + f * 31 + k * 7);
        const on = Math.sin(t * (0.25 + ph * 0.5) + ph * 40) > 0.55;
        c.fillStyle = on ? (ph > 0.8 ? I(0.9) : T(0.75)) : T(0.07);
        c.fillRect(k * cw + 2, f * ch + 2, cw - 4, ch - 4);
      }
    const g = c.createLinearGradient(0, 0, 0, floors * ch);
    g.addColorStop(0, T(0));
    g.addColorStop(1, "rgba(8,10,12,0.75)");
    c.fillStyle = g;
    c.fillRect(0, 0, cols * cw, floors * ch + 80);
    glow(c, (cols * cw) / 2, -6, 20 + 6 * Math.sin(t * 2 + ti), 0.9);
    c.restore();
  });
};

/** Rochester SEO: a beacon over the shoreline, calling people in. */
const beacon: Draw = (c, w, h, t, p) => {
  const cx = w * 0.64, cy = h * (0.8 - p * 0.04), k = 0.3;
  for (let i = 1; i <= 7; i++) {
    c.beginPath();
    for (let a = 0; a <= 6.3; a += 0.08) {
      const r = w * 0.055 * i * (1 + 0.16 * Math.sin(a * 3 + i * 0.8) + 0.08 * Math.sin(a * 7 - i));
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * k;
      if (a === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
    c.strokeStyle = T(0.5 - i * 0.05);
    c.lineWidth = 1;
    c.stroke();
  }
  const top = h * 0.16;
  c.strokeStyle = T(0.8);
  c.lineWidth = 1.5;
  poly(c, [[cx - 16, cy], [cx + 16, cy], [cx + 7, top + 16], [cx - 7, top + 16]]);
  c.fillStyle = "rgba(8,10,12,0.9)";
  c.fill();
  c.stroke();
  c.globalCompositeOperation = "lighter";
  const sw = Math.cos(t * 0.7);
  [1, -1].forEach((dir) => {
    const len = w * 0.6 * sw * dir;
    const g = c.createLinearGradient(cx, top, cx + len, top);
    g.addColorStop(0, I(0.7));
    g.addColorStop(1, T(0));
    c.fillStyle = g;
    poly(c, [[cx, top], [cx + len, top - h * 0.1], [cx + len, top + h * 0.12]]);
    c.fill();
  });
  for (let i = 0; i < 5; i++) {
    const s = (t * 0.22 + i / 5) % 1;
    c.strokeStyle = T(0.8 * (1 - s));
    c.beginPath();
    c.ellipse(cx, top, 10 + s * w * 0.2, (10 + s * w * 0.2) * 0.22, 0, 0, 6.3);
    c.stroke();
  }
  c.globalCompositeOperation = "source-over";
  glow(c, cx, top, 40, 1);
};

/** Rochester social: signal spreading block by block along the street. */
const signal: Draw = (c, w, h, t, p) => {
  const base = h * (0.84 - p * 0.04);
  c.strokeStyle = T(0.5);
  c.lineWidth = 1;
  L(c, 0, base, w, base);
  for (let i = 0; i < 40; i++) {
    const x = (w * i) / 39, bh = 10 + rand(i) * h * 0.16;
    c.strokeStyle = T(0.22);
    c.strokeRect(x, base - bh, w / 44, bh);
  }
  for (let i = 0; i < 6; i++) {
    const x = w * (0.26 + i * 0.14), mast = h * (0.1 + rand(i + 3) * 0.12);
    c.strokeStyle = T(0.8);
    c.lineWidth = 1.5;
    L(c, x, base, x, base - mast);
    for (let k = 0; k < 5; k++) {
      const s = (t * 0.28 + k / 5 + rand(i)) % 1;
      c.strokeStyle = k === 0 ? I(0.9 * (1 - s)) : T(0.75 * (1 - s));
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(x, base - mast, 8 + s * h * 0.5, Math.PI * 1.12, Math.PI * 1.88);
      c.stroke();
    }
    glow(c, x, base - mast, 12, 1);
  }
};

/** Rochester websites: a structure being built, block by block. */
const scaffold: Draw = (c, w, h, t, p) => {
  const cols = 18, bw = (w * 0.72) / cols, x0 = w * 0.3, base = h * (0.94 - p * 0.03), bh = bw * 0.62;
  for (let i = 0; i < cols; i++) {
    const target = 3 + Math.floor(rand(i) * 11 * (0.4 + 0.6 * Math.sin((i / cols) * Math.PI)));
    const cyc = (t * 0.12 + rand(i + 5) * 0.6) % 1.25;
    const built = Math.min(target, Math.floor(smooth(cyc) * (target + 1)));
    for (let k = 0; k < target; k++) {
      const x = x0 + i * bw, y = base - (k + 1) * bh;
      if (k < built) {
        const top = k === built - 1 && built < target;
        c.fillStyle = top ? I(0.85) : T(0.06 + (k / target) * 0.14);
        c.fillRect(x + 2, y + 2, bw - 4, bh - 4);
        c.strokeStyle = T(0.6);
        c.lineWidth = 1;
        c.strokeRect(x + 2, y + 2, bw - 4, bh - 4);
        if (top) glow(c, x + bw / 2, y + bh / 2, bw, 0.6);
      } else {
        c.strokeStyle = T(0.1);
        c.setLineDash([3, 4]);
        c.strokeRect(x + 2, y + 2, bw - 4, bh - 4);
        c.setLineDash([]);
      }
    }
  }
  c.strokeStyle = T(0.7);
  L(c, x0 - 20, base, w, base);
};

/** Philosophy: first light on a new horizon. */
const horizon: Draw = (c, w, h, t, p) => {
  const cx = w * 0.64, cy = h * (0.6 - p * 0.05), step = Math.min(w, h * 1.6) * 0.042;
  c.save();
  c.beginPath();
  c.rect(0, 0, w, cy);
  c.clip();
  for (let i = 0; i < 16; i++) {
    const r = i * step + ((t * 9) % step);
    c.strokeStyle = T(Math.max(0, 0.75 - i * 0.045));
    c.lineWidth = i < 2 ? 2 : 1;
    c.beginPath();
    c.arc(cx, cy, r, 0, 6.3);
    c.stroke();
  }
  glow(c, cx, cy, step * 4.5, 1);
  c.restore();
  for (let i = 0; i < 14; i++) {
    const y = cy + 4 + Math.pow(i / 14, 1.5) * (h - cy), half = w * (0.5 - i * 0.027) * (0.85 + 0.15 * Math.sin(t * 1.2 + i));
    const g = c.createLinearGradient(cx - half, 0, cx + half, 0);
    g.addColorStop(0, T(0));
    g.addColorStop(0.5, i === 0 ? I(1) : T(0.75 - i * 0.045));
    g.addColorStop(1, T(0));
    c.fillStyle = g;
    c.fillRect(cx - half, y, half * 2, i === 0 ? 2.5 : 1.5 + i * 0.25);
  }
};

/** FAQ: questions and answers, paired and turning. */
const helix: Draw = (c, w, h, t) => {
  const cy = h * 0.5, A = h * 0.24, n = 70;
  for (let i = 0; i < n; i++) {
    const x = w * 0.2 + (i / (n - 1)) * w * 0.85, ph = i * 0.3 + t * 0.9, z = Math.cos(ph);
    const y1 = cy + Math.sin(ph) * A, y2 = cy - Math.sin(ph) * A;
    if (i % 2 === 0) {
      c.strokeStyle = T(0.16 + 0.18 * Math.abs(z));
      c.lineWidth = 1;
      L(c, x, y1, x, y2);
    }
    c.fillStyle = z > 0 ? I(0.5 + z * 0.5) : T(0.35);
    c.beginPath();
    c.arc(x, y1, 2 + (z + 1) * 2.4, 0, 6.3);
    c.fill();
    c.fillStyle = z < 0 ? I(0.5 - z * 0.5) : T(0.35);
    c.beginPath();
    c.arc(x, y2, 2 + (1 - z) * 2.4, 0, 6.3);
    c.fill();
  }
};

/** Insights: streams of data falling like rain on glass. */
const rain: Draw = (c, w, h, t) => {
  const gap = 24;
  for (let i = 0; i * gap < w * 0.8; i++) {
    const x = w * 0.22 + i * gap, sp = 0.12 + rand(i) * 0.3, head = ((t * sp + rand(i + 4)) % 1.35) * h;
    for (let k = 0; k < 18; k++) {
      const y = head - k * 15;
      if (y < 0 || y > h) continue;
      c.fillStyle = k === 0 ? I(1) : T((1 - k / 18) * 0.75);
      c.fillRect(x, y, rand(i * 31 + k + Math.floor(t * 3)) > 0.5 ? 3 : 9, 9);
    }
    if (head < h) glow(c, x + 3, head + 4, 12, 0.7);
  }
};

/** Homepage: a field of light rising from the ground and rushing toward the viewer. */
const surge: Draw = (c, w, h, t, p) => {
  const hy = h * (0.44 - p * 0.08), vx = w * 0.66, rows = 16, sp = t * 0.16, fr = sp % 1, base = Math.floor(sp);
  const hg = c.createRadialGradient(vx, hy, 0, vx, hy, w * 0.55);
  hg.addColorStop(0, T(0.3));
  hg.addColorStop(0.4, T(0.08));
  hg.addColorStop(1, T(0));
  c.fillStyle = hg;
  c.fillRect(0, 0, w, h);
  c.strokeStyle = T(0.5);
  c.lineWidth = 1;
  L(c, 0, hy, w, hy);
  for (let r = 0; r < rows; r++) {
    const d = (r + fr) / rows, s = d * d, id = r - base, k0 = 0.1 + s;
    const y = hy + s * (h - hy) * 1.08;
    c.strokeStyle = T(0.05 + s * 0.2);
    L(c, 0, y, w, y);
    for (let k = -13; k <= 13; k++) {
      const x = vx + k * w * 0.105 * k0;
      if (x < -40 || x > w + 40) continue;
      const seed = rand(id * 57 + k * 13);
      const wave = Math.pow(Math.sin(k * 0.45 + id * 0.6 + t * 0.7) * 0.5 + 0.5, 2);
      const ph = (0.08 + wave * seed) * h * 0.6 * k0, pw = Math.max(1.5, 13 * k0), a = Math.min(1, d * 4) * (1 - s * 0.35);
      const g = c.createLinearGradient(0, y, 0, y - ph);
      g.addColorStop(0, seed > 0.82 ? I(0.95 * a) : T(0.9 * a));
      g.addColorStop(1, T(0));
      c.fillStyle = g;
      c.fillRect(x - pw / 2, y - ph, pw, ph);
      if (seed > 0.82 && wave > 0.6) glow(c, x, y, pw * 2.4, 0.55 * a);
    }
  }
  for (let i = 0; i < 46; i++) {
    const u = (t * (0.05 + rand(i) * 0.08) + rand(i + 3)) % 1;
    const x = w * (0.3 + rand(i + 7) * 0.7) + Math.sin(t + i) * 12, y = h - u * h * 0.9;
    c.fillStyle = I((1 - u) * 0.8);
    c.fillRect(x, y, 2, 2 + rand(i + 1) * 10);
  }
};

export const draws2 = {
  surge, ascent, strata, neural, radar, funnel, orbit, blueprint, prism, ribbons, resonance, circuit, aperture,
  vitals, align, flock, rooftops, speed, lattice, towers, beacon, signal, scaffold, horizon, helix, rain,
} satisfies Record<string, Draw>;
