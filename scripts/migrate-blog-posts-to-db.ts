import fs from "node:fs";
import path from "node:path";
import { db } from "../src/lib/db/client";
import { posts } from "../src/lib/db/schema";

type LegacyPost = {
  slug: string;
  title: string;
  date: string;
  author?: { name: string; title: string };
  categories: string[];
  excerpt: string;
  wordCount?: number;
  coverImage: string;
  contentHtml: string;
  faqs?: { question: string; answer: string }[];
};

async function main() {
  const filePath = path.join(__dirname, "..", "src", "lib", "data", "blog-posts.json");
  const legacyPosts: LegacyPost[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let migrated = 0;
  for (const post of legacyPosts) {
    const values = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      content: post.contentHtml ?? "",
      coverImage: post.coverImage ?? "",
      category: post.categories?.[0] ?? "",
      seoTitle: post.title,
      metaDescription: post.excerpt ?? "",
      ogImage: post.coverImage ?? "",
      wordCount: post.wordCount ?? 0,
      faqs: post.faqs ?? [],
      authorName: post.author?.name ?? "",
      authorTitle: post.author?.title ?? "",
      status: "published" as const,
      publishedAt: new Date(post.date),
    };
    await db
      .insert(posts)
      .values(values)
      .onConflictDoUpdate({ target: posts.slug, set: values });
    migrated++;
  }
  console.log(`Migrated/updated ${migrated} posts.`);
}

main();
