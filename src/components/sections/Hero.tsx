import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";

const RISE =
  "[animation:heroRise_680ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none]";

export function Hero() {
  const roleWords = site.role.split(" ");
  /** Copy below the headline picks up where the last word left off. */
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

      {/* lg+ keeps the Figma frame's proportions as a floor and grows to fill
          the fold; below that the portrait stacks under the copy. */}
      <div className="relative flex flex-col sm:gap-10 sm:px-[32px] sm:py-[40px] lg:block lg:aspect-[1000/608.659] lg:grow lg:px-0 lg:py-0">
        <div className="flex flex-col items-start gap-[8px] px-[16px] pt-[16px] sm:gap-[18px] sm:px-0 sm:pt-0 lg:absolute lg:top-1/2 lg:left-[6.4%] lg:w-[55.5364%] lg:-translate-y-1/2">
          <p
            style={{ animationDelay: "60ms" }}
            className={`text-[13px] font-medium text-ink-muted sm:text-[18.182px] ${RISE}`}
          >
            {site.greeting}
          </p>
          <h1 className="font-display max-w-[280px] text-[24px] leading-[1.14] font-bold tracking-[-0.0426em] text-ink sm:max-w-[440px] sm:text-[48px] sm:leading-[1.12]">
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
          <p
            style={{ animationDelay: `${afterRole}ms` }}
            className={`text-[12px] leading-[18px] text-ink-body sm:text-[16px] sm:leading-[27.273px] ${RISE}`}
          >
            {site.summaryLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <a
            href="#work"
            aria-label="Jump to selected work"
            style={{ animationDelay: `${afterRole + 90}ms` }}
            className={`mt-[8px] hidden h-[48px] w-[32px] items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white sm:mt-[15.909px] sm:flex sm:h-[60px] sm:w-[36px] ${RISE}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="[animation:arrowBounce_5s_ease-in-out_infinite] motion-reduce:[animation:none]">
              <path d="M7 1v11m0 0L2 7.5M7 12l5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="relative mt-[8px] h-[260px] w-full sm:h-[320px] lg:absolute lg:bottom-[-3.795%] lg:left-[58.242%] lg:mt-0 lg:h-[95.746%] lg:w-[41.9733%]">
          <Image
            src={site.portrait}
            alt={site.name}
            fill
            sizes="(max-width: 1024px) 100vw, 483px"
            priority
            className="object-cover object-top sm:object-contain sm:object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
