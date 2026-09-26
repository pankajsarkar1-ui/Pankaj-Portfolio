import { projects } from "@/content/projects";

/** The other case studies, shown at the end of one. */
export function MoreWork({ exclude }: { exclude: string }) {
  const rest = projects.filter((p) => p.id !== exclude);
  if (rest.length === 0) return null;

  return (
    <section className="flex flex-col gap-[20px] sm:gap-[28px]">
      <p className="font-mono text-[12px] tracking-[0.14em] text-accent uppercase">
        More work
      </p>

      <ul className="grid gap-[14px] sm:grid-cols-2 sm:gap-[20px]">
        {rest.map((p) => {
          const live = p.href !== "#";
          const title = p.title.replace(/\n/g, " ");

          return (
            <li key={p.id}>
              <a
                href={p.href}
                aria-disabled={live ? undefined : "true"}
                className={`group relative flex h-full flex-col justify-between gap-[28px] overflow-hidden rounded-[var(--radius-tile)] p-[22px] transition-transform duration-300 sm:p-[30px] ${
                  live
                    ? "hover:-translate-y-1"
                    : "pointer-events-none opacity-70"
                }`}
                style={{ background: p.theme.bg }}
              >
                <img
                  src="/assets/work/grid.svg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
                />

                <h3
                  className="font-display relative text-[24px] leading-[1.05] font-extrabold sm:text-[32px]"
                  style={{ color: p.theme.title }}
                >
                  {title}
                </h3>

                <span className="relative flex items-center gap-[10px] text-[13px] font-medium text-white/85 sm:text-[14px]">
                  {live ? p.readLabel : "Coming soon"}
                  {live ? (
                    <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
                      →
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
