"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok) {
      setError("Upload failed");
      return;
    }
    const { url } = await res.json();
    onChange(url);
  }

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {value && (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-line bg-slate-100">
          <Image src={value} alt="preview" fill className="object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
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
