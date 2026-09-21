"use client";

import { type CSSProperties, useRef, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { TabChips } from "@/components/TabChips";
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
    id: "chai",
    label: "Chai",
    icon: <Cup kind="chai" className="size-[20px] sm:size-[24px]" />,
    time: "60 min",
    title: "Cutting chai",
    blurb: "One cup, one hour, and we'll have solved half of it.",
  },
  {
    id: "coffee",
    label: "Coffee",
    icon: <Cup kind="coffee" className="size-[20px] sm:size-[24px]" />,
    time: "2 hours",
    title: "The sensible one",
    blurb: 'A proper portfolio review. I\'ll say "it depends" at least four times.',
  },
  {
    id: "beer",
    label: "Beer",
    icon: <Cup kind="beer" className="size-[20px] sm:size-[24px]" />,
    time: "No cap",
    title: "No filter",
    blurb: "Two in and I'll tell you what I really think of your design system.",
  },
];

/** Flat line glassware, seen slightly from above so each rim reads as an ellipse. */
function Cup({ kind, className }: { kind: string; className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden>
      {kind === "chai" ? (
        // Tapered cutting-chai glass
        <g {...stroke}>
          <ellipse cx="17" cy="10.4" rx="5.3" ry="2.1" />
          <path d="M11.7 10.4l1.5 9.7c.2 1.2 1.6 1.8 3.8 1.8s3.6-.6 3.8-1.8l1.5-9.7" />
          <path d="M12.6 15.9c1.2.5 2.7.7 4.4.7s3.2-.2 4.4-.7" />
        </g>
      ) : kind === "coffee" ? (
        // Mug with handle
        <g {...stroke}>
          <ellipse cx="16.2" cy="10.6" rx="6.5" ry="2.7" />
          <path d="M9.7 10.6v8.1c0 2 2.9 3 6.5 3s6.5-1 6.5-3v-8.1" />
          <path d="M22.7 12.6c2.8 0 4.1 1.3 4.1 2.9s-1.4 2.8-3.5 2.8" />
        </g>
      ) : (
        // Beer mug — foam line across the head, handle on the right
        <g {...stroke}>
          <ellipse cx="16" cy="9.6" rx="5.4" ry="2.2" />
          <path d="M10.6 9.6v10.6c0 1.5 1.5 2.2 5.4 2.2s5.4-.7 5.4-2.2V9.6" />
          <path d="M11.1 13.5c.9.7 2 .7 2.9 0s2-.7 2.9 0 2 .7 2.9 0" />
          <path d="M21.4 12c2.5 0 3.6 1.1 3.6 2.6s-1.1 2.5-3.1 2.5" />
        </g>
      )}
    </svg>
  );
}

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
  const drink = DRINKS.find((d) => d.id === drinkId) ?? DRINKS[1];

  // The flourish launches from the chip itself, so the chip is measured on
  // click. `key` increments per click so the burst remounts and replays.
  const chipsRef = useRef<HTMLDivElement>(null);
  const burstKey = useRef(0);
  const [burst, setBurst] = useState<{
    key: number;
    drink: string;
    x: number;
    y: number;
  } | null>(null);

  const pickDrink = (id: string) => {
    setDrinkId(id);

    const wrap = chipsRef.current;
    const chip = wrap?.querySelectorAll('[role="tab"]')[
      DRINKS.findIndex((d) => d.id === id)
    ];
    if (!wrap || !chip) return;

    const w = wrap.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    burstKey.current += 1;
    setBurst({
      key: burstKey.current,
      drink: id,
      x: c.left - w.left + c.width / 2,
      y: c.top - w.top + c.height / 2,
    });
  };

  const { eyebrow, headline, links } = site.contact;

  // Pre-composes the mail so the picked drink carries through to the inbox.
  const mailto = `${links[0].href}?subject=${encodeURIComponent(
    `Drink's on me — ${drink.label} (${drink.time})`,
  )}&body=${encodeURIComponent(
    `Hi Pankaj,\n\nI'd like to grab a ${drink.label.toLowerCase()} — ${drink.time.toLowerCase()}.\n\nWhat I'd love to talk about:\n\n`,
  )}`;

  return (
    <footer
      id="contact"
      className="flex flex-col gap-[36px] overflow-hidden rounded-[var(--radius-card)] bg-ink p-[20px] sm:gap-[56px] sm:p-[74.667px]"
    >
      {/* statement left, picker panel right */}
      <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[60px]">
        <div className="flex flex-col items-start gap-[12px] sm:gap-[19px]">
          <p className="text-[11px] font-medium tracking-[2.6667px] text-ink-label uppercase sm:text-[16px]">
            {eyebrow}
          </p>
          <h2 className="font-display text-[26px] leading-[1.12] font-semibold text-white sm:text-[44px] sm:leading-[1.1]">
            {headline}
          </h2>
        </div>

        {/* drink picker — the pour sets how long the chat runs */}
        <div className="w-full rounded-[20px] border border-white/20 bg-white/[0.03] p-[18px] sm:rounded-[24px] sm:p-[26px] lg:max-w-[460px] lg:shrink-0">
          <p className="mb-[14px] text-[13px] text-white/50 sm:text-[15px]">
            Let&rsquo;s see how long we talk.
          </p>
          <div ref={chipsRef} className="relative">
            <TabChips
              tabs={DRINKS}
              activeId={drinkId}
              onChange={pickDrink}
              tone="dark"
              ariaLabel="Pick a drink"
            />

            {/* steam, drip or fizz — whichever suits the drink just picked */}
            {burst ? (
              <div key={burst.key} aria-hidden className="pointer-events-none">
                <Burst drink={burst.drink} x={burst.x} y={burst.y} />
              </div>
            ) : null}
          </div>

          {/* what that round gets you */}
          <div className="mt-[18px] rounded-[16px] bg-white/[0.07] p-[16px]">
            <p className="font-display text-[17px] font-semibold text-white sm:text-[20px]">
              {drink.time} · {drink.title}
            </p>
            <p className="mt-[2px] text-[12px] text-white/50 sm:text-[13px]">
              {drink.blurb}
            </p>
          </div>
        </div>
      </div>

      {/* bottom row: reach me left, nav right */}
      <div className="flex flex-col gap-[20px] border-t border-white/10 pt-[26px] lg:flex-row lg:items-center lg:justify-between">
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
    </footer>
  );
}
