import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Reviewer profile photos from live Google reviews.
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  async redirects() {
    return [
      // Preferred domain: send https://pawnscoop.com/* to https://www.pawnscoop.com/*
      {
        source: "/:path*",
        has: [{ type: "host", value: "pawnscoop.com" }],
        destination: "https://www.pawnscoop.com/:path*",
        permanent: true,
      },
      // Old URLs (already live/indexed) → new service pages
      { source: "/residential", destination: "/services/poop-scooping", permanent: true },
      { source: "/turf-cleaning", destination: "/services/artificial-turf-cleaning", permanent: true },
      { source: "/lawn-care", destination: "/services/lawn-care", permanent: true },
      { source: "/deodorizing", destination: "/services/disinfecting-deodorizing", permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
