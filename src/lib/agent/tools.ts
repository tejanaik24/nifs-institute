import { tool } from "ai";
import { z } from "zod";
import { getAllPosts, getPostBySlug, getPostById, publishPost, unpublishPost, updatePost, createPost, slugify } from "@/lib/db/posts";
import { getRiskFlags } from "@/lib/risk-flags";
import { getDailySummary, getTrafficSources, getBlogPostViews } from "@/lib/analytics/ga4";
import { logAgentAction } from "@/lib/db/agent-actions";

/** Every tool call gets logged (success or failure) so Teja has an
 * after-the-fact record of what the agent did — not a confirmation gate,
 * the agent runs autonomously and this never blocks execution. */
async function runLogged<T>(toolName: string, args: unknown, fn: () => Promise<T>): Promise<T> {
  try {
    const result = await fn();
    await logAgentAction({ toolName, args, result });
    return result;
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    await logAgentAction({ toolName, args, error });
    throw e;
  }
}

export const agentTools = {
  list_posts: tool({
    description: "List blog posts with their id, slug, title, and status (draft/published). Always trust the totalCount/publishedCount/draftCount fields for counting questions instead of counting the posts array yourself.",
    inputSchema: z.object({}),
    execute: async (args) =>
      runLogged("list_posts", args, async () => {
        const posts = await getAllPosts();
        const publishedCount = posts.filter((p) => p.status === "published").length;
        return {
          totalCount: posts.length,
          publishedCount,
          draftCount: posts.length - publishedCount,
          posts: posts.map((p) => ({ id: p.id, slug: p.slug, title: p.title, status: p.status })),
        };
      }),
  }),

  get_post: tool({
    description: "Get full details of one blog post by its numeric id or its slug.",
    inputSchema: z.object({
      id: z.number().optional(),
      slug: z.string().optional(),
    }),
    execute: async (args) =>
      runLogged("get_post", args, async () => {
        const post = args.id ? await getPostById(args.id) : args.slug ? await getPostBySlug(args.slug) : null;
        if (!post) throw new Error("Post not found.");
        return post;
      }),
  }),

  get_risk_flags: tool({
    description: "Get the list of SEO problems currently flagged across all published posts (missing meta description, thin content, etc).",
    inputSchema: z.object({}),
    execute: async (args) => runLogged("get_risk_flags", args, () => getRiskFlags()),
  }),

  get_analytics_summary: tool({
    description: "Get today's visitor count and top pages from Google Analytics.",
    inputSchema: z.object({}),
    execute: async (args) => runLogged("get_analytics_summary", args, () => getDailySummary()),
  }),

  get_traffic_sources: tool({
    description: "Get where site visitors are coming from (traffic sources).",
    inputSchema: z.object({}),
    execute: async (args) => runLogged("get_traffic_sources", args, () => getTrafficSources()),
  }),

  get_blog_post_views: tool({
    description: "Get view counts per blog post slug over the last 28 days.",
    inputSchema: z.object({}),
    execute: async (args) =>
      runLogged("get_blog_post_views", args, async () => Object.fromEntries(await getBlogPostViews())),
  }),

  update_post_seo: tool({
    description: "Update a blog post's SEO fields: seoTitle, metaDescription, ogImage, coverImage, excerpt.",
    inputSchema: z.object({
      id: z.number(),
      seoTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),
      coverImage: z.string().optional(),
      excerpt: z.string().optional(),
    }),
    execute: async (args) =>
      runLogged("update_post_seo", args, async () => {
        const { id, ...data } = args;
        await updatePost(id, data);
        return { ok: true };
      }),
  }),

  publish_post: tool({
    description: "Publish a draft blog post, making it live on the site.",
    inputSchema: z.object({ id: z.number() }),
    execute: async (args) =>
      runLogged("publish_post", args, async () => {
        await publishPost(args.id);
        return { ok: true };
      }),
  }),

  unpublish_post: tool({
    description: "Unpublish a blog post, taking it offline (back to draft).",
    inputSchema: z.object({ id: z.number() }),
    execute: async (args) =>
      runLogged("unpublish_post", args, async () => {
        await unpublishPost(args.id);
        return { ok: true };
      }),
  }),

  create_post: tool({
    description: "Create a new draft blog post.",
    inputSchema: z.object({
      title: z.string(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      coverImage: z.string().optional(),
      category: z.string().optional(),
      seoTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),
    }),
    execute: async (args) =>
      runLogged("create_post", args, async () => {
        const post = await createPost({
          title: args.title,
          slug: slugify(args.title),
          excerpt: args.excerpt ?? "",
          content: args.content ?? "",
          coverImage: args.coverImage ?? "",
          category: args.category ?? "",
          seoTitle: args.seoTitle ?? "",
          metaDescription: args.metaDescription ?? "",
          ogImage: args.ogImage ?? "",
        });
        return post;
      }),
  }),
};
