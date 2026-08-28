import { and, desc, eq } from "drizzle-orm";
import { db } from "./client";
import { posts } from "./schema";

export type BlogPostView = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  wordCount: number;
  coverImage: string | null;
  contentHtml: string;
  faqs?: { question: string; answer: string }[];
  author?: { name: string; title: string };
};

/** Maps a `posts` DB row onto the shape existing blog pages/components expect
 * (`src/lib/data/blog.ts`'s `BlogPost` type) — kept as an adapter here rather
 * than changing every consumer component's prop shape. */
export function toBlogPostView(row: typeof posts.$inferSelect): BlogPostView {
  return {
    slug: row.slug,
    title: row.title,
    date: (row.publishedAt ?? row.createdAt).toISOString(),
    categories: row.category ? [row.category] : [],
    excerpt: row.excerpt,
    wordCount: row.wordCount,
    coverImage: row.coverImage || null,
    contentHtml: row.content,
    faqs: row.faqs,
    author: row.authorName ? { name: row.authorName, title: row.authorTitle } : undefined,
  };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getPublishedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
}

export async function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  return rows[0] ?? null;
}

export async function getPostById(id: number) {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows[0] ?? null;
}

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
};

export async function createPost(data: PostInput) {
  const rows = await db.insert(posts).values(data).returning();
  return rows[0];
}

export async function updatePost(id: number, data: Partial<PostInput>) {
  const rows = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function publishPost(id: number) {
  const rows = await db
    .update(posts)
    .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function unpublishPost(id: number) {
  const rows = await db
    .update(posts)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}
