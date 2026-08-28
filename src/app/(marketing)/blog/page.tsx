import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { BlogCatalog } from "@/components/sections/blog-catalog";
import { getPublishedPosts, toBlogPostView } from "@/lib/db/posts";

export const metadata: Metadata = {
  title: "Blog — Safety Insights & NIFS News | NIFS India",
  description:
    "Articles on industrial safety regulations, course guidance, certifications, and career paths in fire and industrial safety.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  // Strip the heavy per-post fields (contentHtml, faqs) — the card grid never
  // reads them, and passing them to the client component bloats the page.
  const blogPostCards = posts.map((row) => {
    const { contentHtml: _contentHtml, faqs: _faqs, ...card } = toBlogPostView(row);
    return card;
  });

  return (
    <>
      <PageHero
        eyebrow="Safety Insights & Articles"
        title="Safety Insights & NIFS News"
        description="Course guidance, certifications, salary breakdowns, and career paths in fire and industrial safety."
      />
      <section
        data-path-target="true"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
      >
        <BlogCatalog posts={blogPostCards} />
      </section>
    </>
  );
}
