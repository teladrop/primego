"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const MAX_MB = 5;

export function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");

    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large — max ${MAX_MB} MB`);
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Only JPG, PNG, WebP or GIF allowed");
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);

    if (!res.ok) {
      let msg = "Upload failed";
      try { const err = await res.json(); msg = err.error ?? msg; } catch { /* */ }
      setError(msg);
      return;
    }

    const { url } = await res.json();
    onChange(url);
  }

  const isPreviewable = value && (value.startsWith("data:") || value.startsWith("/") || value.startsWith("http"));

  return (
    <div className="grid gap-2">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}

      {isPreviewable && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className="h-40 w-full rounded-xl border border-line bg-slate-100 object-cover" />
      )}

      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
        >
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <span className="text-xs text-slate-400">or paste a URL below</span>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/hero.jpg or https://…"
        className="h-10 rounded-lg border border-line px-3 text-sm outline-none ring-orange/30 focus:ring-2"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
