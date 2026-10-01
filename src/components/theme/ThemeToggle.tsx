"use client";

import { useSyncExternalStore } from "react";

/**
 * The light/dark switch. Self-contained: it flips `data-theme` on <html>
 * (which theme-dark.css keys off) and remembers the choice. To remove dark
 * mode entirely, drop this component from the nav, the `@import` in
 * globals.css, and the init script in layout.tsx — nothing else depends on it.
 *
 * The attribute lives outside React, so it is read as an external store: the
 * server and the first client render agree on "light", and the real value
 * (already applied before paint by the init script) is picked up without a
 * hydration mismatch.
 */

const STORAGE_KEY = "theme";

let listeners: Array<() => void> = [];
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.push(l);
  return () => {
    listeners = listeners.filter((x) => x !== l);
  };
};
const readDark = () => document.documentElement.dataset.theme === "dark";
const darkOnServer = () => false;

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  if (next === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode / blocked storage — the choice just won't persist */
  }
  emit();
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, readDark, darkOnServer);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className={`flex h-[36px] w-[36px] items-center justify-center rounded-full text-ink transition-colors hover:bg-[var(--color-chip-idle)] ${className ?? ""}`}
    >
      {/* A sun and a moon share the frame; the one for the current mode fades
          and turns in while the other leaves. */}
      <span className="relative block size-[18px]">
        <svg
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden
          className={`absolute inset-0 size-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            dark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        >
          {/* sun */}
          <circle cx="9" cy="9" r="3.6" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 1.5v1.6M9 14.9v1.6M1.5 9h1.6M14.9 9h1.6M3.7 3.7l1.1 1.1M13.2 13.2l1.1 1.1M14.3 3.7l-1.1 1.1M4.8 13.2l-1.1 1.1" />
          </g>
        </svg>
        <svg
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden
          className={`absolute inset-0 size-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            dark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          {/* moon */}
          <path
            d="M15 10.6A6.3 6.3 0 1 1 7.4 3a4.9 4.9 0 0 0 7.6 7.6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
