import type { Metadata } from "next";
import Image from "next/image";
import { AnnotatedCard } from "@/components/AnnotatedCard";
import { CaseNav, type CaseSection } from "@/components/CaseNav";
import { Logo } from "@/components/Logo";
import { MoreWork } from "@/components/MoreWork";
import { orderTracking as c } from "@/content/orderTracking";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${c.title} — ${site.name}`,
  description: c.subtitle.join(" "),
};

const SECTIONS: readonly CaseSection[] = [
  { id: "context", label: "Context" },
  { id: "challenges", label: "Challenges" },
  { id: "goals", label: "Goals" },
  { id: "approach", label: "Approach" },
  { id: "turn", label: "The turn" },
  { id: "anatomy", label: "Anatomy" },
  { id: "flow", label: "The flow" },
  { id: "edge", label: "Edge cases" },
  { id: "impact", label: "Impact" },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1190px] px-[16px] sm:px-[20px]">
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[12px] tracking-[0.14em] text-accent uppercase">
      {children}
    </p>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[84px]">
      <Eyebrow>{label}</Eyebrow>
      {title ? (
        <h2 className="font-display mt-[10px] text-[28px] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-[42px]">
          {title}
        </h2>
      ) : null}
      <div className="mt-[20px] flex flex-col gap-[20px] sm:mt-[28px] sm:gap-[28px]">
        {children}
      </div>
    </section>
  );
}

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

function Screen({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const d = DIMS[src];
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-media)] border border-shell-border bg-beyond-surface ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={d.w}
        height={d.h}
        className="block h-auto w-full"
      />
    </div>
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

export default function OrderTrackingPage() {
  return (
    <main className="pb-[64px] sm:pb-[104px]">
      {/* ── hero ─────────────────────────────────────────────── */}
      <Shell>
        <div className="mt-[16px] flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white sm:mt-[28px]">
          <nav className="flex items-center justify-between border-b border-nav-border px-[16px] py-[16px] sm:px-[32px] sm:py-[22px]">
            <a href="/" className="flex items-center text-ink">
              <Logo className="h-[20px] w-auto sm:h-[24px]" />
              <span className="sr-only">{site.name} — home</span>
            </a>
            <a
              href="/#work"
              className="font-mono rounded-full px-[14px] py-[7px] text-[12px] tracking-[0.1em] text-ink-nav uppercase transition-colors hover:bg-[#f0f0f0] hover:text-ink"
            >
              ← All work
            </a>
          </nav>

          <div className="flex flex-col gap-[20px] px-[16px] pt-[32px] sm:gap-[26px] sm:px-[48px] sm:pt-[56px]">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="font-display max-w-[820px] text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-[62px]">
              {c.title}
            </h1>
            <p className="max-w-[620px] text-[14px] leading-[1.6] text-ink-body sm:text-[17px]">
              {c.subtitle.join(" ")}
            </p>

            <dl className="grid grid-cols-2 gap-x-[20px] gap-y-[18px] border-t border-shell-border pt-[24px] sm:grid-cols-4 sm:gap-x-[28px]">
              {c.meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-[4px]">
                  <dt className="font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase sm:text-[11px]">
                    {m.label}
                  </dt>
                  <dd className="text-[14px] font-semibold text-ink sm:text-[16px]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* hero image — the project's own banner colours, screens fanned out */}
          <div
            className="relative mt-[28px] h-[240px] overflow-hidden sm:mt-[44px] sm:h-[360px]"
            style={{ background: "#4354EE" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized in % */}
            <img
              src="/assets/work/grid.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
            />

            <div className="absolute inset-x-0 top-[28px] flex items-start justify-center gap-[14px] sm:top-[44px] sm:gap-[26px]">
              {[
                { src: "/assets/work/tracking/01-placed.png", r: -7, y: 14 },
                { src: "/assets/work/tracking/03-on-the-way.png", r: 0, y: 0 },
                { src: "/assets/work/tracking/06-delivered.png", r: 7, y: 14 },
              ].map((s) => (
                <div
                  key={s.src}
                  style={{ transform: `rotate(${s.r}deg) translateY(${s.y}px)` }}
                  className="w-[112px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] sm:w-[172px] sm:rounded-[20px]"
                >
                  <Image
                    src={s.src}
                    alt=""
                    aria-hidden
                    width={DIMS[s.src].w}
                    height={DIMS[s.src].h}
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

          <div className="mt-[44px] flex min-w-0 flex-col gap-[56px] sm:mt-[72px] sm:gap-[104px]">
            {/* context */}
            <Section id="context" label={c.context.label}>
              <p className="max-w-[820px] text-[18px] leading-[1.5] font-medium text-ink sm:text-[26px]">
                {c.context.body}
              </p>
              <p className="font-display max-w-[720px] border-l-[3px] border-accent pl-[20px] text-[22px] leading-[1.2] font-bold text-ink sm:text-[36px]">
                {c.context.pull}
              </p>
            </Section>

            {/* challenges */}
            <Section id="challenges" label={c.challenges.label}>
              <div className="grid gap-[16px] lg:grid-cols-2 lg:gap-[20px]">
                {c.challenges.items.map((item) => (
                  <div
                    key={item.n}
                    className="flex flex-col gap-[12px] rounded-[var(--radius-tile)] border border-experience-border bg-white p-[20px] transition-colors duration-300 hover:border-accent sm:p-[32px]"
                  >
                    <span className="font-mono text-[12px] text-accent">
                      {item.n}
                    </span>
                    <h3 className="font-display text-[20px] font-bold text-ink sm:text-[26px]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[16px]">
                      {item.body}
                    </p>

                    {"timeline" in item ? (
                      <ul className="mt-[8px] flex flex-col gap-[10px] border-t border-dashed border-[#d9d9d9] pt-[16px]">
                        {item.timeline.map((t, i) => (
                          <li
                            key={t.date}
                            className="flex gap-[12px] text-[13px] sm:text-[14px]"
                          >
                            <span className="font-mono w-[52px] shrink-0 font-medium text-ink">
                              {t.date}
                            </span>
                            <span
                              className={
                                i === item.timeline.length - 1
                                  ? "font-medium text-accent"
                                  : "text-ink-muted"
                              }
                            >
                              {t.note}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>

            {/* goals */}
            <Section id="goals" label={c.goals.label}>
              <div className="grid gap-[16px] lg:grid-cols-2 lg:gap-[20px]">
                {c.goals.items.map((g, i) => (
                  <div
                    key={g.kind}
                    className="flex flex-col gap-[10px] rounded-[var(--radius-tile)] p-[20px] sm:p-[32px]"
                    style={{
                      background: i === 0 ? "var(--color-beyond-surface)" : "var(--color-accent-soft)",
                    }}
                  >
                    <span
                      className="font-mono w-fit rounded-full px-[12px] py-[5px] text-[10px] tracking-[0.12em] uppercase"
                      style={{
                        background: i === 0 ? "#000" : "var(--color-accent)",
                        color: "#fff",
                      }}
                    >
                      {g.kind}
                    </span>
                    <h3 className="font-display mt-[4px] text-[20px] font-bold text-ink sm:text-[26px]">
                      {g.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[16px]">
                      {g.body}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* approach */}
            <Section id="approach" label={c.approach.label}>
              <p className="max-w-[620px] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
                {c.approach.intro}
              </p>

              <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                {c.approach.tracks.map((t) => (
                  <div
                    key={t.n}
                    className="group flex flex-col gap-[16px] rounded-[var(--radius-tile)] border border-experience-border p-[20px] transition-colors duration-300 hover:border-accent sm:flex-row sm:gap-[40px] sm:p-[32px]"
                  >
                    <div className="flex shrink-0 flex-col gap-[6px] sm:w-[210px]">
                      <span className="font-mono text-[12px] text-accent">
                        {t.n}
                      </span>
                      <h3 className="font-display text-[19px] leading-[1.2] font-bold text-ink sm:text-[23px]">
                        {t.title}
                      </h3>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
                      {"body" in t ? (
                        <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[16px]">
                          {t.body}
                        </p>
                      ) : null}

                      {"qa" in t
                        ? t.qa.map((x) => (
                            <div key={x.q} className="flex flex-col gap-[6px]">
                              <p className="text-[14px] font-semibold text-ink sm:text-[16px]">
                                {x.q}
                              </p>
                              <p className="border-l-2 border-accent/30 pl-[14px] text-[14px] leading-[1.6] text-ink-body sm:text-[15px]">
                                {x.a}
                              </p>
                            </div>
                          ))
                        : null}

                      {"list" in t ? (
                        <ul className="flex flex-wrap gap-[8px]">
                          {t.list.map((x) => (
                            <li
                              key={x}
                              className="rounded-full bg-accent-soft px-[13px] py-[6px] text-[12px] text-accent-ink sm:text-[13px]"
                            >
                              {x}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {"quotes" in t
                        ? t.quotes.map((q) => (
                            <div key={q.who} className="flex flex-col gap-[4px]">
                              <p className="font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase">
                                {q.who}
                              </p>
                              <p className="font-display text-[17px] leading-[1.35] font-semibold text-ink sm:text-[20px]">
                                &ldquo;{q.text}&rdquo;
                                {"aside" in q ? (
                                  <span className="text-accent"> {q.aside}</span>
                                ) : null}
                              </p>
                            </div>
                          ))
                        : null}

                      <p className="mt-[4px] flex items-baseline gap-[8px] text-[14px] sm:text-[15px]">
                        <span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
                          Verdict
                        </span>
                        <span className="text-ink-body">{t.verdict}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* the turn */}
            <Section id="turn" label={c.pivot.label}>
              <div className="flex flex-wrap gap-[24px] sm:gap-[48px]">
                {(
                  [
                    ["Primary", c.pivot.benchmarks.primary],
                    ["Secondary", c.pivot.benchmarks.secondary],
                  ] as const
                ).map(([kind, names]) => (
                  <div key={kind} className="flex flex-col gap-[8px]">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase">
                      {kind} benchmarking
                    </p>
                    <ul className="flex flex-wrap gap-[8px]">
                      {names.map((n) => (
                        <li
                          key={n}
                          className="rounded-full border border-chip-idle-border bg-chip-idle px-[13px] py-[6px] text-[12px] text-ink sm:text-[13px]"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <ol className="flex flex-col">
                {c.pivot.steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={`flex flex-col gap-[6px] py-[20px] sm:flex-row sm:gap-[40px] ${
                      i > 0 ? "border-t border-dashed border-[#d2d2d2]" : ""
                    }`}
                  >
                    <h3 className="flex shrink-0 items-baseline gap-[10px] text-[16px] font-bold text-ink sm:w-[220px] sm:text-[18px]">
                      <span className="font-mono text-[11px] font-normal text-accent">
                        {`0${i + 1}`}
                      </span>
                      {s.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[16px]">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>

              {/* execution slab */}
              <div className="mt-[8px] flex flex-col gap-[20px] rounded-[var(--radius-card)] bg-ink p-[20px] sm:gap-[26px] sm:p-[48px]">
                <p className="font-mono text-[12px] tracking-[0.14em] text-accent-lime uppercase">
                  {c.execution.label}
                </p>
                <p className="max-w-[820px] text-[16px] leading-[1.6] text-white sm:text-[21px]">
                  {c.execution.body}
                </p>
                <ul className="flex flex-wrap gap-[10px]">
                  {c.execution.sections.map((s, i) => (
                    <li
                      key={s}
                      className="flex items-center gap-[8px] rounded-full border border-white/20 px-[16px] py-[9px] text-[13px] text-white sm:text-[15px]"
                    >
                      <span className="font-mono text-[11px] text-accent-lime">
                        {`0${i + 1}`}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* anatomy — each part in isolation, then the assembled screen */}
            <Section id="anatomy" label={c.anatomy.label}>
              <div className="flex flex-col gap-[44px] sm:gap-[80px]">
                {c.anatomy.parts.map((p) => {
                  const heading = (
                    <>
                      <span className="font-mono text-[12px] text-accent">
                        {p.n}
                      </span>
                      <h3 className="font-display text-[24px] leading-[1.15] font-bold text-ink sm:text-[34px]">
                        {p.title}
                      </h3>
                      <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[17px]">
                        {p.body}
                      </p>
                    </>
                  );

                  const points = (
                    <ul className="flex flex-col gap-[16px]">
                      {p.points.map((pt) => (
                        <li
                          key={pt.title}
                          className="flex flex-col gap-[4px] border-l-2 border-accent/25 pl-[16px]"
                        >
                          <p className="text-[15px] font-bold text-ink sm:text-[16px]">
                            {pt.title}
                          </p>
                          <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[15px]">
                            {pt.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  );

                  // The tracking card — isolated, with callouts that reveal on hover.
                  if ("annotations" in p) {
                    return (
                      <div key={p.n} className="flex flex-col gap-[28px]">
                        <div className="flex max-w-[620px] flex-col gap-[14px]">
                          {heading}
                        </div>
                        <div className="grid gap-[28px] lg:grid-cols-[1fr_300px] lg:items-start lg:gap-[48px]">
                          <AnnotatedCard
                            src={p.image}
                            alt={p.alt}
                            width={984}
                            height={735}
                            annotations={p.annotations}
                          />
                          <div className="lg:pt-[6px]">{points}</div>
                        </div>
                      </div>
                    );
                  }

                  const landscape = DIMS[p.image].w >= DIMS[p.image].h;

                  // The map — a wide fragment, shown full width with points beneath.
                  if (landscape) {
                    return (
                      <div key={p.n} className="flex flex-col gap-[28px]">
                        <div className="flex max-w-[620px] flex-col gap-[14px]">
                          {heading}
                        </div>
                        <Piece src={p.image} alt={p.alt} />
                        <div className="grid gap-[16px] sm:grid-cols-2 sm:gap-[28px]">
                          {p.points.map((pt) => (
                            <div
                              key={pt.title}
                              className="flex flex-col gap-[4px] border-l-2 border-accent/25 pl-[16px]"
                            >
                              <p className="text-[15px] font-bold text-ink sm:text-[16px]">
                                {pt.title}
                              </p>
                              <p className="text-[14px] leading-[1.6] text-ink-body sm:text-[15px]">
                                {pt.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // The timeline — a tall fragment beside its notes.
                  return (
                    <div
                      key={p.n}
                      className="flex flex-col gap-[24px] lg:flex-row lg:items-center lg:gap-[56px]"
                    >
                      <div className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                        <Piece src={p.image} alt={p.alt} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
                        {heading}
                        {points}
                      </div>
                    </div>
                  );
                })}

                {/* the whole thing, assembled */}
                <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-beyond-surface p-[24px] sm:p-[48px]">
                  <div className="flex flex-col items-center gap-[28px] lg:flex-row lg:gap-[56px]">
                    <div className="order-2 flex flex-1 flex-col gap-[16px] lg:order-1">
                      <span className="font-mono text-[12px] text-accent">04</span>
                      <h3 className="font-display text-[24px] leading-[1.15] font-bold text-ink sm:text-[34px]">
                        {c.anatomy.whole.title}
                      </h3>
                      <p className="max-w-[460px] text-[15px] leading-[1.6] text-ink-body sm:text-[17px]">
                        {c.anatomy.whole.body}
                      </p>
                      <ul className="mt-[4px] flex flex-wrap gap-[8px]">
                        {c.anatomy.whole.parts.map((x, idx) => (
                          <li
                            key={x}
                            className="flex items-center gap-[8px] rounded-full border border-chip-idle-border bg-white px-[14px] py-[7px] text-[13px] text-ink"
                          >
                            <span className="font-mono text-[11px] text-accent">
                              {`0${idx + 1}`}
                            </span>
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-1 w-full max-w-[272px] shrink-0 lg:order-2">
                      <Image
                        src={c.anatomy.whole.image}
                        alt={c.anatomy.whole.alt}
                        width={DIMS[c.anatomy.whole.image].w}
                        height={DIMS[c.anatomy.whole.image].h}
                        className="block h-auto w-full rounded-[18px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* the flow */}
            <Section id="flow" label={c.flow.label}>
              <p className="max-w-[620px] text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">
                {c.flow.intro}
              </p>
              <ol className="-mx-[16px] flex gap-[14px] overflow-x-auto px-[16px] pb-[10px] sm:mx-0 sm:gap-[20px] sm:px-0">
                {c.flow.screens.map((s, i) => (
                  <li
                    key={s.src}
                    className="group flex w-[176px] shrink-0 flex-col gap-[12px] sm:w-[215px]"
                  >
                    <Screen
                      src={s.src}
                      alt={`${s.state} screen`}
                      className="transition-transform duration-300 group-hover:-translate-y-[6px]"
                    />
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-[13px] font-semibold text-ink sm:text-[15px]">
                        <span className="font-mono text-[11px] text-accent">
                          {`0${i + 1} `}
                        </span>
                        {s.state}
                      </p>
                      <p className="text-[12px] leading-[1.45] text-ink-muted sm:text-[13px]">
                        {s.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* two journeys */}
              <div className="mt-[16px] flex flex-col gap-[20px] rounded-[var(--radius-tile)] bg-beyond-surface p-[20px] sm:p-[32px]">
                <div className="flex flex-col gap-[8px]">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-ink-muted uppercase">
                    {c.b2c.label}
                  </p>
                  <p className="max-w-[720px] text-[14px] leading-[1.6] text-ink-body sm:text-[16px]">
                    {c.b2c.body}
                  </p>
                </div>
                <div className="flex flex-wrap items-start gap-[16px] sm:gap-[24px]">
                  {c.b2c.screens.map((s) => (
                    <div
                      key={s.src}
                      className="flex w-[152px] flex-col gap-[10px] sm:w-[200px]"
                    >
                      <Screen src={s.src} alt={s.state} />
                      <p className="text-[12px] font-semibold text-ink sm:text-[13px]">
                        {s.state}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* edge cases */}
            <Section id="edge" label={c.wrong.label}>
              <div className="flex flex-col gap-[24px] lg:flex-row lg:items-center lg:gap-[56px]">
                <Screen
                  src={c.wrong.image}
                  alt={c.wrong.alt}
                  className="w-full shrink-0 lg:w-[270px]"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-[20px]">
                  <p className="text-[16px] leading-[1.6] text-ink-body sm:text-[19px]">
                    {c.wrong.body}
                  </p>
                  <ul className="flex flex-wrap gap-[8px]">
                    {c.wrong.cases.map((x) => (
                      <li
                        key={x}
                        className="rounded-full border border-chip-idle-border bg-chip-idle px-[14px] py-[7px] text-[12px] font-medium text-ink transition-colors duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent-ink sm:text-[14px]"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* impact */}
            <Section id="impact" label={c.result.label}>
              <div
                className="relative flex flex-col items-start gap-[14px] overflow-hidden rounded-[var(--radius-card)] p-[24px] sm:gap-[18px] sm:p-[56px]"
                style={{ background: "#4354EE" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
                <img
                  src="/assets/work/grid.svg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
                />
                <p
                  className="font-display relative text-[68px] leading-[0.9] font-bold tracking-[-0.03em] sm:text-[132px]"
                  style={{ color: "#96FF9A" }}
                >
                  {c.result.stat}
                </p>
                <p className="font-display relative text-[20px] leading-[1.2] font-semibold text-white sm:text-[30px]">
                  {c.result.statLabel}
                </p>
                <p className="relative max-w-[620px] text-[14px] leading-[1.6] text-white/75 sm:text-[17px]">
                  {c.result.body}
                </p>
              </div>
            </Section>

            <MoreWork exclude={c.slug} />
          </div>
        </div>
      </Shell>
    </main>
  );
}
