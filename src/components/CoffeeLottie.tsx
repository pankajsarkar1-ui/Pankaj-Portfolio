"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * The coffee mark in the contact CTA.
 *
 * The player is a real dependency, so it is imported lazily and the animation
 * itself is fetched from /public rather than bundled — neither lands in the
 * initial JS. `lottie_light` drops expression support, which this file does not
 * use. Under reduced motion it renders a single still frame and never replays.
 */

/**
 * The artwork only occupies part of the 500×500 canvas — the rest is empty
 * padding, which left the cup small and sitting low against the label. This
 * crops to a square centred on the content so the cup lines up optically.
 *
 * Bounds are the union of every frame's bbox (so the steam's trim paths count)
 * grown by half the 16-unit stroke: getBBox() measures path geometry only, and
 * this is line art, so the strokes hang 8 units outside it. Geometry alone is
 * x 84–383, y 197–410; with the stroke it is x 76–391, y 189–418, centred on
 * (233.5, 303.5). The 440 box leaves the art at ~72% of the frame — clear of
 * the edges rather than flush against them.
 */
const CONTENT_VIEW_BOX = "13.5 83.5 440 440";

/** Beat between plays — a periodic wink rather than a constant loop. */
const REPLAY_DELAY_MS = 4000;

export function CoffeeLottie({ className }: { className?: string }) {
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
        autoplay: !still,
        path: "/assets/lottie/coffee.json",
        rendererSettings: {
          viewBoxSize: CONTENT_VIEW_BOX,
          preserveAspectRatio: "xMidYMid meet",
        },
      });

      if (still) {
        anim.addEventListener("DOMLoaded", () => anim?.goToAndStop(0, true));
        return;
      }

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
  }, []);

  return <div ref={hostRef} className={className} aria-hidden />;
}
