import posts from "./blog-posts.json";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  wordCount: number;
  coverImage: string | null;
  contentHtml: string;
  faqs?: { question: string; answer: string }[];
  /** Named author with a real, checkable credential — omit rather than invent one. */
  author?: { name: string; title: string };
  /** When true, flags thin/legacy content with noindex to protect crawl budget and site quality. */
  noindex?: boolean;
};

export const blogPosts: BlogPost[] = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
