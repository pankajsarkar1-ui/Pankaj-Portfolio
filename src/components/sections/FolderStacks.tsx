"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaTab } from "@/content/aiExperiments";
import { beyondWork } from "@/content/beyondWork";

/**
 * Beyond Work as four piles of square prints, one per category, standing on
 * one shared floor line. Hover a pile and it deals its first four prints out
 * along the floor (the rest stay piled behind the fourth) while the other
 * categories blur and fade back; hover a print and it lifts and tilts toward
 * the pointer; click opens it full size over a frosted page,
 * grown out of the print, with its category's thumbnails along the bottom.
 *
 * Every print pivots on its own foot, so piled or spread, all of them stay on
 * the floor. Under each is a faint, short reflection (counter-rotated, as a
 * mirror would) and a barely-there contact shadow.
 *
 * On touch screens there is no hover, so tapping a pile opens its category.
 */

/** A fixed, hand-placed scatter so the piles look dropped, not generated. */
const PILE = [
  { x: 0, r: -2 },
  { x: 5, r: 4 },
  { x: -6, r: -5 },
  { x: 4, r: 2.5 },
  { x: -3, r: 6 },
  { x: 7, r: -3.5 },
  { x: -5, r: 1.5 },
  { x: 2, r: -6 },
];
const EASE = "cubic-bezier(.22,1,.36,1)";
/** How many prints a hovered pile deals out. */
const DEAL = 4;

export function FolderStacks() {
  const tabs: MediaTab[] = beyondWork.tabs;
  const [active, setActive] = useState<number | null>(null);
  const [hot, setHot] = useState<{ tab: number; index: number } | null>(null);
  /** The first print dealt in the hovered pile. Hovering the last one dealt
   *  moves on to the next four, hovering the first goes back, so every print
   *  can be reached both ways. */
  const [start, setStart] = useState(0);
  const [open, setOpen] = useState<{ tab: string; index: number; origin: DOMRect | null } | null>(null);
  const cardEls = useRef<Map<string, HTMLDivElement>>(new Map());

  const openAt = (tab: string, index: number) => {
    setOpen({ tab, index, origin: cardEls.current.get(`${tab}:${index}`)?.getBoundingClientRect() ?? null });
  };

  /** Tilt toward the pointer, written straight to the element. */
  const tilt = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 22}deg`);
    el.style.setProperty("--rx", `${-py * 18}deg`);
  };
  const untilt = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  return (
    <section id="beyond" className="flex flex-col gap-8">
      <div className="flex flex-col gap-[28px] sm:gap-[40px]">
        <h2 className="font-display text-[20px] font-bold text-ink sm:text-[36px]">{beyondWork.title}</h2>

        <div
          onMouseLeave={() => {
            setActive(null);
            setHot(null);
            setStart(0);
          }}
          className="grid grid-cols-2 gap-x-[12px] gap-y-[36px] [--s:128px] sm:flex sm:gap-0 sm:[--s:136px] lg:[--s:156px]"
        >
          {tabs.map((tab, fi) => {
            const n = tab.cards.length;
            const m = Math.min(n, DEAL);
            const mid = (m - 1) / 2;
            const spread = active === fi;
            const from = spread ? start : 0;
            /** Prints still to come after the ones dealt. */
            const more = n - (from + m);
            /** Other categories blur and fade back while one is dealt out. */
            const aside = active != null && !spread;
            const hotIndex = hot?.tab === fi ? hot.index : null;
            const clips = tab.cards.some((c) => c.video || c.youtubeId);

            return (
              <div
                key={tab.id}
                onMouseEnter={() => {
                  if (active === fi) return;
                  setActive(fi);
                  setStart(0);
                }}
                style={{
                  flexGrow: active == null ? 1 : spread ? 1.9 : 0.7,
                  filter: aside ? "blur(4px)" : "blur(0px)",
                  opacity: aside ? 0.35 : 1,
                  transition: `flex-grow .6s ${EASE}, filter .45s ease, opacity .45s ease`,
                }}
                className={`relative flex min-w-0 basis-0 flex-col items-center gap-[14px] ${spread ? "z-10" : "z-0"}`}
              >
                {/* the prints: room above for the lift, below for the reflection */}
                <div className="relative w-full" style={{ height: "calc(var(--s) * 1.62)" }}>
                  {/* the floor under the pile: a contact shadow, barely there */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 h-[18px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.07),transparent)] transition-[width] duration-500"
                    style={{
                      top: "calc(var(--s) * 1.22 - 9px)",
                      width: spread ? "calc(var(--s) * 2.7)" : "calc(var(--s) * 1.25)",
                    }}
                  />

                  {tab.cards.map((card, i) => {
                    const p = PILE[i % PILE.length];
                    /** Four are dealt; the rest stay piled behind the first or last. */
                    const dealt = spread && i >= from && i < from + m;
                    const slot = spread ? Math.min(Math.max(i - from, 0), m - 1) : 0;
                    const rot = dealt ? (slot - mid) * 3 : p.r;
                    const left = spread
                      ? `calc(50% - var(--s) / 2 + ${slot - mid} * min(var(--s) * 0.6, (100% - var(--s) - 12px) / ${Math.max(m - 1, 1)}) + ${dealt ? 0 : p.x / 2}px)`
                      : `calc(50% - var(--s) / 2 + ${p.x}px)`;
                    const isHot = hotIndex === i;
                    const delay = dealt ? slot * 30 : spread ? 0 : (n - 1 - i) * 14;
                    const z = isHot && dealt ? 50 : dealt ? 30 - slot : spread ? (i < from ? 10 + i : 10 - i) : n - i;
                    const nextUp = dealt && slot === m - 1 && more > 0;
                    /** Hovering the first one dealt goes back to the ones before. */
                    const prevUp = dealt && slot === 0 && from > 0;
                    return (
                      <div
                        key={card.id}
                        className="absolute"
                        style={{
                          left,
                          top: "calc(var(--s) * 0.22)",
                          width: "var(--s)",
                          height: "var(--s)",
                          zIndex: z,
                          transform: `rotate(${rot}deg)`,
                          transformOrigin: "50% 100%",
                          transition: `left .6s ${EASE} ${delay}ms, transform .6s ${EASE} ${delay}ms`,
                        }}
                      >
                        {/* the reflection: flipped, counter-rotated, short and faint */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute top-full left-0 size-full"
                          style={{
                            transform: `rotate(${-2 * rot}deg)`,
                            transformOrigin: "50% 0",
                            transition: `transform .6s ${EASE} ${delay}ms`,
                          }}
                        >
                          <div className="relative size-full -scale-y-100 overflow-hidden rounded-[12px] border border-white/80 opacity-[0.16] [mask-image:linear-gradient(to_top,#000,transparent_38%)]">
                            {card.poster ? <Image src={card.poster} alt="" fill sizes="160px" className="object-cover" /> : null}
                          </div>
                        </div>

                        {/* the print itself; lifts and tilts on hover */}
                        <div
                          ref={(el) => {
                            if (el) cardEls.current.set(`${tab.id}:${i}`, el);
                            else cardEls.current.delete(`${tab.id}:${i}`);
                          }}
                          onMouseEnter={() => {
                            if (nextUp) {
                              setStart(Math.min(from + DEAL, n - m));
                              setHot(null);
                            } else if (prevUp) {
                              setStart(Math.max(0, from - DEAL));
                              setHot(null);
                            } else setHot({ tab: fi, index: i });
                          }}
                          onMouseMove={dealt ? tilt : undefined}
                          onMouseLeave={(e) => {
                            untilt(e);
                            setHot((h) => (h?.tab === fi && h.index === i ? null : h));
                          }}
                          onClick={() => openAt(tab.id, spread ? i : 0)}
                          className="relative size-full cursor-pointer overflow-hidden rounded-[12px] border border-white/80 bg-[#f1f1f1] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.05),0_10px_18px_-12px_rgba(0,0,0,0.22)]"
                          style={
                            {
                              "--rx": "0deg",
                              "--ry": "0deg",
                              transform:
                                isHot && dealt
                                  ? "perspective(700px) translateY(-16px) scale(1.07) rotateX(var(--rx)) rotateY(var(--ry))"
                                  : "perspective(700px) translateY(0) scale(1) rotateX(0deg) rotateY(0deg)",
                              transformOrigin: "50% 100%",
                              transition: `transform .35s ${EASE}`,
                            } as CSSProperties
                          }
                        >
                          {card.poster ? (
                            <Image src={card.poster} alt="" fill sizes="(min-width: 1024px) 160px, 140px" className="object-cover" />
                          ) : null}
                          {prevUp ? (
                            <span className="absolute top-[8px] left-[8px] rounded-full bg-white/90 px-[8px] py-[3px] text-[12px] font-semibold text-ink shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                              +{from}
                            </span>
                          ) : null}
                          {nextUp ? (
                            <span className="absolute top-[8px] right-[8px] rounded-full bg-white/90 px-[8px] py-[3px] text-[12px] font-semibold text-ink shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                              +{more}
                            </span>
                          ) : null}
                          {card.video || card.youtubeId ? (
                            <span className="absolute right-[8px] bottom-[8px] flex size-[24px] items-center justify-center rounded-full bg-black/55 text-white">
                              <svg viewBox="0 0 10 10" aria-hidden className="ml-[1px] size-[8px] fill-current">
                                <path d="M2 1l7 4-7 4z" />
                              </svg>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* the label doubles as the keyboard way in */}
                <button
                  type="button"
                  onClick={() => openAt(tab.id, 0)}
                  className="flex max-w-full flex-col items-center gap-[2px] rounded-[10px] px-[10px] py-[4px] text-center transition-colors hover:bg-chip-idle"
                >
                  <span className="text-[15px] font-semibold whitespace-nowrap text-ink sm:text-[16px]">{tab.label}</span>
                  <span className="text-[13px] whitespace-nowrap text-ink-body sm:text-[14px]">
                    {hotIndex != null ? tab.cards[hotIndex].caption : `${n} ${clips ? "pieces" : "photos"}`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {open ? (
        <Lightbox
          tabs={tabs}
          activeTabId={open.tab}
          index={open.index}
          onTabChange={(tab) => setOpen((o) => (o ? { ...o, tab } : o))}
          onIndexChange={(index) => setOpen((o) => (o ? { ...o, index } : o))}
          onClose={() => setOpen(null)}
          ariaLabel={beyondWork.title}
          backdrop="blur"
          origin={open.origin}
        />
      ) : null}
    </section>
  );
}
