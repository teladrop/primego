"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactSubmission } from "@/lib/storage";

export function ContactInbox({ initial }: { initial: ContactSubmission[] }) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initial);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  async function open(c: ContactSubmission) {
    setSelected(c);
    if (!c.read) {
      await fetch(`/api/admin/contacts/${c.id}`, { method: "PATCH" });
      setContacts((prev) => prev.map((x) => (x.id === c.id ? { ...x, read: true } : x)));
      router.refresh();
    }
  }

  async function del(id: string) {
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selected?.id === id) setSelected(null);
    router.refresh();
  }

  if (contacts.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-16 text-center text-sm text-muted">
        No messages yet. They will appear here once someone submits the contact form.
      </div>
    );
  }

  return (
    <div className="mt-8 flex gap-6">
      {/* List */}
      <div className="w-72 flex-shrink-0 space-y-2">
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => open(c)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selected?.id === c.id
                ? "border-orange bg-orange/5"
                : "border-line bg-white hover:border-orange/40"
            }`}
          >
            <div className="flex items-center gap-2">
              {!c.read && (
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-orange" />
              )}
              <p className="truncate text-sm font-semibold text-navy-deep">{c.name}</p>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted">{c.company}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{c.need}</p>
            <time className="mt-1 block text-[10px] text-slate-300">
              {new Date(c.receivedAt).toLocaleString()}
            </time>
          </button>
        ))}
      </div>

      {/* Detail */}
      {selected ? (
        <div className="flex-1 rounded-2xl border border-line bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-navy-deep">{selected.name}</h2>
              <p className="text-sm text-muted">{selected.company}</p>
            </div>
            <button
              onClick={() => del(selected.id)}
              className="text-sm text-slate-400 hover:text-red-500 transition"
            >
              Delete
            </button>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[
              { label: "Email", value: selected.email },
              { label: "Phone", value: selected.phone },
              { label: "Need", value: selected.need },
              { label: "Received", value: new Date(selected.receivedAt).toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</dt>
                <dd className="mt-0.5 text-navy-deep">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl bg-[#f4f6fa] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Message</p>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{selected.message}</p>
          </div>

          <a
            href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.need)}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot"
          >
            Reply via email →
          </a>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-line bg-white text-sm text-muted">
          Select a message to read it
        </div>
      )}
    </div>
  );
}
