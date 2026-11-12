"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/blog", label: "Blog", icon: "✏️" },
  { href: "/admin/projects", label: "Projects", icon: "🏗️" },
  { href: "/admin/hero", label: "Hero Slides", icon: "🖼️" },
  { href: "/admin/images", label: "Section Images", icon: "🌄" },
  { href: "/admin/contacts", label: "Inbox", icon: "📬" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-navy-deep px-4 py-3 lg:hidden">
        <span className="text-lg font-extrabold tracking-tight text-white">
          Prime<span className="text-orange">Go</span>
          <span className="ml-2 text-[10px] text-white/40 uppercase tracking-widest">Admin</span>
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-navy-deep text-white transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden border-b border-white/10 px-5 py-5 lg:block">
          <span className="text-lg font-extrabold tracking-tight">
            West<span className="text-orange">Mark</span>
          </span>
          <p className="mt-0.5 text-[11px] text-white/40 uppercase tracking-widest">Admin</p>
        </div>

        {/* Mobile brand */}
        <div className="border-b border-white/10 px-5 py-5 lg:hidden">
          <span className="text-lg font-extrabold tracking-tight">
            West<span className="text-orange">Mark</span>
          </span>
          <p className="mt-0.5 text-[11px] text-white/40 uppercase tracking-widest">Admin</p>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-orange text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            <span>🌐</span> View Site
          </Link>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            <span>🚪</span> {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
