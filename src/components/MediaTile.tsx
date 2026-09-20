"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { MediaCard } from "@/content/aiExperiments";

const PLAY_ICON = "/assets/ai/play.svg";

export function MediaTile({
  card,
  height,
  variant = "tile",
  onOpen,
}: {
  card: MediaCard;
  /** Natural tile height in px; also the rendered height. */
  height: number;
  /** "tile" = Beyond Work (white ring, 32px radius). "media" = AI (hairline, 24px radius, play badge). */
  variant?: "tile" | "media";
  /** When set, the tile becomes a button that opens the lightbox. */
  onOpen?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The `autoPlay` attribute starts playback; this only pauses clips that are
  // off screen so a row of them doesn't decode all at once, and resumes when
  // the tab comes back. Honours prefers-reduced-motion by staying on the poster.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }

    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) void el.play().catch(() => {});
      else el.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const isMedia = variant === "media";
  const shell = isMedia
    ? `rounded-[var(--radius-media)] border-[0.5px] ${
        card.lightBorder ? "border-ai-card-border" : "border-chip-idle"
      }`
    : "rounded-[var(--radius-tile)] border-2 border-white";

  return (
    <figure
      style={{ height, width: card.width, flex: `0 0 ${card.width}px` }}
      className={`group relative overflow-hidden bg-[#141414] transition-transform duration-300 ease-out will-change-transform hover:z-20 hover:scale-[1.05] motion-reduce:transition-none motion-reduce:hover:scale-100 ${shell}`}
    >
      {card.video ? (
        <video
          ref={videoRef}
          src={card.video}
          poster={card.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={card.caption}
          className="absolute inset-0 size-full object-cover"
        />
      ) : card.poster ? (
        <Image
          src={card.poster}
          alt={card.caption}
          fill
          sizes="(max-width: 768px) 80vw, 525px"
          className="object-cover"
        />
      ) : null}

      {isMedia ? (
        <span className="absolute top-[18px] left-[18px] flex size-[28px] rotate-90 items-center justify-center opacity-70">
          <Image
            src={PLAY_ICON}
            alt=""
            width={28}
            height={28}
            aria-hidden
            className="h-[28px] w-[28px]"
          />
        </span>
      ) : null}

      {/* Embedded videos can't preview in place, so mark them as playable. */}
      {card.youtubeId ? (
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex size-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 pl-[4px] text-[20px] text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
        >
          ▶
        </span>
      ) : null}

      {card.meta ? (
        <p className="absolute bottom-[55px] left-[18px] max-w-[240px] text-[13px] font-medium text-white/80">
          {card.meta}
        </p>
      ) : null}

      <figcaption className="absolute inset-x-0 bottom-0 flex h-[49px] items-center bg-linear-to-b from-transparent to-black/60 px-[24px] text-[14px] font-medium text-white">
        {card.caption}
      </figcaption>

      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${card.caption}`}
          className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
      ) : null}
    </figure>
  );
}
