"use client";

import { useEffect, useRef } from "react";

/**
 * The personal mark — a geometric lowercase "p" that pulls its bowl out on
 * hover and springs back on leave.
 *
 * The stretch is geometry, not a transform: scaling on X would fatten the stem
 * and flatten the round ends, where this keeps every width and radius and only
 * runs the bowl longer. The viewBox stays at the mark's natural size and the
 * drawing is allowed to spill past it, so a stretch never widens the element
 * and shoves the nav around.
 */

/** Natural size of the mark. */
const BOX = { w: 20.1797, h: 24 };
/** How far the bowl pulls out at full stretch, in the mark's own units. */
const STRETCH = 62;

/**
 * The outline with the bowl extended by `d`. Both sub-paths are the original
 * curves with every point right of the bowl's centre pushed out by `d`, joined
 * by straight runs; at d = 0 those runs are zero-length and this is the mark as
 * drawn. Keeping the command sequence identical at every `d` is what lets the
 * shape be tweened.
 */
function markPath(d: number) {
  return (
    `M${20.1797 + d} 0V13.2002` +
    `C${20.1796 + d} 17.1765 ${16.9558 + d} 20.4003 ${12.9795 + d} 20.4004` +
    `L12.9795 20.4004` +
    `C9.61514 20.4004 6.79015 18.0924 6 14.9736V24H0V0H${20.1797 + d}Z` +
    `M12.9795 3.05469C9.93709 3.05472 7.47073 5.52107 7.4707 8.56348V12.8936` +
    `C7.4707 15.936 9.93707 18.4023 12.9795 18.4023` +
    `L${12.9795 + d} 18.4023` +
    `C${16.0219 + d} 18.4023 ${18.4883 + d} 15.936 ${18.4883 + d} 12.8936V8.56348` +
    `C${18.4882 + d} 5.52105 ${16.0219 + d} 3.05469 ${12.9795 + d} 3.05469` +
    `L12.9795 3.05469Z`
  );
}

export function Logo({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    // Hover belongs to the whole link, not just the glyph's own ink.
    const host = path.closest("a") ?? path.closest("svg");
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const tick = () => {
      // Pulls out briskly, settles back a little softer.
      current += (target - current) * (target > current ? 0.18 : 0.12);
      if (Math.abs(target - current) < 0.05) current = target;
      path.setAttribute("d", markPath(current));
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const to = (value: number) => {
      target = value;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const enter = () => to(STRETCH);
    const leave = () => to(0);

    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    // A tap should not leave the mark stuck open.
    host.addEventListener("pointercancel", leave);
    host.addEventListener("blur", leave, true);

    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointercancel", leave);
      host.removeEventListener("blur", leave, true);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${BOX.w} ${BOX.h}`}
      className={`overflow-visible ${className ?? ""}`}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path ref={pathRef} d={markPath(0)} />
    </svg>
  );
}
