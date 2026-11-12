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

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col bg-navy-deep text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <span className="text-lg font-extrabold tracking-tight">
            Prime<span className="text-orange">Go</span>
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

        <div className="border-t border-white/10 px-3 py-4 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <span>🌐</span> View Site
          </Link>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <span>🚪</span> {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
