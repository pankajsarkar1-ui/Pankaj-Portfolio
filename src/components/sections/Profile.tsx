"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { profile } from "@/content/profile";

/**
 * The About card is behind a plug. Drag the blue plug down into the black
 * socket (or tap it, or press Enter on it) and the connection lands with a
 * jolt: the card shakes, sparks fly, current runs down both cables, and the
 * profile floods out of the socket in a circle.
 *
 * Before that, the plug dangles and leans toward the mouse, and the socket
 * shadows every move it makes in the same direction, on a shorter leash. As
 * the prongs near the socket, little arcs jump the gap.
 *
 * While it waits, a pulse of current keeps running down the blue cable and
 * through the plug: the neck ribs light in turn, then the prongs, then a
 * crackle at the tips. It runs faster as you pull the plug closer.
 *
 * The card is sized to the viewport so both plugs are always in view, and the
 * profile is laid out to fit that same height.
 *
 * All motion runs in one rAF loop that writes SVG attributes directly, so
 * nothing re-renders per frame; React only tracks the phase.
 */

type Phase = "idle" | "connecting" | "connected";
type Pt = { x: number; y: number };

/** Where the blue plug hangs, and where the socket's top face sits. */
const REST: Pt = { x: 0, y: 150 };
const SOCKET: Pt = { x: 0, y: 360 };
/** Plugged in, the blue plug's origin sits this far above the socket top. */
const SEAT = 64;
/** How close a dragged plug has to get before it snaps home. */
const MAGNET = 38;
/** The blue cable drops in from above, a little left of centre. */
const ANCHOR_X = -80;

const RAYS = Array.from({ length: 12 }, (_, i) => ({ a: (i / 12) * Math.PI * 2 + 0.13, long: i % 2 === 0 }));
const OPEN = "cubic-bezier(.65,0,.25,1)";
const CLOSE = "cubic-bezier(.55,0,.75,.2)";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
/** 0 outside [a, b], a smooth hump inside it. */
const hump = (v: number, a: number, b: number) => (v <= a || v >= b ? 0 : Math.sin((Math.PI * (v - a)) / (b - a)));
/** One pulse cycle: down the cable, then the ribs, the prongs, the tips. */
const PULSE = { travel: 0.55, seconds: 1.9, seg: 60, from: 540 };
const RIBS = [4, 9, 14];
const TIP_SPARKS = [-1, 0, 1].flatMap((d) => [-13.5, 13.5].map((x) => ({ x, d })));
const cable = (x: number, y: number) =>
  `M ${ANCHOR_X} -600 L ${ANCHOR_X} -10 C ${ANCHOR_X} 80 ${x} ${y - 170} ${x} ${y + 2}`;
const tail = (x: number, y: number) =>
  `M ${x} ${y + 70} C ${x} ${y + 160} 0 ${SOCKET.y + 150} 0 ${SOCKET.y + 2400}`;

/** Text reveals in after the flood, one line at a time. */
const rise = (on: boolean, delay: number) =>
  on
    ? {
        className: "[animation:heroRise_620ms_cubic-bezier(.22,1,.36,1)_both] motion-reduce:[animation:none]",
        style: { animationDelay: `${delay}ms` },
      }
    : { className: "opacity-0", style: undefined };

/** Splits `**…**` into highlighter strokes that sweep in once connected. */
function Marked({ text, on, delay }: { text: string; on: boolean; delay: number }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <mark
        key={i}
        style={{ transitionDelay: `${delay}ms` }}
        className={`bg-transparent bg-[linear-gradient(transparent_38%,rgba(150,255,154,0.7)_38%,rgba(150,255,154,0.7)_90%,transparent_90%)] bg-no-repeat px-[1px] text-ink transition-[background-size] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${
          on ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
        }`}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function Profile() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragging, setDragging] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const plugRef = useRef<SVGGElement>(null);
  const cableRef = useRef<SVGPathElement>(null);
  const cableFlowRef = useRef<SVGPathElement>(null);
  const socketRef = useRef<SVGGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const tailFlowRef = useRef<SVGPathElement>(null);
  const arcRefs = useRef<(SVGPolylineElement | null)[]>([]);
  const glowRef = useRef<SVGCircleElement>(null);
  const burstRef = useRef<SVGGElement>(null);
  const rayRefs = useRef<(SVGLineElement | null)[]>([]);
  const ringRef = useRef<SVGCircleElement>(null);
  const hintRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  const ribRefs = useRef<(SVGRectElement | null)[]>([]);
  const prongRefs = useRef<(SVGRectElement | null)[]>([]);
  const tipsRef = useRef<SVGGElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const viaKeyboard = useRef(false);
  const api = useRef<{ unplug?: () => void }>({});

  useEffect(() => {
    const svg = svgRef.current;
    const plug = plugRef.current;
    const card = cardRef.current;
    const stage = stageRef.current;
    const panel = panelRef.current;
    const wipe = wipeRef.current;
    if (!svg || !plug || !card || !stage || !panel || !wipe) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = {
      mode: "idle" as Phase | "closing",
      blue: { ...REST },
      bv: { x: 0, y: 0 },
      sock: { ...SOCKET },
      sv: { x: 0, y: 0 },
      tilt: 0,
      hover: null as Pt | null,
      drag: null as null | { ox: number; oy: number; cx: number; cy: number; t: number; moved: boolean; target: Pt },
      auto: false,
      t0: 0,
      revealed: false,
      proximity: 0,
      pulseT: 0,
      last: 0,
    };

    const toSvg = (e: PointerEvent): Pt => {
      const m = svg.getScreenCTM();
      if (!m) return { ...REST };
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      return { x: p.x, y: p.y };
    };
    const seat = () => ({ x: s.sock.x, y: s.sock.y - SEAT });

    /** The flood starts at the joint, in card pixels, and covers the far corner. */
    const circles = (height: number) => {
      const cr = card.getBoundingClientRect();
      const m = svg.getScreenCTM();
      let jx = cr.width / 2;
      let jy = height * 0.4;
      if (m) {
        const p = new DOMPoint(s.sock.x, s.sock.y).matrixTransform(m);
        jx = p.x - cr.left;
        jy = p.y - cr.top;
      }
      const r = Math.hypot(Math.max(jx, cr.width - jx), Math.max(jy, height - jy)) + 8;
      return { shut: `circle(0px at ${jx}px ${jy}px)`, open: `circle(${r}px at ${jx}px ${jy}px)` };
    };

    function connect() {
      s.mode = "connecting";
      s.drag = null;
      s.auto = false;
      s.t0 = performance.now();
      s.revealed = false;
      s.sv.y = 9; // the jolt as it seats
      setDragging(false);
      setPhase("connecting");
      if (reduce) reveal();
    }

    function reveal() {
      s.revealed = true;
      const { shut, open } = circles(card!.offsetHeight);
      const done = () => {
        panel!.style.clipPath = "none";
        // the blue flood has done its job; shut it so no sliver shows at the edges
        wipe!.getAnimations().forEach((x) => x.cancel());
        wipe!.style.clipPath = shut;
        // and the stage sleeps under the profile, so no cable edge can peek out
        stage!.style.visibility = "hidden";
        s.mode = "connected";
        setPhase("connected");
        stop();
      };
      if (reduce) {
        panel!.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
        done();
        return;
      }
      wipe!.animate([{ clipPath: shut }, { clipPath: open }], { duration: 650, easing: OPEN, fill: "forwards" });
      const a = panel!.animate([{ clipPath: shut }, { clipPath: open }], {
        duration: 720,
        delay: 170,
        easing: OPEN,
        fill: "forwards",
      });
      a.onfinish = () => {
        a.cancel();
        done();
      };
    }

    function unplug() {
      if (s.mode !== "connected") return;
      s.mode = "closing";
      const hadFocus = panel!.contains(document.activeElement);
      stage!.style.visibility = "";
      const { shut, open } = circles(card!.offsetHeight);
      const finish = () => {
        panel!.getAnimations().forEach((x) => x.cancel());
        wipe!.getAnimations().forEach((x) => x.cancel());
        panel!.style.clipPath = shut;
        wipe!.style.clipPath = shut;
        s.mode = "idle";
        // it pops out of the socket and swings back up
        s.bv.y = reduce ? 0 : -18;
        s.sv.y = reduce ? 0 : -5;
        // the stage is still inert until React catches up, so lift it first
        stage!.inert = false;
        setPhase("idle");
        start();
        if (hadFocus) plug!.focus({ preventScroll: true });
      };
      if (reduce) return finish();
      panel!.animate([{ clipPath: open }, { clipPath: shut }], { duration: 440, easing: CLOSE, fill: "forwards" });
      wipe!.animate([{ clipPath: open }, { clipPath: shut }], {
        duration: 440,
        delay: 110,
        easing: CLOSE,
        fill: "forwards",
      }).onfinish = finish;
    }
    api.current.unplug = unplug;

    function autoConnect(keyboard: boolean) {
      if (s.mode !== "idle") return;
      viaKeyboard.current = keyboard;
      if (reduce) return connect();
      s.auto = true;
      s.drag = null;
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const t = now / 1000;
      const dt = s.last ? Math.min(0.05, (now - s.last) / 1000) : 0;
      s.last = now;
      // the closer the plug gets, the faster the current runs
      s.pulseT += (dt / PULSE.seconds) * (1 + 1.6 * s.proximity);

      if (s.mode === "idle") {
        let target: Pt;
        let k = 0.075;
        let d = 0.84;
        if (s.drag) {
          target = s.drag.target;
          k = 0.32;
          d = 0.62;
        } else if (s.auto) {
          target = seat();
          k = 0.09;
          d = 0.8;
        } else {
          // lean toward the mouse, and never quite hang still
          const h = s.hover;
          const nx = h ? clamp((h.x - REST.x) * 0.1, -26, 26) : 0;
          const ny = h ? clamp((h.y - REST.y) * 0.08, -14, 18) : 0;
          target = {
            x: REST.x + nx + (reduce ? 0 : Math.sin(t * 1.3) * 2.5),
            y: REST.y + ny + (reduce ? 0 : Math.sin(t * 1.9) * 3),
          };
        }
        s.bv.x = (s.bv.x + (target.x - s.blue.x) * k) * d;
        s.bv.y = (s.bv.y + (target.y - s.blue.y) * k) * d;
        s.blue.x += s.bv.x;
        s.blue.y += s.bv.y;

        // the socket goes the same way the plug goes, on a shorter leash
        const ox = s.blue.x - REST.x;
        const oy = s.blue.y - REST.y;
        const st = { x: SOCKET.x + clamp(ox * 0.45, -34, 34), y: SOCKET.y + clamp(oy * 0.07, -8, 12) };
        s.sv.x = (s.sv.x + (st.x - s.sock.x) * 0.14) * 0.76;
        s.sv.y = (s.sv.y + (st.y - s.sock.y) * 0.14) * 0.76;
        s.sock.x += s.sv.x;
        s.sock.y += s.sv.y;

        const sd = seat();
        const dist = Math.hypot(s.blue.x - sd.x, s.blue.y - sd.y);
        s.proximity = s.drag || s.auto ? clamp(1 - (dist - MAGNET) / 120, 0, 1) : 0;
        // dangling: the plug's foot trails behind the way it's moving
        s.tilt += (clamp(s.bv.x * 2.4, -20, 20) - s.tilt) * 0.2;
        if ((s.drag || s.auto) && dist < (s.auto ? 5 : MAGNET)) connect();
      } else {
        // locked together, riding out the jolt
        s.sv.x = (s.sv.x + (SOCKET.x - s.sock.x) * 0.2) * 0.7;
        s.sv.y = (s.sv.y + (SOCKET.y - s.sock.y) * 0.2) * 0.7;
        s.sock.x += s.sv.x;
        s.sock.y += s.sv.y;
        s.blue = seat();
        s.tilt *= 0.7;
        s.proximity = 0;
      }

      draw(now);
    }

    function draw(now: number) {
      const { x: bx, y: by } = s.blue;
      const { x: sx, y: sy } = s.sock;
      plug!.setAttribute("transform", `translate(${bx} ${by}) rotate(${s.tilt})`);
      cableRef.current?.setAttribute("d", cable(bx, by));
      cableFlowRef.current?.setAttribute("d", cable(bx, by));
      socketRef.current?.setAttribute("transform", `translate(${sx} ${sy})`);
      tailRef.current?.setAttribute("d", tail(sx, sy));
      tailFlowRef.current?.setAttribute("d", tail(sx, sy));
      hintRef.current?.setAttribute("transform", `translate(${bx + 48} ${by + 14})`);
      burstRef.current?.setAttribute("transform", `translate(${sx} ${sy + 4})`);

      // arcs jump the gap as the prongs close in, flickering
      const p = s.proximity;
      arcRefs.current.forEach((el, i) => {
        if (!el) return;
        if (p < 0.03 || reduce || Math.random() < 0.3) return el.setAttribute("opacity", "0");
        const side = i === 0 ? -13.5 : 13.5;
        const a = { x: bx + side, y: by + 92 };
        const b = { x: sx + side, y: sy + 4 };
        const pts = Array.from({ length: 7 }, (_, j) => {
          const f = j / 6;
          const jit = j === 0 || j === 6 ? 0 : (Math.random() - 0.5) * 14 * p;
          return `${a.x + (b.x - a.x) * f + jit},${a.y + (b.y - a.y) * f}`;
        });
        el.setAttribute("points", pts.join(" "));
        el.setAttribute("opacity", String(0.35 + 0.65 * p));
      });

      // a pulse of current down the cable and through the plug
      const pulse = pulseRef.current;
      const live = s.mode === "idle" && !reduce;
      const ph = s.pulseT % 1;
      if (pulse) {
        if (live && ph < PULSE.travel) {
          const len = pulse.getTotalLength();
          const pos = PULSE.from + (len - PULSE.from) * (ph / PULSE.travel) ** 1.6;
          pulse.setAttribute("d", cable(bx, by));
          pulse.setAttribute("stroke-dasharray", `${PULSE.seg} ${len + PULSE.seg}`);
          pulse.setAttribute("stroke-dashoffset", String(-(pos - PULSE.seg)));
          pulse.setAttribute("opacity", "1");
        } else pulse.setAttribute("opacity", "0");
      }
      ribRefs.current.forEach((el, i) => {
        const a = PULSE.travel - 0.01 + i * 0.03;
        el?.setAttribute("opacity", String(live ? hump(ph, a, a + 0.09) : 0));
      });
      prongRefs.current.forEach((el) => {
        el?.setAttribute("opacity", String(live ? hump(ph, 0.62, 0.8) : 0));
      });
      tipsRef.current?.setAttribute(
        "opacity",
        String(live && ph > 0.7 && ph < 0.82 && Math.random() > 0.25 ? 1 : 0),
      );

      const glow = glowRef.current;
      const ring = ringRef.current;
      const flows = [cableFlowRef.current, tailFlowRef.current];
      if (s.mode === "connecting" && !reduce) {
        const e = now - s.t0;
        const q = clamp(e / 520, 0, 1);
        const eo = easeOut(q);
        RAYS.forEach((ray, i) => {
          const el = rayRefs.current[i];
          if (!el) return;
          const r1 = 18 + 84 * eo;
          const r2 = r1 + (ray.long ? 44 : 24) * (1 - q) + 6;
          el.setAttribute("x1", String(Math.cos(ray.a) * r1));
          el.setAttribute("y1", String(Math.sin(ray.a) * r1));
          el.setAttribute("x2", String(Math.cos(ray.a) * r2));
          el.setAttribute("y2", String(Math.sin(ray.a) * r2));
          el.setAttribute("opacity", String(1 - q));
        });
        ring?.setAttribute("r", String(12 + 120 * eo));
        ring?.setAttribute("opacity", String(0.9 * (1 - q)));
        glow?.setAttribute("opacity", String(e < 120 ? 1 : Math.max(0, 1 - (e - 120) / 520)));
        flows.forEach((f) => {
          f?.setAttribute("stroke-dashoffset", String(-e * 0.32));
          f?.setAttribute("opacity", "1");
        });
        const amp = 8 * (1 - clamp(e / 380, 0, 1));
        stage!.style.transform =
          amp > 0.3 ? `translate(${(Math.random() - 0.5) * amp}px, ${(Math.random() - 0.5) * amp}px)` : "";
        if (!s.revealed && e > 520) reveal();
      } else {
        rayRefs.current.forEach((el) => el?.setAttribute("opacity", "0"));
        ring?.setAttribute("opacity", "0");
        glow?.setAttribute("opacity", String(p * 0.55));
        flows.forEach((f) => f?.setAttribute("opacity", "0"));
        stage!.style.transform = "";
      }
    }

    let raf = 0;
    let visible = false;
    function start() {
      cancelAnimationFrame(raf);
      if (visible && s.mode !== "connected") raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(card);
    draw(performance.now());

    const onDown = (e: PointerEvent) => {
      if (s.mode !== "idle") return;
      e.preventDefault();
      svg.setPointerCapture(e.pointerId);
      const p = toSvg(e);
      s.auto = false;
      s.drag = {
        ox: p.x - s.blue.x,
        oy: p.y - s.blue.y,
        cx: e.clientX,
        cy: e.clientY,
        t: performance.now(),
        moved: false,
        target: { ...s.blue },
      };
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      const p = toSvg(e);
      if (s.drag) {
        if (Math.hypot(e.clientX - s.drag.cx, e.clientY - s.drag.cy) > 5) s.drag.moved = true;
        s.drag.target = { x: clamp(p.x - s.drag.ox, -190, 190), y: clamp(p.y - s.drag.oy, 40, seat().y + 24) };
      } else if (e.pointerType === "mouse") {
        s.hover = p;
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!s.drag) return;
      const tap = !s.drag.moved && performance.now() - s.drag.t < 350;
      s.drag = null;
      setDragging(false);
      if (svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
      if (tap) autoConnect(false);
    };
    const onLeave = () => {
      s.hover = null;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      autoConnect(true);
    };

    // A finger on the plug drags it, not the page. `touch-action` on an SVG
    // child isn't honoured everywhere (iOS Safari), so the browser would take
    // a downward drag as a scroll and cancel the pointer mid-pull; refusing
    // the touch itself keeps it ours. Touches anywhere else still scroll.
    const onTouchStart = (e: TouchEvent) => {
      if (s.mode === "idle") e.preventDefault();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (s.drag) e.preventDefault();
    };

    plug.addEventListener("pointerdown", onDown);
    plug.addEventListener("keydown", onKey);
    plug.addEventListener("touchstart", onTouchStart, { passive: false });
    svg.addEventListener("touchmove", onTouchMove, { passive: false });
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      stop();
      io.disconnect();
      plug.removeEventListener("pointerdown", onDown);
      plug.removeEventListener("keydown", onKey);
      plug.removeEventListener("touchstart", onTouchStart);
      svg.removeEventListener("touchmove", onTouchMove);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (phase === "connected" && viaKeyboard.current) headingRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const on = phase === "connected";
  const showHint = phase === "idle" && !dragging;

  return (
    /* The About page's one card: the site bar on top, the plug below it. The
       flood stays under the bar, so the way out is always in reach. */
    <section
      id="top"
      className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-shell-border bg-white"
    >
      <Nav />
      <h1 className="sr-only">About {profile.name}</h1>

      <div ref={cardRef} className="relative grid grow overflow-hidden">
        {/* the stage: plug, socket, and everything that sparks */}
        <div
          ref={stageRef}
          inert={phase === "connected"}
          className="relative col-start-1 row-start-1 h-[clamp(520px,calc(100svh-104px),760px)] sm:h-[clamp(380px,calc(100svh-170px),640px)]"
        >
          <p className="absolute top-[20px] right-[20px] flex items-center gap-[8px] text-[13px] font-medium text-ink-body sm:top-[28px] sm:right-[32px] sm:text-[14px]">
            <span
              className={`size-[8px] rounded-full transition-colors ${
                phase === "idle" ? "bg-[#c4c4c4]" : "bg-accent motion-safe:animate-pulse"
              }`}
            />
            {phase === "idle" ? "Not connected" : "Connecting"}
          </p>

          <svg
            ref={svgRef}
            viewBox="-200 20 400 470"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 size-full touch-pan-y overflow-visible select-none"
          >
            <defs>
              <radialGradient id="plug-glow">
                <stop offset="0%" stopColor="#4354ee" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4354ee" stopOpacity="0" />
              </radialGradient>
              <filter id="zap-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle ref={glowRef} cx={SOCKET.x} cy={SOCKET.y} r="110" fill="url(#plug-glow)" opacity="0" />

            {/* blue: the plug you pull */}
            <path ref={cableRef} d={cable(REST.x, REST.y)} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-accent" />
            <path
              ref={cableFlowRef}
              d={cable(REST.x, REST.y)}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 20"
              opacity="0"
              className="stroke-accent-lime"
            />
            <path
              ref={pulseRef}
              d={cable(REST.x, REST.y)}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0"
              filter="url(#zap-glow)"
              className="pointer-events-none stroke-accent-lime"
            />
            <g
              ref={plugRef}
              transform={`translate(${REST.x} ${REST.y})`}
              tabIndex={0}
              role="button"
              aria-label="Plug in to see Pankaj's profile"
              className={`group touch-none outline-none ${
                phase === "idle" ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
              }`}
            >
              <rect x="-44" y="-14" width="88" height="120" rx="18" fill="transparent" />
              <rect
                x="-40"
                y="-10"
                width="80"
                height="112"
                rx="16"
                fill="none"
                strokeWidth="2"
                className="stroke-accent opacity-0 group-focus-visible:opacity-100"
              />
              <g className="fill-accent">
                <path d="M-5 0 L5 0 L7 26 L-7 26 Z" />
                <rect x="-8" y="4" width="16" height="2.5" rx="1" />
                <rect x="-8" y="9" width="16" height="2.5" rx="1" />
                <rect x="-8" y="14" width="16" height="2.5" rx="1" />
                <rect x="-22" y="22" width="44" height="34" rx="12" />
                <rect x="-31" y="46" width="62" height="18" rx="3" />
                <rect x="-17.5" y="62" width="8" height="30" rx="3" />
                <rect x="9.5" y="62" width="8" height="30" rx="3" />
              </g>
              {/* the pulse lighting its way through */}
              <g filter="url(#zap-glow)" className="pointer-events-none fill-accent-lime">
                {RIBS.map((y, i) => (
                  <rect
                    key={y}
                    ref={(el) => {
                      ribRefs.current[i] = el;
                    }}
                    x="-8"
                    y={y}
                    width="16"
                    height="2.5"
                    rx="1"
                    opacity="0"
                  />
                ))}
                {[-17.5, 9.5].map((x, i) => (
                  <rect
                    key={x}
                    ref={(el) => {
                      prongRefs.current[i] = el;
                    }}
                    x={x + 2}
                    y="64"
                    width="4"
                    height="26"
                    rx="2"
                    opacity="0"
                  />
                ))}
              </g>
              <g ref={tipsRef} opacity="0" filter="url(#zap-glow)" strokeWidth="1.6" strokeLinecap="round" className="pointer-events-none stroke-accent-lime">
                {TIP_SPARKS.map(({ x, d }) => (
                  <line key={`${x}${d}`} x1={x + d * 2} y1="95" x2={x + d * 7} y2={d === 0 ? 104 : 101} />
                ))}
              </g>
            </g>

            {/* arcs across the gap */}
            {[0, 1].map((i) => (
              <polyline
                key={i}
                ref={(el) => {
                  arcRefs.current[i] = el;
                }}
                points=""
                fill="none"
                strokeWidth="1.6"
                strokeLinejoin="round"
                opacity="0"
                className="stroke-accent"
              />
            ))}

            {/* black: the socket, drawn over the prongs so they slide in */}
            <path ref={tailRef} d={tail(SOCKET.x, SOCKET.y)} fill="none" strokeWidth="6" className="stroke-ink" />
            <path
              ref={tailFlowRef}
              d={tail(SOCKET.x, SOCKET.y)}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 20"
              opacity="0"
              className="stroke-accent-lime"
            />
            <g ref={socketRef} transform={`translate(${SOCKET.x} ${SOCKET.y})`} className="fill-ink">
              <rect x="-32" y="0" width="64" height="18" rx="3" />
              <rect x="-23" y="10" width="46" height="40" rx="14" />
              <path d="M-7 48 L7 48 L5 72 L-5 72 Z" />
              <rect x="-8" y="56" width="16" height="2.5" rx="1" />
              <rect x="-8" y="61" width="16" height="2.5" rx="1" />
              <rect x="-8" y="66" width="16" height="2.5" rx="1" />
            </g>

            {/* the burst on contact */}
            <g ref={burstRef} transform={`translate(${SOCKET.x} ${SOCKET.y + 4})`} className="pointer-events-none">
              <circle ref={ringRef} r="12" fill="none" strokeWidth="2.5" opacity="0" className="stroke-accent" />
              {RAYS.map((ray, i) => (
                <line
                  key={i}
                  ref={(el) => {
                    rayRefs.current[i] = el;
                  }}
                  strokeWidth={ray.long ? 3 : 2}
                  strokeLinecap="round"
                  opacity="0"
                  className={ray.long ? "stroke-accent" : "stroke-ink"}
                />
              ))}
            </g>

            <g
              ref={hintRef}
              transform={`translate(${REST.x + 48} ${REST.y + 14})`}
              className={`pointer-events-none transition-opacity duration-300 ${showHint ? "opacity-100" : "opacity-0"}`}
            >
              <rect width="124" height="32" rx="16" className="fill-chip-idle" />
              <text x="62" y="20.5" textAnchor="middle" fontSize="14" fontWeight="500" className="fill-ink font-sans">
                {profile.hint}
              </text>
            </g>
          </svg>
        </div>

        {/* the flood: blue first, then the profile right behind it */}
        <div
          ref={wipeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-accent [clip-path:circle(0px_at_50%_40%)]"
        />

        <div
          ref={panelRef}
          inert={!on}
          className="absolute inset-0 flex flex-col bg-white bg-[radial-gradient(#e6e6e6_1px,transparent_1.3px)] [background-size:22px_22px] [container-type:size] [clip-path:circle(0px_at_50%_40%)] md:block"
        >
          {/* Everything fits the card's own height: on phones the text sits
              above the photo; from md it takes the left 63%, centred, with
              type that scales with the screen's height. A very short screen
              scrolls the text rather than cropping it. */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-[10px] overflow-y-auto px-[20px] pt-[20px] pb-[2px] [scrollbar-width:thin] sm:px-[40px] sm:pt-[32px] md:absolute md:inset-y-0 md:left-0 md:w-[63%] md:justify-center md:gap-[clamp(8px,1.8vh,22px)] md:py-[clamp(16px,4vh,56px)] md:pr-[24px] md:pl-[clamp(28px,5vw,64px)]">
            <p
              style={rise(on, 0).style}
              className={`flex items-center gap-[8px] text-[13px] font-medium text-ink-body sm:text-[14px] ${rise(on, 0).className}`}
            >
              <span className="relative flex size-[8px]">
                <span className="absolute inset-0 rounded-full bg-accent-lime motion-safe:animate-ping" />
                <span className="relative size-[8px] rounded-full bg-[#3ccf4e]" />
              </span>
              {profile.status}
            </p>

            <h2
              ref={headingRef}
              tabIndex={-1}
              style={rise(on, 60).style}
              className={`font-display text-[28px] leading-[1.02] font-bold tracking-[-0.03em] text-ink outline-none md:text-[clamp(28px,6vh,48px)] ${rise(on, 60).className}`}
            >
              <span className="sr-only">{profile.title}</span>
              <span aria-hidden>
                <span className="font-hand mr-[0.12em] inline-block -rotate-[6deg] text-[1.18em] leading-none font-bold tracking-normal text-accent">
                  {profile.greeting}
                </span>
                I&rsquo;m{" "}
                <span className="relative inline-block">
                  {profile.firstName}
                  {/* a marker underline, drawn in once connected */}
                  <svg
                    viewBox="0 0 200 18"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.14em] left-[-2%] h-[0.26em] w-[96%] overflow-visible"
                  >
                    <path
                      d="M3 11 C 38 4, 76 15, 112 8 S 172 4, 197 10"
                      fill="none"
                      pathLength={1}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="1"
                      style={{ strokeDashoffset: on ? 0 : 1, transitionDelay: on ? "520ms" : "0ms" }}
                      className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
                    />
                  </svg>
                </span>
              </span>
            </h2>

            <div className="flex max-w-[58ch] flex-col gap-[10px] md:gap-[clamp(8px,1.6vh,14px)]">
              {profile.paragraphs.map((text, i) => (
                <p
                  key={i}
                  style={rise(on, 140 + i * 80).style}
                  className={`text-[14px] leading-[1.5] text-ink-body min-[380px]:text-[15px] md:text-[clamp(14px,2vh,17px)] md:leading-[1.55] ${rise(on, 140 + i * 80).className}`}
                >
                  <Marked text={text} on={on} delay={700 + i * 220} />
                </p>
              ))}
            </div>
          </div>

          {/* a quiet way back, in the corner where the stage's status sat */}
          <button
            type="button"
            onClick={() => api.current.unplug?.()}
            style={rise(on, 520).style}
            className={`absolute top-[14px] right-[12px] z-20 flex items-center gap-[6px] rounded-full px-[10px] py-[6px] text-[13px] font-medium text-ink-muted transition-colors hover:bg-chip-idle hover:text-ink sm:top-[22px] sm:right-[22px] ${rise(on, 520).className}`}
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-[14px] fill-current">
              <rect x="6.5" y="0.5" width="3" height="4" rx="1" />
              <rect x="3" y="4" width="10" height="5" rx="1.5" />
              <rect x="4.5" y="9.5" width="2" height="4.5" rx="1" />
              <rect x="9.5" y="9.5" width="2" height="4.5" rx="1" />
            </svg>
            Unplug
          </button>

          {/* bottom-right corner: the photo's cropped edges sit on the card's own
              right and bottom edges, so nothing looks cut off */}
          <div
            className={`relative aspect-[820/1024] h-[min(28%,240px)] shrink-0 self-end transition-[opacity,transform] delay-200 duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none md:absolute md:right-0 md:bottom-0 md:h-auto md:w-[min(34cqw,75cqh)] ${
              on ? "translate-y-0 opacity-100" : "translate-y-[40px] opacity-0"
            }`}
          >
            {/* doodled spark lines by the head, drawn in once connected */}
            <svg aria-hidden viewBox="0 0 60 60" className="absolute top-[3%] left-[16%] w-[16%] overflow-visible">
              {["M30 22 L26 6", "M20 30 L6 24", "M24 40 L10 46"].map((d, i) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ strokeDashoffset: on ? 0 : 1, transitionDelay: on ? `${900 + i * 90}ms` : "0ms" }}
                  className="fill-none stroke-ink transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none"
                />
              ))}
            </svg>
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.w}
              height={profile.portrait.h}
              sizes="(min-width: 768px) 480px, 220px"
              className="relative block h-full w-auto drop-shadow-[0_12px_24px_rgba(18,25,38,0.25)] md:h-auto md:w-full"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {on ? "Connected. Pankaj's profile is showing." : ""}
        </p>
      </div>
    </section>
  );
}
