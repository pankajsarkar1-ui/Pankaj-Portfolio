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

## 3. Commit state (as of last update)

Branch `main`, pushed to `origin/main` at **`80348a3`** (+ this log). The session's work is
**committed and pushed** — a fresh clone now has all of it. Commits added this
session (newest first):

| Commit | Summary |
|---|---|
| `80348a3` | Refer & Earn case study; homepage cards for Coins and Refer & Earn now link to their pages. |
| `9e8b00a` | Delhivery Coins case study (with illustrative Impact figures, flagged on the page). |
| `b0109b8` | Shared case-study blocks (`CasePrimitives`, `Phone`), image quality 90, More-work arrow fix. |
| `e4e7113` | Order Tracking: sharper problem statement (escalation thread, knowledge gap, problem-statement band, image placeholders). |
| `dd3a91b` | Case rail: back CTA once stuck; larger, spaced, clearer tabs. |
| `6be4fb1` | Add a session handoff log for cross-account continuation (`CONVERSATION_LOG.md`). |
| `170ecce` | Order Tracking: left-aligned back button, iteration placeholder, selectable map views (`page.tsx`, `orderTracking.ts`, `MapViews.tsx`). |
| `c7d9cb1` | Theme-aware favicon from the logo mark (`icon.svg` added, `favicon.ico` removed). |
| `cd6c109` | Self-host Satoshi for body, keep Anek for headings (`layout.tsx`, `globals.css`, `src/app/fonts/`, `Nav.tsx`, `PillNav.tsx`, `TabChips.tsx`, `CaseNav.tsx`). |
| `5b60ad2` | (prev session) Dark-mode module, switched off. |
| `df05c02` | (prev session) Rebuild the Order Tracking case study around visuals. |

**Now committed** (`dd3a91b`, `e4e7113`). Kept below for reference:
- `src/components/CaseNav.tsx` — the sticky rail now reveals a left-aligned
  "All work" back CTA (+ divider) once it's stuck to the top; tab font
  14px → 15/16px; tabs spaced out (gap 10/16px); unselected text darker
  (`text-ink-body`); selected tab semibold.
- **Problem section strengthened** (from an internal leadership escalation —
  used for patterns only; no names, emails or quotes on the page):
  - `src/content/orderTracking.ts` — new lede naming Amazon/Flipkart/Myntra/
    Meesho; new `moment`, `thread`, `gap`, `statement` blocks.
  - `src/components/case/EscalationThread.tsx` — customer vs support thread
    ending in "Escalated" ("Five messages. Zero answers.").
  - `src/components/case/KnowledgeGap.tsx` — "What the customer saw" vs
    "What our systems knew" (3 rows) + route-screenshot placeholder.
  - `src/components/case/ImagePlaceholder.tsx` — reusable dashed placeholder
    sized to the coming image (`tone` surface/white).
  - `CaseIcons.tsx` — added `image` glyph.
  - `page.tsx` — Problem order is now: heading/lede → "Where is my package?"
    → festive-gift moment (+ photo placeholder) → escalation thread → one
    parcel three stories → date that keeps moving → knowledge gap → blue
    problem-statement band ("Tracking only ever looked backwards." + customer
    / support agent / brand).
- `CONVERSATION_LOG.md` — this file (ongoing edits fold into the next commit).

**Untracked, left as-is:** `public/assets/delhivery-logo.png` (unreferenced,
pre-existing).

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

## 5b. Delhivery Coins case study (second project) — committed `9e8b00a`

Route: `/work/delhivery-coins`. Page: `src/app/work/delhivery-coins/page.tsx`.
Copy: `src/content/delhiveryCoins.ts`. Source design: Figma "Practice DS",
node `1513:96747` ("Delhivery Coins — Case study"), file key
`oHMCMxarWktahzACl6ZsrJ`.

- **Assets:** 31 exports in `public/assets/work/coins/`, re-exported at
  **2×** (coins at **3×**) with the Figma MCP `download_assets` tool
  (`defaultScale`), which is the only route above 1× (`get_screenshot` caps at
  native size). Sources: the Practice DS case-study nodes (vector, so they scale
  cleanly) — same screens as the final UI file `mhNcYinqRpiTVOp6Fw2ccY`
  ("Final Design - Tarmac | 29 June 2026", node `566:50698`). Sketch photos
  originate in that file's Ideations section (`1:2`, rasters 1204×1600).
  Exports carry their frame's background (`#f9f9fb` mist, white, `#3a3a3a`
  step tiles, `#fff7eb` cream); tiles behind them match. `state-ready.png` is
  cropped to drop a stray strip.
- **Image quality:** `next.config.ts` allows `images.qualities: [75, 90]`; UI
  screens render with `quality={90}` and explicit `sizes`, because the default
  q75 WebP re-encode softened small interface text. Verified a 2× screen gets
  ≥2× pixels for every image.
- **Video:** the Figma "Video" node (`726:12995`, in the final UI file) can't
  be exported through the API — only a still poster comes back. The MP4 must
  come from the user.
- **Colour + spacing pass:** warm, celebratory palette led by the project's
  coral `#FF6C6C` (its homepage card). Coral bands with the grid floor: hero
  banner, The program, Reflection. Navy `#121926` (`--color-ink` is overridden
  to navy on this page): Context, Landing page, Outcome. Cream: Coin design.
  Soft coral `#ffe4df`: Experience. Yellow `#fff375`: How-might-we panel and
  the lead Impact stat. Coral "You never get there." tile. Checkout and Impact
  stay white as rests. Text on coral is full navy (white fails contrast).
  Spacing: section gap 96/160px, roomy band padding 24/56/72px, wider grids.
- **Phones drawn in code:** `src/components/case/Phone.tsx` frames bare
  720×1600 screen exports (`public/assets/work/coins/screens/`, from each
  phone's `Screen` child node at ~3.5–3.85×) so screens sit on any colour.
  Used in hero (fanned on coral), landing explorations (slate bezel on navy)
  and experience. Checkout phones/cards and balance states still use the
  framed exports on a mist tile. The floating hero coin was dropped: exports
  are composited on opaque backgrounds and colour-to-alpha made its pale
  highlights translucent.
- **Band API:** `Band` now takes `tone="plain"` (caller supplies the colour
  class), `floor` (grid on any tone) and `roomy` (bigger padding).
- **Theme:** the page overrides `--color-accent` (`#a15c07` gold),
  `--color-accent-soft` (`#fff7eb` cream) and `--color-accent-lime`
  (`#f7c04a` bright gold) on `<main>`, so the shared rail/bands go gold.
- **Rail:** Problem · Context · The program · Coin design · Landing page ·
  Checkout · Experience · Outcome · Impact · Reflection.
- **Impact section (HYPOTHETICAL DATA):** between Outcome and Reflection.
  `content.outcome.impact` holds invented figures — 4,000 / 7,200 / 9,600 /
  11,400 cumulative enrolment over weeks 1–4 (60% of the 18,991 eligible),
  62% of earned coins redeemed, 41% redeemed within 30 days, 18% expired
  unused, +14 pts 30-day repeat bookings. `illustrative: true` shows an
  "Illustrative figures until launch data is in." note; replace the numbers
  and set it false before presenting them as results. Chart is
  `src/components/case/EnrolmentBars.tsx` (single series, gold validated with
  the dataviz palette script on white and cream, hover tooltip, sr-only table).
  Reflection is now its own black band; the old "Launch numbers to come" chip
  under Measuring was removed.
- **Tweaks vs the Figma:** dropped the uppercase eyebrows (the rail does that
  job); hero stats (3 per ₹100 / 10 to redeem / ₹1 / 30-day) moved into a
  "The program, in four numbers" section with an added line ("A weekly ₹300
  order now earns 9 coins, so a shipper can redeem by their second booking");
  added the heading "The shippers worth keeping." for the context numbers;
  "How might we" as a cream panel; video slot and launch numbers as
  placeholders.
- **Shared refactor:** `src/components/case/CasePrimitives.tsx` now holds
  `Shell`, `Heading`, `Band` (blue/black/cream) and `CaseHeroNav`; Order
  Tracking imports them (no visual change). `ImagePlaceholder` gained an
  `icon` prop (`image` | `play`); `CaseIcons` gained `play`.
- **Also fixed:** `MoreWork` showed a doubled arrow ("4 min read → →").
- `src/content/projects.ts`: Coins card `href` → `/work/delhivery-coins`.

## 5c. Refer & Earn case study (third project) — committed `80348a3`

Route: `/work/refer-and-earn`. Page: `src/app/work/refer-and-earn/page.tsx`.
Copy: `src/content/referAndEarn.ts`. Sources: Figma "Practice DS" node
`1529:116476` ("Refer & Earn — Case study", file `oHMCMxarWktahzACl6ZsrJ`) for
copy and screens; final design file `1D2lYHdilVCNpEyjnIwH0H` ("08 - Referral",
node `3269:72798`) for the four level crowns (transparent originals, Assets
section `3269:96992–96998`).

- **Assets:** `public/assets/work/refer/screens/*.png` — 26 bare screens
  exported from each phone's `Screen` node at ~2× (720×1600; the six
  "fills up" screens are 684×1520, capped at 4× scale). `breakdown-page.png`
  is the full scrolling page (702×3798). `crown-1..4.png` trimmed to ink.
- **Theme:** purple `#7220BF` (homepage card) leads; pink `#FF7779` and yellow
  `#FFF375` from the card as highlights; lavender `#f3ebfc` soft; navy ink.
  Purple bands carry white text; pink carries navy.
- **Rail:** Problem · How it works · Ideation · Design breakdown · Levels ·
  New user · Touchpoints · Results.
- **Sections:** purple hero with three fanned phones + Level 1/Level 4
  crowns; cost bars (`src/components/case/CostBars.tsx`, paid ₹600–700 vs
  referral ₹240, slate vs purple, direct labels); pink HMW; lavender
  "How it works" with 3 steps and a navy "Then it becomes a game" panel with
  all four crowns; navy Ideation (4 phones); Design breakdown with numbered
  markers on the long page and sticky numbered notes; purple Levels band (5
  phones) + "fills up" row (6 phones with big counts); soft-pink New user (5);
  Touchpoints (4); navy Results (30k / 6,000+ / 12k / 40%, Jan–May 2026);
  purple "What's next" close.
- **Tweaks vs Figma:** no uppercase eyebrows; hero stats removed (they repeat
  in Results); results period shown under the heading.
- **Shared:** `STRIP`, `BAND_STRIP`, `Lede`, `Intro` moved into
  `CasePrimitives.tsx` (Coins page now imports them).
- `src/content/projects.ts`: Refer & Earn card `href` → `/work/refer-and-earn`.

## 6. Pending / awaiting the user

- **Refer & Earn: reward mismatch in the mock.** The "How to Earn?" card in the
  design-breakdown screen says "you get ₹100 · they get ₹150"; the copy
  everywhere else says ₹100 each.
- **Refer & Earn: phone numbers in the mock** ("9239179123") on the
  design-breakdown page — likely placeholders; confirm before publishing.

- **Addresses blurred (done):** "C-22, Koel Apartment, Dollar Colony" lines are
  Gaussian-blurred in `coins/screens/exp-unlock.png`, `coins/checkout-final.png`,
  `coins/checkout-iter-1.png`, `coins/checkout-iter-2.png`,
  `refer/screens/referee-nudge.png`, `refer/screens/touch-rating.png`. Re-blur
  if any of these are re-exported.
- **Coins: check the "You never get there" maths.** With 6 coins a week and
  a 30-day expiry, five weekly batches are alive on day 28 (30 coins, above
  25). The claim holds only if expiry is under 28 days.
- **Coins placeholders:** problem explainer video (16:9 MP4) and the coin
  intro animation (MP4 for node `726:12995`) — both need the file from the
  user. Impact figures are hypothetical (see §5b) — swap for launch data.

- **Problem-section images (placeholders in place):** (1) a relatable photo,
  4:3 — someone checking their phone for a parcel / a gift at a doorstep;
  (2) the misleading-route screenshot, 9:16 — old app drawing Delhi → Vadodara
  for a Vadodara → Goa parcel (blur addresses/phones).
- **Escalation chronology:** confirm whether the escalation predates the
  redesign. The page frames it as the *problem the redesign answers*; if it
  came after launch, reframe (e.g., as the next phase).
- **Confidentiality check:** cities, dates and "130 km" come from an internal
  escalation; the user may want to clear this with their team before it ships
  on the public site.
- **Deliberately left out:** IVR issues and hub-ageing ops failures (not in
  the redesign's scope), apart from the festive-gift hook line.

- **Map view images:** Micro and Delay views currently reuse `anatomy-map.png` as placeholders (marked `TODO` in `orderTracking.ts`). Need real crops (same aspect ratio, ~1092×900) to make the image actually change on selection.
- **Iteration section content:** placeholder in place; needs the real iteration story.
- **Mono labels elsewhere:** the IBM Plex Mono face still appears on small data labels (ETA-drift axis, platform labels, Before/After, some chips). User changed the rail only; open whether to convert these to Satoshi too.
- **Rail font exception:** see §4 note.
- **`public/assets/delhivery-logo.png`:** untracked, unreferenced — decision still open (keep/remove).
- **Commit:** session work is committed and pushed (`origin/main` at `6be4fb1`); nothing pending to push except later edits to this log.

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
