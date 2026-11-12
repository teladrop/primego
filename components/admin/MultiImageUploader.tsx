"use client";

import { useRef, useState } from "react";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

const MAX_MB = 5;
const MAX_IMAGES = 10;

export function MultiImageUploader({ images, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File): Promise<string | null> {
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`${file.name} is over ${MAX_MB} MB`);
      return null;
    }
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) return null;
    const { url } = await res.json();
    return url;
  }

  async function handleFiles(files: FileList) {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    const toProcess = Array.from(files).slice(0, remaining);
    setUploading(true);
    setError("");
    const results: string[] = [];
    for (const file of toProcess) {
      const url = await uploadFile(file);
      if (url) results.push(url);
    }
    setUploading(false);
    if (results.length > 0) onChange([...images, ...results]);
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Images ({images.length}/{MAX_IMAGES})</span>
        {uploading && <span className="text-xs text-orange">Uploading…</span>}
        {images.length > 0 && <span className="text-xs text-slate-400">First image = cover photo</span>}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Image ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-orange px-1.5 py-0.5 text-[10px] font-bold text-white">Cover</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded bg-white/90 px-1.5 py-1 text-xs font-bold text-slate-700 disabled:opacity-30 hover:bg-white">←</button>
                <button type="button" onClick={() => remove(i)} className="rounded bg-red-500 px-1.5 py-1 text-xs font-bold text-white hover:bg-red-600">✕</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} className="rounded bg-white/90 px-1.5 py-1 text-xs font-bold text-slate-700 disabled:opacity-30 hover:bg-white">→</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < MAX_IMAGES && !uploading && (
        <>
          <input
            ref={ref}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
          />
          <button type="button" onClick={() => ref.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line py-6 text-sm font-medium text-muted transition hover:border-orange hover:text-orange">
            <span className="text-lg">+</span> {images.length === 0 ? "Add images" : "Add more images"}
          </button>
        </>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-slate-400">JPG, PNG, WebP or GIF · Max {MAX_MB} MB per image · Up to {MAX_IMAGES} images. Use ← → arrows to reorder.</p>
    </div>
  );
}
