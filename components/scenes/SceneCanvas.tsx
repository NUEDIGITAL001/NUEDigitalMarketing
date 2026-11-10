"use client";

import { useEffect, useRef } from "react";

import type { SceneKind } from "@/lib/scenes";

type Draw = (c: CanvasRenderingContext2D, w: number, h: number, t: number, p: number) => void;

const TEAL = "0,199,217";
const ICE = "216,245,247";
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Light fibres rising from the foreground to a vanishing point. */
const trails: Draw = (c, w, h, t, p) => {
  const cx = w * 0.62, horizon = h * (0.12 - p * 0.06), n = 34, seg = 26;
  c.globalCompositeOperation = "lighter";
  for (let i = 0; i < n; i++) {
    const u = (i / (n - 1)) * 2 - 1;
    const hue = 176 + rand(i) * 22;
    const lift = 0.14 + rand(i + 9) * 0.22;
    const sway = Math.sin(t * 0.35 + i * 1.3) * 10;
    const pt = (s: number): [number, number] => [
      cx + u * w * (0.05 + 0.85 * Math.pow(s, 2.1)) + sway * s,
      horizon + (h * 1.05 - horizon) * Math.pow(s, 1.5) - Math.pow(1 - s, 3) * h * lift * Math.sin(Math.min(1, s * 6) * Math.PI * 0.5),
    ];
    for (let k = 0; k < seg; k++) {
      const s0 = k / seg, s1 = (k + 1) / seg;
      const [x0, y0] = pt(s0), [x1, y1] = pt(s1);
      c.strokeStyle = `hsla(${hue},95%,${52 + s0 * 14}%,${0.1 + s0 * 0.42})`;
      c.lineWidth = 0.5 + Math.pow(s0, 2) * (5 + rand(i + 3) * 9);
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(x0, y0);
      c.lineTo(x1, y1);
      c.stroke();
    }
    const s = (t * (0.07 + rand(i + 5) * 0.09) + rand(i + 1)) % 1;
    const [px, py] = pt(s);
    const r = 2 + s * 10;
    const g = c.createRadialGradient(px, py, 0, px, py, r * 2.4);
    g.addColorStop(0, `rgba(${ICE},${0.85 * (0.3 + s)})`);
    g.addColorStop(1, `rgba(${TEAL},0)`);
    c.fillStyle = g;
    c.beginPath();
    c.arc(px, py, r * 2.4, 0, 6.3);
    c.fill();
  }
  c.globalCompositeOperation = "source-over";
};

/** Flowing topographic contour lines with travelling glints. */
const contours: Draw = (c, w, h, t, p) => {
  const n = 42, step = 14;
  for (let j = 0; j < n; j++) {
    const q = j / (n - 1);
    const base = h * (-0.15 + 1.3 * Math.pow(q, 1.25)) - p * 60;
    const y = (x: number) =>
      base +
      Math.sin(x * 0.0042 + t * 0.22 + j * 0.34) * 46 +
      Math.sin(x * 0.0105 - t * 0.16 + j * 0.21) * 22 * (1 - q * 0.5) +
      Math.cos(x * 0.0021 + j * 0.5) * 60;
    c.beginPath();
    c.moveTo(-20, y(-20));
    for (let x = -20 + step; x <= w + 20; x += step) c.lineTo(x, y(x));
    const bright = j % 6 === 2;
    c.strokeStyle = `rgba(${TEAL},${bright ? 0.95 : 0.3 + 0.25 * Math.sin(j * 1.7 + t * 0.4) ** 2})`;
    c.lineWidth = bright ? 1.8 : 1;
    c.stroke();
    if (j % 3 === 0) {
      const gx = ((t * (22 + rand(j) * 30) + rand(j + 2) * w * 2) % (w + 200)) - 100;
      const gy = y(gx);
      const g = c.createRadialGradient(gx, gy, 0, gx, gy, 16);
      g.addColorStop(0, `rgba(${ICE},0.9)`);
      g.addColorStop(1, `rgba(${TEAL},0)`);
      c.fillStyle = g;
      c.fillRect(gx - 16, gy - 16, 32, 32);
    }
  }
};

/** A field of dots rolling like terrain, seen in perspective. */
const dots: Draw = (c, w, h, t, p) => {
  const cols = 120, rows = 46, sp = 0.34, f = h * 0.95, camY = 3.4, horizon = h * (0.16 - p * 0.05);
  for (let r = rows; r >= 1; r--) {
    const z = r * sp + 1.3;
    const sc = f / z;
    for (let k = 0; k < cols; k++) {
      const x = (k - cols / 2 + 0.5) * sp;
      const sx = w * 0.5 + x * sc;
      if (sx < -10 || sx > w + 10) continue;
      const y = Math.sin(x * 0.9 + t * 0.7) * 0.34 + Math.cos(z * 1.1 - t * 0.55) * 0.4 + Math.sin((x + z) * 0.5 + t * 0.3) * 0.3;
      const sy = horizon + (camY - y) * sc * 0.36;
      const lift = (y + 1.04) / 2.08;
      const a = Math.min(1, (0.22 + lift * 0.9) * (1.3 - r / rows));
      const rad = Math.max(0.7, sc * 0.011 * (0.5 + lift));
      c.fillStyle = lift > 0.7 ? `rgba(${ICE},${a})` : `rgba(${TEAL},${a})`;
      c.beginPath();
      c.arc(sx, sy, rad, 0, 6.3);
      c.fill();
    }
  }
};

/** Wireframe corridor rushing toward a horizon of light. */
const tunnel: Draw = (c, w, h, t, p) => {
  const cx = w * 0.5, cy = h * (0.5 - p * 0.06), frames = 16, rays = 44;
  c.lineWidth = 1;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + 0.07;
    const len = Math.max(w, h);
    c.strokeStyle = `rgba(${TEAL},${0.1 + 0.2 * rand(i)})`;
    c.beginPath();
    c.moveTo(cx + Math.cos(a) * 24, cy + Math.sin(a) * 10);
    c.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len * 0.62);
    c.stroke();
  }
  for (let k = 0; k < frames; k++) {
    const s = Math.pow((k / frames + t * 0.035) % 1, 2.4);
    const fw = w * 1.5 * s, fh = h * 1.5 * s;
    c.strokeStyle = `rgba(${TEAL},${Math.min(0.95, 0.22 + s * 2.2) * (1 - s * 0.5)})`;
    c.lineWidth = 1 + s * 1.6;
    c.strokeRect(cx - fw / 2, cy - fh / 2, fw, fh);
  }
  c.globalCompositeOperation = "lighter";
  const streak = c.createLinearGradient(0, 0, w, 0);
  streak.addColorStop(0, `rgba(${TEAL},0)`);
  streak.addColorStop(0.5, `rgba(${ICE},${0.75 + 0.2 * Math.sin(t * 0.9)})`);
  streak.addColorStop(1, `rgba(${TEAL},0)`);
  c.fillStyle = streak;
  c.save();
  c.translate(cx, cy);
  c.rotate(-0.045);
  c.fillRect(-w * 0.6, -2, w * 1.2, 4);
  const glow = c.createRadialGradient(0, 0, 0, 0, 0, w * 0.42);
  glow.addColorStop(0, `rgba(${TEAL},0.6)`);
  glow.addColorStop(1, `rgba(${TEAL},0)`);
  c.fillStyle = glow;
  c.scale(1, 0.16);
  c.beginPath();
  c.arc(0, 0, w * 0.42, 0, 6.3);
  c.fill();
  c.restore();
  for (let i = 0; i < 46; i++) {
    const s = Math.pow((rand(i) + t * (0.03 + rand(i + 7) * 0.05)) % 1, 2);
    const a = rand(i + 3) * Math.PI * 2;
    c.fillStyle = `rgba(${ICE},${0.2 + s * 0.6})`;
    c.beginPath();
    c.arc(cx + Math.cos(a) * w * 0.75 * s, cy + Math.sin(a) * h * 0.75 * s, 0.6 + s * 2.2, 0, 6.3);
    c.fill();
  }
  c.globalCompositeOperation = "source-over";
};

/** Stacked bars of light, the logo's E drawn in neon. */
const bars: Draw = (c, w, h, t, p) => {
  const rowsY = [0.24, 0.36, 0.44, 0.56, 0.61, 0.72, 0.84];
  c.globalCompositeOperation = "lighter";
  rowsY.forEach((ry, i) => {
    const y = h * ry - p * 26 * (i % 2 ? 1 : -1);
    const bh = h * (0.035 + rand(i) * 0.075);
    const pulse = 0.4 + 0.6 * Math.pow(0.5 + 0.5 * Math.sin(t * 0.7 - i * 0.8), 2);
    const mid = 0.5 + 0.22 * Math.sin(t * 0.25 + i * 1.3);
    const x0 = w * (0.06 + rand(i + 4) * 0.1), x1 = w * (0.94 - rand(i + 8) * 0.1);
    const gx = c.createLinearGradient(x0, 0, x1, 0);
    gx.addColorStop(0, `rgba(${TEAL},0)`);
    gx.addColorStop(mid, `rgba(${TEAL},1)`);
    gx.addColorStop(1, `rgba(${TEAL},0)`);
    c.fillStyle = gx;
    const slices = 14;
    for (let k = 0; k < slices; k++) {
      c.globalAlpha = Math.pow((k + 1) / slices, 2.6) * 0.5 * pulse;
      c.fillRect(x0, y - bh + (bh * k) / slices, x1 - x0, bh / slices + 0.6);
    }
    const edge = c.createLinearGradient(x0, 0, x1, 0);
    edge.addColorStop(0, `rgba(${TEAL},0)`);
    edge.addColorStop(mid, `rgba(${ICE},1)`);
    edge.addColorStop(1, `rgba(${TEAL},0)`);
    c.globalAlpha = 0.9 * pulse;
    c.fillStyle = edge;
    c.fillRect(x0, y, x1 - x0, 1.6);
  });
  c.globalAlpha = 1;
  c.globalCompositeOperation = "source-over";
};

/** Isometric wireframe blocks with data pulses running the streets. */
const city: Draw = (c, w, h, t, p) => {
  const tile = Math.max(28, w / 27), ox = w * 0.5, oy = h * (0.12 - p * 0.05), n = 14;
  const iso = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * tile, oy + (x + y) * tile * 0.5 - z * tile];
  const line = (a: [number, number], b: [number, number]) => {
    c.beginPath();
    c.moveTo(a[0], a[1]);
    c.lineTo(b[0], b[1]);
    c.stroke();
  };
  c.lineWidth = 1;
  c.strokeStyle = `rgba(${TEAL},0.22)`;
  for (let i = 0; i <= n; i++) {
    line(iso(i, 0, 0), iso(i, n, 0));
    line(iso(0, i, 0), iso(n, i, 0));
  }
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const r = rand(x * 31 + y * 17);
      if (r < 0.62 || x % 4 === 3 || y % 4 === 3) continue;
      const z = (0.4 + r * 2.6) * (0.85 + 0.15 * Math.sin(t * 0.6 + r * 20));
      const a = 0.4 + r * 0.55;
      c.strokeStyle = `rgba(${TEAL},${a})`;
      const b = [iso(x, y, 0), iso(x + 1, y, 0), iso(x + 1, y + 1, 0), iso(x, y + 1, 0)];
      const top = [iso(x, y, z), iso(x + 1, y, z), iso(x + 1, y + 1, z), iso(x, y + 1, z)];
      c.fillStyle = `rgba(8,10,12,0.85)`;
      c.beginPath();
      [top[0], top[1], b[1], b[2], b[3], top[3]].forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.closePath();
      c.fill();
      for (let i = 0; i < 4; i++) line(top[i], top[(i + 1) % 4]);
      line(top[1], b[1]);
      line(top[2], b[2]);
      line(top[3], b[3]);
      if (r > 0.86) {
        c.fillStyle = `rgba(${TEAL},${0.3 + 0.2 * Math.sin(t * 1.5 + r * 9)})`;
        c.beginPath();
        top.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
        c.fill();
      }
    }
  }
  c.globalCompositeOperation = "lighter";
  for (let i = 0; i < 18; i++) {
    const lane = 3 + 4 * Math.floor(rand(i) * 3) + 0.5;
    const s = ((t * (0.08 + rand(i + 4) * 0.1) + rand(i + 2)) % 1) * n;
    const along = i % 2 === 0;
    const head = along ? iso(s, lane, 0.05) : iso(lane, s, 0.05);
    const tail = along ? iso(Math.max(0, s - 1.6), lane, 0.05) : iso(lane, Math.max(0, s - 1.6), 0.05);
    const g = c.createLinearGradient(tail[0], tail[1], head[0], head[1]);
    g.addColorStop(0, `rgba(${TEAL},0)`);
    g.addColorStop(1, `rgba(${ICE},0.95)`);
    c.strokeStyle = g;
    c.lineWidth = 2;
    line(tail, head);
  }
  c.globalCompositeOperation = "source-over";
};

const draws: Record<SceneKind, Draw> = { trails, contours, dots, tunnel, bars, city };

/**
 * Decorative animated backdrop. Pauses off screen, renders one still frame
 * when the visitor reduces motion, and reacts gently to scroll position.
 */
export function SceneCanvas({ kind, className }: { kind: SceneKind; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const draw = draws[kind];
    let w = 0, h = 0, raf = 0, visible = false;
    const start = performance.now();
    const still = () =>
      document.documentElement.classList.contains("reduce-motion") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = (now: number) => {
      raf = 0;
      if (!w || !h) return;
      const r = canvas.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (r.top + r.height) / (window.innerHeight + r.height)));
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, still() ? 12 : (now - start) / 1000 + 12, p);
      if (visible && !still()) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(() => {
      size();
      kick();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    window.addEventListener("nue:motion-change", kick);
    size();
    kick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("nue:motion-change", kick);
    };
  }, [kind]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
