"use client";

import Link from "next/link";
import { publishPostAction, unpublishPostAction, deletePostAction } from "@/app/dashboard/content/actions";

type Post = {
  id: number;
  slug: string;
  title: string;
  status: string;
  updatedAt: Date;
};

export function PostList({
  posts,
  viewsBySlug,
}: {
  posts: Post[];
  viewsBySlug?: Map<string, number>;
}) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-[var(--dash-text-muted)]">
        No posts yet. Click &quot;New post&quot; to write your first one.
      </p>
    );
  }

  return (
    <table className="w-full text-left text-sm">
      <thead className="text-[var(--dash-text-muted)]">
        <tr>
          <th className="pb-3 font-normal">Title</th>
          <th className="pb-3 font-normal">Status</th>
          <th className="pb-3 font-normal">Views (28d)</th>
          <th className="pb-3 font-normal">Updated</th>
          <th className="pb-3 font-normal">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} className="border-t border-[var(--dash-border)]">
            <td className="py-3">
              <Link href={`/dashboard/content/${post.id}/edit`} className="hover:text-[var(--dash-accent)]">
                {post.title}
              </Link>
            </td>
            <td className="py-3">
              <span
                className={
                  post.status === "published"
                    ? "rounded-full bg-[var(--dash-accent)]/20 px-2 py-0.5 font-mono text-xs text-[var(--dash-accent)]"
                    : "rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-[var(--dash-text-muted)]"
                }
              >
                {post.status}
              </span>
            </td>
            <td className="py-3 font-mono text-xs text-[var(--dash-text-muted)]">
              {viewsBySlug?.get(post.slug) ?? "—"}
            </td>
            <td className="py-3 font-mono text-xs text-[var(--dash-text-muted)]">
              {new Date(post.updatedAt).toLocaleDateString("en-IN")}
            </td>
            <td className="py-3">
              {post.status === "published" ? (
                <button
                  onClick={() => unpublishPostAction(post.id, post.slug)}
                  className="mr-3 text-xs text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => publishPostAction(post.id, post.slug)}
                  className="mr-3 text-xs text-[var(--dash-accent)]"
                >
                  Publish
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                    deletePostAction(post.id, post.slug);
                  }
                }}
                className="text-xs text-red-400"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
