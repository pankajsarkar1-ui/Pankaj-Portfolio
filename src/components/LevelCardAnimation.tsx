"use client";
/* eslint-disable @next/next/no-img-element -- fixed-size stage, scaled as a whole */

import { useEffect, useRef, useState } from "react";

/* Ported from the exported "Refer and Earn Levels" scene. */

const FONT = "var(--font-plex), system-ui, sans-serif";
/** Natural stage size the scene is authored at (aspect-ratio 0.955). */
const STAGE = { w: 420, h: 440 };
/** Refers added per tick, and the tick interval. */
const PACE = 190;
const START_REFERS = 3;
const MAX_REFERS = 20;

const CROWNS = [
  "/assets/work/crowns/crown1.png",
  "/assets/work/crowns/crown2.png",
  "/assets/work/crowns/crown3.png",
  "/assets/work/crowns/crown4.png",
];
const BONUS = [100, 100, 200, 0];

/** left%, size, duration, delay — the rising sparkles. */
const SPARKS: [number, number, number, number][] = [
  [6, 3, 8.5, 0], [14, 2, 10, 2.4], [22, 4, 7.5, 5.1], [31, 2, 9.5, 1.2],
  [38, 3, 8, 3.8], [46, 2, 11, 6.2], [53, 4, 8.8, 0.6], [61, 2, 9.2, 4.4],
  [68, 3, 7.8, 2.1], [75, 2, 10.5, 5.6], [83, 4, 8.2, 1.8], [90, 2, 9.8, 3.2],
  [96, 3, 11.5, 6.8], [10, 2, 12, 4.9], [58, 2, 12.5, 7.4], [43, 3, 10.8, 2.9],
];

/** left%, dx, size, duration, delay — confetti for bursts and the finale rain. */
const CONFETTI = Array.from({ length: 30 }, (_, i) => [
  8 + ((i * 37) % 84),
  -60 + ((i * 53) % 120),
  4 + ((i * 11) % 6),
  1200 + ((i * 97) % 700),
  (i * 61) % 420,
] as [number, number, number, number, number]);

const earningsFor = (refers: number) => {
  const done = Math.min(4, Math.floor(refers / 5));
  let bonus = 0;
  for (let i = 0; i < done; i++) bonus += BONUS[i];
  return refers * 100 + bonus;
};

/**
 * The gold level card, alive: referrals tick up, the crown swaps and bursts at
 * every fifth, and the whole thing lands on a congratulations state. Tilts
 * toward the cursor, with each layer parallaxing at its own depth.
 */
export function LevelCardAnimation({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [refers, setRefers] = useState(START_REFERS);
  const [earnDisp, setEarnDisp] = useState(earningsFor(START_REFERS));
  const earnFromRef = useRef(earningsFor(START_REFERS));
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE.w);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Referral ticker — stops once every level is complete.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setRefers((r) => (r >= MAX_REFERS ? r : r + 1));
    }, PACE);
    return () => clearInterval(id);
  }, []);

  // Ease the earnings total toward its new value on each referral.
  useEffect(() => {
    const target = earningsFor(refers);
    const from = earnFromRef.current;
    if (from === target) return;
    let raf = 0;
    const started = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / 120);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (target - from) * eased);
      earnFromRef.current = value;
      setEarnDisp(value);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [refers]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.width === 0) return;
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      setP({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const congrats = refers >= MAX_REFERS;
  // Remounting on each new level step replays the burst animation.
  const levelStep = Math.floor(refers / 5);
  const crownIdx = Math.min(3, levelStep);
  const level = crownIdx + 1;
  const remaining = Math.max(0, level * 5 - refers);
  const { x: px, y: py } = p;

  const layer = (mx: number, my: number, extra = "") =>
    `translate3d(${px * mx}px, ${py * my}px, 0)${extra}`;
  const glide = "transform 240ms cubic-bezier(.2,.8,.3,1)";

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
              borderRadius: 34,
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transform: `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 4}deg)`,
              transition: "transform 260ms cubic-bezier(.2,.8,.3,1)",
              background:
                "radial-gradient(115% 85% at 50% 66%, #D0A11A 0%, #B2860F 26%, #7A5A08 50%, #3A2A04 74%, #120D03 92%, #0B0803 100%)",
              boxShadow:
                "0 30px 80px -30px rgba(200,150,20,.45), 0 0 0 1px rgba(255,255,255,.06)",
            }}
          >
            {/* Scrolling perspective floor */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: layer(-6, -3),
                transition: glide,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-60%",
                  right: "-60%",
                  bottom: "-14%",
                  height: "78%",
                  transform: "perspective(420px) rotateX(62deg)",
                  transformOrigin: "50% 100%",
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(255,255,255,.26) 0 1.2px, transparent 1.2px 56px), repeating-linear-gradient(to bottom, rgba(255,255,255,.26) 0 1.2px, transparent 1.2px 56px)",
                  animation: "rlFloor 3.4s linear infinite",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 38%, #000 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 38%, #000 100%)",
                }}
              />
            </div>

            {/* Pulsing glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: layer(10, 7),
                transition: glide,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "34%",
                  width: 340,
                  height: 340,
                  margin: "-170px 0 0 -170px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,225,130,.55) 0%, rgba(255,200,60,.28) 34%, rgba(200,150,20,.08) 60%, transparent 72%)",
                  animation: "rlGlow 2.4s ease-in-out infinite",
                }}
              />
            </div>

            {/* Rising sparkles */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: layer(16, 9),
                transition: glide,
                pointerEvents: "none",
              }}
            >
              {SPARKS.map(([left, size, dur, delay], i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${left}%`,
                    top: "62%",
                    width: size,
                    height: size,
                    borderRadius: size > 2 ? 1 : "50%",
                    background:
                      i % 3 === 0 ? "rgba(255,255,255,.9)" : "rgba(255,214,110,.95)",
                    boxShadow: "0 0 6px rgba(255,220,140,.8)",
                    opacity: 0,
                    animation: `rlSpark ${dur * 0.6}s linear ${-delay}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* Level-up burst, replayed by keying on burstId */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {levelStep > Math.floor(START_REFERS / 5) ? (
                <Burst key={levelStep} />
              ) : null}
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(4,3,1,.94) 0%, rgba(6,5,2,.55) 22%, rgba(0,0,0,.08) 46%, transparent 60%)",
                pointerEvents: "none",
              }}
            />

            {congrats ? (
              <Congrats parallax={layer(26, 16)} glide={glide} />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "30px 30px 32px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    height: "38%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      transform: layer(26, 16, ` scale(${1 + Math.abs(px) * 0.02})`),
                      transition: "transform 220ms cubic-bezier(.2,.8,.3,1)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 210,
                        height: 210,
                        animation: "rlFloat 3.2s ease-in-out infinite",
                      }}
                    >
                      <img
                        key={crownIdx}
                        src={CROWNS[crownIdx]}
                        alt=""
                        style={{
                          width: 210,
                          height: 210,
                          objectFit: "contain",
                          display: "block",
                          filter: "drop-shadow(0 8px 26px rgba(255,190,40,.5))",
                          animation: "rlSwap 130ms ease-out",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    transform: layer(12, 6),
                    transition: "transform 220ms cubic-bezier(.2,.8,.3,1)",
                    fontSize: 38,
                    fontWeight: 700,
                    letterSpacing: "-.5px",
                    color: "#fff",
                    textShadow: "0 4px 24px rgba(0,0,0,.35)",
                    marginTop: 4,
                  }}
                >
                  Level {level}
                </div>

                <div
                  style={{ display: "flex", gap: 10, width: "100%", marginTop: 26 }}
                >
                  <Stat label="REFERS" value={String(refers)} pulseKey={refers} />
                  <Stat label="EARNINGS" value={`₹${earnDisp}`} />
                </div>

                <div style={{ flex: 1 }} />

                <div
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: 20,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.14)",
                    background: "rgba(255,255,255,.13)",
                    padding: "13px 18px",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {remaining > 0
                    ? `Refer ${remaining} more ${remaining === 1 ? "person" : "people"} to complete Level ${level}`
                    : `Level ${level} complete!`}
                </div>
              </div>
            )}

            {/* Finale confetti rain */}
            {congrats ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  overflow: "hidden",
                }}
              >
                {CONFETTI.map(([left, dx, size, dur, delay], i) => (
                  <div
                    key={i}
                    style={
                      {
                        position: "absolute",
                        left: `${left}%`,
                        top: 0,
                        width: size,
                        height: size * 1.5,
                        background:
                          i % 5 === 0 ? "#fff" : i % 2 === 0 ? "#FFD75E" : "#C79312",
                        borderRadius: 1,
                        "--dx": `${dx}px`,
                        opacity: 0,
                        animation: `rlRain ${dur + 500}ms linear ${delay * 0.6}ms infinite`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  pulseKey,
}: {
  label: string;
  value: string;
  /** Changing this replays the pop on the number. */
  pulseKey?: number;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        border: "1px solid rgba(255,255,255,.16)",
        borderRadius: 16,
        padding: "12px 8px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "1.6px",
          color: "rgba(255,255,255,.88)",
        }}
      >
        {label}
      </div>
      <div
        key={pulseKey}
        style={{
          animation:
            pulseKey === undefined
              ? undefined
              : "rlNum 140ms cubic-bezier(.2,.9,.3,1.6)",
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Burst() {
  const centre = { left: "50%", top: "34%" } as const;
  return (
    <>
      <div
        style={{
          position: "absolute",
          ...centre,
          width: 300,
          height: 300,
          background:
            "conic-gradient(from 0deg, rgba(255,225,140,.55) 0deg 4deg, transparent 4deg 30deg)",
          borderRadius: "50%",
          animation: "rlRays 300ms ease-out forwards",
          opacity: 0,
          maskImage:
            "radial-gradient(circle, transparent 24%, #000 42%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 24%, #000 42%, transparent 74%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          ...centre,
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "2px solid rgba(255,236,180,.85)",
          animation: "rlRing 280ms ease-out forwards",
          opacity: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          ...centre,
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.6)",
          animation: "rlRing 340ms ease-out 50ms forwards",
          opacity: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          background:
            "radial-gradient(circle at 50% 34%, rgba(255,240,190,.75) 0%, rgba(255,205,80,.28) 30%, transparent 58%)",
          animation: "rlFlare 240ms ease-out forwards",
        }}
      />
      {CONFETTI.slice(0, 22).map(([left, dx, size, dur, delay], i) => (
        <div
          key={i}
          style={
            {
              position: "absolute",
              left: `${left}%`,
              top: "30%",
              width: size,
              height: size * 1.6,
              background:
                i % 4 === 0 ? "#fff" : i % 3 === 0 ? "#FFD75E" : "#E8B42A",
              borderRadius: 1,
              "--dx": `${dx}px`,
              opacity: 0,
              animation: `rlConf ${dur * 0.35}ms cubic-bezier(.3,.6,.5,1) ${delay * 0.08}ms forwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function Congrats({ parallax, glide }: { parallax: string; glide: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "34px 30px 38px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "42%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          transform: parallax,
          transition: glide,
        }}
      >
        {CROWNS.map((src, i) => (
          <div
            key={src}
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              opacity: 0,
              animation: `rlPop 300ms cubic-bezier(.2,.9,.28,1.45) ${i * 55}ms forwards`,
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                maxWidth: 96,
                objectFit: "contain",
                filter: "drop-shadow(0 6px 18px rgba(255,190,40,.55))",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          opacity: 0,
          animation: "rlRise 260ms ease-out 240ms forwards",
          fontSize: 34,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-.5px",
        }}
      >
        Congratulations!
      </div>
      <div
        style={{
          opacity: 0,
          animation: "rlRise 260ms ease-out 320ms forwards",
          fontSize: 16,
          fontStyle: "italic",
          color: "rgba(255,255,255,.7)",
          marginTop: 4,
        }}
      >
        You have completed all 4 levels
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          opacity: 0,
          animation: "rlRise 280ms ease-out 400ms forwards",
          width: "88%",
          marginTop: 28,
          borderRadius: 22,
          background: "rgba(255,255,255,.08)",
          border: "1px solid rgba(255,255,255,.12)",
          padding: "4px 20px 6px",
          boxSizing: "border-box",
        }}
      >
        <Total label="Total Refers" value="20" />
        <div style={{ height: 1, background: "rgba(255,255,255,.22)" }} />
        <Total label="Total Earnings" value="₹2400" />
      </div>
    </div>
  );
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      <div style={{ fontSize: 16, color: "#fff" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{value}</div>
    </div>
  );
}
