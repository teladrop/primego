"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Incorrect password. Try again.");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/logo.png"
            alt="WestMark Industrial Services Ltd"
            width={220}
            height={60}
            className="mx-auto h-14 w-auto brightness-0 invert"
          />
          <p className="mt-3 text-sm text-white/40 uppercase tracking-widest">Admin Panel</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <h1 className="mb-6 text-lg font-bold text-white">Sign in</h1>

          <label className="grid gap-2 text-sm font-medium text-white/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="h-11 rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder-white/30 outline-none ring-orange/40 focus:ring-2"
              placeholder="Enter admin password"
            />
          </label>

          {error && (
            <p className="mt-3 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange py-3 text-sm font-semibold text-white transition hover:bg-orange-hot disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
