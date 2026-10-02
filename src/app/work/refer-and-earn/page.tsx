import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CaseNav, type CaseSection } from "@/components/CaseNav";
import { MoreWork } from "@/components/MoreWork";
import { Band, BAND_STRIP, CaseHeroNav, Heading, Intro, Lede, STRIP, Shell } from "@/components/case/CasePrimitives";
import { CostBars } from "@/components/case/CostBars";
import { Phone } from "@/components/case/Phone";
import { referAndEarn as c } from "@/content/referAndEarn";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${c.title} — ${site.name}`,
  description: c.subtitle,
};

const SECTIONS: readonly CaseSection[] = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "How it works" },
  { id: "ideation", label: "Ideation" },
  { id: "breakdown", label: "Design breakdown" },
  { id: "levels", label: "Levels" },
  { id: "new-user", label: "New user" },
  { id: "touchpoints", label: "Touchpoints" },
  { id: "results", label: "Results" },
];

/**
 * The page's palette, from the project's homepage card: its purple leads, with
 * the card's pink and yellow as highlights and navy as the dark.
 * - accent: purple, holds up as text on white
 * - accent-soft: lavender, for calm bands
 * - accent-lime: yellow, for highlights on purple and navy
 */
const THEME = {
  "--color-accent": "#7220bf",
  "--color-accent-soft": "#f3ebfc",
  "--color-accent-lime": "#fff375",
  "--color-ink": "#121926",
} as CSSProperties;

/** Purple owns the big regions, with white text; pink takes navy text. */
const PURPLE = "bg-[#7220bf]";
const PINK = "bg-[#ff7779]";
const PINK_SOFT = "bg-[#ffe6e6]";

/** A screen with its caption, as every phone row on the page shows it. */
function Captioned({
  src,
  alt,
  title,
  body,
  sizes,
  light = false,
  bezel,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  body: string;
  sizes: string;
  light?: boolean;
  bezel?: "dark" | "slate";
  className?: string;
}) {
  return (
    <li className={`flex shrink-0 snap-start flex-col gap-[18px] lg:w-auto ${className}`}>
      <Phone src={src} alt={alt} sizes={sizes} bezel={bezel} className="w-full" />
      <div className="flex flex-col gap-[6px]">
        <h3 className={`font-display text-[18px] leading-[1.2] font-bold sm:text-[22px] ${light ? "text-white" : "text-ink"}`}>{title}</h3>
        <p className={`text-[13px] leading-[1.45] sm:text-[15px] ${light ? "text-white/75" : "text-ink-body"}`}>{body}</p>
      </div>
    </li>
  );
}

export default function ReferAndEarnPage() {
  return (
    <main style={THEME} className="pb-[64px] sm:pb-[112px]">
      {/* ── hero ─────────────────────────────────────────────── */}
      <Shell>
        <div className="mt-[16px] flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white sm:mt-[28px]">
          <CaseHeroNav />

          <div className="flex flex-col gap-[18px] px-[16px] pt-[36px] sm:gap-[24px] sm:px-[48px] sm:pt-[64px]">
            <h1 className="font-display max-w-[14ch] text-[40px] leading-[0.98] font-bold tracking-[-0.03em] text-ink sm:text-[72px]">
              {c.title}
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">{c.subtitle}</p>

            <dl className="mt-[8px] grid grid-cols-2 gap-x-[20px] gap-y-[18px] border-t border-shell-border pt-[24px] sm:grid-cols-4 sm:gap-x-[28px]">
              {c.meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-[4px]">
                  <dt className="text-[12px] text-ink-body sm:text-[13px]">{m.label}</dt>
                  <dd className="text-[15px] font-semibold text-ink sm:text-[16px]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* the project's own purple, three screens and two crowns */}
          <div className={`relative mt-[32px] h-[300px] overflow-hidden sm:mt-[48px] sm:h-[540px] ${PURPLE}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized in % */}
            <img src="/assets/work/grid.svg" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none" />
            <div className="absolute inset-x-0 top-[36px] flex items-start justify-center gap-[14px] sm:top-[56px] sm:gap-[36px]">
              {c.hero.map((s, i) => {
                const centre = i === 1;
                return (
                  <div
                    key={s.src}
                    style={{ transform: `rotate(${(i - 1) * 7}deg) translateY(${centre ? 0 : 28}px)` }}
                    className={`shrink-0 ${centre ? "w-[142px] sm:w-[260px]" : "w-[120px] sm:w-[220px]"}`}
                  >
                    <Phone
                      src={s.src}
                      alt={s.alt}
                      priority={centre}
                      sizes={centre ? "(max-width: 640px) 142px, 260px" : "(max-width: 640px) 120px, 220px"}
                    />
                  </div>
                );
              })}
            </div>
            {/* the first crown and the last, either side of the fan */}
            <Image
              src={c.crowns[0].src}
              alt=""
              width={c.crowns[0].w}
              height={c.crowns[0].h}
              sizes="(max-width: 640px) 72px, 150px"
              className="absolute bottom-[18px] left-[calc(50%-210px)] w-[72px] -rotate-12 drop-shadow-[0_16px_24px_rgba(0,0,0,0.35)] sm:bottom-[40px] sm:left-[calc(50%-400px)] sm:w-[150px]"
            />
            <Image
              src={c.crowns[3].src}
              alt=""
              width={c.crowns[3].w}
              height={c.crowns[3].h}
              sizes="(max-width: 640px) 72px, 140px"
              className="absolute right-[calc(50%-210px)] bottom-[24px] w-[72px] rotate-12 drop-shadow-[0_16px_24px_rgba(0,0,0,0.35)] sm:right-[calc(50%-400px)] sm:bottom-[48px] sm:w-[140px]"
            />
          </div>
        </div>
      </Shell>

      {/* ── body: sticky top rail + sections ─────────────────── */}
      <Shell>
        <div className="mt-[40px] sm:mt-[64px]">
          <CaseNav sections={SECTIONS} />

          <div className="mt-[56px] flex min-w-0 flex-col gap-[96px] sm:mt-[96px] sm:gap-[160px]">
            {/* ── problem ───────────────────────────────────── */}
            <section id="problem" className="flex scroll-mt-[96px] flex-col gap-[36px] sm:gap-[56px]">
              <Intro>
                <Heading className="max-w-[20ch]">{c.problem.heading}</Heading>
                <Lede>{c.problem.lede}</Lede>
              </Intro>
              <CostBars {...c.problem.cost} />
              <div className={`flex flex-col gap-[10px] rounded-[var(--radius-tile)] px-[24px] py-[26px] sm:flex-row sm:items-baseline sm:gap-[24px] sm:px-[40px] sm:py-[36px] ${PINK}`}>
                <span className="shrink-0 text-[15px] font-semibold text-ink sm:text-[16px]">{c.problem.hmw.lead}</span>
                <p className="font-display text-[22px] leading-[1.2] font-bold text-ink sm:text-[32px]">{c.problem.hmw.question}</p>
              </div>
            </section>

            {/* ── how it works — three steps, then a game ───── */}
            <section id="solution" className="scroll-mt-[96px]">
              <Band tone="cream" roomy>
                <Heading className="max-w-[20ch]">{c.solution.heading}</Heading>

                <ol className="mt-[36px] grid gap-[16px] sm:mt-[56px] md:grid-cols-3 md:gap-[20px]">
                  {c.solution.steps.map((s, i) => (
                    <li key={s.title} className="flex flex-col gap-[12px] rounded-[var(--radius-tile)] bg-white p-[24px] sm:p-[32px]">
                      <span className="font-display text-[48px] leading-[0.9] font-bold text-accent sm:text-[64px]">{i + 1}</span>
                      <h3 className="font-display text-[20px] leading-[1.15] font-bold text-ink sm:text-[24px]">{s.title}</h3>
                      <p className="text-[15px] leading-[1.55] text-ink-body sm:text-[16px]">{s.body}</p>
                    </li>
                  ))}
                </ol>

                {/* the four crowns, as the game reads */}
                <div className="mt-[16px] flex flex-col gap-[24px] rounded-[var(--radius-tile)] bg-ink p-[24px] sm:mt-[20px] sm:p-[36px] lg:flex-row lg:items-center lg:gap-[40px]">
                  <ul className="flex shrink-0 items-end gap-[14px] sm:gap-[20px]" aria-label="The four level crowns">
                    {c.crowns.map((cr) => (
                      <li key={cr.src} className="flex flex-col items-center gap-[8px]">
                        <Image src={cr.src} alt={`${cr.label} crown`} width={cr.w} height={cr.h} sizes="72px" className="h-[44px] w-auto sm:h-[64px]" />
                        <span className="text-[12px] text-white/70">{cr.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-[8px]">
                    <h3 className="font-display text-[22px] leading-[1.15] font-bold text-accent-lime sm:text-[28px]">{c.solution.game.title}</h3>
                    <p className="max-w-[56ch] text-[15px] leading-[1.55] text-white/80 sm:text-[16px]">{c.solution.game.body}</p>
                  </div>
                </div>
              </Band>
            </section>

            {/* ── ideation — three directions and the final, on navy ── */}
            <section id="ideation" className="scroll-mt-[96px]">
              <Band tone="black" roomy>
                <Intro>
                  <Heading light className="max-w-[20ch]">
                    {c.ideation.heading}
                  </Heading>
                  <Lede tone="light">{c.ideation.lede}</Lede>
                </Intro>
                <ol className={`${BAND_STRIP} mt-[40px] sm:mt-[64px] lg:grid lg:grid-cols-4 lg:gap-[28px]`}>
                  {c.ideation.screens.map((s, i) => (
                    <Captioned
                      key={s.src}
                      {...s}
                      alt={`${s.title}: ${s.body}`}
                      light
                      bezel="slate"
                      sizes="(max-width: 1024px) 200px, 250px"
                      className={`w-[200px] ${i === c.ideation.screens.length - 1 ? "[&_h3]:text-accent-lime" : ""}`}
                    />
                  ))}
                </ol>
              </Band>
            </section>

            {/* ── design breakdown — the whole page, annotated ── */}
            <section id="breakdown" className="flex scroll-mt-[96px] flex-col gap-[36px] sm:gap-[56px]">
              <Heading className="max-w-[20ch]">{c.breakdown.heading}</Heading>
              <div className="grid gap-[32px] lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start lg:gap-[64px]">
                {/* the page, with a numbered marker where each note applies */}
                <div className="relative mx-auto w-full max-w-[340px]">
                  <div className="overflow-hidden rounded-[28px] shadow-[0_28px_56px_-24px_rgba(18,25,38,0.45)] ring-1 ring-shell-border">
                    <Image
                      src={c.breakdown.page.src}
                      alt={c.breakdown.page.alt}
                      width={c.breakdown.page.w}
                      height={c.breakdown.page.h}
                      quality={90}
                      sizes="340px"
                      className="block h-auto w-full"
                    />
                  </div>
                  {c.breakdown.notes.map((n, i) => (
                    <span
                      key={n.title}
                      aria-hidden
                      style={{ top: `${n.at}%` }}
                      className="absolute -right-[14px] grid size-[30px] -translate-y-1/2 place-items-center rounded-full bg-accent text-[13px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(114,32,191,0.6)] ring-4 ring-white"
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>

                <ol className="flex flex-col gap-[16px] lg:sticky lg:top-[120px] lg:gap-[20px]">
                  {c.breakdown.notes.map((n, i) => (
                    <li key={n.title} className="flex gap-[18px] rounded-[var(--radius-tile)] bg-accent-soft p-[22px] sm:p-[28px]">
                      <span aria-hidden className="grid size-[34px] shrink-0 place-items-center rounded-full bg-accent text-[14px] font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="flex flex-col gap-[6px]">
                        <h3 className="font-display text-[20px] leading-[1.15] font-bold text-ink sm:text-[24px]">{n.title}</h3>
                        <p className="text-[15px] leading-[1.55] text-ink-body sm:text-[16px]">{n.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── levels — a crown every five, on purple ─────── */}
            <section id="levels" className="flex scroll-mt-[96px] flex-col gap-[48px] sm:gap-[72px]">
              <Band tone="plain" floor roomy className={PURPLE}>
                <Intro>
                  <Heading light className="max-w-[20ch]">
                    {c.levels.heading}
                  </Heading>
                  <Lede tone="light">{c.levels.lede}</Lede>
                </Intro>
                <ol className={`${BAND_STRIP} mt-[40px] pb-[24px] sm:mt-[64px] lg:grid lg:grid-cols-5 lg:gap-[24px]`}>
                  {c.levels.screens.map((s, i) => (
                    <Captioned
                      key={s.src}
                      {...s}
                      alt={`${s.title} celebration screen`}
                      light
                      sizes="(max-width: 1024px) 190px, 200px"
                      className={`w-[190px] ${i === c.levels.screens.length - 1 ? "[&_h3]:text-accent-lime" : ""}`}
                    />
                  ))}
                </ol>
              </Band>

              {/* the refer page itself, filling up */}
              <div className="flex flex-col gap-[28px] sm:gap-[40px]">
                <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">{c.levels.fills.heading}</h3>
                <ol className={`${STRIP} lg:grid lg:grid-cols-6 lg:gap-[18px]`}>
                  {c.levels.fills.screens.map((s) => (
                    <li key={s.src} className="flex w-[160px] shrink-0 snap-start flex-col gap-[14px] lg:w-auto">
                      <Phone src={s.src} alt={`The refer page at ${s.count} referrals`} sizes="(max-width: 1024px) 160px, 180px" className="w-full" />
                      <div className="flex items-baseline gap-[8px]">
                        <span className="font-display text-[28px] leading-none font-bold text-accent sm:text-[36px]">{s.count}</span>
                        <span className="text-[13px] text-ink-body sm:text-[15px]">{s.body}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── the new user — invite to wallet, on soft pink ── */}
            <section id="new-user" className="scroll-mt-[96px]">
              <Band tone="plain" roomy className={PINK_SOFT}>
                <Heading className="max-w-[20ch]">{c.newUser.heading}</Heading>
                <ol className={`${BAND_STRIP} mt-[40px] sm:mt-[64px] lg:grid lg:grid-cols-5 lg:gap-[24px]`}>
                  {c.newUser.screens.map((s) => (
                    <Captioned key={s.src} {...s} alt={`${s.title}: ${s.body}`} sizes="(max-width: 1024px) 190px, 200px" className="w-[190px]" />
                  ))}
                </ol>
              </Band>
            </section>

            {/* ── touchpoints — where intent peaks ───────────── */}
            <section id="touchpoints" className="flex scroll-mt-[96px] flex-col gap-[36px] sm:gap-[56px]">
              <Intro>
                <Heading className="max-w-[20ch]">{c.touchpoints.heading}</Heading>
                <Lede>{c.touchpoints.lede}</Lede>
              </Intro>
              <ol className={`${STRIP} lg:grid lg:grid-cols-4 lg:gap-[32px]`}>
                {c.touchpoints.screens.map((s) => (
                  <Captioned key={s.src} {...s} alt={`${s.title}: ${s.body}`} sizes="(max-width: 1024px) 220px, 260px" className="w-[220px]" />
                ))}
              </ol>
            </section>

            {/* ── results — on navy ─────────────────────────── */}
            <section id="results" className="scroll-mt-[96px]">
              <Band tone="black" roomy>
                <div className="flex flex-col gap-[12px]">
                  <Heading light className="max-w-[20ch]">
                    {c.results.heading}
                  </Heading>
                  <p className="text-[15px] text-white/60 sm:text-[16px]">{c.results.period}</p>
                </div>
                <dl className="mt-[36px] grid grid-cols-2 gap-x-[20px] gap-y-[32px] sm:mt-[56px] lg:grid-cols-4 lg:gap-[32px]">
                  {c.results.numbers.map((n) => (
                    <div key={n.body} className="flex flex-col gap-[10px] border-t-2 border-accent-lime/40 pt-[20px]">
                      <dt className="order-last text-[15px] leading-[1.45] text-white/80 sm:text-[16px]">{n.body}</dt>
                      <dd className="font-display text-[44px] leading-[0.95] font-bold tracking-[-0.03em] text-accent-lime sm:text-[64px]">{n.value}</dd>
                    </div>
                  ))}
                </dl>
              </Band>
            </section>

            {/* ── what's next — the closing thought, on purple ── */}
            <section aria-label={c.results.next.title}>
              <Band tone="plain" floor roomy className={PURPLE}>
                <div className="flex flex-col gap-[16px] pb-[24px] sm:pb-[56px]">
                  <h2 className="text-[15px] font-semibold text-accent-lime sm:text-[16px]">{c.results.next.title}</h2>
                  <p className="font-display max-w-[30ch] text-[28px] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[44px]">
                    {c.results.next.text}
                  </p>
                </div>
              </Band>
            </section>

            <MoreWork exclude={c.slug} />
          </div>
        </div>
      </Shell>
    </main>
  );
}
