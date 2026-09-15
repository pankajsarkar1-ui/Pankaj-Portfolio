"use client";
/* eslint-disable @next/next/no-img-element -- fixed-size stage, scaled as a whole */

import { useEffect, useRef, useState } from "react";

/* Ported from the exported "Balance card hover animations" scene. */

const FONT = "var(--font-dm-sans), system-ui, sans-serif";
/** Natural stage size the scene is authored at. */
const STAGE = { w: 520, h: 312 };
/** Multiplier on every parallax offset. */
const K = 1;

const STATS = [
  { label: "Earned", glyph: "↗", value: "450", color: "#0d9f6e", chip: "#e6f7f0" },
  { label: "Redeemed", glyph: "↙", value: "124", color: "#ef5d6a", chip: "#fdeaec" },
  { label: "Expired", glyph: "!", value: "142", color: "#6b6f8a", chip: "#eeecf9", valueColor: "#3f3f46" },
];

const HEX_CLIP = "polygon(50% 0%, 100% 26%, 100% 74%, 50% 100%, 0% 74%, 0% 26%)";

/**
 * Cursor parallax: the card tilts toward the pointer while the coin, headline
 * and stats ride at different depths. The pointer is read from the window and
 * mapped to this box, because the layer itself is pointer-transparent.
 */
export function CoinCardAnimation({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [p, setP] = useState({ on: false, tx: 0, ty: 0, px: 50, py: 50 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE.w);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.width === 0) return;
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      // Track a little beyond the card so the tilt settles rather than snapping.
      const near = x > -0.35 && x < 1.35 && y > -0.5 && y < 1.5;
      if (!near) {
        setP({ on: false, tx: 0, ty: 0, px: 50, py: 50 });
        return;
      }
      setP({
        on: true,
        tx: Math.max(-1, Math.min(1, x * 2 - 1)),
        ty: Math.max(-1, Math.min(1, y * 2 - 1)),
        px: Math.round(x * 100),
        py: Math.round(y * 100),
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { on, tx, ty, px, py } = p;

  return (
    <div ref={hostRef} className={className} style={{ fontFamily: FONT }}>
      {scale > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE.w,
            height: STAGE.h,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: STAGE.w,
              height: STAGE.h,
              borderRadius: 26,
              overflow: "hidden",
              padding: "30px 34px",
              boxSizing: "border-box",
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(175deg, #ffffff 0%, #fffdf8 46%, #fdf2e0 100%)",
              border: "1px solid #f6dcd4",
              transition: "transform .18s ease-out, box-shadow .4s ease",
              transform: `perspective(1100px) rotateY(${(on ? tx * 7 : 0) * K}deg) rotateX(${
                (on ? -ty * 7 : 0) * K
              }deg) translateY(${on ? -4 : 0}px)`,
              boxShadow: on
                ? "0 26px 52px rgba(214,140,40,.22)"
                : "0 8px 24px rgba(200,140,60,.10)",
            }}
          >
            {/* Glare that follows the pointer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                transition: "opacity .35s ease",
                background: `radial-gradient(360px 260px at ${px}% ${py}%, rgba(255,255,255,.9), rgba(255,255,255,0) 70%)`,
                opacity: on ? 1 : 0,
              }}
            />

            {/* Coin, riding furthest forward */}
            <div
              style={{
                position: "absolute",
                right: -19,
                top: 34,
                width: 200,
                transformStyle: "preserve-3d",
                pointerEvents: "none",
                transition: "transform .2s ease-out",
                transform: on
                  ? `translate3d(${-tx * 20 * K}px, ${-ty * 15 * K}px, 70px) scale(${
                      1 + 0.06 * K
                    })`
                  : "translate3d(0,0,0) scale(1)",
              }}
            >
              <img
                src="/assets/work/coin-3d.png"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  animation: "coinFloat 5.5s ease-in-out infinite",
                  transition: "filter .4s ease",
                  filter: on
                    ? "drop-shadow(0 16px 18px rgba(190,120,30,.28))"
                    : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                }}
              />
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "transform .2s ease-out",
                  transform: on
                    ? `translate3d(${tx * 9 * K}px, ${ty * 7 * K}px, 30px)`
                    : "translate3d(0,0,0)",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 500, color: "#6f6f6f" }}>
                  Delhivery Coin Balance
                </div>
                <div
                  style={{
                    fontSize: 66,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-.025em",
                    color: "#e08c0b",
                  }}
                >
                  342
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ height: 1, background: "#eee4d7" }} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    transition: "transform .2s ease-out",
                    transform: on
                      ? `translate3d(${tx * 5 * K}px, ${ty * 4 * K}px, 20px)`
                      : "translate3d(0,0,0)",
                  }}
                >
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div style={{ fontSize: 15, color: "#6f6f6f" }}>{s.label}</div>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 26,
                            display: "grid",
                            placeItems: "center",
                            fontSize: 12,
                            color: s.color,
                            background: s.chip,
                            clipPath: HEX_CLIP,
                          }}
                        >
                          {s.glyph}
                        </div>
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: s.valueColor ?? s.color,
                          }}
                        >
                          {s.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
