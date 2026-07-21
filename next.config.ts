import type { NextConfig } from "next";

// Static export for cPanel hosting — redirects()/headers() aren't supported
// in this mode, so old-URL SEO forwarding and security headers are
// reimplemented in public/.htaccess instead (see scripts/generate-htaccess.js).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
