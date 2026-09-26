import Image from "next/image";

export type Annotation = {
  /** Vertical position of the pin, as a percentage of the card's height. */
  top: number;
  title: string;
  body: string;
};

/**
 * A UI fragment lifted out of its screen, with callouts that reveal on hover.
 * Pointer-less devices never get :hover, so below `lg` the callouts render as a
 * plain list under the card instead of floating beside it.
 */
export function AnnotatedCard({
  src,
  alt,
  width,
  height,
  annotations,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  annotations: readonly Annotation[];
}) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="group relative w-full">
        <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
          />

          {annotations.map((a, i) => (
            <div
              key={a.title}
              aria-hidden
              className="pointer-events-none absolute right-0 hidden lg:block"
              style={{ top: `${a.top}%` }}
            >
              {/* pin sits on the card edge */}
              <span className="absolute top-1/2 right-0 size-[9px] -translate-y-1/2 translate-x-1/2 rounded-full bg-accent ring-[3px] ring-white" />

              {/* connector + label reach into the space beside the card */}
              <span
                className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-[12px] pl-[14px] opacity-0 transition-all duration-400 ease-out group-hover:translate-x-[6px] group-hover:opacity-100"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="h-px w-[34px] shrink-0 bg-accent/45" />
                <span className="flex w-[230px] flex-col gap-[2px] rounded-[10px] border border-accent/20 bg-white px-[13px] py-[9px] shadow-[0_8px_24px_rgba(0,0,0,0.07)]">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
                    {a.title}
                  </span>
                  <span className="text-[12.5px] leading-[1.4] text-ink-body">
                    {a.body}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="font-mono mt-[14px] text-center text-[10px] tracking-[0.12em] text-ink-muted uppercase lg:text-left">
          Hover to see the decisions
        </p>
      </div>

      {/* touch fallback */}
      <ul className="flex flex-col gap-[12px] lg:hidden">
        {annotations.map((a) => (
          <li key={a.title} className="flex flex-col gap-[2px] border-l-2 border-accent/30 pl-[14px]">
            <span className="font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
              {a.title}
            </span>
            <span className="text-[13px] leading-[1.45] text-ink-body">
              {a.body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
