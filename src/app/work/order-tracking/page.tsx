import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnnotatedCard } from "@/components/AnnotatedCard";
import { CaseNav, type CaseSection } from "@/components/CaseNav";
import { Logo } from "@/components/Logo";
import { MoreWork } from "@/components/MoreWork";
import { Icon, type IconName } from "@/components/case/CaseIcons";
import { EtaDrift } from "@/components/case/EtaDrift";
import { JourneyRail } from "@/components/case/JourneyRail";
import { PlatformShots } from "@/components/case/PlatformShots";
import { StoryTrack } from "@/components/case/StoryTrack";
import { TicketBars } from "@/components/case/TicketBars";
import { orderTracking as c } from "@/content/orderTracking";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${c.title} — ${site.name}`,
  description: c.subtitle,
};

const SECTIONS: readonly CaseSection[] = [
  { id: "problem", label: "Problem" },
  { id: "goals", label: "Goals" },
  { id: "research", label: "Research" },
  { id: "turn", label: "The turn" },
  { id: "anatomy", label: "Anatomy" },
  { id: "flow", label: "The flow" },
  { id: "edge", label: "Edge cases" },
  { id: "impact", label: "Impact" },
];

/**
 * Intrinsic size of each export. The screens were rendered to a common height
 * but differ in width, so these have to be exact — a shared guess reserves the
 * wrong box and every image shifts the page as it loads.
 */
const DIMS: Record<string, { w: number; h: number }> = {
  "/assets/work/tracking/01-placed.png": { w: 1092, h: 3006 },
  "/assets/work/tracking/02-pickup-today.png": { w: 1092, h: 3114 },
  "/assets/work/tracking/03-on-the-way.png": { w: 1092, h: 3636 },
  "/assets/work/tracking/04-out-soon.png": { w: 1092, h: 3282 },
  "/assets/work/tracking/05-arriving-today.png": { w: 1092, h: 3222 },
  "/assets/work/tracking/06-delivered.png": { w: 1092, h: 3000 },
  "/assets/work/tracking/b2c-on-the-way.png": { w: 1092, h: 3636 },
  "/assets/work/tracking/b2c-seller-preparing.png": { w: 1092, h: 2550 },
  "/assets/work/tracking/delay.png": { w: 1092, h: 3915 },
  "/assets/work/tracking/anatomy-map.png": { w: 1092, h: 900 },
  "/assets/work/tracking/anatomy-timeline.png": { w: 1092, h: 1350 },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1190px] px-[16px] sm:px-[20px]">
      {children}
    </div>
  );
}

function Heading({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[28px] leading-[1.04] font-bold tracking-[-0.03em] text-balance sm:text-[48px] ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** A full-colour slab in the project's own palette. Blue carries the banner's
 *  perspective floor, as the project card on the homepage does. */
function Band({
  tone,
  children,
  className = "",
}: {
  tone: "blue" | "black";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card)] p-[22px] sm:p-[48px] ${
        tone === "blue" ? "bg-accent" : "bg-ink"
      } ${className}`}
    >
      {tone === "blue" ? (
        /* eslint-disable-next-line @next/next/no-img-element -- decorative, sized to the band */
        <img
          src="/assets/work/grid.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-[10px] text-[16px] leading-[1.4] font-semibold text-accent-lime sm:text-[18px]">
      <Icon name="arrow" className="mt-[2px] size-[18px] sm:mt-[3px]" />
      {children}
    </p>
  );
}

/** A UI fragment lifted out of a screen — floats on the page with a soft shadow. */
function Piece({ src, alt }: { src: string; alt: string }) {
  const d = DIMS[src];
  return (
    <Image
      src={src}
      alt={alt}
      width={d.w}
      height={d.h}
      className="block h-auto w-full overflow-hidden rounded-[14px] drop-shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
    />
  );
}

const MAP_ICONS: readonly IconName[] = ["route", "pin", "delay"];

export default function OrderTrackingPage() {
  const r = c.research;

  return (
    <main className="pb-[64px] sm:pb-[112px]">
      {/* ── hero ─────────────────────────────────────────────── */}
      <Shell>
        <div className="mt-[16px] flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white sm:mt-[28px]">
          {/* gutters track the hero copy below, so the mark lines up with the title */}
          <nav className="flex items-center justify-between border-b border-nav-border px-[16px] py-[16px] sm:px-[48px] sm:py-[22px]">
            <Link href="/" className="flex items-center text-ink">
              <Logo className="h-[20px] w-auto sm:h-[24px]" />
              <span className="sr-only">{site.name} — home</span>
            </Link>
            <Link
              href="/#work"
              className="flex items-center gap-[8px] rounded-full px-[14px] py-[8px] text-[13px] font-medium text-ink-nav transition-colors hover:bg-chip-idle hover:text-ink"
            >
              <Icon name="arrow" className="size-[16px] rotate-180" />
              All work
            </Link>
          </nav>

          <div className="flex flex-col gap-[18px] px-[16px] pt-[36px] sm:gap-[24px] sm:px-[48px] sm:pt-[64px]">
            <h1 className="font-display max-w-[14ch] text-[40px] leading-[0.98] font-bold tracking-[-0.03em] text-ink sm:text-[72px]">
              {c.title}
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
              {c.subtitle}
            </p>

            <dl className="mt-[8px] grid grid-cols-2 gap-x-[20px] gap-y-[18px] border-t border-shell-border pt-[24px] sm:grid-cols-4 sm:gap-x-[28px]">
              {c.meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-[4px]">
                  <dt className="text-[12px] text-ink-body sm:text-[13px]">{m.label}</dt>
                  <dd className="text-[15px] font-semibold text-ink sm:text-[16px]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* the project's own banner, screens fanned out of it */}
          <div className="relative mt-[32px] h-[280px] overflow-hidden bg-accent sm:mt-[48px] sm:h-[460px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized in % */}
            <img
              src="/assets/work/grid.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
            />
            <div className="absolute inset-x-0 top-[32px] flex items-start justify-center gap-[12px] sm:top-[52px] sm:gap-[28px]">
              {[
                { src: "/assets/work/tracking/01-placed.png", r: -8, y: 22, hide: true },
                { src: "/assets/work/tracking/02-pickup-today.png", r: -4, y: 8, hide: false },
                { src: "/assets/work/tracking/03-on-the-way.png", r: 0, y: 0, hide: false },
                { src: "/assets/work/tracking/05-arriving-today.png", r: 4, y: 8, hide: false },
                { src: "/assets/work/tracking/06-delivered.png", r: 8, y: 22, hide: true },
              ].map((s) => (
                <div
                  key={s.src}
                  style={{ transform: `rotate(${s.r}deg) translateY(${s.y}px)` }}
                  className={`w-[118px] shrink-0 overflow-hidden rounded-[16px] shadow-[0_24px_54px_-14px_rgba(0,0,0,0.5)] sm:w-[200px] sm:rounded-[22px] ${
                    s.hide ? "hidden md:block" : ""
                  }`}
                >
                  <Image
                    src={s.src}
                    alt=""
                    aria-hidden
                    width={DIMS[s.src].w}
                    height={DIMS[s.src].h}
                    sizes="(max-width: 640px) 118px, 200px"
                    priority={s.r === 0}
                    className="block h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>

      {/* ── body: sticky top rail + sections ─────────────────── */}
      <Shell>
        <div className="mt-[40px] sm:mt-[64px]">
          <CaseNav sections={SECTIONS} />

          <div className="mt-[48px] flex min-w-0 flex-col gap-[80px] sm:mt-[80px] sm:gap-[136px]">
            {/* ── problem ───────────────────────────────────── */}
            <section id="problem" className="flex scroll-mt-[96px] flex-col gap-[28px] sm:gap-[40px]">
              <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                <Heading>{c.problem.heading}</Heading>
                <p className="max-w-[58ch] text-[16px] leading-[1.6] text-ink-body sm:text-[18px]">
                  {c.problem.lede}
                </p>
              </div>

              <p className="font-display text-[40px] leading-[0.98] font-bold tracking-[-0.03em] text-accent text-balance sm:text-[72px]">
                {c.problem.question}
              </p>

              <div className="flex flex-col gap-[48px] sm:gap-[64px]">
                <PlatformShots
                  title={c.problem.platforms.title}
                  caption={c.problem.platforms.caption}
                />
                <EtaDrift {...c.problem.drift} />
              </div>
            </section>

            {/* ── goals ─────────────────────────────────────── */}
            <section id="goals" className="flex scroll-mt-[96px] flex-col gap-[28px] sm:gap-[40px]">
              <Heading>{c.goals.heading}</Heading>

              <div className="grid gap-[16px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-[20px]">
                <div className="flex flex-col justify-between gap-[28px] rounded-[var(--radius-tile)] bg-beyond-surface p-[22px] sm:p-[36px]">
                  {/* the same ticket, again and again — most of them ask one thing */}
                  <div aria-hidden className="flex flex-col items-start">
                    {[
                      "ml-[28px] -rotate-[3deg] opacity-40",
                      "ml-[14px] rotate-[2deg] opacity-70",
                      "relative border-ink font-semibold text-ink shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)]",
                    ].map((cls, i) => (
                      <span
                        key={i}
                        className={`-mb-[12px] flex items-center gap-[9px] rounded-[12px] border border-experience-border bg-white px-[14px] py-[10px] text-[13px] text-ink-body last:mb-0 sm:text-[15px] ${cls}`}
                      >
                        <span className="size-[6px] rounded-full bg-accent" />
                        {c.problem.question}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
                      {c.goals.business.title}
                    </h3>
                    <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-body sm:text-[16px]">
                      {c.goals.business.body}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[22px] rounded-[var(--radius-tile)] bg-accent-soft p-[22px] sm:p-[36px]">
                  <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
                    {c.goals.human.title}
                  </h3>
                  <div className="flex flex-col gap-[6px]">
                    <p className="text-[15px] text-ink-body sm:text-[16px]">{c.goals.human.lead}</p>
                    <ul className="flex flex-col">
                      {c.goals.human.things.map((t) => (
                        <li
                          key={t}
                          className="font-display text-[28px] leading-[1.08] font-bold tracking-[-0.02em] text-accent sm:text-[40px]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="max-w-[44ch] text-[15px] leading-[1.6] font-medium text-ink sm:text-[16px]">
                    {c.goals.human.close}
                  </p>
                </div>
              </div>
            </section>

            {/* ── research ──────────────────────────────────── */}
            <section id="research" className="scroll-mt-[96px]">
              <Band tone="black">
                <Heading light className="max-w-[18ch]">
                  {r.heading}
                </Heading>

                <div className="mt-[36px] flex flex-col sm:mt-[56px]">
                  {/* alter ego — as the dialogue it was */}
                  <div className="grid gap-[22px] border-t border-white/12 py-[30px] lg:grid-cols-[230px_1fr] lg:gap-[48px] lg:py-[44px]">
                    <h3 className="font-display text-[22px] leading-[1.15] font-bold text-white sm:text-[28px]">
                      {r.alterEgo.title}
                    </h3>
                    <div className="flex flex-col gap-[22px]">
                      <div className="flex flex-col gap-[14px]">
                        {r.alterEgo.dialogue.map((x) => (
                          <div key={x.q} className="flex flex-col gap-[14px]">
                            <div className="flex flex-col items-start gap-[6px]">
                              <span className="font-mono text-[12px] text-white/60">Alter ego</span>
                              <p className="max-w-[44ch] rounded-[18px] rounded-tl-[4px] bg-white/[0.09] px-[16px] py-[12px] text-[15px] leading-[1.5] text-white sm:text-[16px]">
                                {x.q}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-[6px]">
                              <span className="font-mono text-[12px] text-white/60">Me</span>
                              <p className="max-w-[44ch] rounded-[18px] rounded-tr-[4px] bg-accent-lime px-[16px] py-[12px] text-[15px] leading-[1.5] font-medium text-ink sm:text-[16px]">
                                {x.a}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Verdict>{r.alterEgo.verdict}</Verdict>
                    </div>
                  </div>

                  {/* customer service — the failure modes, as the tickets they were */}
                  <div className="grid gap-[22px] border-t border-white/12 py-[30px] lg:grid-cols-[230px_1fr] lg:gap-[48px] lg:py-[44px]">
                    <h3 className="font-display text-[22px] leading-[1.15] font-bold text-white sm:text-[28px]">
                      {r.support.title}
                    </h3>
                    <div className="flex flex-col gap-[20px]">
                      <p className="max-w-[56ch] text-[15px] leading-[1.6] text-white/80 sm:text-[16px]">
                        {r.support.body}
                      </p>
                      <ul className="flex flex-wrap gap-[10px]">
                        {r.support.tickets.map((t) => {
                          const theQuestion = t === c.problem.question;
                          return (
                            <li
                              key={t}
                              className={`flex items-center gap-[10px] rounded-[12px] border px-[14px] py-[10px] text-[13px] sm:text-[15px] ${
                                theQuestion
                                  ? "border-accent-lime bg-accent-lime/10 font-semibold text-accent-lime"
                                  : "border-white/15 text-white"
                              }`}
                            >
                              <span
                                aria-hidden
                                className={`size-[6px] rounded-full ${theQuestion ? "bg-accent-lime" : "bg-white/50"}`}
                              />
                              {t}
                            </li>
                          );
                        })}
                      </ul>
                      <Verdict>{r.support.verdict}</Verdict>
                    </div>
                  </div>

                  {/* customers — seven conversations, five of them quiet */}
                  <div className="grid gap-[22px] border-t border-white/12 pt-[30px] lg:grid-cols-[230px_1fr] lg:gap-[48px] lg:pt-[44px]">
                    <h3 className="font-display text-[22px] leading-[1.15] font-bold text-white sm:text-[28px]">
                      {r.customers.title}
                    </h3>
                    <div className="flex flex-col gap-[22px]">
                      <div className="flex flex-col gap-[14px]">
                        <ol className="flex flex-wrap gap-[8px]" aria-label="Seven customer conversations">
                          {Array.from({ length: r.customers.total }).map((_, i) => {
                            const quiet = i < r.customers.quiet;
                            return (
                              <li
                                key={i}
                                className={`font-mono grid size-[36px] place-items-center rounded-full text-[12px] sm:size-[40px] sm:text-[13px] ${
                                  quiet ? "bg-white/10 text-white/60" : "bg-accent-lime font-semibold text-ink"
                                }`}
                              >
                                {i + 1}
                              </li>
                            );
                          })}
                        </ol>
                        <p className="text-[15px] leading-[1.5] text-white/80 sm:text-[16px]">
                          The first five: &ldquo;{r.customers.quietQuote.text}&rdquo;{" "}
                          <span className="font-semibold text-accent-lime">{r.customers.quietQuote.aside}</span>
                        </p>
                      </div>

                      <div className="grid gap-[12px] sm:grid-cols-2">
                        {r.customers.quotes.map((q) => (
                          <blockquote
                            key={q.who}
                            className="flex flex-col justify-between gap-[14px] rounded-[16px] bg-white/[0.07] p-[18px] sm:p-[22px]"
                          >
                            <p className="font-display text-[18px] leading-[1.35] font-semibold text-white sm:text-[18px]">
                              &ldquo;{q.text}&rdquo;
                            </p>
                            <footer className="font-mono text-[12px] text-accent-lime">{q.who}</footer>
                          </blockquote>
                        ))}
                      </div>
                      <Verdict>{r.customers.verdict}</Verdict>
                    </div>
                  </div>
                </div>
              </Band>
            </section>

            {/* ── the turn ──────────────────────────────────── */}
            <section id="turn" className="flex scroll-mt-[96px] flex-col gap-[32px] sm:gap-[48px]">
              <Heading>{c.turn.heading}</Heading>

              <div className="flex flex-col gap-[20px] sm:flex-row sm:gap-[56px]">
                {c.turn.benchmarks.map((b) => (
                  <div key={b.label} className="flex flex-col gap-[10px]">
                    <p className="text-[13px] text-ink-body">{b.label}</p>
                    <ul className="flex flex-wrap gap-[8px]">
                      {b.names.map((n) => (
                        <li
                          key={n}
                          className="rounded-full border border-chip-idle-border bg-chip-idle px-[14px] py-[7px] text-[13px] font-medium text-ink sm:text-[13px]"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <StoryTrack beats={c.turn.beats} />

              <Band tone="blue" className="mt-[8px]">
                <div className="grid gap-[24px] lg:grid-cols-[auto_1fr] lg:items-center lg:gap-[64px]">
                  <h3 className="font-display text-[40px] leading-[0.95] font-bold tracking-[-0.03em] text-white sm:text-[72px]">
                    <span className="text-accent-lime">{c.execution.figure}</span> {c.execution.unit}
                  </h3>
                  <div className="flex flex-col gap-[20px]">
                    <p className="max-w-[56ch] text-[16px] leading-[1.6] text-white sm:text-[18px]">
                      {c.execution.body}
                    </p>
                    <ul className="flex flex-wrap gap-[10px]">
                      {c.execution.who.map((w) => (
                        <li
                          key={w}
                          className="rounded-full border border-white/30 px-[15px] py-[8px] text-[13px] font-medium text-white sm:text-[13px]"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Band>
            </section>

            {/* ── anatomy ───────────────────────────────────── */}
            <section id="anatomy" className="flex scroll-mt-[96px] flex-col gap-[48px] sm:gap-[88px]">
              <Heading>{c.anatomy.heading}</Heading>

              {/* the map — a phone-width fragment, its three behaviours beside it */}
              <div className="flex flex-col gap-[28px] lg:flex-row-reverse lg:items-center lg:gap-[72px]">
                <div className="mx-auto w-full max-w-[420px] shrink-0 lg:mx-0">
                  <Piece src={c.anatomy.map.image} alt={c.anatomy.map.alt} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[26px]">
                  <div className="flex flex-col gap-[8px]">
                    <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
                      {c.anatomy.map.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">{c.anatomy.map.body}</p>
                  </div>
                  <ul className="flex flex-col gap-[20px]">
                    {c.anatomy.map.points.map((pt, i) => (
                      <li key={pt.title} className="flex gap-[16px]">
                        <span className="grid size-[42px] shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Icon name={MAP_ICONS[i]} className="size-[20px]" />
                        </span>
                        <div className="flex flex-col gap-[4px] pt-[2px]">
                          <p className="text-[16px] font-bold text-ink sm:text-[16px]">{pt.title}</p>
                          <p className="text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">{pt.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* the tracking card — isolated, pinned */}
              <div className="flex flex-col gap-[28px]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
                    {c.anatomy.card.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">{c.anatomy.card.body}</p>
                </div>
                <AnnotatedCard
                  src={c.anatomy.card.image}
                  alt={c.anatomy.card.alt}
                  width={984}
                  height={735}
                  annotations={c.anatomy.card.annotations}
                />
              </div>

              {/* the timeline — a tall fragment beside its notes */}
              <div className="flex flex-col gap-[28px] lg:flex-row lg:items-center lg:gap-[72px]">
                <div className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                  <Piece src={c.anatomy.timeline.image} alt={c.anatomy.timeline.alt} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
                      {c.anatomy.timeline.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
                      {c.anatomy.timeline.body}
                    </p>
                  </div>
                  <ul className="flex flex-col divide-y divide-shell-border border-y border-shell-border">
                    {c.anatomy.timeline.points.map((pt) => (
                      <li key={pt.title} className="flex flex-col gap-[6px] py-[18px] sm:flex-row sm:gap-[28px]">
                        <p className="shrink-0 text-[16px] font-bold text-ink sm:w-[190px] sm:text-[16px]">
                          {pt.title}
                        </p>
                        <p className="text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">{pt.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* the whole thing, assembled */}
              <div className="rounded-[var(--radius-card)] bg-beyond-surface p-[24px] sm:p-[56px]">
                <div className="flex flex-col items-center gap-[32px] lg:flex-row lg:gap-[72px]">
                  <div className="order-2 flex flex-1 flex-col gap-[16px] lg:order-1">
                    <h3 className="font-display text-[28px] leading-[1.08] font-bold text-ink sm:text-[40px]">
                      {c.anatomy.whole.title}
                    </h3>
                    <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
                      {c.anatomy.whole.body}
                    </p>
                    <ul className="mt-[6px] flex flex-wrap gap-[8px]">
                      {[c.anatomy.map.title, c.anatomy.card.title, c.anatomy.timeline.title].map((x) => (
                        <li
                          key={x}
                          className="rounded-full border border-chip-idle-border bg-white px-[14px] py-[7px] text-[13px] font-medium text-ink"
                        >
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 w-full max-w-[280px] shrink-0 lg:order-2">
                    <Image
                      src={c.anatomy.whole.image}
                      alt={c.anatomy.whole.alt}
                      width={DIMS[c.anatomy.whole.image].w}
                      height={DIMS[c.anatomy.whole.image].h}
                      sizes="280px"
                      className="block h-auto w-full rounded-[20px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── the flow ──────────────────────────────────── */}
            <section id="flow" className="scroll-mt-[96px]">
              <Band tone="blue">
                <div className="flex flex-col gap-[12px] sm:gap-[16px]">
                  <Heading light>{c.flow.heading}</Heading>
                  <p className="max-w-[54ch] text-[15px] leading-[1.6] text-white/80 sm:text-[18px]">
                    {c.flow.intro}
                  </p>
                </div>

                <div className="mt-[32px] sm:mt-[48px]">
                  <JourneyRail screens={c.flow.screens} dims={DIMS} />
                </div>

                <div className="mt-[40px] grid gap-[24px] border-t border-white/20 pt-[32px] sm:mt-[56px] sm:pt-[44px] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-[56px]">
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="font-display text-[22px] leading-[1.1] font-bold text-white sm:text-[28px]">
                      {c.flow.journeys.title}
                    </h3>
                    <p className="max-w-[42ch] text-[15px] leading-[1.6] text-white/80 sm:text-[16px]">
                      {c.flow.journeys.body}
                    </p>
                  </div>
                  <div className="flex gap-[14px] sm:gap-[18px]">
                    {c.flow.journeys.screens.map((s) => (
                      <figure key={s.src} className="flex w-[140px] flex-col gap-[10px] sm:w-[170px]">
                        <div className="aspect-[9/19.5] overflow-hidden rounded-[16px] bg-white shadow-[0_22px_44px_-22px_rgba(0,0,0,0.55)]">
                          <Image
                            src={s.src}
                            alt={`B2C — ${s.state}`}
                            width={DIMS[s.src].w}
                            height={DIMS[s.src].h}
                            sizes="170px"
                            className="block size-full object-cover object-top"
                          />
                        </div>
                        <figcaption className="flex flex-col gap-[2px]">
                          <span className="font-mono text-[12px] text-white/70">B2C</span>
                          <span className="text-[13px] font-semibold text-white sm:text-[13px]">{s.state}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </Band>
            </section>

            {/* ── edge cases ────────────────────────────────── */}
            <section id="edge" className="scroll-mt-[96px]">
              <div className="flex flex-col gap-[32px] lg:flex-row lg:items-start lg:gap-[72px]">
                <div className="mx-auto w-full max-w-[290px] shrink-0 overflow-hidden rounded-[var(--radius-media)] border border-shell-border lg:mx-0">
                  <Image
                    src={c.edge.image}
                    alt={c.edge.alt}
                    width={DIMS[c.edge.image].w}
                    height={DIMS[c.edge.image].h}
                    sizes="290px"
                    className="block h-auto w-full"
                  />
                </div>
                {/* the screen is tall, so the copy holds still beside it */}
                <div className="flex min-w-0 flex-1 flex-col gap-[24px] lg:sticky lg:top-[120px]">
                  <div className="flex flex-col gap-[14px]">
                    <Heading>{c.edge.heading}</Heading>
                    <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
                      {c.edge.body}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
                    {c.edge.cases.map((cs) => (
                      <li
                        key={cs.id}
                        className="flex flex-col gap-[16px] rounded-[16px] bg-beyond-surface p-[16px] transition-colors duration-300 hover:bg-accent-soft"
                      >
                        <Icon name={cs.id as IconName} className="size-[22px] text-accent" />
                        <span className="text-[13px] leading-[1.25] font-semibold text-ink sm:text-[15px]">
                          {cs.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── impact — the question from the top, answered ──── */}
            <section id="impact" className="scroll-mt-[96px]">
              <Band tone="blue">
                <div className="grid gap-[40px] lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-[72px]">
                  <div className="flex flex-col gap-[20px]">
                    <h2 className="font-display text-[40px] leading-[0.98] font-bold tracking-[-0.03em] text-balance text-white sm:text-[72px]">
                      {c.impact.question}
                    </h2>
                    <p className="flex max-w-[40ch] items-start gap-[12px] text-[16px] leading-[1.5] text-white/80 sm:text-[18px]">
                      <span className="mt-[2px] grid size-[24px] shrink-0 place-items-center rounded-full bg-accent-lime text-ink sm:mt-[4px]">
                        <Icon name="check" className="size-[14px]" />
                      </span>
                      <span>
                        {c.impact.lead}{" "}
                        <span className="font-semibold text-white">{c.impact.answer}</span>
                      </span>
                    </p>
                  </div>
                  <TicketBars stat={c.impact.stat} label={c.impact.statLabel} />
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
