import Image from "next/image";
import type { CSSProperties } from "react";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";

export function Hero() {
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
      <div className="relative flex flex-col gap-10 px-[32px] py-[40px] lg:block lg:aspect-[1000/608.659] lg:grow lg:px-0 lg:py-0">
        <div className="flex flex-col items-start gap-[18px] lg:absolute lg:top-1/2 lg:left-[6.4%] lg:w-[55.5364%] lg:-translate-y-1/2">
          <p className="text-[18.182px] font-medium text-ink-muted">
            {site.greeting}
          </p>
          {/* max-width is tuned to keep the two-line break from the design. */}
          <h1 className="font-display max-w-[360px] text-[32px] leading-[1.14] font-bold tracking-[-0.0426em] text-ink sm:max-w-[440px] sm:text-[48px] sm:leading-[1.12]">
            {site.role}
          </h1>
          <p className="text-[16px] leading-[27.273px] text-ink-body">
            {site.summaryLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <a
            href="#work"
            aria-label="Jump to selected work"
            className="mt-[15.909px] flex h-[60px] w-[36px] items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="[animation:arrowBounce_5s_ease-in-out_infinite] motion-reduce:[animation:none]">
              <path d="M7 1v11m0 0L2 7.5M7 12l5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="relative h-[320px] w-full lg:absolute lg:bottom-[-3.795%] lg:left-[58.242%] lg:h-[95.746%] lg:w-[41.9733%]">
          <Image
            src={site.portrait}
            alt={site.name}
            fill
            sizes="(max-width: 1024px) 100vw, 483px"
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
