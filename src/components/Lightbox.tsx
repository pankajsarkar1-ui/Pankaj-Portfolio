"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TabChips } from "@/components/TabChips";
import type { MediaTab } from "@/content/aiExperiments";

export function Lightbox({
  tabs,
  activeTabId,
  index,
  onTabChange,
  onIndexChange,
  onClose,
  ariaLabel,
  backdrop = "solid",
  origin = null,
}: {
  tabs: readonly MediaTab[];
  activeTabId: string;
  index: number;
  onTabChange: (id: string) => void;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  ariaLabel: string;
  /** `blur` frosts the page behind instead of blacking it out. */
  backdrop?: "solid" | "blur";
  /** Where the first image came from on the page; it grows out of that rect. */
  origin?: DOMRect | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<"next" | "prev" | "init">("init");
  const flipped = useRef(false);
  const flip = Boolean(origin) && dir === "init";

  /** Grow the first image out of the card it was opened from. */
  const growFromOrigin = (el: HTMLElement) => {
    if (!origin || flipped.current) return;
    flipped.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = el.getBoundingClientRect();
    if (!to.width || !to.height) return;
    const scale = origin.height / to.height;
    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.4 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ],
      { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  };

  const browsable = tabs.filter((t) => t.cards.length > 0);
  const tab =
    browsable.find((t) => t.id === activeTabId) ?? browsable[0] ?? null;
  const cards = tab?.cards ?? [];
  const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
  const card = cards[safeIndex];

  const goNext = () => {
    setDir("next");
    onIndexChange((safeIndex + 1) % cards.length);
  };
  const goPrev = () => {
    setDir("prev");
    onIndexChange((safeIndex - 1 + cards.length) % cards.length);
  };
  /**
   * Swipe on touch screens: the media follows the finger sideways, and a
   * long or quick enough flick turns to the next or previous one (which then
   * slides in from that side); anything less springs back. The gesture only
   * claims the pointer once it is clearly horizontal, so vertical moves are
   * left alone.
   */
  const dragRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ id: number; x: number; y: number; t: number; dx: number; axis: "x" | "y" | null } | null>(null);
  /** A swipe that ends off the media must not count as a click to close. */
  const swiped = useRef(false);
  const settle = (animate: boolean) => {
    const el = dragRef.current;
    if (!el) return;
    el.style.transition = animate ? "transform .35s cubic-bezier(.22,1,.36,1), opacity .35s ease" : "none";
    el.style.transform = "";
    el.style.opacity = "";
  };
  const onSwipeDown = (e: React.PointerEvent<HTMLDivElement>) => {
    swiped.current = false;
    if (e.pointerType === "mouse" || cards.length < 2) return;
    if ((e.target as HTMLElement).closest("button")) return;
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, dx: 0, axis: null };
  };
  const onSwipeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = swipe.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axis) {
      if (Math.hypot(dx, dy) < 8) return;
      g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (g.axis === "x") e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (g.axis !== "x") return;
    g.dx = dx;
    const el = dragRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.transform = `translateX(${dx}px) rotate(${dx * 0.012}deg)`;
    el.style.opacity = String(1 - Math.min(Math.abs(dx) / 700, 0.35));
  };
  const onSwipeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = swipe.current;
    if (!g || g.id !== e.pointerId) return;
    swipe.current = null;
    if (g.axis !== "x") return;
    swiped.current = true;
    const speed = Math.abs(g.dx) / Math.max(1, e.timeStamp - g.t);
    const turn = e.type === "pointerup" && (Math.abs(g.dx) > Math.min(90, window.innerWidth * 0.22) || speed > 0.5);
    if (!turn) return settle(true);
    settle(false);
    if (g.dx < 0) goNext();
    else goPrev();
  };

  const goTo = (i: number) => {
    setDir(i > safeIndex ? "next" : i < safeIndex ? "prev" : "init");
    onIndexChange(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const restoreTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      restoreTo?.focus?.();
    };
  }, []);

  useEffect(() => {
    const strip = thumbsRef.current;
    strip?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [safeIndex, activeTabId]);

  if (!card) return null;

  const slideAnim =
    dir === "next"
      ? "animate-[lbSlideFromRight_300ms_cubic-bezier(.22,1,.36,1)_both]"
      : dir === "prev"
        ? "animate-[lbSlideFromLeft_300ms_cubic-bezier(.22,1,.36,1)_both]"
        : "animate-[lbSlide_250ms_ease_both]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={`fixed inset-0 z-50 flex flex-col animate-[lbBackdrop_300ms_ease_both] ${
        backdrop === "blur" ? "bg-black/55 backdrop-blur-[24px] backdrop-saturate-150" : "bg-black/92 backdrop-blur-sm"
      }`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        // Only the media and the controls hold a click; anywhere else in the
        // frosted space falls through to the backdrop and closes the viewer.
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("img, video, iframe, button, a")) e.stopPropagation();
        }}
        className={`mx-auto flex h-full w-full max-w-[1200px] flex-col gap-[24px] px-[20px] py-[24px] outline-none sm:py-[32px] ${
          origin ? "" : "animate-[lbContent_350ms_cubic-bezier(.22,1,.36,1)_both]"
        }`}
      >
        <div className="relative flex min-h-[36px] shrink-0 items-start justify-center pr-[48px] sm:pr-0">
          {browsable.length > 1 ? (
            <TabChips
              tabs={browsable}
              activeId={tab?.id ?? ""}
              onChange={(id) => {
                setDir("next");
                onTabChange(id);
                onIndexChange(0);
              }}
              tone="dark"
              ariaLabel={ariaLabel}
            />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-0 right-0 flex size-[36px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[18px] text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ✕
          </button>
        </div>

        <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[14px]">
          <div
            onPointerDown={onSwipeDown}
            onPointerMove={onSwipeMove}
            onPointerUp={onSwipeEnd}
            onPointerCancel={onSwipeEnd}
            onClickCapture={(e) => {
              if (!swiped.current) return;
              swiped.current = false;
              e.stopPropagation();
            }}
            className="relative flex min-h-0 w-full flex-1 touch-pan-y items-center justify-center overflow-hidden"
          >
            {/* Left arrow */}
            {cards.length > 1 ? (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-0 z-10 flex size-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[20px] text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-2"
              >
                ‹
              </button>
            ) : null}

            <div ref={dragRef} className="flex size-full items-center justify-center">
            {card.youtubeId ? (
              <div key={card.id} className={`aspect-video max-h-full w-full max-w-[1100px] overflow-hidden rounded-[20px] bg-black ${slideAnim}`}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${card.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={card.caption}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full border-0"
                />
              </div>
            ) : card.video ? (
              <video
                key={card.id}
                src={card.video}
                poster={card.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                className={`max-h-full max-w-full rounded-[20px] ${slideAnim}`}
              />
            ) : card.poster ? (
              /* eslint-disable-next-line @next/next/no-img-element -- lightbox needs natural sizing for rounded clip */
              <img
                key={card.id}
                src={card.poster}
                alt={card.caption}
                onLoad={flip ? (e) => growFromOrigin(e.currentTarget) : undefined}
                className={`max-h-full max-w-full rounded-[20px] object-contain ${flip ? "" : slideAnim} ${
                  backdrop === "blur" ? "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" : ""
                }`}
              />
            ) : null}
            </div>

            {/* Right arrow */}
            {cards.length > 1 ? (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="absolute right-0 z-10 flex size-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[20px] text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-2"
              >
                ›
              </button>
            ) : null}
          </div>
          <figcaption className="text-center text-[14px] text-white/70">
            {card.caption}
            <span className="ml-2 text-white/35">
              {safeIndex + 1} / {cards.length}
            </span>
          </figcaption>
        </figure>

        <div
          ref={thumbsRef}
          className="no-scrollbar flex shrink-0 justify-start gap-[10px] overflow-x-auto sm:justify-center"
        >
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              data-active={i === safeIndex}
              aria-label={c.caption}
              aria-current={i === safeIndex}
              onClick={() => goTo(i)}
              className={`relative size-[64px] shrink-0 cursor-pointer overflow-hidden rounded-[12px] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                i === safeIndex
                  ? "ring-2 ring-white"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              {c.poster ? (
                <Image
                  src={c.poster}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center bg-white/10" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
