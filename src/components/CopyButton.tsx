"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({
  value,
  label,
  tone = "light",
}: {
  value: string;
  /** Used for the accessible name, e.g. "email address". */
  label: string;
  /** "dark" flips the icon and hover fill for use on an ink surface. */
  tone?: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // denied or unsupported — leave the mailto link as the fallback
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      className={`flex size-[26px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        tone === "dark"
          ? "text-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-white"
          : "-mr-[6px] text-ink/55 hover:bg-black/[0.06] hover:text-ink focus-visible:outline-ink"
      }`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="5" width="8" height="8" rx="2" />
      <path d="M9.5 3.2A2 2 0 0 0 7.6 1H3a2 2 0 0 0-2 2v4.6a2 2 0 0 0 1.6 1.9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.5 7.5 5.5 10.5 11.5 4" />
    </svg>
  );
}
