import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, UserCheck, ShieldCheck, Phone, MessageSquare, HelpCircle } from "lucide-react";
import { getPostBySlug, toBlogPostView } from "@/lib/db/posts";
import { FAQSchema, BlogPostingSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { getContextualLinks } from "@/lib/seo/contextual-links";

// Blog posts are database-backed now (publish/unpublish takes effect
// immediately) — no generateStaticParams here, this route renders on demand.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const row = await getPostBySlug(slug);
  const post = row ? toBlogPostView(row) : null;
  if (!post) return {};
  return {
    title: `${post.title} | NIFS India`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}/` },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(wordCount: number | undefined) {
  if (!wordCount) return "4 min read";
  const mins = Math.ceil(wordCount / 200);
  return `${mins} min read`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await getPostBySlug(slug);
  if (!row) notFound();
  const post = toBlogPostView(row);
  const exploreLinks = getContextualLinks(post);

  return (
    <div className="bg-slate-50/50 min-h-screen pt-32 pb-20 lg:pt-36">
      <BlogPostingSchema
        headline={post.title}
        description={post.excerpt}
        url={`https://nifsindia.net/blog/${post.slug}/`}
        image={post.coverImage}
        datePublished={post.date}
        author={post.author}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Blog", url: "https://nifsindia.net/blog/" },
          { name: post.title, url: `https://nifsindia.net/blog/${post.slug}/` },
        ]}
      />
      {post.faqs && post.faqs.length > 0 && <FAQSchema faqs={post.faqs} />}
      <article
        data-path-target="true"
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        {/* Navigation & Header Meta */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>

        {/* Card Header Container */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          {post.categories?.[0] && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              {post.categories[0]}
            </div>
          )}

          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                {post.author ? post.author.name.charAt(0) : "N"}
              </div>
              <span className="font-semibold text-slate-700">
                {post.author ? post.author.name : "NIFS Safety Editorial"}
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(post.date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {estimateReadTime(post.wordCount)}
            </span>
          </div>

          {/* Cover Photo */}
          {post.coverImage && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="blog-prose mt-8 border-t border-slate-100 pt-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Explore More — contextual internal links */}
          {exploreLinks.length > 0 && (
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Explore More
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className="group rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-primary hover:shadow-md"
                  >
                    {link.title}
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section — visible counterpart to the FAQPage schema above */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <HelpCircle className="h-4 w-4 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-3">
                {post.faqs.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-5"
                  >
                    <h3 className="text-sm font-bold text-slate-900">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Admission CTA Banner */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#7A0F0C] p-6 text-white shadow-xl sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-white/10 px-2.5 py-1 rounded">
                  NIFS Admissions Open
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                  Start Your Career in Industrial Safety Today
                </h3>
                <p className="mt-2 text-xs text-slate-300 sm:text-sm max-w-xl">
                  NSDC-approved Diploma, Advanced Diploma, and Degree programs with 100% placement assistance at top companies like L&T, Adani, and Reliance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                >
                  Apply Now →
                </Link>
                <a
                  href="https://wa.me/918374340999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
