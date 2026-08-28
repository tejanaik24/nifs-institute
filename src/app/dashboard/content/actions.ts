"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
  slugify,
} from "@/lib/db/posts";
import { uploadBlogImage } from "@/lib/storage/images";

export async function uploadImageAction(
  file: File
): Promise<{ url: string } | { error: string }> {
  try {
    const url = await uploadBlogImage(file);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}

function readPostForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: slugify(String(formData.get("title") ?? "")),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    category: String(formData.get("category") ?? ""),
    seoTitle: String(formData.get("seoTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    ogImage: String(formData.get("ogImage") ?? ""),
  };
}

export async function saveDraftAction(formData: FormData) {
  const data = readPostForm(formData);
  await createPost(data);
  redirect("/dashboard/content");
}

export async function updatePostAction(id: number, formData: FormData) {
  const data = readPostForm(formData);
  await updatePost(id, data);
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/dashboard/content");
}

export async function publishPostAction(id: number, slug: string) {
  "use server";
  await publishPost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard/content");
}

export async function unpublishPostAction(id: number, slug: string) {
  "use server";
  await unpublishPost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard/content");
}

export async function deletePostAction(id: number, slug: string) {
  "use server";
  await deletePost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard/content");
}
