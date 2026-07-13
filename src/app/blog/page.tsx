import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog — Safety Insights & NIFS News | NIFS India",
  description:
    "Articles on industrial safety regulations, course guidance, certifications, and career paths in fire and industrial safety.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Safety insights & NIFS updates"
        description="Course guidance, certifications, and career paths in fire and industrial safety."
      />
      <section
        data-path-target="true"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
      >
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
            >
              {post.coverImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                  {formatDate(post.date)}
                </span>
                <h2 className="font-display mt-2 text-lg leading-snug italic">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
