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
    time: "60 min",
    title: "Cutting chai",
    blurb: "One cup, one hour, and we'll have solved half of it.",
  },
  {
    id: "coffee",
    label: "Coffee",
    time: "2 hours",
    title: "The sensible one",
    blurb: 'A proper portfolio review. I\'ll say "it depends" at least four times.',
  },
  {
    id: "beer",
    label: "Beer",
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

export function Contact() {
  const [drinkId, setDrinkId] = useState("coffee");
  const drink = DRINKS.find((d) => d.id === drinkId) ?? DRINKS[1];

  // Bubbles launch from the beer chip itself, so the chip is measured on click.
  // `id` increments per click so the element remounts and the animation replays.
  const chipsRef = useRef<HTMLDivElement>(null);
  const popId = useRef(0);
  const [pop, setPop] = useState<{ id: number; x: number; y: number } | null>(
    null,
  );

  const pickDrink = (id: string) => {
    setDrinkId(id);

    if (id !== "beer") {
      setPop(null);
      return;
    }

    const wrap = chipsRef.current;
    const chip = wrap?.querySelectorAll('[role="tab"]')[
      DRINKS.findIndex((d) => d.id === id)
    ];
    if (!wrap || !chip) return;

    const w = wrap.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    popId.current += 1;
    setPop({
      id: popId.current,
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
          <h2 className="font-display text-[28px] leading-[1.12] font-semibold text-white sm:text-[64px] sm:leading-[72px]">
            {headline}
          </h2>
        </div>

        {/* drink picker — the pour sets how long the chat runs */}
        <div className="w-full rounded-[20px] border border-white/12 p-[18px] sm:rounded-[24px] sm:p-[26px] lg:max-w-[460px] lg:shrink-0">
          <p className="mb-[14px] text-[13px] text-white/50 sm:text-[15px]">
            Pick your poison — it sets how long we talk.
          </p>
          <div ref={chipsRef} className="relative">
            <TabChips
              tabs={DRINKS}
              activeId={drinkId}
              onChange={pickDrink}
              tone="dark"
              ariaLabel="Pick a drink"
            />

            {/* fizz off the beer chip — bubbles climb and burst at the top */}
            {pop ? (
              <div key={pop.id} aria-hidden className="pointer-events-none">
                {FIZZ.map((b, i) => (
                  <span
                    key={i}
                    style={
                      {
                        width: b.size,
                        height: b.size,
                        left: pop.x + b.x - b.size / 2,
                        top: pop.y + 16 - b.size / 2,
                        "--dx": `${b.dx}px`,
                        "--dy": `${b.dy}px`,
                        animationDelay: `${b.delay}ms`,
                        animationDuration: `${b.dur}ms`,
                      } as CSSProperties
                    }
                    className="absolute rounded-full bg-white/70 opacity-0 [animation:bubbleRise_linear_both] motion-reduce:[animation:none]"
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* what that round gets you */}
          <div className="mt-[18px] flex items-center gap-[16px] rounded-[16px] bg-white/[0.04] p-[16px] sm:gap-[18px]">
            <Cup
              key={drink.id}
              kind={drink.id}
              className="size-[38px] shrink-0 text-white sm:size-[44px]"
            />
            <div className="min-w-0">
              <p className="font-display text-[17px] font-semibold text-white sm:text-[20px]">
                {drink.time} · {drink.title}
              </p>
              <p className="mt-[2px] text-[12px] text-white/50 sm:text-[13px]">
                {drink.blurb}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom row: reach me left, nav right */}
      <div className="flex flex-col gap-[20px] border-t border-white/10 pt-[26px] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-wrap items-center gap-[12px] sm:gap-[16px]">
          <a
            href={mailto}
            className="flex items-center gap-[10px] text-[14px] text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[15px]"
          >
            <MailIcon className="size-[17px]" />
            {links[0].label}
          </a>

          <CopyButton
            value={links[0].label}
            label="email address"
            tone="dark"
          />

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

          <p className="text-[11px] text-white/35 sm:text-[12px]">
            The email opens already written for a {drink.label.toLowerCase()}.
          </p>
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
