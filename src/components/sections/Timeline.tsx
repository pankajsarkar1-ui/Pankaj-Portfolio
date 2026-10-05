"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/content/experience";

/**
 * Career and college on one spine, oldest first, ending at "Now" (school years
 * are left off). Every stop sits on the left of the spine on a soft grey card,
 * and the right carries only the year, in big quiet numerals, once per year;
 * the dot tells studying from working. The spine draws itself as you scroll: a
 * blue line with a glowing head runs down it, each stop lights up as the head
 * reaches it, and its card slides in toward the spine. Phones fold everything
 * to the right of a spine on the left.
 *
 * Scroll work is imperative (a style height and a data attribute per stop), so
 * nothing re-renders while you scroll.
 */

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** "2020 Oct" → 2020.75; a bare year starts in January; "Now" is open. */
function point(s: string) {
  const [y, m] = s.trim().split(/\s+/);
  if (/now/i.test(y)) return null;
  return { at: Number(y) + (m ? (MONTHS[m.slice(0, 3).toLowerCase()] ?? 0) / 12 : 0), month: Boolean(m) };
}

function length(start: number, end: number) {
  const months = Math.max(1, Math.round((end - start) * 12));
  const y = Math.floor(months / 12);
  const mo = months % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", mo ? `${mo} mo${mo > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}

type Stop = {
  kind: "study" | "work";
  title: string;
  org: string;
  period: string;
  year: number;
  /** Empty for the current role: today's date would differ between the
   *  prerendered page and the visit. */
  span: string;
  now: boolean;
  start: number;
};

const STOPS: Stop[] = experience.tabs
  .flatMap((tab) =>
    tab.rows.filter((row) => !row.school).map((row) => {
      const [a, b] = row.period.split("—");
      const start = point(a)!;
      const end = point(b);
      const now = end === null;
      // a month-precise end counts that whole month
      const endAt = end ? end.at + (end.month ? 1 / 12 : 0) : start.at;
      return {
        kind: tab.id === "education" ? ("study" as const) : ("work" as const),
        title: row.title,
        org: row.org,
        period: row.period.replace("—", "–"),
        year: Math.floor(start.at),
        span: now ? "" : length(start.at, endAt),
        now,
        start: start.at,
      };
    }),
  )
  .sort((x, y) => x.start - y.start);

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const stops = Array.from(list.querySelectorAll<HTMLLIElement>("li[data-stop]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Where a stop's dot sits on the spine. */
    const center = (li: HTMLLIElement) => {
      const dot = li.querySelector<HTMLElement>("[data-dot]");
      return li.offsetTop + (dot ? dot.offsetTop + dot.offsetHeight / 2 : 0);
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      // the line ends at the last stop, "Now"
      const last = stops[stops.length - 1];
      const end = last ? center(last) : r.height;
      // the head rides at 62% down the viewport
      const reach = reduce ? end : Math.min(end, Math.max(0, window.innerHeight * 0.62 - r.top));
      fill.style.height = `${reach}px`;
      for (const li of stops) li.dataset.on = String(reach >= center(li) - 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="journey" className="flex flex-col gap-[24px] sm:gap-[36px]">
      <div className="flex flex-wrap items-end justify-between gap-[12px]">
        <h2 className="font-display text-[20px] font-bold text-ink sm:text-[36px]">{experience.title}</h2>
        <p className="flex items-center gap-[16px] text-[13px] text-ink-body sm:text-[14px]">
          <span className="flex items-center gap-[6px]">
            <span className="size-[8px] rounded-full border-[2px] border-ink" /> Studying
          </span>
          <span className="flex items-center gap-[6px]">
            <span className="size-[8px] rounded-full bg-accent" /> Working
          </span>
        </p>
      </div>

      <ol ref={listRef} className="relative">
        {/* the spine, and the blue line that draws down it */}
        <div aria-hidden className="absolute top-0 bottom-0 left-[11px] w-[2px] -translate-x-1/2 rounded-full bg-[#ececec] sm:left-1/2" />
        <div
          ref={fillRef}
          aria-hidden
          className="absolute top-0 left-[11px] h-0 w-[2px] -translate-x-1/2 rounded-full bg-accent sm:left-1/2"
        >
          <span className="absolute -bottom-[6px] left-1/2 size-[12px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_6px_rgba(67,84,238,0.16),0_0_18px_4px_rgba(67,84,238,0.35)]" />
        </div>

        {STOPS.map((stop, i) => {
          /** A year shows once, at its first stop. */
          const newYear = i === 0 || STOPS[i - 1].year !== stop.year;
          return (
            <li
              key={`${stop.title}-${stop.period}`}
              data-stop
              data-on="false"
              className="group relative grid grid-cols-[24px_1fr] gap-x-[16px] py-[14px] sm:grid-cols-[1fr_64px_1fr] sm:gap-x-0 sm:py-[18px]"
            >
              {/* the stop on the spine */}
              <span
                aria-hidden
                data-dot
                className={`relative z-10 col-start-1 row-start-1 mt-[22px] size-[14px] justify-self-center rounded-full border-[2px] bg-white transition-[background-color,border-color,box-shadow] duration-500 sm:col-start-2 ${
                  stop.kind === "work"
                    ? "border-[#d4d4d4] group-data-[on=true]:border-accent group-data-[on=true]:bg-accent"
                    : "border-[#d4d4d4] group-data-[on=true]:border-ink"
                } ${stop.now ? "group-data-[on=true]:shadow-[0_0_0_6px_rgba(150,255,154,0.45)]" : ""}`}
              />

              {/* the year, big and quiet, on the right */}
              <span
                aria-hidden
                className="font-display hidden self-start text-[64px] leading-[0.9] font-bold tracking-[-0.04em] text-[#f2f2f2] transition-colors duration-700 group-data-[on=true]:text-accent-soft sm:col-start-3 sm:row-start-1 sm:block sm:pl-[28px] lg:text-[80px]"
              >
                {newYear ? stop.year : ""}
              </span>

              {/* the card, sliding in toward the spine */}
              <div className="col-start-2 row-start-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[on=false]:translate-x-[24px] group-data-[on=false]:opacity-0 group-data-[on=true]:translate-x-0 group-data-[on=true]:opacity-100 motion-reduce:transition-none sm:col-start-1 sm:pr-[28px] sm:group-data-[on=false]:-translate-x-[24px]">
                <div
                  className={`flex flex-col gap-[6px] rounded-[20px] p-[18px] sm:items-end sm:p-[22px] sm:text-right ${
                    stop.now ? "bg-accent text-white shadow-[0_18px_40px_-18px_rgba(67,84,238,0.7)]" : "bg-beyond-surface"
                  }`}
                >
                  <span className={`text-[13px] font-medium sm:text-[14px] ${stop.now ? "text-white/80" : "text-ink-date"}`}>
                    {stop.period}
                    {stop.span ? ` · ${stop.span}` : ""}
                  </span>
                  <span className="font-display text-[20px] leading-[1.1] font-bold sm:text-[24px]">{stop.title}</span>
                  <span className={`text-[14px] sm:text-[16px] ${stop.now ? "text-white/85" : "text-ink-body"}`}>{stop.org}</span>
                  {stop.now ? (
                    <span className="mt-[6px] flex items-center gap-[8px] text-[13px] font-medium text-white">
                      <span className="relative flex size-[8px]">
                        <span className="absolute inset-0 rounded-full bg-accent-lime motion-safe:animate-ping" />
                        <span className="relative size-[8px] rounded-full bg-accent-lime" />
                      </span>
                      Here now
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
