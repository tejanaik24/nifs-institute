import type { NextConfig } from "next";
import { buildRedirects } from "@/lib/seo/redirects";

// Hosted on Vercel as a normal Next.js app (migrated off cPanel static
// export) — redirects()/headers() below replace public/.htaccess as the
// source of truth for legacy-URL 301s and security headers.
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return buildRedirects();
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
