import { Fragment, type CSSProperties } from "react";
import { Nav } from "@/components/Nav";
import { PhotoStack } from "@/components/PhotoStack";
import { site } from "@/content/site";

const RISE =
  "[animation:heroRise_680ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none]";

export function Hero() {
  const roleWords = site.role.split(" ");
  /** The scroll cue picks up where the last word of the headline left off. */
  const afterRole = 140 + roleWords.length * 70;

  return (
    <section
      id="top"
      style={
        {
          /*
           * The fold should end on a sliver of the first project card. A card
           * is 43.7% as tall as it is wide, so a tenth of one is 4.37% of the
           * content width; 115px covers the page's top padding plus the
           * section label and gaps between the hero and that card.
           */
          "--fold-peek": "calc(0.0437 * min(1150px, 100vw - 40px))",
        } as CSSProperties
      }
      className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white lg:min-h-[min(calc(100svh-115px-var(--fold-peek)),750px)]"
    >
      <Nav />

      {/* Copy left, card deck right. 6.4% matches the 64px gutter the Figma
          frame carries at its 1002px width. */}
      <div className="flex flex-col gap-[24px] px-[16px] pt-[20px] pb-[28px] sm:gap-[36px] sm:px-[32px] sm:py-[40px] lg:grow lg:flex-row lg:items-center lg:gap-[24px] lg:px-[6.4%] lg:py-[40px]">
        <div className="flex shrink-0 flex-col items-start gap-[8px] sm:gap-[18px] lg:w-[50%]">
          <p
            style={{ animationDelay: "60ms" }}
            className={`text-[13px] font-medium text-ink-muted sm:text-[18.182px] ${RISE}`}
          >
            {site.greeting}
          </p>

          {/* Fluid only from lg, where the copy shares the row with the card
              deck: at 48px the longest line (410px) overruns the column on any
              laptop narrower than ~1540px and drops to three lines. The factor
              is set below the width that merely fits, so the line stops short
              of the column edge rather than crowding the deck. Below lg the
              hero stacks and the copy has the full width, so 48px stands. */}
          <h1 className="font-display max-w-[280px] text-[24px] leading-[1.14] font-bold tracking-[-0.0426em] text-ink text-balance sm:max-w-[440px] sm:text-[48px] sm:leading-[1.12] lg:text-[clamp(30px,2.7vw,48px)]">
            {roleWords.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                {i > 0 ? " " : null}
                <span
                  style={{ animationDelay: `${140 + i * 70}ms` }}
                  className={`inline-block ${RISE}`}
                >
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

          <a
            href="#work"
            aria-label="Jump to selected work"
            style={{ animationDelay: `${afterRole}ms` }}
            className={`mt-[8px] hidden h-[48px] w-[32px] items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white sm:mt-[15.909px] sm:flex sm:h-[60px] sm:w-[36px] ${RISE}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="[animation:arrowBounce_5s_ease-in-out_infinite] motion-reduce:[animation:none]"
            >
              <path
                d="M7 1v11m0 0L2 7.5M7 12l5-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <PhotoStack className="mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto lg:max-w-[560px]" />
      </div>
    </section>
  );
}
