import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createPost,
  getPostBySlug,
  getPostRowBySlug,
  publishPost,
  savePostVersion,
  slugify,
  updatePost,
} from "@/lib/db/posts";
import { uploadBlogImage } from "@/lib/storage/images";

// Publishing door for the Grok SEO bot: POST = new blog live, PATCH = edit an
// existing blog (old version saved first). Never deletes, unpublishes or
// renames, and only for holders of BLOG_BOT_TOKEN.
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
  // Wikimedia and some CDNs 403 requests without an identifying User-Agent.
  const res = await fetch(url, {
    headers: { "User-Agent": "NIFSIndiaBlogBot/1.0 (https://nifsindia.net; admin@nifsindia.net)" },
  });
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
    const srcs = [...new Set([...content.matchAll(/<img[^>]+src=["']((?:https?:|data:image\/)[^"']+)["']/gi)].map((m) => m[1]))];
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

const EDITABLE = ["title", "excerpt", "content", "category", "seoTitle", "metaDescription"] as const;

export async function PATCH(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const str = (k: string) => (typeof body?.[k] === "string" ? (body[k] as string).trim() : "");

  const slug = str("slug");
  if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const changes: Record<string, unknown> = {}; // only EDITABLE keys, coverImage/ogImage and faqs end up here
  for (const k of EDITABLE) if (str(k)) changes[k] = str(k);
  if (Array.isArray(body?.faqs)) {
    changes.faqs = (body.faqs as { question?: unknown; answer?: unknown }[])
      .filter((f) => typeof f?.question === "string" && typeof f?.answer === "string")
      .map((f) => ({ question: (f.question as string).trim(), answer: (f.answer as string).trim() }));
  }
  if (!Object.keys(changes).length && !str("coverImage")) {
    return NextResponse.json({ error: `Nothing to change. Editable: ${EDITABLE.join(", ")}, coverImage, faqs` }, { status: 400 });
  }

  try {
    const row = await getPostRowBySlug(slug);
    if (!row) return NextResponse.json({ error: `No post with slug "${slug}"` }, { status: 404 });

    if (typeof changes.content === "string") {
      let content = changes.content;
      const srcs = [...new Set([...content.matchAll(/<img[^>]+src=["']((?:https?:|data:image\/)[^"']+)["']/gi)].map((m) => m[1]))]
        .filter((src) => src.startsWith("data:") || !row.content.includes(src)); // https images already on the post stay
      for (const src of srcs) content = content.split(src).join(await rehost(src));
      changes.content = stripDangerousHtml(content);
    }
    if (str("coverImage")) changes.coverImage = changes.ogImage = await rehost(str("coverImage"));

    await savePostVersion(row, "grok-seo-bot");
    await updatePost(row.id, changes as Parameters<typeof updatePost>[1]);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Edit failed" }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true, url: `https://nifsindia.net/blog/${slug}/`, changed: Object.keys(changes) });
}
