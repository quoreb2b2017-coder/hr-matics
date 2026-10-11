import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Social crawlers (and the Alli proxy in front of them) must see
  // title, description, and og:image in the first HTML chunk. Streaming
  // those tags into the body is what LinkedIn reports as an empty page.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24h
  },
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/(favicon.ico|favicon-32x32.png|icon-192.png|brand/mark.svg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=600" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default nextConfig;
