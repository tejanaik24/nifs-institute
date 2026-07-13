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
};

export const blogPosts: BlogPost[] = posts;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
