"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * A small looping Lottie used as an icon — the coffee in the nav, the drinks in
 * the contact footer.
 *
 * The player is a real dependency, so it is imported lazily and the animations
 * are fetched from /public rather than bundled; neither lands in the initial
 * JS. `lottie_light` drops expression support, which these files do not use.
 * Under reduced motion it renders a single still frame and never replays.
 */

/** Beat between plays — a periodic wink rather than a constant loop. */
const REPLAY_DELAY_MS = 4000;
/**
 * Share of the frame the artwork's HEIGHT should fill once cropped.
 *
 * Height rather than the larger side, so every mark stands the same height
 * whatever its width. Fitting the larger side makes a wide mark small: the
 * cheers is two glasses abreast, 468 x 295 against the coffee's 385 x 317, so
 * its width set the scale and each glass came out half the size of a cup.
 */
const FILL = 0.74;
/** Frames sampled when measuring the artwork's extent. */
const SAMPLES = 12;

/**
 * Crops the view to the artwork rather than the canvas it was exported on.
 * These files leave a lot of padding, which otherwise renders the mark small
 * and off-centre.
 *
 * The extent is measured from the drawn paths with getBoundingClientRect, not
 * getBBox: getBBox reports each element in its own user space, so results from
 * groups carrying different transforms cannot be combined, and it ignores
 * stroke — which on line art hangs outside the geometry. Sampling across frames
 * catches parts that are not drawn at frame 0, such as trimmed steam.
 */
function fitToArtwork(anim: AnimationItem, svg: SVGSVGElement, scale: number) {
  const box = svg.getBoundingClientRect();
  if (!box.width || !box.height) return;

  const vb = (svg.getAttribute("viewBox") ?? "0 0 500 500").split(/\s+/).map(Number);
  const kx = vb[2] / box.width;
  const ky = vb[3] / box.height;

  // The canvas the file was exported on; nothing drawn can lie outside it.
  const [cx0, cy0, cw, ch] = vb;
  const cx1 = cx0 + cw;
  const cy1 = cy0 + ch;

  /**
   * Each sampled frame's own extent, rather than the union of them all. A
   * union is set by whatever the animation does at its most extreme — the
   * cheers throws out impact marks on the clink, the coffee's steam reaches
   * its highest — and sizing to that shrinks the mark for the whole of the
   * rest of the loop. The middle frame is what the eye actually settles on.
   */
  const frames: Array<{ h: number; cx: number; cy: number }> = [];
  const total = anim.totalFrames;
  for (let i = 0; i <= SAMPLES; i++) {
    anim.goToAndStop((total * i) / SAMPLES, true);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const path of svg.querySelectorAll("path")) {
      // Lottie parks hidden and empty shapes far off-canvas, and their rects
      // are fractionally non-zero rather than exactly zero — left in, a single
      // one of them swallows the whole measurement.
      if (path.closest("defs, clipPath, mask")) continue;
      const r = path.getBoundingClientRect();
      if (r.width < 0.5 && r.height < 0.5) continue;

      const px0 = vb[0] + (r.left - box.left) * kx;
      const py0 = vb[1] + (r.top - box.top) * ky;
      const px1 = vb[0] + (r.right - box.left) * kx;
      const py1 = vb[1] + (r.bottom - box.top) * ky;
      if (px1 < cx0 || px0 > cx1 || py1 < cy0 || py0 > cy1) continue;

      x0 = Math.min(x0, Math.max(px0, cx0));
      y0 = Math.min(y0, Math.max(py0, cy0));
      x1 = Math.max(x1, Math.min(px1, cx1));
      y1 = Math.max(y1, Math.min(py1, cy1));
    }
    if (Number.isFinite(x0) && x1 > x0) {
      frames.push({ h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 });
    }
  }
  if (!frames.length) return;

  const median = (values: number[]) => {
    const v = [...values].sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)];
  };
  const height = median(frames.map((f) => f.h));
  const cx = median(frames.map((f) => f.cx));
  const cy = median(frames.map((f) => f.cy));

  svg.dataset.fit = [Math.round(height), Math.round(cx), Math.round(cy)].join(",");

  // A square keeps the mark's proportions whatever box it is given. A mark
  // wider than it is tall then runs past the sides, which is why the drawing
  // is allowed to spill out of the viewBox.
  //
  // `scale` widens the crop to render the mark smaller: the marks stand at a
  // common measured height, but some read heavier than others at it.
  const side = height / (FILL * scale);
  svg.setAttribute("viewBox", `${cx - side / 2} ${cy - side / 2} ${side} ${side}`);
  svg.style.overflow = "visible";
}

export function LottieMark({
  src,
  className,
  scale = 1,
}: {
  src: string;
  className?: string;
  /** Fine trim on the fitted size — 0.8 renders the mark a fifth smaller. */
  scale?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let anim: AnimationItem | null = null;
    let cancelled = false;
    let timer: number | undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    void (async () => {
      const lottie = (await import("lottie-web/build/player/lottie_light"))
        .default;
      if (cancelled) return;

      anim = lottie.loadAnimation({
        container: host,
        renderer: "svg",
        // Looping is driven by hand so each pass is followed by a pause.
        loop: false,
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      anim.addEventListener("DOMLoaded", () => {
        const svg = host.querySelector("svg");
        if (svg && anim) fitToArtwork(anim, svg, scale);
        if (still) {
          anim?.goToAndStop(0, true);
          return;
        }
        anim?.goToAndPlay(0, true);
      });

      if (still) return;
      anim.addEventListener("complete", () => {
        timer = window.setTimeout(() => {
          anim?.goToAndPlay(0, true);
        }, REPLAY_DELAY_MS);
      });
    })();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      anim?.destroy();
    };
  }, [src, scale]);

  return <div ref={hostRef} className={className} aria-hidden />;
}
