import { AdminShell } from "@/components/admin/AdminShell";
import { getPosts } from "@/lib/storage";
import Link from "next/link";
import { BlogDeleteButton } from "@/components/admin/BlogDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const adminPosts = await getPosts();

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-navy-deep">Blog Posts</h1>
            <p className="mt-1 text-sm text-muted">Manage your blog content.</p>
          </div>
          <Link href="/admin/blog/new" className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot">
            + New Post
          </Link>
        </div>

        <div className="mt-8">
          {adminPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-sm text-muted">
              No posts yet. <Link href="/admin/blog/new" className="text-orange hover:underline">Create your first post →</Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
              {adminPosts.map((post, i) => (
                <div key={post.id} className={`flex items-center gap-4 px-6 py-4 ${i < adminPosts.length - 1 ? "border-b border-line" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-navy-deep">{post.title}</p>
                    <p className="text-xs text-muted mt-0.5">{post.category} · {post.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <Link href={`/admin/blog/${post.id}`} className="text-sm font-medium text-orange hover:underline">Edit</Link>
                  <BlogDeleteButton id={post.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
