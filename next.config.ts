import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is for UI screenshots: at the default 75 the WebP re-encode softens
    // small interface text. Everything else keeps the default.
    qualities: [75, 90],
  },
};

export default nextConfig;
