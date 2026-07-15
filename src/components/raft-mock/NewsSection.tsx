"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/data/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug text-foreground">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
          Read More <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      {post.coverImage && (
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center p-4">
        <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">{formatDate(post.date)}</span>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-foreground">{post.title}</h3>
      </div>
    </Link>
  );
}

export function NewsSection() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featured = sorted.find((p) => p.slug === "nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university") ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug).slice(0, 4);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">Latest News</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              What&apos;s Happening At NIFS
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary">
            View All Updates <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
            <FeaturedCard post={featured} />
          </motion.div>
          <div className="flex flex-col gap-4">
            {rest.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
