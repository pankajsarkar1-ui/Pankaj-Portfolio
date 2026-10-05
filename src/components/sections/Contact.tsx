"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { BackToTop } from "@/components/BackToTop";
import { CopyButton } from "@/components/CopyButton";
import { LottieMark } from "@/components/LottieMark";
import { site } from "@/content/site";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Coffee bean: a filled oval split by the S-shaped crease. */
function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 22" className={className} aria-hidden>
      <ellipse cx="8" cy="11" rx="6.2" ry="9.6" fill="currentColor" />
      <path
        d="M8 2.4C5.5 5.8 5.5 8 8 11s2.5 5.2 0 8.6"
        fill="none"
        stroke="#08080a"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <g {...stroke}>
        <rect x="2.5" y="4.8" width="15" height="10.4" rx="2.2" />
        <path d="M3.4 6.4l6.6 4.6 6.6-4.6" />
      </g>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9.2h3.6V21H3.2zM9.3 9.2h3.45v1.62h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.1 4.33 4.84V21h-3.6v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke} strokeWidth={1.6}>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
      </g>
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<
  string,
  ({ className }: { className?: string }) => React.ReactElement
> = { linkedin: LinkedInIcon, instagram: InstagramIcon };

/** The drink you pick is the length — and the honesty level — of the chat. */
const DRINKS = [
  {
    id: "coffee",
    label: "Coffee",
    lottie: "/assets/lottie/coffee.json",
    // Cup and glasses carry more ink than the chai, so they are trimmed back
    // to sit at the same visual weight rather than the same measured height.
    scale: 0.8,
    time: "2 hours",
    honesty: "Diplomatic",
    ticket: "C-024",
    title: "The sensible one",
    blurb: 'A proper portfolio review. I\'ll say "it depends" at least four times.',
  },
  {
    id: "chai",
    label: "Chai",
    lottie: "/assets/lottie/tea.json",
    scale: 1,
    time: "60 min",
    honesty: "Candid",
    ticket: "T-017",
    title: "Cutting chai",
    blurb: "One cup, one hour, and we'll have solved half of it.",
  },
  {
    id: "beer",
    label: "Beer",
    lottie: "/assets/lottie/cheers.json",
    scale: 0.8,
    time: "No cap",
    honesty: "Brutal",
    ticket: "B-009",
    title: "No filter",
    blurb: "Two in and I'll tell you what I really think of your design system.",
  },
];

/** Chai steam: thin wisps off the top of the chip, each swaying a different
 *  way so they curl instead of rising in parallel. */
const STEAM = [
  { w: 3, h: 15, x: -24, sway: 9, dy: -60, delay: 0, dur: 1800 },
  { w: 4, h: 19, x: -7, sway: -10, dy: -76, delay: 200, dur: 2000 },
  { w: 3, h: 16, x: 11, sway: 8, dy: -64, delay: 400, dur: 1850 },
  { w: 2, h: 12, x: 27, sway: -7, dy: -52, delay: 620, dur: 1700 },
];

/** Coffee beans tumbling into the chip from above. `w` is the bean's width;
 *  height follows the 16:22 viewBox. `r0`/`r1` are its spin. */
const BEANS = [
  { w: 17, x: -22, from: -118, dx: 4, r0: -18, r1: 148, delay: 0, dur: 1400 },
  { w: 13, x: 3, from: -140, dx: -5, r0: 26, r1: -132, delay: 330, dur: 1550 },
  { w: 19, x: 26, from: -106, dx: 3, r0: -42, r1: 116, delay: 640, dur: 1320 },
  { w: 14, x: -38, from: -128, dx: -4, r0: 12, r1: 172, delay: 950, dur: 1480 },
];

/** Carbonation off the beer chip: `x` seeds each bubble across the chip,
 *  `dx`/`dy` are its drift and climb, and the sizes stay mixed so it reads
 *  like fizz rather than a uniform row. */
const FIZZ = [
  { size: 10, x: -62, dx: -8, dy: -150, delay: 0, dur: 1500 },
  { size: 6, x: -44, dx: 6, dy: -190, delay: 120, dur: 1700 },
  { size: 16, x: -28, dx: -10, dy: -130, delay: 60, dur: 1400 },
  { size: 8, x: -12, dx: 4, dy: -210, delay: 260, dur: 1800 },
  { size: 22, x: 2, dx: -6, dy: -160, delay: 40, dur: 1600 },
  { size: 7, x: 16, dx: 10, dy: -200, delay: 340, dur: 1650 },
  { size: 13, x: 32, dx: 8, dy: -140, delay: 180, dur: 1450 },
  { size: 9, x: 48, dx: -4, dy: -185, delay: 420, dur: 1700 },
  { size: 18, x: 64, dx: 12, dy: -120, delay: 100, dur: 1350 },
  { size: 5, x: -70, dx: 8, dy: -220, delay: 500, dur: 1800 },
  { size: 11, x: -36, dx: 12, dy: -175, delay: 560, dur: 1550 },
  { size: 14, x: 22, dx: -12, dy: -195, delay: 620, dur: 1700 },
  { size: 6, x: 56, dx: -8, dy: -230, delay: 700, dur: 1850 },
  { size: 20, x: -54, dx: 4, dy: -145, delay: 300, dur: 1500 },
  { size: 8, x: 8, dx: 14, dy: -165, delay: 760, dur: 1600 },
  { size: 12, x: -20, dx: -14, dy: -205, delay: 840, dur: 1750 },
];

/** The flourish that plays off the chip when a drink is picked. Anchored on
 *  the chip's centre (`x`/`y`), measured by the caller. */
function Burst({ drink, x, y }: { drink: string; x: number; y: number }) {
  const motion = "opacity-0 motion-reduce:[animation:none]";

  if (drink === "chai") {
    return (
      <>
        {STEAM.map((s, i) => (
          <span
            key={i}
            style={
              {
                width: s.w,
                height: s.h,
                left: x + s.x - s.w / 2,
                top: y - 20,
                "--sway": `${s.sway}px`,
                "--dy": `${s.dy}px`,
                animationDelay: `${s.delay}ms`,
                animationDuration: `${s.dur}ms`,
              } as CSSProperties
            }
            className={`absolute rounded-full bg-white/45 blur-[1.5px] [animation:steamRise_ease-out_infinite] ${motion}`}
          />
        ))}
      </>
    );
  }

  if (drink === "coffee") {
    return (
      <>
        {BEANS.map((b, i) => (
          <span
            key={i}
            style={
              {
                width: b.w,
                height: (b.w * 22) / 16,
                left: x + b.x - b.w / 2,
                top: y - 14,
                "--from": `${b.from}px`,
                "--dx": `${b.dx}px`,
                "--r0": `${b.r0}deg`,
                "--r1": `${b.r1}deg`,
                animationDelay: `${b.delay}ms`,
                animationDuration: `${b.dur}ms`,
              } as CSSProperties
            }
            className={`absolute text-white/85 [animation:beanDrop_ease-in_infinite] ${motion}`}
          >
            <Bean className="block size-full" />
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {FIZZ.map((b, i) => (
        <span
          key={i}
          style={
            {
              width: b.size,
              height: b.size,
              left: x + b.x - b.size / 2,
              top: y + 16 - b.size / 2,
              "--dx": `${b.dx}px`,
              "--dy": `${b.dy}px`,
              animationDelay: `${b.delay}ms`,
              animationDuration: `${b.dur}ms`,
            } as CSSProperties
          }
          className={`absolute rounded-full bg-white/70 [animation:bubbleRise_linear_both] ${motion}`}
        />
      ))}
    </>
  );
}

export function Contact() {
  const [drinkId, setDrinkId] = useState("coffee");
  const drink = DRINKS.find((d) => d.id === drinkId) ?? DRINKS[0];
  const [agenda, setAgenda] = useState("");

  // The flourish erupts from the big glass, so the stage is measured on click.
  // `key` increments per click so the burst remounts and replays.
  const stageRef = useRef<HTMLDivElement>(null);
  const burstKey = useRef(0);
  const [burst, setBurst] = useState<{
    key: number;
    drink: string;
    x: number;
    y: number;
  } | null>(null);

  // The receipt prints the first time the counter scrolls into view, then
  // reprints for every new order.
  const counterRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [printed, setPrinted] = useState(false);
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPrinted(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pickDrink = (id: string) => {
    setDrinkId(id);
    setPrinted(true);
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    burstKey.current += 1;
    setBurst({ key: burstKey.current, drink: id, x: r.width / 2, y: r.height / 2 });
  };

  const { headline, links } = site.contact;

  // Pre-composes the mail so the order, and the agenda, carry through to the inbox.
  const mailto = `${links[0].href}?subject=${encodeURIComponent(
    `Order #${drink.ticket}: ${drink.label} (${drink.time})`,
  )}&body=${encodeURIComponent(
    `Hi Pankaj,\n\nI'd like to grab a ${drink.label.toLowerCase()} \u2014 ${drink.time.toLowerCase()}.\n\nOn the agenda:\n${
      agenda.trim() || ""
    }\n\n`,
  )}`;

  const rows = [
    { k: `1 \u00d7 ${drink.label}`, v: drink.time },
    { k: "Honesty", v: drink.honesty },
    { k: "Opinions", v: "Unlimited" },
    { k: "Paid by", v: "Pankaj" },
  ];

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative flex flex-col gap-[36px] overflow-hidden rounded-[var(--radius-card)] bg-ink p-[20px] sm:gap-[56px] sm:p-[64px] lg:p-[74.667px]"
    >
      {/* a warm pool of light over the counter */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[30%] right-[-10%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(67,84,238,0.22),transparent)]"
      />

      {/* Stacked below xl: headline, menu, drink, receipt. From xl the menu and
          the receipt share a row, with the drink above the receipt beside the
          headline. */}
      <div
        ref={counterRef}
        className="relative grid gap-y-[28px] sm:gap-y-[40px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-x-[48px]"
      >
        <div className="flex flex-col gap-[12px] xl:col-span-2 xl:col-start-1 xl:row-start-1">
          <h2 className="font-display text-[40px] leading-[0.98] font-bold tracking-[-0.03em] text-white sm:text-[60px]">
            {headline}
          </h2>
          <p className="max-w-[40ch] text-[15px] leading-[1.55] text-white/55 sm:text-[18px] xl:max-w-[min(40ch,calc(100%-420px))]">
            Pick your poison and place the order. I&nbsp;bring the opinions; the bill is on&nbsp;me.
          </p>
        </div>

        {/* the menu board */}
        <div className="xl:col-start-1 xl:row-start-2 xl:self-center">
          <div role="radiogroup" aria-label="Pick a drink" className="flex flex-col">
            {DRINKS.map((d, i) => {
              const on = d.id === drinkId;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => pickDrink(d.id)}
                  className={`group flex flex-col gap-[6px] border-t border-white/10 py-[16px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:py-[22px] ${
                    i === DRINKS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="flex items-baseline gap-[12px] sm:gap-[16px]">
                    <span className={`font-mono text-[12px] transition-colors ${on ? "text-accent-lime" : "text-white/30"}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-[30px] leading-none font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-[44px] ${
                        on ? "text-white" : "text-white/30 group-hover:text-white/70"
                      }`}
                    >
                      {d.label}
                    </span>
                    <span aria-hidden className="mb-[5px] min-w-[16px] flex-1 border-b-2 border-dotted border-white/15" />
                    <span
                      className={`font-mono text-[13px] whitespace-nowrap transition-colors sm:text-[16px] ${
                        on ? "text-accent-lime" : "text-white/35"
                      }`}
                    >
                      {d.time}
                    </span>
                  </span>
                  <span
                    className={`pl-[28px] text-[14px] leading-[1.5] transition-colors duration-300 sm:pl-[34px] sm:text-[16px] ${
                      on ? "text-white/65" : "text-white/25 group-hover:text-white/45"
                    }`}
                  >
                    <span className="font-semibold">{d.title}.</span> {d.blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* the counter: the drink, and the receipt printing beneath it */}
        <div
          ref={stageRef}
          className="relative grid size-[140px] shrink-0 place-items-center justify-self-center sm:size-[170px] xl:col-start-2 xl:row-start-1 xl:self-end"
        >
            {/* The files are black line art; this drives every colour in them
                to white so they read on the dark counter. */}
            <LottieMark
              key={drink.id}
              src={drink.lottie}
              scale={drink.scale}
              className="relative size-[96px] [filter:brightness(0)_invert(1)] sm:size-[120px]"
            />
            {burst ? (
              <div key={burst.key} aria-hidden className="pointer-events-none absolute inset-0">
                <Burst drink={burst.drink} x={burst.x} y={burst.y} />
              </div>
            ) : null}
        </div>

          <div className="relative -mt-[12px] w-full max-w-[360px] justify-self-center sm:-mt-[24px] xl:col-start-2 xl:row-start-2 xl:mt-0">
            {/* the printer's slot */}
            <div className="relative z-10 -mx-[12px] h-[14px] rounded-full bg-[#1d1d21] shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.06)]" />
            <div className="-mt-[7px] overflow-hidden px-[4px] pb-[24px]">
              <div
                key={printed ? drink.id : "blank"}
                className={`bg-[#f6f4ee] px-[22px] pt-[26px] pb-[30px] font-mono text-[13px] text-[#1b1b1b] shadow-[0_24px_40px_-20px_rgba(0,0,0,0.8)] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/16px_100%] ${
                  printed
                    ? "[animation:receiptPrint_1000ms_linear_both] motion-reduce:[animation:none]"
                    : "-translate-y-full"
                }`}
              >
                <div className="flex flex-col items-center gap-[2px] text-center">
                  <span className="text-[14px] font-semibold tracking-[0.22em]">PANKAJ &amp; CO.</span>
                  <span className="text-[11px] text-black/50">Table for two · anywhere with wifi</span>
                </div>

                <div className="my-[14px] border-t border-dashed border-black/25" />
                <div className="flex justify-between text-[12px] text-black/55">
                  <span>ORDER</span>
                  <span>#{drink.ticket}</span>
                </div>
                <dl className="mt-[10px] flex flex-col gap-[6px]">
                  {rows.map((r) => (
                    <div key={r.k} className="flex items-baseline gap-[8px]">
                      <dt>{r.k}</dt>
                      <span aria-hidden className="flex-1 border-b border-dotted border-black/25" />
                      <dd className="font-semibold">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="my-[14px] border-t border-dashed border-black/25" />
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold">TOTAL</span>
                  <span className="text-[24px] font-semibold tracking-[-0.02em]">₹0.00</span>
                </div>

                <label htmlFor="agenda" className="mt-[16px] block text-[11px] text-black/55">
                  On the agenda (optional)
                </label>
                <textarea
                  id="agenda"
                  rows={2}
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  placeholder="Your app, my hot takes…"
                  className="mt-[6px] w-full resize-none rounded-[8px] border border-dashed border-black/25 bg-transparent p-[10px] font-mono text-[12px] text-[#1b1b1b] outline-none placeholder:text-black/35 focus:border-black/60"
                />

                <a
                  href={mailto}
                  className="group mt-[14px] flex items-center justify-center gap-[8px] rounded-[10px] bg-ink py-[13px] font-sans text-[15px] font-semibold text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Place order
                  <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
                    →
                  </span>
                </a>

                <div
                  aria-hidden
                  className="mt-[18px] h-[32px] bg-[repeating-linear-gradient(90deg,#1b1b1b_0_2px,transparent_2px_4px,#1b1b1b_4px_5px,transparent_5px_8px,#1b1b1b_8px_11px,transparent_11px_13px)] opacity-85"
                />
                <p className="mt-[8px] text-center text-[11px] text-black/45">ETA: soon-ish · thank you, come again</p>
              </div>
            </div>
          </div>
      </div>

      {/* bottom row: reach me left, nav right */}
      <div className="relative flex flex-col gap-[20px] border-t border-white/10 pt-[26px] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-[12px] sm:gap-[16px]">
          <a
            href={mailto}
            className="flex items-center gap-[10px] text-[14px] text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[15px]"
          >
            <MailIcon className="size-[17px]" />
            {links[0].label}
          </a>

          <CopyButton value={links[0].label} label="email address" tone="dark" />

          <span aria-hidden className="hidden h-[16px] w-px bg-white/15 sm:block" />

          <div className="flex gap-[10px]">
            {links.slice(1).map((link) => {
              const Icon = "dot" in link ? SOCIAL_ICONS[link.dot] : null;
              if (!Icon) return null;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label}
                  className="grid size-[36px] place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/65 transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.07] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="size-[16px]" />
                </a>
              );
            })}
          </div>
        </div>

        <ul className="flex gap-[24px] text-[14px] text-white sm:gap-[30px]">
          {site.nav.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:opacity-70">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <BackToTop watch={footerRef} />
    </footer>
  );
}
