"use client";

type Tab = { id: string; label: string };

export function TabChips({
  tabs,
  activeId,
  onChange,
  tone = "light",
  ariaLabel,
}: {
  tabs: readonly Tab[];
  activeId: string;
  onChange: (id: string) => void;
  /** On the dark AI backdrop the active/idle fills swap. */
  tone?: "light" | "dark";
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-[10.827px]"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        const base =
          "cursor-pointer rounded-full px-[17.323px] py-[8.662px] text-[15.158px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
        const skin =
          tone === "dark"
            ? active
              ? "bg-chip-idle text-ink font-semibold focus-visible:outline-white"
              : "bg-ai-chip border border-ai-chip-border text-white hover:bg-[#1b2436] focus-visible:outline-white"
            : active
              ? "bg-ink text-white font-semibold focus-visible:outline-ink"
              : "bg-chip-idle border-[0.812px] border-chip-idle-border text-ink hover:bg-[#e6e6e6] focus-visible:outline-ink";

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`${base} ${skin}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
