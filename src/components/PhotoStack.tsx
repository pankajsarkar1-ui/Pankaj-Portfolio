"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

/**
 * The hero's profile card deck. Tapping the front card arcs it out to the
 * right, turns it a full 360° and tucks it in at the back while the two behind
 * fan out and settle into their new slots.
 *
 * The choreography is authored at a fixed stage size (the reference's card is
 * 500×602 and every offset is tuned to it), so the whole stage is scaled to
 * whatever width it's given rather than re-deriving the numbers — the same
 * approach the Coins card uses.
 */

/** Natural stage the deck is authored at; the extra width on the right is the
 *  room the swing needs. */
const STAGE = { w: 680, h: 700 };
/** Top-left of the front card within the stage. */
const ORIGIN = { x: 110, y: 60 };
const COUNT = 3;

/** Resting poses, front to back — depth comes from translateZ + perspective. */
const SLOTS = [
  { x: 0, y: 0, z: 0, r: 0, zi: 30 },
  { x: -44, y: -30, z: -70, r: -8, zi: 20 },
  { x: -88, y: -56, z: -140, r: -15, zi: 10 },
];

/** The mark on the dark reverse of every card — the flip's payoff. */
function Monogram() {
  return (
    <span aria-hidden style={{ color: "#faf9f5" }}>
      <Logo className="h-[86px] w-auto" />
    </span>
  );
}

export function PhotoStack({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [top, setTop] = useState(0);
  const [sending, setSending] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;

    // A zero reading (the observer can fire before the first layout) must never
    // stick: nothing inside the host changes size afterwards, so the observer
    // would not fire again and the deck would stay unrendered.
    const measure = () => {
      const w = host.getBoundingClientRect().width;
      if (w > 0) setScale(w / STAGE.w);
      else raf = requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const busy = sending !== null;

  // One shuffle at a time; the flight is 1.5s, so the lock lifts just after.
  const tap = () => {
    if (busy) return;
    setSending(top);
    setTop((t) => (t + 1) % COUNT);
    timer.current = window.setTimeout(() => setSending(null), 1550);
  };

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: "relative", aspectRatio: `${STAGE.w} / ${STAGE.h}` }}
    >
      {scale > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE.w,
            height: STAGE.h,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          {/* The entrance animates `transform`, so it rides its own element —
              on the scaled wrapper it would overwrite the scale. */}
          <div
            className="ps-deck"
            style={{
              position: "absolute",
              inset: 0,
              perspective: 1700,
              // `both` (rather than a bare opacity: 0 + forwards) means the
              // deck stays visible if the animation never runs at all.
              animation:
                "psDeckIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
            }}
          >
          {[0, 1, 2].map((id) => {
            const slot = (((id - top) % COUNT) + COUNT) % COUNT;
            const pose = SLOTS[slot];
            const isFront = slot === 0;
            const isSending = id === sending;
            const active = isFront && !busy;

            let cls = "ps-card";
            if (isFront) cls += " is-front";
            if (isSending) cls += " is-sending";
            else if (busy) cls += slot === 0 ? " fan-1" : " fan-2";

            return (
              <button
                key={id}
                type="button"
                className={cls}
                disabled={!active}
                onClick={tap}
                aria-label={
                  id === 0
                    ? `Portrait of ${site.name} — flip and shuffle the stack`
                    : "Flip and shuffle the card stack"
                }
                style={
                  {
                    left: ORIGIN.x,
                    top: ORIGIN.y,
                    transform: `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateZ(${pose.r}deg)`,
                    zIndex: pose.zi,
                    pointerEvents: active ? "auto" : "none",
                  } as CSSProperties
                }
              >
                <span className="ps-swing">
                  <span className="ps-depth">
                    <span className="ps-flipper">
                      <span className="ps-lift">
                        {/* every card carries the portrait, so a shuffle never
                            leaves the hero without a photo — at rest only their
                            edges show anyway */}
                        <span className="ps-face ps-face-front">
                          <Image
                            src="/assets/hero/portrait-card.png"
                            alt={id === 0 ? site.name : ""}
                            aria-hidden={id === 0 ? undefined : true}
                            fill
                            sizes="(max-width: 1024px) 80vw, 420px"
                            priority={id === 0}
                            className="object-cover"
                          />
                        </span>
                        <span className="ps-face ps-face-back">
                          <Monogram />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
