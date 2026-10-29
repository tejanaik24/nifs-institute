import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createPost, getPostBySlug, publishPost, slugify } from "@/lib/db/posts";
import { uploadBlogImage } from "@/lib/storage/images";

// Publishing door for the Grok SEO bot: one POST = blog live. Only creates new
// posts (never edits/deletes), and only for holders of BLOG_BOT_TOKEN.
// Images are re-hosted in our own bucket so expiring AI-image URLs never break.

function authorized(request: NextRequest) {
  const token = process.env.BLOG_BOT_TOKEN?.trim();
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token || given.length !== token.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(token));
}

// ponytail: regex strip of script/iframe/handlers, enough for a trusted token holder; swap for a real sanitizer if the door ever opens wider
function stripDangerousHtml(html: string) {
  return html
    .replace(/<(script|iframe|object|embed|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, "$1=$2#$2");
}

async function rehost(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${url}`);
  const type = res.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  const ext = type.split("/")[1] ?? "jpg";
  return uploadBlogImage(new File([await res.arrayBuffer()], `bot.${ext}`, { type }));
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const str = (k: string) => (typeof body?.[k] === "string" ? (body[k] as string).trim() : "");

  const title = str("title");
  let content = str("content");
  if (!title || !content) {
    return NextResponse.json({ error: "title and content (HTML) are required" }, { status: 400 });
  }
  const slug = slugify(str("slug") || title);
  if (await getPostBySlug(slug)) {
    return NextResponse.json({ error: `A post with slug "${slug}" already exists` }, { status: 409 });
  }

  try {
    const srcs = [...new Set([...content.matchAll(/<img[^>]+src=["'](https?:[^"']+)["']/gi)].map((m) => m[1]))];
    for (const src of srcs) content = content.split(src).join(await rehost(src));
    const coverImage = str("coverImage") ? await rehost(str("coverImage")) : "";

    const post = await createPost({
      title,
      slug,
      excerpt: str("excerpt"),
      content: stripDangerousHtml(content),
      coverImage,
      category: str("category"),
      seoTitle: str("seoTitle") || title,
      metaDescription: str("metaDescription") || str("excerpt"),
      ogImage: coverImage,
    });
    await publishPost(post.id);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true, url: `https://nifsindia.net/blog/${slug}/` });
}
