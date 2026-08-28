import { getAllPosts } from "@/lib/db/posts";

export type RiskFlag = {
  severity: "red" | "orange";
  title: string;
  why: string;
  postSlug?: string;
  postTitle?: string;
};

/** Real, checkable content problems — no guessed scores, only what's actually
 * missing/thin in the posts table. Flags apply to published posts only:
 * drafts are expected to be incomplete. */
export async function getRiskFlags(): Promise<RiskFlag[]> {
  const posts = await getAllPosts();
  const flags: RiskFlag[] = [];

  for (const post of posts) {
    if (post.status !== "published") continue;

    if (!post.metaDescription.trim()) {
      flags.push({
        severity: "red",
        title: "Missing meta description",
        why: "Google shows a random snippet from the page instead of your own — hurts click-through rate.",
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
    if (!post.seoTitle.trim()) {
      flags.push({
        severity: "red",
        title: "Missing SEO title",
        why: "Page falls back to a generic title tag — weaker ranking signal for the target keyword.",
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
    if (post.wordCount > 0 && post.wordCount < 300) {
      flags.push({
        severity: "red",
        title: "Thin content",
        why: `Only ${post.wordCount} words — Google treats this as thin content and rarely ranks it.`,
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
    if (!post.coverImage.trim()) {
      flags.push({
        severity: "orange",
        title: "Missing cover image",
        why: "No image for social shares or the blog listing card — hurts click-through.",
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
    if (post.faqs.length === 0) {
      flags.push({
        severity: "orange",
        title: "No FAQ section",
        why: "No FAQ schema opportunity — missing an easy AI Overview / featured snippet target.",
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
  }

  return flags.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "red" ? -1 : 1));
}
