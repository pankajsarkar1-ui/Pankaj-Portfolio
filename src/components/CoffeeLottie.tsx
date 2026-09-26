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
 * The artwork occupies x 84-416, y 92-408 of the 500x500 canvas, so it is
 * already centred on (250, 250) — the canvas just carries a lot of padding,
 * which left the cup small against the label. Cropping to a 440 square on that
 * same centre keeps it centred while filling the frame, with 54 units clear to
 * each side and 62 above and below.
 *
 * Measure that extent with getBoundingClientRect() over the drawn paths, not
 * getBBox(): getBBox() reports each element in its own user space, so results
 * from groups carrying different transforms cannot be combined, and it ignores
 * stroke — which on 16-unit line art hangs 8 units outside the geometry.
 */
const CONTENT_VIEW_BOX = "30 30 440 440";

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
