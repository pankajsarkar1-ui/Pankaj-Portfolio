import type { Metadata } from "next";
import Script from "next/script";
import {
  Anek_Devanagari,
  Inter,
  Manrope,
  Plus_Jakarta_Sans,
  Poppins,
  DM_Sans,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anek = Anek_Devanagari({
  variable: "--font-anek",
  subsets: ["latin"],
  display: "swap",
});

/** Used only by the Rewards card animation, which is authored in Manrope. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  // Only used inside a hover animation, so don't preload it up front.
  preload: false,
});

/** Used only by the Order Tracking timeline animation. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  // Only used inside a hover animation, so don't preload it up front.
  preload: false,
});

/** Used only by the Refer & Earn level-card animation. */
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  // Only used inside a hover animation, so don't preload it up front.
  preload: false,
});

/** Used only by the Delhivery Coins balance-card animation. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  // Only used inside a hover animation, so don't preload it up front.
  preload: false,
});

/** Used only by the Delhivery Local vehicle-cards animation. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  // Only used inside a hover animation, so don't preload it up front.
  preload: false,
});

/** Case-study eyebrows and the section rail. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * Decides before first paint whether the homepage intro runs, so the hero is
 * never briefly visible behind it. Plays on a first visit and on a refresh, but
 * not when returning to the homepage later in the same session.
 *
 * `data-intro` holds the page back (see globals.css); the Intro component
 * clears it when the curtain lifts, and the timeout is a failsafe so a hydration
 * failure can never leave the page hidden.
 */
const INTRO_GATE = `(function(){try{
  if(location.pathname!=='/')return;
  var n=performance.getEntriesByType('navigation')[0];
  var t=n&&n.type;
  var seen=sessionStorage.getItem('intro-seen');
  if(t==='back_forward')return;
  if(t!=='reload'&&seen)return;
  sessionStorage.setItem('intro-seen','1');
  document.documentElement.dataset.intro='playing';
  setTimeout(function(){delete document.documentElement.dataset.intro;},6000);
}catch(e){}})();`;

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // `data-intro` is set by the gate below before React hydrates.
      suppressHydrationWarning
      className={`${inter.variable} ${anek.variable} ${manrope.variable} ${jakarta.variable} ${poppins.variable} ${dmSans.variable} ${plex.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script
          id="intro-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: INTRO_GATE }}
        />
        {children}
      </body>
    </html>
  );
}
