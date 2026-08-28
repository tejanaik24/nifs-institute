import Link from "next/link";
import { getAllPosts } from "@/lib/db/posts";
import { getBlogPostViews } from "@/lib/analytics/ga4";
import { PostList } from "@/components/dashboard/post-list";

export default async function ContentPage() {
  const posts = await getAllPosts();
  // Real per-post views from GA4, keyed by slug — if GA4 is unreachable this
  // just comes back empty and the list falls back to showing no view count
  // rather than a fake one.
  const viewsBySlug = await getBlogPostViews().catch(() => new Map<string, number>());

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Content</h1>
        <Link
          href="/dashboard/content/new"
          className="rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8a5406]"
        >
          New post
        </Link>
      </div>
      <PostList posts={posts} viewsBySlug={viewsBySlug} />
    </div>
  );
}
