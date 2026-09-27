"use client";
/* eslint-disable @next/next/no-img-element -- decorative layers are pre-sized and positioned in % of the card box */

import { type CSSProperties, useState, useSyncExternalStore } from "react";
import { BannerTimeline } from "@/components/BannerTimeline";
import { CoinCardAnimation } from "@/components/CoinCardAnimation";
import { LevelCardAnimation } from "@/components/LevelCardAnimation";
import { TrackingAnimation } from "@/components/TrackingAnimation";
import type { Project } from "@/content/projects";

const pct = (value: number, total: number) => `${(value / total) * 100}%`;
/** Figma px → container-query width units, so type scales with the card. */
const cq = (value: number, width: number) => `${(value / width) * 100}cqw`;

/**
 * Below `sm` the card is portrait and its artwork sits in a tight crop window.
 * Some animations behave differently in that box, so they need to know — read
 * as an external store to keep the server and first client render in step
 * (both `false`), with the real value arriving without a hydration mismatch.
 */
const PORTRAIT_MQ = "(max-width: 639.98px)";
const subscribePortrait = (cb: () => void) => {
  const mq = window.matchMedia(PORTRAIT_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const readPortrait = () => window.matchMedia(PORTRAIT_MQ).matches;
const portraitOnServer = () => false;

/**
 * The banner is one card in two shapes. Landscape from `sm` up — artwork across
 * the whole card with the copy over it — and portrait below, where the artwork
 * sits in a box at the top and the copy stacks underneath.
 *
 * Both draw the same stage. The portrait box is a window onto it (the crop in
 * the project data), so the animations stay live and only one of each is ever
 * mounted: every difference between the two shapes is a `sm:` class, not a
 * second tree. Anything the landscape card sets inline would otherwise win at
 * every width, so the values that differ travel as custom properties.
 */
export function BannerCard({ project }: { project: Project }) {
  const { design, theme, layers, mobileCrop } = project;
  const w = design.w;

  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const portrait = useSyncExternalStore(
    subscribePortrait,
    readPortrait,
    portraitOnServer,
  );
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
    "--art-ratio": `${mobileCrop.w} / ${mobileCrop.h}`,
    "--cx": mobileCrop.x,
    "--cy": mobileCrop.y,
    "--cw": mobileCrop.w,
    "--ch": mobileCrop.h,
    "--dw": design.w,
    "--dh": design.h,
    "--pad-t": cq(74, w),
    "--pad-l": cq(70, w),
    "--pad-b": cq(93, w),
    "--title-size": `clamp(22px, ${cq(64, w)}, 64px)`,
    "--body-size": `clamp(10px, ${cq(14, w)}, 15px)`,
    "--body-width": cq(340, w),
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
      className="group relative flex w-full flex-col overflow-hidden rounded-[24px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:block sm:aspect-[var(--card-ratio)] sm:rounded-[40px]"
    >
      {/* Perspective grid floor (exact vector from Figma). Both shapes stand it
          on the card's bottom edge; only its scale differs. */}
      <img
        src="/assets/work/grid.svg"
        alt=""
        aria-hidden
        style={{ left: "-108.08cqw", bottom: 0, width: "316.16cqw", height: "95.91cqw" }}
        className="pointer-events-none absolute max-w-none select-none sm:hidden"
      />
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
        className="pointer-events-none absolute hidden max-w-none select-none sm:block"
      />

      {/* The artwork box: a cropped window on the stage when portrait, the whole
          card when landscape. */}
      <div className="relative mx-[21px] mt-[23px] aspect-[var(--art-ratio)] overflow-hidden rounded-[16px] sm:absolute sm:inset-0 sm:m-0 sm:aspect-auto sm:rounded-none">
        <div className="absolute top-[calc(-100%*var(--cy)/var(--ch))] left-[calc(-100%*var(--cx)/var(--cw))] h-[calc(100%*var(--dh)/var(--ch))] w-[calc(100%*var(--dw)/var(--cw))] sm:inset-0 sm:size-full">
          {/* Illustration / stripes. Rotated stripes with a `move` slide along
              their own axis on hover (rotate first, so translateY runs down the
              stripe). */}
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
                <LevelCardAnimation className="absolute inset-0" hovered={hovered} contained={portrait} />
              ) : (
                <TrackingAnimation className="absolute inset-0" instant />
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Copy: stacked under the artwork when portrait; when landscape it takes
          the left half of the card, copy pinned top and the read pill bottom, so
          the two never collide as the card scales down. */}
      <div className="relative flex flex-col px-[25px] pt-[52px] pb-[37px] sm:absolute sm:inset-y-0 sm:left-0 sm:w-[54%] sm:justify-between sm:px-0 sm:pt-[var(--pad-t)] sm:pb-[var(--pad-b)] sm:pl-[var(--pad-l)]">
        <div className="flex flex-col gap-[4px] sm:gap-[14px]">
          <h3
            style={{ color: theme.title }}
            className="font-display text-[32px] leading-[40px] font-extrabold tracking-[-0.024em] sm:text-[length:var(--title-size)] sm:leading-[0.98] sm:tracking-[-0.01em] sm:whitespace-pre-line"
          >
            {project.title}
          </h3>
          {/* cqw (not %) on the wrap width so it tracks the card, giving two lines. */}
          <p className="text-[14px] font-light text-white/90 sm:max-w-[var(--body-width)] sm:text-[length:var(--body-size)]">
            {project.subtitle}
          </p>
        </div>

        <div className="mt-[36px] flex items-center gap-[16px] sm:mt-0">
          <span className="rounded-full bg-white/20 px-[12px] py-[6px] text-[12px] font-medium whitespace-nowrap text-white backdrop-blur-[8px] sm:px-[2.4cqw] sm:py-[1cqw] sm:text-[clamp(11px,1.3cqw,14px)]">
            {project.readLabel}
          </span>
          <span className="hidden sm:block">
            <BannerTimeline theme={theme.timeline} />
          </span>
        </div>
      </div>
    </a>
  );
}
