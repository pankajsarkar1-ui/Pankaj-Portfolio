/**
 * Cumulative enrolment, week by week. One series, so one hue and no legend:
 * the title names it. Bars rise from a shared baseline with a rounded data end,
 * the first and last weeks carry direct labels, and every bar shows its exact
 * value on hover. A visually hidden table carries the same data.
 */
export function EnrolmentBars({
  title,
  weeks,
  eligible,
  caption,
}: {
  title: string;
  weeks: readonly { label: string; value: number }[];
  /** The pool enrolment is drawn from; it sets the top of the scale. */
  eligible: number;
  caption: string;
}) {
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const last = weeks.length - 1;

  return (
    <figure className="flex h-full flex-col gap-[20px] rounded-[var(--radius-tile)] border border-shell-border bg-white p-[22px] sm:p-[28px]">
      <figcaption className="flex flex-col gap-[4px]">
        <h3 className="font-display text-[18px] leading-[1.2] font-bold text-ink sm:text-[22px]">{title}</h3>
        <p className="text-[13px] text-ink-body sm:text-[15px]">{caption}</p>
      </figcaption>

      <div aria-hidden className="flex flex-1 flex-col">
        {/* the bars, scaled to the eligible pool so the headroom reads as reach */}
        <div className="relative flex h-[180px] items-end gap-[2px] border-b border-experience-border sm:h-[220px]">
          {weeks.map((w, i) => {
            const labelled = i === 0 || i === last;
            return (
              <div
                key={w.label}
                className="group relative flex h-full flex-1 items-end justify-center"
              >
                <div
                  className="relative w-full max-w-[56px] rounded-t-[4px] bg-accent transition-opacity group-hover:opacity-85"
                  style={{ height: `${(w.value / eligible) * 100}%` }}
                >
                  {labelled ? (
                    <span className="absolute inset-x-0 -top-[24px] text-center text-[13px] font-semibold text-ink tabular-nums sm:text-[15px]">
                      {fmt(w.value)}
                    </span>
                  ) : null}
                  {/* exact value on hover, above the bar and its label; the
                      hidden table serves screen readers */}
                  <span className="pointer-events-none absolute bottom-[calc(100%+32px)] left-1/2 z-10 -translate-x-1/2 rounded-[8px] bg-ink px-[10px] py-[6px] text-[12px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {w.label}: {fmt(w.value)}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
        <div className="mt-[8px] flex gap-[2px]">
          {weeks.map((w) => (
            <span key={w.label} className="flex-1 text-center text-[12px] text-ink-body sm:text-[13px]">
              {w.label}
            </span>
          ))}
        </div>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Week</th>
            <th scope="col">Shippers enrolled</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((w) => (
            <tr key={w.label}>
              <th scope="row">{w.label}</th>
              <td>{fmt(w.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
