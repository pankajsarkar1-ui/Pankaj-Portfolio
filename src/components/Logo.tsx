"use client";

import { useEffect, useRef } from "react";
import { MARK_BOX, MARK_STRETCH, markPath } from "@/components/mark";

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

export function Logo({
  className,
  still = false,
}: {
  className?: string;
  /** Skip the hover stretch where there is no room for it (the pill nav). */
  still?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || still) return;
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

    const enter = () => to(MARK_STRETCH);
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
  }, [still]);

  return (
    <svg
      viewBox={`0 0 ${MARK_BOX.w} ${MARK_BOX.h}`}
      className={`overflow-visible ${className ?? ""}`}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path ref={pathRef} d={markPath(0)} />
    </svg>
  );
}
