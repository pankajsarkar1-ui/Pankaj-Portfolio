/**
 * The ETA that kept moving, plotted. Each row is a day the customer opened the
 * app: a bar from that day to the date it promised. The promised date slides
 * right — day one it lands on the first promise, day two it has moved out, and
 * on the day it was meant to arrive the date has run clean off the chart. That
 * last bar escapes the right edge with an arrow: the anxiety is in the exit.
 */
export function EtaDrift({
  title,
  caption,
  axis,
  rows,
}: {
  title: string;
  caption: string;
  axis: readonly string[];
  rows: readonly { today: number; promise: number | null; note: string }[];
}) {
  const last = axis.length - 1;
  const at = (i: number) => `${(i / last) * 100}%`;
  const firstPromise = rows.find((r) => r.promise !== null)?.promise ?? 0;
  const [, month] = axis[0].split(" ");

  return (
    <figure className="flex flex-col gap-[24px] rounded-[var(--radius-tile)] bg-beyond-surface p-[22px] sm:p-[32px] lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-center lg:gap-[56px] lg:p-[48px]">
      <figcaption className="flex flex-col gap-[6px]">
        <span className="font-display text-[22px] leading-[1.15] font-bold text-ink sm:text-[28px]">
          {title}
        </span>
        <span className="text-[15px] leading-[1.5] text-ink-body">{caption}</span>
      </figcaption>

      <div className="flex flex-col">
        {/* axis — day numbers, month once */}
        <div className="flex">
          <span className="font-mono w-[108px] shrink-0 text-[12px] text-ink-body sm:w-[150px]">
            {month}
          </span>
          <div className="relative mr-[22px] ml-[8px] h-[16px] flex-1">
            {axis.map((d, i) => (
              <span
                key={d}
                className="font-mono absolute top-0 -translate-x-1/2 text-[12px] text-ink-body"
                style={{ left: at(i) }}
              >
                {d.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-[10px]">
          {/* the first promise, carried down every row */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-[108px] sm:left-[150px]">
            <div className="relative mr-[22px] ml-[8px] h-full">
              <span
                className="absolute inset-y-0 border-l border-dashed border-accent"
                style={{ left: at(firstPromise) }}
              />
            </div>
          </div>

          {rows.map((r) => {
            const open = r.promise === null;
            return (
              <div key={r.today} className="flex h-[58px] items-center">
                <div className="flex w-[108px] shrink-0 flex-col sm:w-[150px]">
                  <span className="font-mono text-[13px] font-medium text-ink">{axis[r.today]}</span>
                  <span
                    className={`text-[13px] leading-[1.3] ${
                      open ? "font-bold text-ink" : "text-ink-body"
                    }`}
                  >
                    {r.note}
                  </span>
                </div>

                <div className="relative mr-[22px] ml-[8px] h-full flex-1">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-experience-border" />

                  {/* the bar from the day checked to the date promised */}
                  <span
                    className="absolute top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-accent"
                    style={{
                      left: at(r.today),
                      right: open ? "-2px" : `${100 - ((r.promise as number) / last) * 100}%`,
                      ...(open
                        ? { background: "var(--color-ink)", borderRadius: "999px 0 0 999px" }
                        : null),
                    }}
                  />

                  {/* day checked */}
                  <span
                    className="absolute top-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
                    style={{ left: at(r.today) }}
                  />

                  {open ? (
                    /* the date has left the chart — an arrow off the right edge */
                    <span
                      aria-hidden
                      className="absolute top-1/2 right-[-18px] -translate-y-1/2 text-ink"
                    >
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <path
                          d="M2 8h14M11 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    /* the date promised */
                    <span
                      className="absolute top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-accent bg-white"
                      style={{ left: at(r.promise as number) }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-[16px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[12px] text-ink-body">
          <span className="flex items-center gap-[8px]">
            <span className="size-[10px] rounded-full bg-ink" aria-hidden />
            Day checked
          </span>
          <span className="flex items-center gap-[8px]">
            <span className="size-[12px] rounded-full border-[2.5px] border-accent bg-white" aria-hidden />
            Date promised
          </span>
          <span className="flex items-center gap-[8px]">
            <svg width="16" height="12" viewBox="0 0 20 16" fill="none" aria-hidden className="text-ink">
              <path d="M2 8h14M11 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Off the chart
          </span>
        </div>
      </div>
    </figure>
  );
}
