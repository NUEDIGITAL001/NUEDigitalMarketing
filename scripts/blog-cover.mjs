// Draws a branded 1600x900 featured image for a blog post.
//   node scripts/blog-cover.mjs <slug> [style]
// style: rings | bars | network | beams (default: picked from the slug)
// Writes public/blog/<slug>.jpg. Needs Playwright with Chromium available.
// A real photo can replace the file at any time: same name, 16:9.
import { createRequire } from "node:module";
import path from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright");

const [slug, styleArg] = process.argv.slice(2);
if (!slug) throw new Error("usage: node scripts/blog-cover.mjs <slug> [rings|bars|network|beams]");

const draw = ({ slug, styleArg }) => {
  const c = document.querySelector("canvas").getContext("2d"), W = 1600, H = 900;
  let s = 0;
  for (const ch of slug) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const T = (a) => `rgba(0,199,217,${a})`, I = (a) => `rgba(216,245,247,${a})`;
  const style = styleArg || ["rings", "bars", "network", "beams"][Math.floor(r() * 4)];
  c.fillStyle = "#080a0c";
  c.fillRect(0, 0, W, H);
  const gx = W * (0.55 + r() * 0.3), gy = H * (0.3 + r() * 0.4);
  const g = c.createRadialGradient(gx, gy, 0, gx, gy, 900);
  g.addColorStop(0, T(0.42)); g.addColorStop(0.45, T(0.1)); g.addColorStop(1, T(0));
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  // contour field
  const f1 = 0.002 + r() * 0.003, f2 = 0.006 + r() * 0.004, p1 = r() * 6, p2 = r() * 6, hi = 6 + Math.floor(r() * 10);
  for (let j = 0; j < 26; j++) {
    c.beginPath();
    for (let x = 0; x <= W; x += 8) {
      const y = 60 + j * 34 + Math.sin(x * f1 + p1 + j * 0.22) * 70 + Math.sin(x * f2 + p2 + j * 0.5) * 22;
      if (x) c.lineTo(x, y);
      else c.moveTo(x, y);
    }
    c.lineWidth = j === hi ? 3 : 1;
    c.strokeStyle = j === hi ? I(0.95) : T(0.12 + 0.2 * r());
    c.shadowColor = T(1); c.shadowBlur = j === hi ? 24 : 0;
    c.stroke();
  }
  c.shadowBlur = 0;
  const cx = W * 0.68, cy = H * 0.5;
  if (style === "rings") {
    for (let k = 1; k <= 9; k++) { c.beginPath(); c.ellipse(cx, cy, k * 62, k * 26, -0.3, 0, 7); c.lineWidth = k % 3 ? 1.5 : 3; c.strokeStyle = T(0.85 - k * 0.07); c.stroke(); }
    for (let k = 0; k < 9; k++) { const a = r() * 7, R = (1 + Math.floor(r() * 9)) * 62; dot(cx + Math.cos(a) * R * Math.cos(-0.3) , cy + Math.sin(a) * R * 0.42, 10); }
    dot(cx, cy, 26);
  } else if (style === "bars") {
    for (let k = 0; k < 14; k++) {
      const h = 90 + k * 34 + r() * 90, x = W * 0.38 + k * 62, y = H * 0.86;
      const gg = c.createLinearGradient(0, y, 0, y - h); gg.addColorStop(0, T(0.08)); gg.addColorStop(1, k > 10 ? I(0.95) : T(0.9));
      c.fillStyle = gg; c.fillRect(x, y - h, 40, h);
      c.strokeStyle = T(0.7); c.lineWidth = 1.5; c.strokeRect(x, y - h, 40, h);
      if (k > 10) dot(x + 20, y - h, 16);
    }
  } else if (style === "network") {
    const pts = Array.from({ length: 26 }, () => [W * (0.36 + r() * 0.6), H * (0.12 + r() * 0.76)]);
    pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 250) { c.strokeStyle = T(0.45); c.lineWidth = 1.5; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); } }));
    pts.forEach((q, i) => dot(q[0], q[1], i % 6 === 0 ? 22 : 9));
  } else {
    for (let k = 0; k < 16; k++) {
      const y = H * (0.1 + r() * 0.8), len = 400 + r() * 900, x = W * (0.2 + r() * 0.5);
      const gg = c.createLinearGradient(x, 0, x + len, 0); gg.addColorStop(0, T(0)); gg.addColorStop(1, k % 4 === 0 ? I(0.95) : T(0.85));
      c.strokeStyle = gg; c.lineWidth = 2 + r() * 5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + len, y - len * 0.22); c.stroke();
      if (k % 4 === 0) dot(x + len, y - len * 0.22, 14);
    }
  }
  function dot(x, y, R) {
    const gg = c.createRadialGradient(x, y, 0, x, y, R * 3); gg.addColorStop(0, I(1)); gg.addColorStop(0.3, T(0.6)); gg.addColorStop(1, T(0));
    c.fillStyle = gg; c.beginPath(); c.arc(x, y, R * 3, 0, 7); c.fill();
  }
  // left shade so the image sits well beside text, plus the three-bar mark
  const sh = c.createLinearGradient(0, 0, W * 0.5, 0); sh.addColorStop(0, "rgba(8,10,12,0.85)"); sh.addColorStop(1, "rgba(8,10,12,0)");
  c.fillStyle = sh; c.fillRect(0, 0, W, H);
  [["#00c7d9", 120], ["#ffffff", 112], ["#00c7d9", 120]].forEach(([col, w], i) => { c.fillStyle = col; c.fillRect(90, H - 190 + i * 40, w, 20); });
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent('<body style="margin:0"><canvas width="1600" height="900" style="display:block"></canvas></body>');
await page.evaluate(draw, { slug, styleArg });
const out = path.join(process.cwd(), "public", "blog", `${slug}.jpg`);
await page.screenshot({ path: out, type: "jpeg", quality: 84 });
await browser.close();
console.log("wrote", out);
