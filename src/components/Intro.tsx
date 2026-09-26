"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { MARK_BOX, MARK_STRETCH, markPath } from "@/components/mark";

/**
 * The homepage intro. The mark's bowl draws out left to right as the page
 * settles, snaps back, and hands over to the hero.
 *
 * Whether it runs at all is decided before paint by the inline script in
 * layout.tsx, which sets `data-intro="playing"` on <html>. That script holds
 * the page back so the hero never flashes behind this, and pauses the hero's
 * own entrance so it plays *after* the curtain lifts rather than underneath it.
 * This component only reads that flag — if it is absent, it renders nothing.
 */

/** Long enough to read as deliberate rather than a flicker. */
const MIN_MS = 750;
/** However slow the network, the page is never held longer than this. */
const CAP_MS = 4000;
/** Progress parks here until the page is actually ready, then completes. */
const HOLD_AT = 0.9;
/** Steepness of the fill's approach to the hold — higher surges harder. */
const FILL_K = 2.8;
/** How long the run from the hold to full takes once the page is ready. */
const COMPLETE_MS = 280;
/** How long the bowl takes to snap shut afterwards. */
const SNAP_MS = 240;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The gate lives on <html>, outside React, so it is read as an external store:
 * the server and the hydrating render both see `false`, and the real value
 * arrives on the client without a hydration mismatch.
 */
let listeners: Array<() => void> = [];
const emitGate = () => listeners.forEach((l) => l());
const subscribeGate = (l: () => void) => {
  listeners.push(l);
  return () => {
    listeners = listeners.filter((x) => x !== l);
  };
};
const readGate = () => document.documentElement.dataset.intro === "playing";
const gateOnServer = () => false;

export function Intro() {
  const playing = useSyncExternalStore(subscribeGate, readGate, gateOnServer);
  const pathRef = useRef<SVGPathElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const path = pathRef.current;
    const root = rootRef.current;
    if (!path || !root) return;

    // Declared ahead of `finish` because the reduced-motion branch calls it
    // immediately, before a `let` further down would be initialised.
    let raf = 0;
    let ready = false;
    let done = false;
    let bail = 0;
    let snapping = false;

    const finish = () => {
      if (done) return;
      done = true;
      if (bail) window.clearTimeout(bail);
      // Releases the hero: its entrance un-pauses and the page fades up.
      delete document.documentElement.dataset.intro;
      emitGate();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const start = performance.now();

    /**
     * The curtain is drawn frame by frame, and a tab that never gets frames —
     * backgrounded during load, say — would otherwise sit behind it forever.
     * The gate's own failsafe cannot help: it clears the attribute but cannot
     * unmount this. So dismissal is guaranteed on a timer, not on frames.
     */
    bail = window.setTimeout(finish, CAP_MS + 1200);

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true }),
          );
    void Promise.race([
      Promise.all([document.fonts?.ready, loaded]),
      new Promise((r) => setTimeout(r, CAP_MS)),
    ]).then(() => {
      ready = true;
    });

    let shown = 0;
    let completeFrom: number | null = null;
    let completeAt = 0;

    const tick = () => {
      const elapsed = performance.now() - start;

      if (completeFrom === null && ready && elapsed >= MIN_MS) {
        completeFrom = shown;
        completeAt = performance.now();
      }

      if (completeFrom === null) {
        // Surges away from nothing and decelerates into the hold, approaching
        // it without arriving — the page, not the clock, decides when it does.
        shown = HOLD_AT * (1 - Math.exp((-FILL_K * elapsed) / MIN_MS));
      } else {
        // Then eases the rest of the way from wherever it had got to.
        const t = Math.min((performance.now() - completeAt) / COMPLETE_MS, 1);
        shown = completeFrom + (1 - completeFrom) * easeOutCubic(t);
        if (t >= 1) shown = 1;
      }

      path.setAttribute("d", markPath(shown * MARK_STRETCH));

      if (shown === 1 && !snapping) {
        snapping = true;
        // Snap the bowl shut, then lift the curtain.
        path.style.transition = "none";
        const snapFrom = performance.now();
        const snap = () => {
          const t = Math.min((performance.now() - snapFrom) / SNAP_MS, 1);
          const eased = easeOutCubic(t);
          path.setAttribute("d", markPath((1 - eased) * MARK_STRETCH));
          if (t < 1) {
            raf = requestAnimationFrame(snap);
          } else {
            root.dataset.state = "leaving";
            window.setTimeout(finish, 360);
          }
        };
        raf = requestAnimationFrame(snap);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (bail) window.clearTimeout(bail);
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading"
      className="intro-curtain fixed inset-0 z-[100] grid place-items-center bg-white"
    >
      <svg
        viewBox={`0 0 ${MARK_BOX.w} ${MARK_BOX.h}`}
        className="h-[40px] overflow-visible text-ink sm:h-[52px]"
        fill="currentColor"
        aria-hidden
        focusable="false"
      >
        <path ref={pathRef} d={markPath(0)} />
      </svg>
    </div>
  );
}
