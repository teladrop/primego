"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const MAX_MB = 2;

export function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(file: File) {
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
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const MAX_DIM = 1400;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) { height = Math.round((height * MAX_DIM) / width); width = MAX_DIM; }
          else { width = Math.round((width * MAX_DIM) / height); height = MAX_DIM; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { setUploading(false); onChange(src); return; }
        ctx.drawImage(img, 0, 0, width, height);
        setUploading(false);
        onChange(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => { setUploading(false); onChange(src); };
      img.src = src;
    };
    reader.onerror = () => {
      setUploading(false);
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  }

  // Decide how to render preview: data URLs and relative paths both work with <img>
  const isPreviewable = value && (
    value.startsWith("data:") ||
    value.startsWith("/") ||
    value.startsWith("http")
  );

  return (
    <div className="grid gap-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}

      {isPreviewable && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="h-40 w-full rounded-xl border border-line bg-slate-100 object-cover"
        />
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
            // reset so same file can be re-selected
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
        >
          {uploading ? "Reading…" : "Upload image"}
        </button>
        <span className="text-xs text-slate-400">or paste a URL below</span>
      </div>

      <input
        type="text"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/hero.jpg or https://…"
        className="h-10 rounded-lg border border-line px-3 text-sm outline-none ring-orange/30 focus:ring-2"
      />
      {value.startsWith("data:") && (
        <p className="text-xs text-green-600">✓ Image uploaded</p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
