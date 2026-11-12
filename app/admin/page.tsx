import { AdminShell } from "@/components/admin/AdminShell";
import { getPosts } from "@/lib/storage";
import { getContacts } from "@/lib/storage";
import { getHeroSlides } from "@/lib/storage";
import { posts as staticPosts } from "@/lib/data";
import Link from "next/link";

export default function AdminDashboard() {
  const adminPosts = getPosts();
  const contacts = getContacts();
  const slides = getHeroSlides();
  const unread = contacts.filter((c) => !c.read).length;
  const totalPosts = staticPosts.length + adminPosts.filter((p) => p.published).length;

  const stats = [
    { label: "Blog Posts", value: totalPosts, sub: `${adminPosts.length} admin-created`, href: "/admin/blog", color: "bg-navy" },
    { label: "Hero Slides", value: slides.length, sub: "in carousel", href: "/admin/hero", color: "bg-orange" },
    { label: "Inbox Messages", value: contacts.length, sub: `${unread} unread`, href: "/admin/contacts", color: unread > 0 ? "bg-red-500" : "bg-slate-500" },
  ];

  const recent = contacts.slice(0, 5);

  return (
    <AdminShell>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-extrabold text-navy-deep">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Welcome back. Here's an overview of your site.</p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-sm font-medium text-muted">{s.label}</p>
              <p className="mt-1 text-4xl font-extrabold text-navy-deep">{s.value}</p>
              <p className="mt-1 text-xs text-muted">{s.sub}</p>
              <span className={`mt-4 inline-block h-1 w-8 rounded-full ${s.color}`} />
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/admin/blog/new", label: "New Blog Post", icon: "✏️" },
            { href: "/admin/hero", label: "Edit Hero", icon: "🖼️" },
            { href: "/admin/images", label: "Section Images", icon: "🌄" },
            { href: "/admin/contacts", label: "View Inbox", icon: "📬" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-line bg-white p-5 text-center text-sm font-medium text-navy-deep shadow-sm transition hover:border-orange hover:shadow-md"
            >
              <span className="text-2xl">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>

        {/* Recent messages */}
        {recent.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-deep">Recent Messages</h2>
              <Link href="/admin/contacts" className="text-sm text-orange hover:underline">View all →</Link>
            </div>
            <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
              {recent.map((c, i) => (
                <div
                  key={c.id}
                  className={`flex items-start gap-4 px-6 py-4 ${i < recent.length - 1 ? "border-b border-line" : ""}`}
                >
                  <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${!c.read ? "bg-orange" : "bg-slate-200"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy-deep">{c.name} — {c.company}</p>
                    <p className="truncate text-xs text-muted">{c.need} · {c.message.slice(0, 80)}…</p>
                  </div>
                  <time className="flex-shrink-0 text-xs text-muted">
                    {new Date(c.receivedAt).toLocaleDateString()}
                  </time>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
