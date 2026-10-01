import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "./CaseIcons";

type Shot = {
  src: string;
  w: number;
  h: number;
  surface: string;
  kind: "web" | "phone";
  alt: string;
};

/**
 * The three real surfaces, side by side at a size where the differences read.
 * Each frame grows in proportion to its own aspect ratio, so all three share
 * one height across the full width; below `lg` they become a swipeable strip
 * at a fixed height instead of shrinking into thumbnails.
 */
const SHOTS: readonly Shot[] = [
  {
    src: "/assets/work/tracking/platforms/app.png",
    w: 929,
    h: 1300,
    surface: "Delhivery app",
    kind: "phone",
    alt: "The Delhivery app: a status header and a vertical timeline",
  },
  {
    src: "/assets/work/tracking/platforms/order.png",
    w: 880,
    h: 980,
    surface: "direct.delhivery.com",
    kind: "web",
    alt: "direct.delhivery.com: a centred order card with address, delivery and payment details",
  },
  {
    src: "/assets/work/tracking/platforms/web.png",
    w: 1560,
    h: 839,
    surface: "delhivery.com",
    kind: "web",
    alt: "delhivery.com: a dark navigation bar, a tracking summary and a large promotional banner",
  },
];

export function PlatformShots({ title, caption }: { title: string; caption: string }) {
  return (
    <figure className="flex flex-col gap-[24px] sm:gap-[28px]">
      <figcaption className="flex flex-col gap-[6px]">
        <span className="font-display text-[22px] leading-[1.15] font-bold text-ink sm:text-[28px]">
          {title}
        </span>
        <span className="text-[15px] leading-[1.5] text-ink-body">{caption}</span>
      </figcaption>

      <ul className="-mx-[16px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none] sm:-mx-[20px] sm:px-[20px] lg:mx-0 lg:snap-none lg:gap-[20px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {SHOTS.map((s) => (
          <li
            key={s.src}
            style={{ "--ar": `${s.w} / ${s.h}`, "--g": (s.w / s.h).toFixed(3) } as CSSProperties}
            className="flex shrink-0 snap-start flex-col gap-[10px] lg:min-w-0 lg:shrink lg:grow-[var(--g)] lg:basis-0"
          >
            <p className="flex items-center gap-[8px] text-ink-body">
              <Icon name={s.kind} className="size-[16px]" />
              <span className="font-mono text-[13px]">{s.surface}</span>
            </p>
            <div className="aspect-[var(--ar)] h-[400px] overflow-hidden rounded-[14px] border border-shell-border bg-white shadow-[0_22px_48px_-26px_rgba(0,0,0,0.35)] sm:h-[460px] lg:h-auto lg:w-full">
              <Image
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                sizes="(max-width: 1024px) 80vw, 560px"
                className="block size-full object-cover object-top"
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
