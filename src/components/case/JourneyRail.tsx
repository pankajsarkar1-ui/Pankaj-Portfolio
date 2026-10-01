"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Screen = { src: string; state: string; note: string };

/** Time for the rail to travel from one state to the next. */
const STEP_MS = 280;

/**
 * The six states on a rail that fills as the journey would — the page's one
 * authored motion. It is drawn in full by default (server render, no JS,
 * reduced motion) and is only reset to empty when it is off screen at mount,
 * so it can never be caught half-built or flash out.
 */
export function JourneyRail({
  screens,
  dims,
}: {
  screens: readonly Screen[];
  dims: Record<string, { w: number; h: number }>;
}) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Already in view on arrival — leave it drawn rather than blank it out.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.dataset.rail = "idle";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.rail = "run";
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      aria-label="Tracking states, in order"
      className="group/rail -mx-[22px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[22px] pt-[4px] pb-[10px] [scrollbar-width:none] sm:-mx-[48px] sm:gap-[20px] sm:px-[48px] [&::-webkit-scrollbar]:hidden"
    >
      {screens.map((s, i) => {
        const last = i === screens.length - 1;
        const d = dims[s.src];
        const delay = `${i * STEP_MS}ms`;

        return (
          <li
            key={s.src}
            className="group/state flex w-[188px] shrink-0 snap-start flex-col gap-[18px] sm:w-[214px]"
          >
            <div className="relative h-[16px]" aria-hidden>
              {!last ? (
                <span className="absolute top-1/2 left-1/2 h-[2px] w-[calc(100%+16px)] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 sm:w-[calc(100%+20px)]">
                  <span
                    style={{ transitionDelay: delay, transitionDuration: `${STEP_MS}ms` }}
                    className="block h-full origin-left bg-accent-lime ease-out group-data-[rail=idle]/rail:scale-x-0 group-data-[rail=run]/rail:transition-transform"
                  />
                </span>
              ) : null}
              <span
                style={{ transitionDelay: delay }}
                className="absolute top-1/2 left-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-lime ring-[5px] ring-accent duration-300 ease-out group-data-[rail=idle]/rail:scale-[0.55] group-data-[rail=idle]/rail:bg-white/40 group-data-[rail=run]/rail:transition-[scale,background-color]"
              />
            </div>

            {/* cropped to a phone's viewport — the answer lives at the top */}
            <div className="aspect-[9/19.5] overflow-hidden rounded-[18px] bg-white shadow-[0_26px_50px_-24px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out group-hover/state:-translate-y-[5px] motion-reduce:transition-none">
              <Image
                src={s.src}
                alt={`${s.state} — tracking screen`}
                width={d.w}
                height={d.h}
                sizes="(max-width: 640px) 188px, 214px"
                className="block size-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <p className="font-display text-[16px] leading-[1.2] font-bold text-white sm:text-[18px]">
                {s.state}
              </p>
              <p className="text-[13px] leading-[1.45] text-white/80 sm:text-[13px]">{s.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
