# Dark mode (currently disabled)

The dark theme is built but switched off. The module files are kept here and
the integration hooks are left in place (inert), so turning it back on is three
small edits — nothing to rebuild.

## Files (the module)

- `ThemeToggle.tsx` — the sun/moon button that flips `data-theme` on `<html>`
  and remembers the choice in `localStorage`.
- `../../app/theme-dark.css` — every dark value, as token overrides under
  `html[data-theme="dark"]`, plus the `.theme-surface` rule for the few literal
  `bg-white` chrome surfaces.

Still present but doing nothing while disabled:

- `theme-surface` classes on the nav, hero card and experience card.
- `--color-surface` token in `globals.css`.

## Re-enable

1. **`src/app/globals.css`** — re-add the import just under `@import "tailwindcss";`:
   ```css
   @import "./theme-dark.css";
   ```
2. **`src/components/Nav.tsx`** — import and render the toggle in the right-hand
   cluster (it fades out with the cup when the mobile menu is open):
   ```tsx
   import { ThemeToggle } from "@/components/theme/ThemeToggle";
   // …inside the <div className="flex items-center …"> cluster, first child:
   <ThemeToggle
     className={`transition-opacity duration-200 md:opacity-100 ${
       open ? "pointer-events-none opacity-0 md:pointer-events-auto" : "opacity-100"
     }`}
   />
   ```
3. **`src/app/layout.tsx`** — add the pre-paint init (no white flash on reload),
   next to the intro gate:
   ```tsx
   const THEME_INIT = `(function(){try{
     if(localStorage.getItem('theme')==='dark')document.documentElement.dataset.theme='dark';
   }catch(e){}})();`;
   // …beside the intro-gate <Script>:
   <Script id="theme-init" strategy="beforeInteractive"
     dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
   ```

## Notes / to revisit before shipping it

- Covers token-driven surfaces: page, text, borders, nav, hero/experience/beyond
  surfaces, tab chips.
- The already-dark sections (AI, Contact) and the brand-coloured work banner
  cards keep their own palettes.
- Not yet darkened: the case-study page (`/work/order-tracking`), the lightbox,
  and the hero's small white scroll-cue pill.
