/**
 * Two acquisition costs on one scale. Paid acquisition is the muted reference;
 * referral is the highlight, so the gap between them is the story. Both bars
 * carry their value as a direct label, so colour never has to identify them.
 * The paid bar's last stretch is lighter: its cost is a range, ₹600 to ₹700.
 */
export function CostBars({
  paid,
  referral,
  note,
}: {
  paid: { label: string; value: string; unit: string; amount: number };
  referral: { label: string; value: string; unit: string; amount: number };
  note: string;
}) {
  /** The scale tops out at the high end of the paid range. */
  const max = 700;
  const pct = (n: number) => `${(n / max) * 100}%`;

  return (
    <figure className="flex flex-col gap-[28px] rounded-[var(--radius-tile)] border border-shell-border bg-white p-[24px] sm:gap-[32px] sm:p-[40px]">
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[4px]">
          <span className="font-display text-[18px] font-bold text-ink sm:text-[22px]">{paid.label}</span>
          <span className="text-[15px] text-ink-body sm:text-[16px]">
            <span className="font-display text-[22px] font-bold text-ink sm:text-[28px]">{paid.value}</span> {paid.unit}
          </span>
        </div>
        <div className="h-[18px] w-full overflow-hidden rounded-full bg-[#eef0f4] sm:h-[22px]" aria-hidden>
          <div className="flex h-full" style={{ width: pct(700) }}>
            <span className="h-full rounded-l-full bg-[#6b7488]" style={{ width: `${(600 / 700) * 100}%` }} />
            <span className="h-full rounded-r-full bg-[#6b7488]/45" style={{ width: `${(100 / 700) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[4px]">
          <span className="font-display text-[18px] font-bold text-ink sm:text-[22px]">{referral.label}</span>
          <span className="text-[15px] text-ink-body sm:text-[16px]">
            <span className="font-display text-[22px] font-bold text-accent sm:text-[28px]">{referral.value}</span> {referral.unit}
          </span>
        </div>
        <div className="h-[18px] w-full overflow-hidden rounded-full bg-[#eef0f4] sm:h-[22px]" aria-hidden>
          <span className="block h-full rounded-full bg-accent" style={{ width: pct(referral.amount) }} />
        </div>
      </div>

      <figcaption className="max-w-[70ch] text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">{note}</figcaption>
    </figure>
  );
}
