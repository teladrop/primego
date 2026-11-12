"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className={`text-sm font-medium transition ${
        confirming ? "text-red-600 hover:text-red-800" : "text-slate-400 hover:text-red-500"
      }`}
    >
      {confirming ? "Confirm?" : "Delete"}
    </button>
  );
}
