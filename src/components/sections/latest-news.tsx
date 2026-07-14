"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/data/blog";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-[#FBECEA] transition-shadow duration-300 hover:shadow-xl"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-xl leading-snug font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
          Read More… <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex overflow-hidden border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
    >
      {post.coverImage && (
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center p-4">
        <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
          {formatDate(post.date)}
        </span>
        <h3 className="font-display mt-1 line-clamp-2 text-sm leading-snug italic">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export function LatestNews() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured =
    sorted.find(
      (p) => p.slug === "nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university"
    ) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug).slice(0, 4);
  const leftRest = rest.slice(0, 2);
  const rightRest = rest.slice(2, 4);

  return (
    <section className="relative overflow-hidden py-16 lg:py-0">
      <SpineGutterBg color="var(--background)" mobileColor="var(--muted)" />

      {/* ── DESKTOP: spine split — featured story left, secondary posts right ── */}
      <div className="hidden lg:block">
        <SpineSplit
          align="start"
          left={
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="px-6 lg:pr-10 lg:pl-0"
            >
              <FeaturedCard post={featured} />
            </motion.div>
          }
          center={
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                Latest News
              </span>
              <h2 className="font-display text-2xl leading-tight text-white italic">
                What&apos;s Happening
                <br />
                At NIFS
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                View All Updates <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          }
          right={
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4 px-6 lg:pr-0 lg:pl-10"
            >
              {[...leftRest, ...rightRest].map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          }
        />
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="relative z-[3] mx-auto max-w-5xl px-6 py-16 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Latest News
            </span>
            <h2 className="font-display mt-3 max-w-xl text-3xl italic leading-tight">
              What&apos;s Happening At NIFS
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
          >
            View All Updates <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <FeaturedCard post={featured} />
        </motion.div>

        <div className="mt-6 flex flex-col gap-4">
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
