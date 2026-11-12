"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./ImageUploader";
import type { HeroSlide } from "@/lib/storage";

const blank = (): Omit<HeroSlide, "id" | "order"> => ({
  image: "/hero.jpg",
  alt: "",
  headline: "",
  subtext: "",
  cta: { label: "Explore Our Services", href: "/services" },
});

export function HeroSlidesManager({ initial }: { initial: HeroSlide[] }) {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>(initial);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openNew() {
    setEditing({ id: "", order: slides.length, ...blank() });
  }

  function openEdit(slide: HeroSlide) {
    setEditing({ ...slide });
  }

  async function saveSlide() {
    if (!editing) return;
    setSaving(true);
    setError("");
    if (editing.id === "") {
      // new
      const res = await fetch("/api/admin/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { setError("Failed to save"); setSaving(false); return; }
      const created: HeroSlide = await res.json();
      setSlides((prev) => [...prev, created]);
    } else {
      // update
      const res = await fetch(`/api/admin/hero-slides/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { setError("Failed to save"); setSaving(false); return; }
      const updated: HeroSlide = await res.json();
      setSlides((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    }
    setSaving(false);
    setEditing(null);
    router.refresh();
  }

  async function deleteSlide(id: string) {
    await fetch(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
    setSlides((prev) => prev.filter((s) => s.id !== id));
    router.refresh();
  }

  async function move(index: number, dir: -1 | 1) {
    const next = [...slides];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    const reordered = next.map((s, i) => ({ ...s, order: i }));
    setSlides(reordered);
    await fetch("/api/admin/hero-slides", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered),
    });
    router.refresh();
  }

  const inputCls = "h-10 w-full rounded-lg border border-line px-3 text-sm outline-none ring-orange/30 focus:ring-2";
  const labelCls = "grid gap-1.5 text-sm font-medium text-slate-700";

  return (
    <div className="mt-8 space-y-4">
      {/* Slide list */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm"
        >
          {/* thumb */}
          <div
            className="h-16 w-24 flex-shrink-0 rounded-lg bg-slate-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="flex-1 min-w-0">
            <p className="truncate font-semibold text-navy-deep">{slide.headline || <span className="text-muted italic">No headline</span>}</p>
            <p className="truncate text-xs text-muted mt-0.5">{slide.subtext}</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1 text-slate-400 hover:text-navy-deep disabled:opacity-30">↑</button>
            <button onClick={() => move(i, 1)} disabled={i === slides.length - 1} className="rounded p-1 text-slate-400 hover:text-navy-deep disabled:opacity-30">↓</button>
          </div>
          <button onClick={() => openEdit(slide)} className="text-sm font-medium text-orange hover:underline">Edit</button>
          <button onClick={() => deleteSlide(slide.id)} className="text-sm font-medium text-slate-400 hover:text-red-500">Delete</button>
        </div>
      ))}

      <button
        onClick={openNew}
        className="w-full rounded-2xl border-2 border-dashed border-line py-6 text-sm font-medium text-muted transition hover:border-orange hover:text-orange"
      >
        + Add slide
      </button>

      {/* Edit panel */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6 sm:py-10">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-5 shadow-xl sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-navy-deep">
              {editing.id === "" ? "New Slide" : "Edit Slide"}
            </h2>

            <div className="space-y-4">
              <ImageUploader
                value={editing.image}
                onChange={(url) => setEditing((e) => e && ({ ...e, image: url }))}
                label="Slide image"
              />

              <label className={labelCls}>
                Alt text
                <input value={editing.alt} onChange={(e) => setEditing((s) => s && ({ ...s, alt: e.target.value }))} className={inputCls} placeholder="Describe the image for accessibility" />
              </label>

              <label className={labelCls}>
                Headline
                <input value={editing.headline} onChange={(e) => setEditing((s) => s && ({ ...s, headline: e.target.value }))} className={inputCls} placeholder="Clean. Safe. Well-Managed." />
              </label>

              <label className={labelCls}>
                Subtext
                <textarea value={editing.subtext} onChange={(e) => setEditing((s) => s && ({ ...s, subtext: e.target.value }))} rows={2} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none ring-orange/30 focus:ring-2" placeholder="Supporting sentence for the slide" />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className={labelCls}>
                  CTA label
                  <input value={editing.cta.label} onChange={(e) => setEditing((s) => s && ({ ...s, cta: { ...s.cta, label: e.target.value } }))} className={inputCls} placeholder="Explore Our Services" />
                </label>
                <label className={labelCls}>
                  CTA link
                  <input value={editing.cta.href} onChange={(e) => setEditing((s) => s && ({ ...s, cta: { ...s.cta, href: e.target.value } }))} className={inputCls} placeholder="/services" />
                </label>
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button onClick={saveSlide} disabled={saving} className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot disabled:opacity-60">
                {saving ? "Saving…" : "Save slide"}
              </button>
              <button onClick={() => setEditing(null)} className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
