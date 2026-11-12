"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiImageUploader } from "./MultiImageUploader";
import type { AdminProject } from "@/lib/storage";

interface Props {
  initial?: Partial<AdminProject>;
  mode: "new" | "edit";
}

export function ProjectEditor({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial.title ?? "");
  const [sector, setSector] = useState(initial.sector ?? "");
  const [location, setLocation] = useState(initial.location ?? "");
  const [summary, setSummary] = useState(initial.summary ?? "");
  const [outcome, setOutcome] = useState(initial.outcome ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [images, setImages] = useState<string[]>(initial.images ?? []);
  const [published, setPublished] = useState(initial.published ?? false);

  async function save(publish: boolean) {
    if (!title.trim()) { setError("Title is required"); return; }
    setSaving(true);
    setError("");

    const payload = { title, sector, location, summary, outcome, description, images, published: publish };
    const url = mode === "new" ? "/api/admin/projects" : `/api/admin/projects/${initial.id}`;
    const method = mode === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save"); return; }
    router.push("/admin/projects");
    router.refresh();
  }

  const inputCls = "h-10 w-full rounded-lg border border-line px-3 text-sm outline-none ring-orange/30 focus:ring-2";
  const labelCls = "grid gap-1.5 text-sm font-medium text-slate-700";

  return (
    <div className="max-w-2xl space-y-5">
      <label className={labelCls}>
        Project title *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} placeholder="Factory and warehouse cleaning programme" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelCls}>
          Sector
          <input value={sector} onChange={(e) => setSector(e.target.value)} className={inputCls} placeholder="Industrial facilities" />
        </label>
        <label className={labelCls}>
          Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="Lagos" />
        </label>
      </div>

      <label className={labelCls}>
        Summary
        <span className="text-xs font-normal text-slate-400">Short description shown on the projects listing card.</span>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none ring-orange/30 focus:ring-2" placeholder="Brief overview of the project scope" />
      </label>

      <label className={labelCls}>
        Outcome
        <input value={outcome} onChange={(e) => setOutcome(e.target.value)} className={inputCls} placeholder="Production floors stayed inspection-ready through peak output." />
      </label>

      <label className={labelCls}>
        Full description
        <span className="text-xs font-normal text-slate-400">Shown on the project detail page. Separate paragraphs with a blank line.</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-line px-3 py-3 text-sm font-mono leading-relaxed outline-none ring-orange/30 focus:ring-2"
          placeholder="Describe the project in detail…&#10;&#10;New paragraph after a blank line."
        />
      </label>

      <div className="rounded-xl border border-line bg-white p-5">
        <MultiImageUploader images={images} onChange={setImages} />
      </div>

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
        <button type="button" onClick={() => router.back()} className="ml-auto text-sm text-slate-400 hover:text-slate-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
