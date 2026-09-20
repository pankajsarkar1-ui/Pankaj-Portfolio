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
}: {
  tabs: readonly MediaTab[];
  activeTabId: string;
  index: number;
  onTabChange: (id: string) => void;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  ariaLabel: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<"next" | "prev" | "init">("init");

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
      className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-sm animate-[lbBackdrop_300ms_ease_both]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex h-full w-full max-w-[1200px] flex-col gap-[24px] px-[20px] py-[24px] outline-none sm:py-[32px] animate-[lbContent_350ms_cubic-bezier(.22,1,.36,1)_both]"
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
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
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
                className={`max-h-full max-w-full rounded-[20px] object-contain ${slideAnim}`}
              />
            ) : null}

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
