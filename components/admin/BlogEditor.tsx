"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./ImageUploader";
import type { AdminPost } from "@/lib/storage";

interface Props {
  initial?: Partial<AdminPost>;
  mode: "new" | "edit";
}

export function BlogEditor({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial.title ?? "");
  const [excerpt, setExcerpt] = useState(initial.excerpt ?? "");
  const [category, setCategory] = useState(initial.category ?? "General");
  const [readTime, setReadTime] = useState(initial.read_time ?? "5 min");
  const [date, setDate] = useState(initial.date ?? "");

  useEffect(() => {
    if (!date) {
      setDate(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [image, setImage] = useState(initial.image ?? "/blog/shutdown.jpg");
  // body stored as one string per paragraph, joined by double newlines
  const [body, setBody] = useState((initial.body ?? [""]).join("\n\n"));
  const [published, setPublished] = useState(initial.published ?? false);

  async function save(publish: boolean) {
    setSaving(true);
    setError("");
    const payload = {
      title,
      excerpt,
      category,
      read_time: readTime,
      date,
      image,
      body: body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      published: publish,
    };
    const url = mode === "new" ? "/api/admin/posts" : `/api/admin/posts/${initial.id}`;
    const method = mode === "new" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save"); return; }
    router.push("/admin/blog");
    router.refresh();
  }

  const inputCls = "h-10 w-full rounded-lg border border-line px-3 text-sm outline-none ring-orange/30 focus:ring-2";
  const labelCls = "grid gap-1.5 text-sm font-medium text-slate-700";

  return (
    <div className="max-w-2xl space-y-5">
      <label className={labelCls}>
        Title *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} placeholder="Post title" />
      </label>

      <label className={labelCls}>
        Excerpt
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none ring-orange/30 focus:ring-2" placeholder="Short summary shown on the blog listing" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelCls}>
          Category
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} placeholder="e.g. Industrial cleaning" />
        </label>
        <label className={labelCls}>
          Read time
          <input value={readTime} onChange={(e) => setReadTime(e.target.value)} className={inputCls} placeholder="5 min" />
        </label>
      </div>

      <label className={labelCls}>
        Date
        <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} placeholder="12 October 2026" />
      </label>

      <ImageUploader value={image} onChange={setImage} label="Cover image" />

      <label className={labelCls}>
        Body
        <span className="text-xs text-slate-400 font-normal">Separate paragraphs with a blank line.</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          className="w-full rounded-lg border border-line px-3 py-3 text-sm outline-none ring-orange/30 focus:ring-2 font-mono leading-relaxed"
          placeholder="Write your post here…&#10;&#10;Start a new paragraph by leaving a blank line."
        />
      </label>

      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => save(true)}
          disabled={saving || !title}
          className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot disabled:opacity-60"
        >
          {saving ? "Saving…" : published ? "Update & Publish" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => save(false)}
          disabled={saving || !title}
          className="rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="ml-auto text-sm text-slate-400 hover:text-slate-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
