"use client";

import { useEffect, useRef } from "react";

/** Field tuning, from the original standalone sketch. */
const GAP = 26; // spacing between dots
const RADIUS = 165; // how far the cursor's influence reaches
const PUSH = 26; // how far a dot gets displaced at most
const BASE_R = 1.05; // dot radius at rest
const PEAK_R = 2.3; // dot radius right under the cursor
const BASE_A = 0.11; // resting opacity — deliberately dim
const PEAK_A = 0.72; // opacity at full influence
const STIFF = 0.14; // spring back toward home
const DAMP = 0.78; // velocity damping

type Dot = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  glow: number;
};

/**
 * Dot field that reacts to the cursor. Sizes itself to its parent box and
 * reads the pointer in page coordinates, so it keeps responding while the
 * cursor is over content stacked on top of it.
 */
export function MagneticField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const drawResting = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255,255,255,${BASE_A})`;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, BASE_R, 0, 6.2832);
        ctx.fill();
      }
    };

    const build = () => {
      const rect = cv.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const offX = (width - (cols - 1) * GAP) / 2;
      const offY = (height - (rows - 1) * GAP) / 2;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offX + c * GAP;
          const hy = offY + r * GAP;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, glow: 0 });
        }
      }
      if (reduced) drawResting();
    };

    build();
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(cv);

    if (reduced) return () => resizeObserver.disconnect();

    // Pointer is kept in viewport coordinates and mapped per frame, so
    // scrolling moves the field correctly without a pointermove event.
    const client = { x: -9999, y: -9999 };
    const ptr = { x: -9999, y: -9999 };
    let hasPointer = false;
    let active = false;

    const onMove = (e: PointerEvent) => {
      client.x = e.clientX;
      client.y = e.clientY;
      hasPointer = true;
    };
    const release = () => {
      hasPointer = false;
      active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("blur", release);

    let onScreen = false;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);

      const rect = cv.getBoundingClientRect();
      if (hasPointer) {
        const lx = client.x - rect.left;
        const ly = client.y - rect.top;
        const inRange =
          lx > -RADIUS &&
          ly > -RADIUS &&
          lx < rect.width + RADIUS &&
          ly < rect.height + RADIUS;
        if (inRange) {
          if (!active) {
            ptr.x = lx;
            ptr.y = ly;
          }
          active = true;
          // ease the pointer so fast flicks trail smoothly instead of snapping
          ptr.x += (lx - ptr.x) * 0.22;
          ptr.y += (ly - ptr.y) * 0.22;
        } else {
          active = false;
        }
      }

      ctx.clearRect(0, 0, width, height);
      const r2 = RADIUS * RADIUS;

      for (const d of dots) {
        let targetGlow = 0;

        if (active) {
          const dx = d.hx - ptr.x;
          const dy = d.hy - ptr.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2) {
            const dist = Math.sqrt(dist2) || 0.0001;
            const t = 1 - dist / RADIUS; // 0 at the edge, 1 at the centre
            const falloff = t * t; // tighter, softer core
            targetGlow = falloff;
            const force = falloff * PUSH;
            d.vx += (d.hx + (dx / dist) * force - d.x) * STIFF;
            d.vy += (d.hy + (dy / dist) * force - d.y) * STIFF;
          }
        }

        d.vx += (d.hx - d.x) * STIFF * 0.5;
        d.vy += (d.hy - d.y) * STIFF * 0.5;
        d.vx *= DAMP;
        d.vy *= DAMP;
        d.x += d.vx;
        d.y += d.vy;

        // glow eases in fast, fades out slowly
        d.glow += (targetGlow - d.glow) * (targetGlow > d.glow ? 0.25 : 0.07);

        if (
          d.glow < 0.004 &&
          Math.abs(d.x - d.hx) < 0.05 &&
          Math.abs(d.y - d.hy) < 0.05
        ) {
          ctx.fillStyle = `rgba(255,255,255,${BASE_A})`;
          ctx.beginPath();
          ctx.arc(d.hx, d.hy, BASE_R, 0, 6.2832);
          ctx.fill();
          continue;
        }

        const a = BASE_A + (PEAK_A - BASE_A) * d.glow;
        const rad = BASE_R + (PEAK_R - BASE_R) * d.glow;

        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, 6.2832);
        ctx.fill();

        // faint bloom only on the brightest dots
        if (d.glow > 0.45) {
          ctx.fillStyle = `rgba(255,255,255,${(d.glow - 0.45) * 0.12})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, rad * 3.2, 0, 6.2832);
          ctx.fill();
        }
      }
    };

    // Only animate while the section is in view and the tab is focused.
    const sync = () => {
      const shouldRun = onScreen && !document.hidden;
      if (shouldRun && !raf) {
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        drawResting();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(cv);
    document.addEventListener("visibilitychange", sync);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
