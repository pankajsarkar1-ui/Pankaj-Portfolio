"use client";
/* eslint-disable @next/next/no-img-element -- decorative layers are pre-sized and positioned in % of the card box */

import { type CSSProperties, useState } from "react";
import { BannerTimeline } from "@/components/BannerTimeline";
import { CoinCardAnimation } from "@/components/CoinCardAnimation";
import { LevelCardAnimation } from "@/components/LevelCardAnimation";
import { TrackingAnimation } from "@/components/TrackingAnimation";
import type { Project } from "@/content/projects";

const pct = (value: number, total: number) => `${(value / total) * 100}%`;
/** Figma px → container-query width units, so type scales with the card. */
const cq = (value: number, width: number) => `${(value / width) * 100}cqw`;

export function BannerCard({ project }: { project: Project }) {
  const { design, theme, layers } = project;
  const w = design.w;

  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const anim = project.animation;

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHovered(true);
    if (anim) setPlaying(true);
  };
  const stop = () => {
    setHovered(false);
    setPlaying(false);
  };

  const vars = {
    "--card-ratio": `${design.w} / ${design.h}`,
    containerType: "inline-size",
    background: theme.bg,
  } as CSSProperties;

  return (
    <a
      href={project.href}
      style={vars}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className="group relative block aspect-[10/7] w-full overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:aspect-[var(--card-ratio)] sm:rounded-[40px]"
    >
      {/* Perspective grid floor (exact vector from Figma) */}
      <img
        src="/assets/work/grid.svg"
        alt=""
        aria-hidden
        style={{
          left: pct(-18.49, design.w),
          bottom: 0,
          width: pct(1036.99, design.w),
          height: pct(314.6, design.h),
        }}
        className="pointer-events-none absolute max-w-none select-none"
      />

      {/* Illustration / stripes. Rotated stripes with a `move` slide along their
          own axis on hover (rotate first, so translateY runs down the stripe). */}
      {layers.map((layer) => {
        const rot = layer.rotate ? `rotate(${layer.rotate}deg)` : "";
        const mv =
          hovered && layer.move
            ? ` translate(${layer.move.x}cqw, ${layer.move.y}cqw)`
            : "";
        return (
          <img
            key={layer.src}
            src={layer.src}
            alt=""
            aria-hidden
            style={{
              left: pct(layer.x, design.w),
              top: pct(layer.y, design.h),
              width: pct(layer.w, design.w),
              height: pct(layer.h, design.h),
              opacity: playing && anim?.hides.includes(layer.src) ? 0 : 1,
              transform: rot + mv || undefined,
              transformOrigin: layer.rotate
                ? `${layer.originX ?? 0}% ${layer.originY ?? 0}%`
                : undefined,
              transition:
                "opacity 300ms ease, transform 620ms cubic-bezier(.22,1,.36,1)",
            }}
            className="pointer-events-none absolute max-w-none select-none"
          />
        );
      })}

      {/* Tracking: the real card lifts out of the stripe and comes forward,
          bridging the handoff to the live animation. */}
      {playing && anim?.kind === "tracking" && anim.lift ? (
        <img
          src={anim.lift.src}
          alt=""
          aria-hidden
          style={{
            left: pct(anim.lift.x, design.w),
            top: pct(anim.lift.y, design.h),
            width: pct(anim.lift.w, design.w),
            height: pct(anim.lift.h, design.h),
            animation: "trackLift 640ms cubic-bezier(.4,0,.2,1) forwards",
          }}
          className="pointer-events-none absolute max-w-none select-none"
        />
      ) : null}

      {/* Coins & Levels render continuously (no static swap): rest = still
          frame, hover = interactive — so there is no transition to smooth. */}
      {anim && (anim.kind === "coins" || anim.kind === "levels" || playing) ? (
        <div
          aria-hidden
          style={{
            left: pct(anim.box.x, design.w),
            top: pct(anim.box.y, design.h),
            width: pct(anim.box.w, design.w),
            height: pct(anim.box.h, design.h),
            animation:
              anim.kind === "tracking"
                ? "trackReveal 360ms ease 300ms both"
                : undefined,
          }}
          className={`absolute ${anim.kind === "levels" ? "" : "pointer-events-none"}`}
        >
          {anim.kind === "coins" ? (
            <CoinCardAnimation className="absolute inset-0" />
          ) : anim.kind === "levels" ? (
            <LevelCardAnimation className="absolute inset-0" hovered={hovered} />
          ) : (
            <TrackingAnimation className="absolute inset-0" instant />
          )}
        </div>
      ) : null}

      {/* Left content: copy pinned top, read pill + slider pinned bottom.
          A flex column so the two never collide as the card scales down. */}
      <div
        style={{
          paddingTop: cq(74, w),
          paddingLeft: cq(70, w),
          paddingBottom: cq(93, w),
          width: "54%",
        }}
        className="absolute inset-y-0 left-0 flex flex-col justify-between"
      >
        <div className="flex flex-col gap-[14px]">
          <h3
            style={{
              color: theme.title,
              fontSize: `clamp(22px, ${cq(64, w)}, 64px)`,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
            }}
            className="font-display font-extrabold whitespace-pre-line"
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: `clamp(10px, ${cq(14, w)}, 15px)`,
              // cqw (not %) so the wrap width tracks the card, giving two lines.
              maxWidth: cq(340, w),
            }}
            className="font-light text-white/90"
          >
            {project.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-[16px]">
          <span
            className="rounded-full bg-white/20 px-[2.4cqw] py-[1cqw] text-[clamp(11px,1.3cqw,14px)] font-medium whitespace-nowrap text-white backdrop-blur-[8px]"
          >
            {project.readLabel}
          </span>
          <BannerTimeline theme={theme.timeline} />
        </div>
      </div>
    </a>
  );
}
