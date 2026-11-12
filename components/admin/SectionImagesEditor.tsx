"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./ImageUploader";
import type { SectionImages } from "@/lib/storage";

const sections = [
  { key: "about" as const, label: "About page hero", desc: "Large image on /about" },
  { key: "home-about" as const, label: "Home about section", desc: "Image in the about snippet on homepage" },
  { key: "projects" as const, label: "Projects placeholder", desc: "Fallback image for project cards (if no per-project images)" },
];

export function SectionImagesEditor({ initial }: { initial: SectionImages }) {
  const router = useRouter();
  const [images, setImages] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update(key: keyof SectionImages, url: string) {
    setImages((prev) => ({ ...prev, [key]: url }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/section-images", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(images),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="mt-8 space-y-6">
      {sections.map((s) => (
        <div key={s.key} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-navy-deep">{s.label}</h3>
          <p className="mt-1 text-xs text-muted">{s.desc}</p>
          <div className="mt-4">
            <ImageUploader
              value={images[s.key]}
              onChange={(url) => update(s.key, url)}
              label=""
            />
          </div>
        </div>
      ))}

      <button
        onClick={save}
        disabled={saving}
        className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}
