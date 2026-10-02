# Portfolio — Session Handoff Log

> **Purpose:** A living record of this working session so the work can be continued
> from any account/machine. Claude maintains and updates this file automatically;
> share it to resume elsewhere. **Last updated:** 2026-10-02.

---

## 1. Project at a glance

- **What:** Pankaj Sarkar's personal design portfolio.
- **Location:** `/Users/pankaj/Documents/Folio/Code Base`
- **Stack:** Next.js 16.3.4 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript
- **Repo:** https://github.com/pankajsarkar1-ui/Pankaj-Portfolio.git — **personal** GitHub account, **public** repo.
- **Branch:** `main` (push target `origin/main`).
- **Dev server:** `npm run dev` (port 3000). In the Claude desktop app it's launched via the preview tool as the `folio` launch config.
- **Commit attribution:** commits end with a `Co-Authored-By: Claude …` line.

### Working rhythm
Typical loop: user gives a UI request → Claude edits source → verifies on localhost (browser preview, DOM/computed-style checks, screenshots) → user says **"commit and push"** as a separate explicit step. **Do not commit or push unless asked.**

---

## 2. Standing constraints & preferences

- **Public repo / privacy:** screenshots on the site must have personal data (home addresses, phone numbers) cropped or blurred before publishing. The site is public.
- **Dark mode:** a full dark-mode module exists but is **switched off**. Keep it disabled until the user explicitly says **"bring back"**. Re-enable steps live in `src/components/theme/README.md`.
- **Typography rule (current):** **Anek Devanagari** for headings/titles **only**; **Satoshi** for body and all smaller text. (See §4.)
- **Maintain this log:** keep `CONVERSATION_LOG.md` updated as work progresses so the session can be handed off. Share it on request.

---

## 3. Current uncommitted state (as of last update)

Branch `main`, last commit `5b60ad2`. **Uncommitted** working changes:

| Status | File | What changed |
|---|---|---|
| Deleted | `src/app/favicon.ico` | Removed stale static favicon (replaced by theme-aware SVG). |
| Added | `src/app/icon.svg` | Theme-aware favicon built from the "p" logo mark. Black in light mode, white in dark (`prefers-color-scheme`). |
| Modified | `src/app/work/order-tracking/page.tsx` | Back button moved to left of nav, logo to right; added **Iteration** placeholder section; swapped the static anatomy map for the selectable `MapViews` component. |
| Modified | `src/content/orderTracking.ts` | Added `image`/`alt` per anatomy map view (macro/micro/delay). Micro & delay are placeholders pointing at `anatomy-map.png` (marked `TODO`). |
| Added | `src/components/case/MapViews.tsx` | Client component: three selectable map views; selecting one cross-fades the phone image. |
| Modified | `src/components/CaseNav.tsx` | Section rail font changed from mono → Satoshi (via `font-sans`), 14px regular. |
| Modified | `src/app/layout.tsx` | Added Satoshi via `next/font/local` (`--font-satoshi`, weights 400/500/700). |
| Modified | `src/app/globals.css` | `--font-sans` → Satoshi (body); `--font-display` stays Anek (headings). |
| Modified | `src/components/Nav.tsx` | Removed Anek baseline nudge (`translate-y-[0.19em]`) on the "Let's talk" CTA label (now Satoshi). |
| Modified | `src/components/PillNav.tsx` | Removed Anek baseline nudge on the CTA label. |
| Modified | `src/components/TabChips.tsx` | Removed Anek baseline nudges on tab labels. |
| Added | `src/app/fonts/` | `Satoshi-Regular.woff2`, `Satoshi-Medium.woff2`, `Satoshi-Bold.woff2` (converted from OTF, ~27 KB each). |
| Untracked | `public/assets/delhivery-logo.png` | Pre-existing, never committed, unreferenced. Left as-is. |

**Nothing above is committed yet.** Last two pushed commits were `df05c02` (case study rebuild) and `5b60ad2` (disabled dark-mode module).

---

## 4. Typography system (current)

- **Headings/titles:** `font-display` → Anek Devanagari (`--font-display: var(--font-anek), …`). Used only on headings (bold/semibold, large sizes).
- **Body + smaller text:** default `font-sans` → Satoshi (`--font-sans: var(--font-satoshi), var(--font-inter), …`).
- **Satoshi** is self-hosted via `next/font/local` in `layout.tsx`, weights **400 / 500 / 700**, files in `src/app/fonts/*.woff2`. Source OTFs came from `/Users/pankaj/Documents/Folio/Assets/Type/satoshi.zip`.
- **Removed:** the old `translate-y-[0.18–0.19em]` Anek baseline nudges on small UI labels (Nav, PillNav, TabChips) — Satoshi has symmetric metrics and sits centered without them.
- **Note / open question:** the Order Tracking section rail was set to *Anek regular* one turn, then to Satoshi the next (because "Anek only for headings"). It is currently **Satoshi**. If the user wants the rail to stay Anek as a deliberate exception, change `font-sans` → `font-display` on the rail `<a>` in `CaseNav.tsx:73`.

---

## 5. Order Tracking case study — structure

Route: `/work/order-tracking`. Page: `src/app/work/order-tracking/page.tsx`. Copy: `src/content/orderTracking.ts`.

**Section rail order** (`SECTIONS` in page.tsx): Problem · Goals · Research · The turn · **Iteration** (placeholder) · Anatomy · The flow · Edge cases · Impact.

**Case components** (`src/components/case/`): `PlatformShots`, `EtaDrift`, `StoryTrack`, `JourneyRail`, `TicketBars`, `CaseIcons`, `AnnotatedCard`, and the new **`MapViews`**.

### Recent work this session
1. **Favicon** → theme-aware SVG from the logo mark (`src/app/icon.svg`); deleted `favicon.ico`.
2. **Case nav** → back button ("All work") moved to the left, logo to the right.
3. **Iteration section** → placeholder added before Anatomy (dashed panel, "The iteration story goes here…"). **Awaiting real content from the user.**
4. **Selectable map views** → `MapViews.tsx`. Macro/Micro/Delay are clickable; selected state = filled accent icon + accent-soft panel + accent title; the phone image cross-fades.
5. **Typography** → Anek headings / Satoshi body (see §4).

---

## 6. Pending / awaiting the user

- **Map view images:** Micro and Delay views currently reuse `anatomy-map.png` as placeholders (marked `TODO` in `orderTracking.ts`). Need real crops (same aspect ratio, ~1092×900) to make the image actually change on selection.
- **Iteration section content:** placeholder in place; needs the real iteration story.
- **Mono labels elsewhere:** the IBM Plex Mono face still appears on small data labels (ETA-drift axis, platform labels, Before/After, some chips). User changed the rail only; open whether to convert these to Satoshi too.
- **Rail font exception:** see §4 note.
- **`public/assets/delhivery-logo.png`:** untracked, unreferenced — decision still open (keep/remove).
- **Commit:** all §3 changes are uncommitted, awaiting a "commit and push".

---

## 7. Known environment quirks

- **Stale `subtitle.join` 500 in one preview tab:** a long-lived preview tab's console keeps replaying a `orderTracking.subtitle.join is not a function` error from a chunk (`1nufh6z`) that no longer exists. It is **stale buffer**, not a real error — a fresh tab shows a clean console, the live page returns HTTP 200, and `subtitle` is a plain string in source. Clears on a new tab / full reload.
- **Browser-pane rendering:** IntersectionObserver and CSS animations pause while the pane is hidden; local SVGs always render in light mode in the pane; occasional stale HMR CSS (bust with a `?cache` query); front the tab before screenshotting.
- **Turbopack dev cache:** if genuinely corrupted, `rm -rf .next/dev .next/cache` then restart the dev server.

---

## 8. How to continue from another account

1. Clone: `git clone https://github.com/pankajsarkar1-ui/Pankaj-Portfolio.git` → `cd` in → `npm install`.
2. `npm run dev` → open `http://localhost:3000`.
3. **Note:** the §3 uncommitted changes live only on the original machine until committed & pushed. If resuming elsewhere *before* a push, the font files (`src/app/fonts/*.woff2`), `src/app/icon.svg`, `MapViews.tsx`, and the edits won't be present — re-apply from this log, or have them committed/pushed first. The Satoshi OTFs are in `Assets/Type/satoshi.zip` (outside the repo).
4. Read this file + `src/components/theme/README.md` (dark-mode re-enable) for full context.

---

*Claude updates this log as the session continues. Ask "share the md file" to get it.*
