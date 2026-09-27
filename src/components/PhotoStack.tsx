"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/Logo";
import type { HeroCard } from "@/content/heroCards";

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


/** Resting poses, front to back — depth comes from translateZ + perspective. */
const SLOTS = [
  { x: 0, y: 0, z: 0, r: 0, zi: 30 },
  { x: -44, y: -30, z: -70, r: -8, zi: 20 },
  { x: -88, y: -56, z: -140, r: -15, zi: 10 },
];

/** The deck's own entrance (psDeckIn), delay included. */
const DECK_IN_MS = 1200;
/** How long after the deck has settled the front card gives its one tug. */
const NUDGE_AFTER_MS = 500;
/** Matches the psNudge keyframe, so the class comes off when the tug ends. */
const NUDGE_MS = 950;
/** Horizontal travel that counts as a swipe rather than a stray finger. */
const SWIPE_PX = 44;

/** The mark on the dark reverse of every card — the flip's payoff. */
function Monogram() {
  return (
    <span aria-hidden style={{ color: "#faf9f5" }}>
      <Logo className="h-[86px] w-auto" />
    </span>
  );
}

export function PhotoStack({
  className,
  cards,
  onActiveChange,
}: {
  className?: string;
  cards: readonly HeroCard[];
  /** Fires with the index of the card that has come to the front. */
  onActiveChange?: (index: number) => void;
}) {
  const COUNT = cards.length;
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [top, setTop] = useState(0);
  const [sending, setSending] = useState<number | null>(null);
  const timer = useRef<number | null>(null);
  /** The one-off hint; cancelled for good the moment the deck is used. */
  const [nudging, setNudging] = useState(false);
  const usedRef = useRef(false);
  /** Cursor-following hint, desktop only — there is no hover to catch on touch. */
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const fineRef = useRef(false);
  /** In-flight swipe, and whether the last gesture already counted as one. */
  const dragRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const swipedRef = useRef(false);

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

  useEffect(() => {
    fineRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
  }, []);

  /**
   * The load hint. It waits for the intro curtain, because the deck's own
   * entrance is not paused with the rest of the hero and would otherwise tug
   * at nothing behind a white screen; then for the entrance itself to land.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let start = 0;
    let stop = 0;
    const run = (delay: number) => {
      start = window.setTimeout(() => {
        if (usedRef.current) return;
        setNudging(true);
        stop = window.setTimeout(() => setNudging(false), NUDGE_MS);
      }, delay);
    };

    const root = document.documentElement;
    let observer: MutationObserver | null = null;
    if (root.dataset.intro) {
      // The entrance has already played out under the curtain, so the tug can
      // follow the moment it lifts.
      observer = new MutationObserver(() => {
        if (root.dataset.intro) return;
        observer?.disconnect();
        run(NUDGE_AFTER_MS);
      });
      observer.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
    } else {
      run(DECK_IN_MS + NUDGE_AFTER_MS);
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, []);

  const busy = sending !== null;

  // One shuffle at a time; the flight is 1.5s, so the lock lifts just after.
  const tap = () => {
    if (busy) return;
    // Whoever got here first has understood the deck; the hint is done.
    usedRef.current = true;
    setNudging(false);
    setTip(null);
    const next = (top + 1) % COUNT;
    setSending(top);
    setTop(next);
    onActiveChange?.(next);
    timer.current = window.setTimeout(() => setSending(null), 1550);
  };

  /**
   * Swipe, for touch. Either direction runs the same shuffle — the deck only
   * cycles one way, and a swipe that did nothing would read as broken. The
   * gesture is claimed on the move that crosses the threshold rather than on
   * release, so it answers under the finger; a mostly-vertical drag is left
   * alone so the page still scrolls.
   */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipedRef.current = false;
    dragRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return;
    dragRef.current = null;
    swipedRef.current = true;
    tap();
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  return (
    <div
      ref={hostRef}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        position: "relative",
        aspectRatio: `${STAGE.w} / ${STAGE.h}`,
        // Vertical panning stays with the browser; the sideways drag is ours.
        touchAction: "pan-y",
      }}
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
          {cards.map((card, id) => {
            const slot = (((id - top) % COUNT) + COUNT) % COUNT;
            const pose = SLOTS[slot];
            const isFront = slot === 0;
            const isSending = id === sending;
            const active = isFront && !busy;

            let cls = "ps-card";
            if (isFront) cls += " is-front";
            if (isSending) cls += " is-sending";
            else if (busy) cls += slot === 0 ? " fan-1" : " fan-2";
            else if (isFront && nudging) cls += " is-nudging";

            return (
              <button
                key={card.id}
                type="button"
                className={cls}
                disabled={!active}
                onClick={() => {
                  // A swipe that ended on the card has already shuffled it.
                  if (swipedRef.current) return;
                  tap();
                }}
                onPointerEnter={(e) => {
                  if (fineRef.current && active) {
                    setTip({ x: e.clientX, y: e.clientY });
                  }
                }}
                onPointerMove={(e) => {
                  if (fineRef.current && active) {
                    setTip({ x: e.clientX, y: e.clientY });
                  }
                }}
                onPointerLeave={() => setTip(null)}
                aria-label="Show the next card"
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
                        <span className="ps-face ps-face-front">
                          <Image
                            src={card.image}
                            alt={card.alt}
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

      {/* Portalled to the body: the hero card clips its own corners, and the
          deck sits right up against them. */}
      {tip && !busy && typeof document !== "undefined"
        ? createPortal(
            <div
              style={{
                position: "fixed",
                left: tip.x + 6,
                top: tip.y + 10,
                zIndex: 9999,
                pointerEvents: "none",
                animation: "rlTooltip 200ms ease-out both",
              }}
            >
              <div
                style={{
                  background: "#141413",
                  color: "#faf9f5",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "5px 14px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 12px rgba(0,0,0,.25)",
                  letterSpacing: ".3px",
                }}
              >
                Tap Tap!
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
