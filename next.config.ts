import type { NextConfig } from "next";
import blogPosts from "./src/lib/data/blog-posts.json";
import galleryCategories from "./src/lib/data/gallery.json";

const nextConfig: NextConfig = {
  async redirects() {
    // Old WordPress site served every blog post at the domain root
    // (nifsindia.net/<slug>/) — preserve that SEO equity by forwarding
    // each old URL to its migrated page at /blog/<slug> ahead of the
    // domain cutover, so nothing 404s.
    const blogRedirects = blogPosts.flatMap((post) => [
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

    // Old gallery lived at /gallery/<category>/ (plus a standalone
    // /recognition-gallery/) as separate WordPress pages — forward each to
    // the new single filterable /gallery page, pre-selecting the category.
    const galleryRedirects = (
      galleryCategories as { slug: string }[]
    ).flatMap((cat) => {
      const oldPath =
        cat.slug === "recognition-gallery"
          ? `/${cat.slug}`
          : `/gallery/${cat.slug}`;
      return [
        {
          source: oldPath,
          destination: `/gallery?category=${cat.slug}`,
          permanent: true,
        },
        {
          source: `${oldPath}/`,
          destination: `/gallery?category=${cat.slug}`,
          permanent: true,
        },
      ];
    });

    return [...blogRedirects, ...galleryRedirects];
  },
};

export default nextConfig;
