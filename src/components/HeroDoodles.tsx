"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Hand-drawn annotations that float over the hero. On pointer move they ride at
 * different depths — the same cursor-parallax the Delhivery Coins card uses:
 * the pointer is read from the window, mapped to this box, and each mark
 * translates by its own depth with a short eased follow. Pointer-transparent,
 * decorative, shown only where there's room (lg+), and it sits out entirely for
 * reduced-motion / no-hover devices.
 *
 * NOT CURRENTLY RENDERED — the hero follows a Figma design without these, but
 * this is kept for reference. Re-enabling it means registering the Caveat font
 * again in layout.tsx as `--font-caveat`, which was dropped once this stopped
 * being used; until then `font-hand` falls back to a system cursive.
 */

/** A mark that rides the parallax: `d` is its depth in px, `r` its rest tilt. */
function Mark({
  d,
  r = 0,
  className = "",
  delay = 0,
  children,
}: {
  d: number;
  r?: number;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute [animation:doodleIn_640ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        style={
          {
            "--d": `${d}px`,
            transform:
              "translate3d(calc(var(--mx) * var(--d)), calc(var(--my) * var(--d)), 0) rotate(var(--tilt))",
            "--tilt": `${r}deg`,
            transition: "transform .22s ease-out",
            willChange: "transform",
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

export function HeroDoodles() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Respect reduced-motion and pointer-less devices: no parallax there.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 0;
    let ty = 0; // targets
    let cx = 0;
    let cy = 0; // current (eased)

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      root.style.setProperty("--mx", cx.toFixed(3));
      root.style.setProperty("--my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (r.width === 0) return;
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      // Track a little past the edges so it settles rather than snapping.
      const near = x > -0.25 && x < 1.25 && y > -0.35 && y < 1.35;
      if (!near) {
        tx = 0;
        ty = 0;
      } else {
        tx = Math.max(-1, Math.min(1, x * 2 - 1));
        ty = Math.max(-1, Math.min(1, y * 2 - 1));
      }
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 hidden text-ink lg:block"
      style={{ "--mx": "0", "--my": "0" } as CSSProperties}
    >
      {/* Product Designer — top-left, arrow curving toward the headline */}
      <Mark d={30} r={-7} delay={520} className="top-[15%] left-[4%]">
        <div className="flex flex-col items-start">
          <span className="font-hand text-[26px] leading-[0.95] font-bold whitespace-nowrap">
            Product
            <br />
            Designer
          </span>
          <svg
            width="52"
            height="40"
            viewBox="0 0 52 40"
            className="mt-[2px] ml-[64px]"
          >
            <path d="M4 5C22 0 44 6 45 30" {...stroke} />
            <path d="M35 25L46 33L47 20" {...stroke} />
          </svg>
        </div>
      </Mark>

      {/* Delhivery — top-right, arrow curving down toward the head */}
      <Mark d={34} r={6} delay={620} className="top-[11%] right-[10%]">
        <div className="flex flex-col items-end">
          <span className="font-hand text-[26px] leading-none font-bold whitespace-nowrap">
            Delhivery
          </span>
          <svg width="50" height="46" viewBox="0 0 50 46" className="mr-[34px]">
            <path d="M46 5C30 4 8 12 9 38" {...stroke} />
            <path d="M2 30L9 41L20 36" {...stroke} />
          </svg>
        </div>
      </Mark>

      {/* Emphasis marks flanking the head */}
      <Mark d={46} className="top-[39%] left-[61%]">
        <svg width="34" height="52" viewBox="0 0 34 52">
          <path d="M30 6L16 14" {...stroke} />
          <path d="M32 24L16 26" {...stroke} />
          <path d="M30 44L17 38" {...stroke} />
        </svg>
      </Mark>
      <Mark d={46} className="top-[33%] right-[9%]">
        <svg width="40" height="54" viewBox="0 0 40 54">
          <path d="M6 8L22 16" {...stroke} />
          <path d="M4 28L22 28" {...stroke} />
          <path d="M8 48L23 40" {...stroke} />
        </svg>
      </Mark>

      {/* Bangalore / India — lower-right with an underline */}
      <Mark d={18} r={-3} delay={760} className="bottom-[17%] right-[4%]">
        <div className="flex flex-col items-center">
          <span className="font-hand text-[22px] leading-none font-semibold whitespace-nowrap">
            Bangalore / India
          </span>
          <svg
            width="150"
            height="14"
            viewBox="0 0 150 14"
            className="mt-[2px]"
            preserveAspectRatio="none"
          >
            <path d="M5 5C48 1 100 2 145 6" {...stroke} strokeWidth={2} />
            <path d="M14 10C52 7 96 8 132 11" {...stroke} strokeWidth={2} />
          </svg>
        </div>
      </Mark>

      {/* Scroll to see more — lower-left with a squiggle */}
      <Mark d={14} r={-4} delay={860} className="bottom-[9%] left-[5%]">
        <div className="flex items-end gap-[8px]">
          <span className="font-hand text-[21px] leading-[0.95] font-semibold">
            Scroll
            <br />
            to see more
          </span>
          <svg width="96" height="34" viewBox="0 0 96 34">
            <path
              d="M3 16C16 3 26 30 40 16C54 2 64 28 78 18L90 18"
              {...stroke}
              strokeWidth={2}
            />
            <path d="M82 12L91 18L82 24" {...stroke} strokeWidth={2} />
          </svg>
        </div>
      </Mark>
    </div>
  );
}
