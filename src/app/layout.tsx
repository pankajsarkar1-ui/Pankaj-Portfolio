import type { Metadata } from "next";
import {
  Anek_Devanagari,
  Inter,
  Manrope,
  Plus_Jakarta_Sans,
  Poppins,
  DM_Sans,
  IBM_Plex_Sans,
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

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anek.variable} ${manrope.variable} ${jakarta.variable} ${poppins.variable} ${dmSans.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
