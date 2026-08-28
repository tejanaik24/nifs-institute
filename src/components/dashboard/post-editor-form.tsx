"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImageAction } from "@/app/dashboard/content/actions";

type PostFormValues = {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

const FIELD =
  "mb-4 w-full rounded-md border border-[var(--dash-border)] bg-black/20 px-3 py-2 text-[var(--dash-text)] outline-none focus:border-[var(--dash-accent)]";
const LABEL = "mb-1 block text-sm text-[var(--dash-text-muted)]";

function ImageUploadField({
  label,
  name,
  initialUrl,
}: {
  label: string;
  name: string;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setStatus("uploading");
    setError("");
    const result = await uploadImageAction(file);
    if ("error" in result) {
      setStatus("error");
      setError(result.error);
      return;
    }
    setUrl(result.url);
    setStatus("idle");
  }

  return (
    <div className="mb-4">
      <label className={LABEL}>{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        {url && (
          <div className="relative h-16 w-24 overflow-hidden rounded-md border border-[var(--dash-border)] bg-black/20">
            <Image src={url} alt="" fill sizes="96px" className="object-cover" unoptimized />
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="rounded-md border border-[var(--dash-border)] px-3 py-2 text-sm text-[var(--dash-text)] transition-colors hover:border-[var(--dash-accent)] disabled:opacity-60"
        >
          {status === "uploading" ? "Uploading..." : url ? "Replace image" : "Upload image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function PostEditorForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: PostFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl">
      <label className={LABEL}>Title</label>
      <input name="title" defaultValue={initial?.title} required className={FIELD} />

      <label className={LABEL}>Excerpt</label>
      <textarea name="excerpt" defaultValue={initial?.excerpt} rows={2} className={FIELD} />

      <label className={LABEL}>Body</label>
      <textarea name="content" defaultValue={initial?.content} rows={12} className={FIELD} />

      <ImageUploadField label="Cover image" name="coverImage" initialUrl={initial?.coverImage} />

      <label className={LABEL}>Category</label>
      <input name="category" defaultValue={initial?.category} className={FIELD} />

      <h2 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        SEO
      </h2>

      <label className={LABEL}>SEO title</label>
      <input name="seoTitle" defaultValue={initial?.seoTitle} className={FIELD} />

      <label className={LABEL}>Meta description</label>
      <textarea name="metaDescription" defaultValue={initial?.metaDescription} rows={2} className={FIELD} />

      <ImageUploadField label="OG image (social share preview)" name="ogImage" initialUrl={initial?.ogImage} />

      <button
        type="submit"
        className="mt-2 rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8a5406]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
