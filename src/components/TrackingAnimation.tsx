"use client";

import { useEffect, useRef, useState } from "react";

/* Ported from the exported "Tracking page timeline animation" scene. */

const FONT = "var(--font-jakarta), system-ui, sans-serif";
/** Natural panel width: 420px of content plus 28px padding each side. */
const NATURAL_W = 476;
/** Entrance sequence (~2.8s) plus a 1s hold on the in-transit state. */
const ADVANCE_AFTER = 3800;

const GREEN = "#0AA05A";
const INK = "#333D5B";
const BODY = "#3D4763";
const MUTED = "#9AA2B4";

const DISTANCE_KM = 216;

function Row({
  children,
  dot,
}: {
  children: React.ReactNode;
  dot: React.ReactNode;
}) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "18px 1fr", columnGap: 18 }}
    >
      {dot}
      {children}
    </div>
  );
}

function Timeline({ done }: { done: boolean }) {
  const metaMax = done ? "340px" : "0px";
  const metaOpacity = done ? 1 : 0;
  const stepColor = done ? GREEN : "#DFE1E7";

  const meta = (text: string, italic: boolean, delay: string) => (
    <div
      style={{
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: metaMax,
        opacity: metaOpacity,
        transition: `max-width .6s cubic-bezier(.4,0,.2,1) ${delay}, opacity .4s ease ${delay}`,
      }}
    >
      <span style={{ fontSize: 17, fontWeight: 500, color: MUTED }}>
        &nbsp;|&nbsp;
      </span>
      <span
        style={{
          fontSize: 17,
          fontWeight: 500,
          fontStyle: italic ? "italic" : "normal",
          color: italic ? MUTED : "#6B7489",
        }}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div style={{ marginTop: 26, display: "flex", flexDirection: "column" }}>
      {/* Order Placed */}
      <Row
        dot={
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                marginTop: 5,
                borderRadius: "50%",
                background: GREEN,
                animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) .1s both",
              }}
            />
            <div
              style={{
                flex: 1,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              <div
                style={{
                  width: 5,
                  borderRadius: 3,
                  background: GREEN,
                  transformOrigin: "top",
                  animation: "tlSeg .34s ease-out .3s both",
                }}
              />
            </div>
          </div>
        }
      >
        <div
          style={{
            paddingBottom: 10,
            animation: "tlRow .5s cubic-bezier(.22,1,.36,1) .14s both",
          }}
        >
          <div
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-.015em",
            }}
          >
            Order Placed{" "}
            <span style={{ fontWeight: 500, color: MUTED }}>|</span>{" "}
            <span
              style={{
                fontSize: 17,
                fontWeight: 500,
                fontStyle: "italic",
                color: MUTED,
              }}
            >
              Fri, 23 Oct, 10:00 AM
            </span>
          </div>
        </div>
      </Row>

      {/* Picked Up */}
      <Row
        dot={
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                marginTop: 5,
                borderRadius: "50%",
                background: GREEN,
                animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) .46s both",
              }}
            />
            <div
              style={{
                flex: 1,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              <div
                style={{
                  width: 5,
                  borderRadius: 3,
                  background: GREEN,
                  transformOrigin: "top",
                  animation: "tlSeg .34s ease-out .66s both",
                }}
              />
            </div>
          </div>
        }
      >
        <div
          style={{
            paddingBottom: 10,
            animation: "tlRow .5s cubic-bezier(.22,1,.36,1) .5s both",
          }}
        >
          <div
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-.015em",
            }}
          >
            Picked Up <span style={{ fontWeight: 500, color: MUTED }}>|</span>{" "}
            <span
              style={{
                fontSize: 17,
                fontWeight: 500,
                fontStyle: "italic",
                color: MUTED,
              }}
            >
              Fri, 24 Oct, 4:00 PM
            </span>
          </div>
        </div>
      </Row>

      {/* On the Way — the row that collapses once delivered */}
      <Row
        dot={
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: 13,
                height: 13,
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!done && (
                <div
                  style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: GREEN,
                    opacity: 0.18,
                    animation: "tlRing 1.9s ease-out 1.1s infinite both",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  width: done ? 13 : 26,
                  height: done ? 13 : 26,
                  borderRadius: "50%",
                  background: "#DFF5E9",
                  opacity: done ? 0 : 1,
                  transition: "opacity .4s ease, width .45s ease, height .45s ease",
                  animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) .82s both",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: GREEN,
                  animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) .86s both",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  width: 5,
                  borderRadius: 3,
                  background: done ? GREEN : "#E3E5EA",
                  transformOrigin: "top",
                  transition: "background .55s ease .1s",
                  animation: "tlSeg .7s cubic-bezier(.4,0,.2,1) 1s both",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: done ? "100%" : "34%",
                    borderRadius: 3,
                    background: GREEN,
                    transition: "height .7s cubic-bezier(.4,0,.2,1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: done ? "100%" : "34%",
                    width: done ? 0 : 9,
                    height: done ? 0 : 9,
                    marginLeft: -4.5,
                    marginTop: -4.5,
                    borderRadius: "50%",
                    background: GREEN,
                    opacity: done ? 0 : 1,
                    transition:
                      "top .7s cubic-bezier(.4,0,.2,1), opacity .3s ease, width .4s ease, height .4s ease",
                    animation: "tlDot .45s cubic-bezier(.34,1.56,.64,1) 1.6s both",
                  }}
                />
              </div>
            </div>
          </div>
        }
      >
        <div style={{ paddingBottom: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              animation: "tlRow .5s cubic-bezier(.22,1,.36,1) .86s both",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: INK,
                letterSpacing: "-.015em",
              }}
            >
              On the Way
            </div>
            {meta("Sun, 27 Oct", false, ".3s")}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: done ? "0fr" : "1fr",
              opacity: done ? 0 : 1,
              transition:
                "grid-template-rows .75s cubic-bezier(.4,0,.2,1), opacity .4s ease",
            }}
          >
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div
                style={{
                  marginTop: 14,
                  animation: "tlRow .5s cubic-bezier(.22,1,.36,1) 1.1s both",
                }}
              >
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: BODY,
                    letterSpacing: "-.01em",
                  }}
                >
                  Order arrived at our Nanded facility
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 16,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: MUTED,
                  }}
                >
                  Sun, 26 Oct, 4:00 AM
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  marginTop: 16,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: "#E6F7EF",
                  animation: "tlCard .55s cubic-bezier(.22,1,.36,1) 1.42s both",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: "45%",
                    background:
                      "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.75) 50%, rgba(255,255,255,0) 100%)",
                    animation: "tlShine 1.1s ease-out 1.9s both",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#068A4C",
                    letterSpacing: "-.01em",
                  }}
                >
                  Order has left Nanded facility
                </div>
                <div
                  style={{
                    position: "relative",
                    marginTop: 4,
                    fontSize: 16,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: BODY,
                  }}
                >
                  Sun, 26 Oct, 11:00 AM
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 0 6px",
                  animation: "tlFade .5s ease 1.85s both",
                }}
              >
                <div
                  style={{
                    width: 2,
                    height: 30,
                    backgroundImage:
                      "radial-gradient(#4A5470 1px, transparent 1.2px)",
                    backgroundSize: "2px 7px",
                    backgroundRepeat: "repeat-y",
                    animation: "tlDash .55s linear infinite",
                  }}
                />
                <div
                  style={{
                    padding: "9px 18px",
                    borderRadius: 999,
                    background: "#F1F2F5",
                    fontSize: 16,
                    fontWeight: 600,
                    color: BODY,
                    animation: "tlBob 2.6s ease-in-out 2.4s infinite both",
                  }}
                >
                  {DISTANCE_KM} KM to go
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    animation: "tlArrow 2.6s ease-in-out 2.4s infinite both",
                  }}
                >
                  <div
                    style={{
                      width: 2,
                      height: 22,
                      backgroundImage:
                        "radial-gradient(#4A5470 1px, transparent 1.2px)",
                      backgroundSize: "2px 7px",
                      backgroundRepeat: "repeat-y",
                      animation: "tlDash .55s linear infinite",
                    }}
                  />
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRight: "2px solid #14161C",
                      borderBottom: "2px solid #14161C",
                      transform: "rotate(45deg)",
                      marginTop: -3,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  paddingBottom: 6,
                  animation: "tlRow .5s cubic-bezier(.22,1,.36,1) 2.1s both",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: BODY,
                    letterSpacing: "-.01em",
                  }}
                >
                  Next Stop — Adilabad
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 17,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: MUTED,
                  }}
                >
                  Expected by Sun, 26 Oct, 5:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>

      {/* Out for Delivery */}
      <Row
        dot={
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                marginTop: 5,
                borderRadius: "50%",
                background: stepColor,
                transition: "background .5s ease .25s",
                animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) 2.25s both",
              }}
            />
            <div
              style={{
                flex: 1,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              <div
                style={{
                  width: 5,
                  borderRadius: 3,
                  background: stepColor,
                  transformOrigin: "top",
                  transition: "background .5s ease .35s",
                  animation: "tlSeg .34s ease-out 2.4s both",
                }}
              />
            </div>
          </div>
        }
      >
        <div style={{ paddingBottom: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              animation: "tlRow .5s cubic-bezier(.22,1,.36,1) 2.3s both",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: done ? INK : MUTED,
                letterSpacing: "-.015em",
                transition: "color .5s ease .25s",
              }}
            >
              Out for Delivery
            </div>
            {meta("Fri, 27 Oct, 1:00 PM", true, ".4s")}
          </div>
        </div>
      </Row>

      {/* Delivered */}
      <Row
        dot={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 13,
                height: 13,
                marginTop: 5,
                borderRadius: "50%",
                background: stepColor,
                transition: "background .5s ease .45s",
                animation: "tlDot .5s cubic-bezier(.34,1.56,.64,1) 2.5s both",
              }}
            />
          </div>
        }
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              animation: "tlRow .5s cubic-bezier(.22,1,.36,1) 2.55s both",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: done ? "#068A4C" : MUTED,
                letterSpacing: "-.015em",
                transition: "color .5s ease .45s",
              }}
            >
              Delivered
            </div>
            <div
              style={{
                width: 22,
                height: 22,
                marginLeft: 9,
                borderRadius: "50%",
                background: GREEN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: done ? "scale(1)" : "scale(0)",
                transition: "transform .55s cubic-bezier(.34,1.56,.64,1) .8s",
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 5,
                  borderLeft: "2.4px solid #fff",
                  borderBottom: "2.4px solid #fff",
                  transform: "rotate(-45deg) translate(1px, -1px)",
                }}
              />
            </div>
            {meta("Fri, 28 Oct, 1:00 PM", true, ".6s")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateRows: done ? "1fr" : "0fr",
              opacity: metaOpacity,
              transition:
                "grid-template-rows .5s cubic-bezier(.4,0,.2,1) .55s, opacity .4s ease .8s",
            }}
          >
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 17,
                  fontWeight: 500,
                  color: BODY,
                }}
              >
                Your order has been delivered
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

/**
 * Plays the entrance, holds on "in transit", then collapses into the delivered
 * state. Scales the 476px-wide panel to its container and pins it to the top,
 * so the card shrinks upward from the bottom as the detail collapses.
 */
export function TrackingAnimation({
  className,
  onSettled,
  instant,
}: {
  className?: string;
  /** Fires once the collapse to "delivered" has finished. */
  onSettled?: () => void;
  /** Skip the entrance stagger and show the settled in-transit timeline at once. */
  instant?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / NATURAL_W);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Held in a ref so an inline callback from the parent can't restart the timers.
  const settledRef = useRef(onSettled);
  useEffect(() => {
    settledRef.current = onSettled;
  }, [onSettled]);

  useEffect(() => {
    const advance = setTimeout(() => setDone(true), ADVANCE_AFTER);
    // The collapse runs .75s; let it finish before the panel repositions.
    const settle = setTimeout(() => settledRef.current?.(), ADVANCE_AFTER + 850);
    return () => {
      clearTimeout(advance);
      clearTimeout(settle);
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {scale > 0 ? (
        <div
          className={instant ? "tl-instant" : undefined}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: NATURAL_W,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 34,
              padding: "20px 28px 28px",
              boxShadow:
                "0 1px 2px rgba(19,26,44,.06), 0 18px 44px -18px rgba(19,26,44,.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 5,
                background: "#F4F5F7",
                borderRadius: 999,
                animation: "tlFade .4s ease both",
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px 0",
                  background: "#14161C",
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "-.01em",
                }}
              >
                Tracking
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px 0",
                  color: BODY,
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-.01em",
                }}
              >
                Order Details
              </div>
            </div>

            <Timeline done={done} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
