import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CaseNav, type CaseSection } from "@/components/CaseNav";
import { MoreWork } from "@/components/MoreWork";
import { Icon } from "@/components/case/CaseIcons";
import { BAND_STRIP, Band, CaseHeroNav, Heading, Intro, Lede, STRIP, Shell } from "@/components/case/CasePrimitives";
import { EnrolmentBars } from "@/components/case/EnrolmentBars";
import { ImagePlaceholder } from "@/components/case/ImagePlaceholder";
import { Phone } from "@/components/case/Phone";
import { delhiveryCoins as c } from "@/content/delhiveryCoins";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${c.title} — ${site.name}`,
  description: c.subtitle,
};

const SECTIONS: readonly CaseSection[] = [
  { id: "problem", label: "Problem" },
  { id: "context", label: "Context" },
  { id: "program", label: "The program" },
  { id: "coin", label: "Coin design" },
  { id: "landing", label: "Landing page" },
  { id: "checkout", label: "Checkout" },
  { id: "experience", label: "Experience" },
  { id: "outcome", label: "Outcome" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

/**
 * The page's palette. Warm and celebratory, led by the project's own coral (the
 * homepage card), with navy as the dark and the coin's golds as highlight:
 * - accent: deep gold, holds up as text on white and cream
 * - accent-soft: cream, the coin-design paper
 * - accent-lime: bright gold, for highlights on navy
 * - ink: navy instead of black, so dark bands and text sit warm beside gold
 */
const THEME = {
  "--color-accent": "#a15c07",
  "--color-accent-soft": "#fff7eb",
  "--color-accent-lime": "#f7c04a",
  "--color-ink": "#121926",
} as CSSProperties;

/** Coral owns the big regions; navy text on it (white fails contrast there). */
const CORAL = "bg-[#ff6c6c]";
const CORAL_SOFT = "bg-[#ffe4df]";
const YELLOW = "bg-[#fff375]";

/** The Figma exports carry their frame's fills; tiles behind them match exactly. */
const MIST = "bg-[#f9f9fb]";

export default function DelhiveryCoinsPage() {
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

          {/* the project's own coral, three screens fanned out of it */}
          <div className={`relative mt-[32px] h-[300px] overflow-hidden sm:mt-[48px] sm:h-[540px] ${CORAL}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized in % */}
            <img
              src="/assets/work/grid.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
            />
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

              {/* three numbers, and what they add up to */}
              <ul className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[20px]">
                {c.problem.beats.map((b) => (
                  <li key={b.label} className="flex flex-col gap-[10px] rounded-[var(--radius-tile)] bg-accent-soft p-[24px] sm:p-[32px]">
                    <span className="text-[13px] font-semibold text-accent">{b.label}</span>
                    <p className="flex items-baseline gap-[8px]">
                      <span className="font-display text-[48px] leading-[0.95] font-bold tracking-[-0.03em] text-ink sm:text-[72px]">
                        {b.value}
                      </span>
                      <span className="font-display text-[22px] font-bold text-accent sm:text-[28px]">{b.unit}</span>
                    </p>
                    <p className="text-[15px] leading-[1.5] text-ink-body sm:text-[16px]">{b.body}</p>
                  </li>
                ))}
                <li className={`flex flex-col gap-[12px] rounded-[var(--radius-tile)] p-[24px] sm:p-[32px] ${CORAL}`}>
                  <span className="text-[13px] font-semibold text-ink">{c.problem.result.label}</span>
                  <h3 className="font-display text-[28px] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-[40px]">
                    {c.problem.result.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-ink">{c.problem.result.body}</p>
                </li>
              </ul>

              <div className={`flex flex-col gap-[10px] rounded-[var(--radius-tile)] px-[24px] py-[26px] sm:flex-row sm:items-baseline sm:gap-[24px] sm:px-[40px] sm:py-[36px] ${YELLOW}`}>
                <span className="shrink-0 text-[15px] font-semibold text-ink sm:text-[16px]">{c.problem.hmw.lead}</span>
                <p className="font-display text-[24px] leading-[1.2] font-bold text-ink sm:text-[36px]">{c.problem.hmw.question}</p>
              </div>

              <ImagePlaceholder label={c.problem.video.label} hint={c.problem.video.hint} ratio="16 / 9" icon="play" />
            </section>

            {/* ── context — on navy ─────────────────────────── */}
            <section id="context" className="scroll-mt-[96px]">
              <Band tone="black" roomy>
                <Heading light>{c.context.heading}</Heading>
                <ul className="mt-[36px] grid gap-[16px] sm:mt-[56px] md:grid-cols-3 md:gap-[20px]">
                  {c.context.numbers.map((n) => (
                    <li key={n.value} className="flex flex-col gap-[12px] rounded-[var(--radius-tile)] bg-white/[0.06] p-[24px] sm:p-[32px]">
                      <span className="font-display text-[48px] leading-[0.95] font-bold tracking-[-0.03em] text-accent-lime sm:text-[72px]">
                        {n.value}
                      </span>
                      <p className="max-w-[32ch] text-[15px] leading-[1.5] text-white/80 sm:text-[16px]">{n.body}</p>
                    </li>
                  ))}
                </ul>
              </Band>
            </section>

            {/* ── the program — the answer, on coral ───────── */}
            <section id="program" className="scroll-mt-[96px]">
              <Band tone="plain" floor roomy className={CORAL}>
                <Intro>
                  <Heading>{c.program.heading}</Heading>
                  <Lede tone="ink">{c.program.body}</Lede>
                </Intro>
                <dl className="mt-[36px] grid grid-cols-2 gap-[16px] sm:mt-[56px] lg:grid-cols-4 lg:gap-[20px]">
                  {c.program.rules.map((r) => (
                    <div key={r.body} className="flex flex-col gap-[8px] rounded-[var(--radius-tile)] bg-accent-soft p-[24px] sm:p-[32px]">
                      <dt className="order-last text-[15px] text-ink-body sm:text-[16px]">{r.body}</dt>
                      <dd className="font-display text-[48px] leading-[0.95] font-bold tracking-[-0.03em] text-accent sm:text-[72px]">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Band>
            </section>

            {/* ── coin design — sketchbook to final mark ─────── */}
            <section id="coin" className="scroll-mt-[96px]">
              <Band tone="cream" roomy>
                <Intro>
                  <Heading className="max-w-[20ch]">{c.coin.heading}</Heading>
                  <Lede>{c.coin.lede}</Lede>
                </Intro>

                <div className="mt-[36px] grid gap-[16px] sm:mt-[56px] sm:grid-cols-2 sm:gap-[24px]">
                  {c.coin.sketches.map((s) => (
                    <Image
                      key={s.src}
                      src={s.src}
                      alt={s.alt}
                      width={s.w}
                      height={s.h}
                      sizes="(max-width: 640px) 92vw, 540px"
                      className="block h-auto w-full"
                    />
                  ))}
                </div>

                {/* the build, one layer at a time */}
                <ol className="mt-[24px] grid grid-cols-3 gap-[12px] sm:mt-[32px] sm:grid-cols-6 sm:gap-[16px]">
                  {c.coin.steps.map((s) => (
                    <li key={s.src} className="flex flex-col items-center gap-[12px] rounded-[16px] bg-[#3a3a3a] p-[12px] pb-[16px] sm:p-[18px]">
                      <Image src={s.src} alt="" width={438} height={438} sizes="(max-width: 640px) 30vw, 146px" className="block h-auto w-full max-w-[146px]" />
                      <span className="text-[13px] text-white/85">{s.label}</span>
                    </li>
                  ))}
                </ol>

                <ul className="mt-[24px] grid gap-[16px] sm:mt-[32px] sm:grid-cols-2 sm:gap-[24px]">
                  {c.coin.finals.map((f) => (
                    <li key={f.title} className="flex items-center gap-[20px] rounded-[var(--radius-tile)] bg-white p-[20px] sm:gap-[32px] sm:p-[32px]">
                      <Image src={f.src} alt={`${f.title} coin`} width={529} height={529} sizes="150px" className="size-[96px] shrink-0 sm:size-[150px]" />
                      <div className="flex flex-col gap-[6px]">
                        <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">{f.title}</h3>
                        <p className="text-[15px] text-ink-body sm:text-[16px]">{f.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Band>
            </section>

            {/* ── landing page — four dark, then one light, on navy ── */}
            <section id="landing" className="scroll-mt-[96px]">
              <Band tone="black" roomy>
                <Intro>
                  <Heading light className="max-w-[22ch]">
                    {c.landing.heading}
                  </Heading>
                  <Lede tone="light">{c.landing.lede}</Lede>
                </Intro>

                <ol className={`${BAND_STRIP} mt-[40px] items-end sm:mt-[64px] lg:grid lg:grid-cols-[repeat(4,minmax(0,1fr))_40px_minmax(0,1.38fr)] lg:gap-[20px]`}>
                  {c.landing.explorations.map((e) => (
                    <li key={e.src} className="flex w-[150px] shrink-0 snap-start flex-col items-center gap-[14px] lg:w-auto">
                      <Phone src={e.src} alt={`${e.label}: an early, dark coins page`} bezel="slate" sizes="(max-width: 1024px) 150px, 180px" className="w-full" />
                      <span className="text-[13px] text-white/70 sm:text-[15px]">{e.label}</span>
                    </li>
                  ))}
                  <li aria-hidden className="hidden place-items-center self-center pb-[40px] text-accent-lime lg:grid">
                    <Icon name="arrow" className="size-[28px]" />
                  </li>
                  <li className="flex w-[210px] shrink-0 snap-start flex-col items-center gap-[14px] lg:w-auto">
                    <Phone
                      src={c.landing.final.src}
                      alt="The final coins landing page: light and warm, with the earn rate worked through"
                      bezel="slate"
                      sizes="(max-width: 1024px) 210px, 250px"
                      className="w-full"
                    />
                    <span className="text-[15px] font-semibold text-accent-lime">{c.landing.final.label}</span>
                  </li>
                </ol>
              </Band>
            </section>

            {/* ── checkout — one card, three rounds ──────────── */}
            <section id="checkout" className="flex scroll-mt-[96px] flex-col gap-[36px] sm:gap-[56px]">
              <Intro>
                <Heading>{c.checkout.heading}</Heading>
                <Lede>{c.checkout.lede}</Lede>
              </Intro>

              <div className={`rounded-[var(--radius-card)] p-[16px] pt-[28px] sm:p-[48px] ${MIST}`}>
                <ol className={`${STRIP} lg:grid lg:grid-cols-3 lg:gap-[48px]`}>
                  {c.checkout.rounds.map((r, i) => {
                    const final = i === c.checkout.rounds.length - 1;
                    return (
                      <li key={r.title} className="flex w-[270px] shrink-0 snap-start flex-col gap-[10px] lg:w-auto">
                        <Image src={r.phone} alt={`Booking review screen, ${r.title.toLowerCase()}`} width={700} height={1638} quality={90} sizes="(max-width: 1024px) 270px, 350px" className="block h-auto w-full" />
                        <Image src={r.card} alt={`The coin card, ${r.title.toLowerCase()}`} width={700} height={285} quality={90} sizes="(max-width: 1024px) 270px, 350px" className="block h-auto w-full" />
                        <div className="mt-[12px] flex items-center gap-[12px]">
                          <span
                            aria-hidden
                            className={`grid size-[32px] shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                              final ? `${CORAL} text-ink` : "bg-white text-ink-body ring-1 ring-shell-border"
                            }`}
                          >
                            {final ? <Icon name="check" className="size-[16px]" /> : i + 1}
                          </span>
                          <div className="flex flex-col gap-[2px]">
                            <h3 className="font-display text-[18px] leading-[1.2] font-bold text-ink sm:text-[22px]">{r.title}</h3>
                            <p className="text-[13px] text-ink-body sm:text-[15px]">{r.when}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="mt-[24px] flex flex-col gap-[28px] sm:mt-[40px] sm:gap-[40px]">
                <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">{c.checkout.states.heading}</h3>
                <ul className="grid gap-[36px] sm:grid-cols-2 sm:gap-x-[32px] sm:gap-y-[56px]">
                  {c.checkout.states.items.map((s) => (
                    <li key={s.title} className="flex flex-col gap-[18px]">
                      <div className={`overflow-hidden rounded-[var(--radius-tile)] border border-shell-border ${MIST}`}>
                        <Image src={s.src} alt={`Coin card: ${s.title.toLowerCase()}`} width={1170} height={s.h} quality={90} sizes="(max-width: 640px) 92vw, 560px" className="block h-auto w-full" />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <h4 className="font-display text-[18px] leading-[1.2] font-bold text-ink sm:text-[22px]">{s.title}</h4>
                        <p className="max-w-[48ch] text-[15px] leading-[1.5] text-ink-body sm:text-[16px]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── the experience — unlock to audit, on soft coral ── */}
            <section id="experience" className="scroll-mt-[96px]">
              <Band tone="plain" roomy className={CORAL_SOFT}>
                <Heading className="max-w-[20ch]">{c.experience.heading}</Heading>
                <ol className={`${BAND_STRIP} mt-[40px] sm:mt-[64px] lg:grid lg:grid-cols-5 lg:gap-[24px]`}>
                  {c.experience.screens.map((s) => (
                    <li key={s.src} className="flex w-[190px] shrink-0 snap-start flex-col gap-[18px] lg:w-auto">
                      <Phone src={s.src} alt={`${s.title}: ${s.body}`} sizes="(max-width: 1024px) 190px, 200px" className="w-full" />
                      <div className="flex flex-col gap-[6px]">
                        <h3 className="font-display text-[18px] leading-[1.2] font-bold text-ink sm:text-[22px]">{s.title}</h3>
                        <p className="text-[13px] leading-[1.45] text-ink-body sm:text-[15px]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Band>
            </section>

            {/* ── outcome — what shipped, what's open, on navy ── */}
            <section id="outcome" className="scroll-mt-[96px]">
              <Band tone="black" roomy>
                <Heading light className="max-w-[20ch]">
                  {c.outcome.heading}
                </Heading>
                <div className="mt-[36px] grid gap-[32px] sm:mt-[56px] md:grid-cols-3 md:gap-[32px]">
                  {c.outcome.columns.map((col) => (
                    <div key={col.title} className="flex flex-col gap-[14px] border-t-2 border-accent-lime/40 pt-[24px]">
                      <h3 className="font-display text-[22px] leading-[1.1] font-bold text-accent-lime sm:text-[28px]">{col.title}</h3>
                      <p className="text-[15px] leading-[1.6] text-white/80 sm:text-[16px]">{col.body}</p>
                    </div>
                  ))}
                </div>
              </Band>
            </section>

            {/* ── impact — the first month ───────────────────── */}
            <section id="impact" className="flex scroll-mt-[96px] flex-col gap-[36px] sm:gap-[56px]">
              <div className="flex flex-col gap-[14px]">
                <Heading>{c.outcome.impact.heading}</Heading>
                {c.outcome.impact.illustrative ? (
                  <p className="w-fit rounded-full border border-dashed border-experience-border px-[12px] py-[6px] text-[13px] text-ink-body">
                    {c.outcome.impact.note}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-[16px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[20px]">
                <EnrolmentBars {...c.outcome.impact.enrolment} />
                <ul className="grid grid-cols-2 gap-[16px] lg:gap-[20px]">
                  {c.outcome.impact.stats.map((st, i) => (
                    <li
                      key={st.body}
                      className={`flex flex-col gap-[10px] rounded-[var(--radius-tile)] p-[20px] sm:p-[28px] ${i === 0 ? YELLOW : "bg-accent-soft"}`}
                    >
                      <span className="font-display text-[36px] leading-[0.95] font-bold tracking-[-0.03em] text-ink sm:text-[48px]">{st.value}</span>
                      <p className="text-[13px] leading-[1.45] text-ink-body sm:text-[15px]">{st.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── reflection — the closing thought, back on coral ── */}
            <section id="reflection" className="scroll-mt-[96px]">
              <Band tone="plain" floor roomy className={CORAL}>
                <div className="flex flex-col gap-[16px] pb-[24px] sm:pb-[56px]">
                  <h2 className="text-[15px] font-semibold text-ink sm:text-[16px]">{c.outcome.reflection.title}</h2>
                  <p className="font-display max-w-[30ch] text-[28px] leading-[1.12] font-bold tracking-[-0.02em] text-ink sm:text-[48px]">
                    {c.outcome.reflection.text}
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
