import type { NextConfig } from "next";
import blogPosts from "./src/lib/data/blog-posts.json";

const nextConfig: NextConfig = {
  async redirects() {
    // Old WordPress site served every blog post at the domain root
    // (nifsindia.net/<slug>/) — preserve that SEO equity by forwarding
    // each old URL to its migrated page at /blog/<slug> ahead of the
    // domain cutover, so nothing 404s.
    return blogPosts.flatMap((post) => [
      {
        source: `/${post.slug}`,
        destination: `/blog/${post.slug}`,
        permanent: true,
      },
      {
        source: `/${post.slug}/`,
        destination: `/blog/${post.slug}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
