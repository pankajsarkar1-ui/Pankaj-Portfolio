"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useRef, useState, useSyncExternalStore } from "react";
import { BannerCard } from "@/components/BannerCard";
import { Lightbox } from "@/components/Lightbox";
import { Nav } from "@/components/Nav";
import { TabChips } from "@/components/TabChips";
import { Phone } from "@/components/case/Phone";
import type { MediaTab } from "@/content/aiExperiments";
import { projects } from "@/content/projects";
import { type ProductWork, type WorkPiece, type WorkTabId, work } from "@/content/work";

/**
 * The Work page: a hero card with the site bar and four views, Selected and
 * three disciplines. The view lives in the URL hash (#product, #visual,
 * #experiments) so a link can open straight onto it; Selected is the bare URL.
 * Visual and experiment pieces open in the frosted viewer, grown out of the
 * tile you clicked.
 */

const EVENT = "work-tab";
const IDS = work.tabs.map((t) => t.id) as string[];
const readTab = (): WorkTabId => {
  const h = window.location.hash.slice(1);
  return IDS.includes(h) ? (h as WorkTabId) : "selected";
};
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(EVENT, cb);
  };
};
const goTo = (id: string) => {
  window.history.replaceState(null, "", id === "selected" ? window.location.pathname : `#${id}`);
  window.dispatchEvent(new Event(EVENT));
};

const RISE = "[animation:heroRise_600ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none]";
const rise = (i: number): CSSProperties => ({ animationDelay: `${i * 60}ms` });

const COUNTS: Record<WorkTabId, number> = {
  selected: projects.length,
  product: work.product.length,
  visual: work.visual.length,
  experiments: work.experiments.ai.length + work.experiments.motion.length,
};

type Viewer = { tabs: MediaTab[]; tab: string; index: number; origin: DOMRect | null };

export function WorkExplorer() {
  const tab = useSyncExternalStore(subscribe, readTab, () => "selected" as WorkTabId);
  const [viewer, setViewer] = useState<Viewer | null>(null);

  return (
    <>
      <section
        id="top"
        className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white"
      >
        <Nav />
        {/* sized like the homepage hero's headline, so the pages read as one set */}
        <div className="flex flex-col gap-[14px] px-[16px] py-[37px] sm:flex-row sm:items-end sm:justify-between sm:gap-[40px] sm:px-[32px] sm:py-[48px] lg:px-[6.4%]">
          <h1 className="font-display max-w-[22ch] text-[28px] leading-[36px] font-bold tracking-[-1px] text-balance text-ink sm:text-[48px] sm:leading-[1.12] sm:tracking-[-0.0426em]">
            {work.headline}
          </h1>
          <p className="max-w-[40ch] text-[15px] leading-[1.55] text-ink-body sm:pb-[6px] sm:text-[17px]">
            {work.intro}
          </p>
        </div>
      </section>

      {/* the four views, under the hero rather than inside it */}
      <div className="flex flex-wrap items-center justify-between gap-x-[16px] gap-y-[10px]">
        <TabChips tabs={work.tabs} activeId={tab} onChange={goTo} scroll ariaLabel="Kind of work" />
        <span className="text-[13px] text-ink-muted sm:text-[14px]">
          {COUNTS[tab]} {tab === "selected" ? "case studies" : "pieces"}
        </span>
      </div>

      <div key={tab} className="flex flex-col gap-[32px]">
        {tab === "selected" ? (
          projects.map((p, i) => (
            <div key={p.id} style={rise(i)} className={RISE}>
              <BannerCard project={p} />
            </div>
          ))
        ) : tab === "product" ? (
          <div className="grid gap-x-[24px] gap-y-[40px] sm:grid-cols-2 sm:gap-y-[56px]">
            {work.product.map((p, i) => (
              <div key={p.id} style={rise(i)} className={RISE}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        ) : tab === "visual" ? (
          <PieceGrid
            pieces={work.visual}
            square
            onOpen={(index, origin) =>
              setViewer({
                tabs: [{ id: "visual", label: "Visual Design", cards: work.visual }],
                tab: "visual",
                index,
                origin,
              })
            }
          />
        ) : (
          <div className="flex flex-col gap-[56px]">
            {(
              [
                { id: "ai", label: "AI experiments", pieces: work.experiments.ai },
                { id: "motion", label: "Motion", pieces: work.experiments.motion },
              ] as const
            ).map((group, gi) => (
              <div key={group.id} className="flex flex-col gap-[20px]">
                <h2 style={rise(gi * 3)} className={`font-display text-[22px] font-bold text-ink sm:text-[28px] ${RISE}`}>
                  {group.label}
                </h2>
                <PieceGrid
                  pieces={group.pieces}
                  offset={gi * 3}
                  onOpen={(index, origin) =>
                    setViewer({
                      tabs: [
                        { id: "ai", label: "AI experiments", cards: work.experiments.ai },
                        { id: "motion", label: "Motion", cards: work.experiments.motion },
                      ],
                      tab: group.id,
                      index,
                      origin,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {viewer ? (
        <Lightbox
          tabs={viewer.tabs}
          activeTabId={viewer.tab}
          index={viewer.index}
          onTabChange={(t) => setViewer((v) => (v ? { ...v, tab: t } : v))}
          onIndexChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
          onClose={() => setViewer(null)}
          ariaLabel={work.tabs.find((t) => t.id === tab)?.label ?? work.title}
          backdrop="blur"
          origin={viewer.origin}
        />
      ) : null}
    </>
  );
}

/** A product: two screens on the project's colour, fanning apart on hover. */
function ProductCard({ p }: { p: ProductWork }) {
  const art = p.theme && p.screens ? (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)]"
      style={{ backgroundColor: p.theme.bg }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative floor, sized to the box */}
      <img src="/assets/work/grid.svg" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-60" />
      <div className="absolute top-[16%] left-[52%] w-[30%] rotate-[8deg] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[10%] group-hover:rotate-[12deg]">
        <Phone src={p.screens[1]} alt="" sizes="(min-width: 640px) 18vw, 30vw" />
      </div>
      <div className="absolute top-[10%] left-[22%] w-[32%] -rotate-[4deg] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-[6%] group-hover:-translate-y-[3%] group-hover:-rotate-[7deg]">
        <Phone src={p.screens[0]} alt={`${p.title} screen`} sizes="(min-width: 640px) 18vw, 30vw" />
      </div>
    </div>
  ) : (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-[10px] overflow-hidden rounded-[var(--radius-tile)] border border-dashed border-[#d6d6d6] bg-[#f7f7f7] p-[24px] text-center">
      <span className="font-display text-[34px] leading-none font-bold tracking-[-0.03em] text-[#e2e2e2] sm:text-[48px]">
        {p.title}
      </span>
      <span className="text-[13px] font-medium text-ink-muted sm:text-[14px]">Case study in the works</span>
    </div>
  );

  const body = (
    <>
      {art}
      <div className="flex flex-col gap-[8px] px-[4px] pt-[18px]">
        <div className="flex items-baseline justify-between gap-[12px]">
          <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[26px]">{p.title}</h3>
          {p.read ? (
            <span className="flex shrink-0 items-center gap-[6px] text-[13px] font-medium text-ink-body sm:text-[14px]">
              {p.read}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-[4px]">
                →
              </span>
            </span>
          ) : null}
        </div>
        <p className="text-[15px] leading-[1.5] text-ink-body sm:text-[16px]">{p.blurb}</p>
        <div className="flex flex-wrap gap-[6px] pt-[2px]">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-chip-idle px-[10px] py-[4px] text-[12px] font-medium text-ink-nav">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return p.href ? (
    <Link href={p.href} className="group block rounded-[var(--radius-tile)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}

/** Tiles that open in the viewer; clips play on hover. */
function PieceGrid({
  pieces,
  square = false,
  offset = 0,
  onOpen,
}: {
  pieces: WorkPiece[];
  square?: boolean;
  offset?: number;
  onOpen: (index: number, origin: DOMRect | null) => void;
}) {
  const media = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <div className="grid grid-cols-2 gap-x-[14px] gap-y-[28px] sm:gap-x-[24px] sm:gap-y-[36px] lg:grid-cols-3">
      {pieces.map((piece, i) => (
        <button
          key={piece.id}
          type="button"
          onClick={() => onOpen(i, media.current[i]?.getBoundingClientRect() ?? null)}
          onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play().catch(() => {})}
          onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
          style={rise(offset + i)}
          className={`group flex flex-col gap-[12px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${RISE}`}
        >
          <div
            ref={(el) => {
              media.current[i] = el;
            }}
            className={`relative w-full overflow-hidden rounded-[var(--radius-media)] bg-[#f1f1f1] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[4px] group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_18px_36px_-18px_rgba(0,0,0,0.35)] ${
              square ? "aspect-square" : "aspect-[4/3]"
            }`}
          >
            {piece.poster ? (
              <Image
                src={piece.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 45vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
              />
            ) : null}
            {piece.video ? (
              <video
                src={piece.video}
                poster={piece.poster}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            ) : null}
            {piece.video || piece.youtubeId ? (
              <span className="absolute right-[10px] bottom-[10px] flex size-[30px] items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                <svg viewBox="0 0 10 10" aria-hidden className="ml-[1px] size-[10px] fill-current">
                  <path d="M2 1l7 4-7 4z" />
                </svg>
              </span>
            ) : null}
          </div>
          <span className="flex flex-col gap-[2px] px-[2px]">
            <span className="text-[15px] leading-[1.3] font-semibold text-ink sm:text-[16px]">{piece.caption}</span>
            <span className="text-[13px] text-ink-muted sm:text-[14px]">{piece.tag}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
