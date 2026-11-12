import { AdminShell } from "@/components/admin/AdminShell";
import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewPostPage() {
  return (
    <AdminShell>
      <div className="max-w-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-navy-deep">New Blog Post</h1>
        <BlogEditor mode="new" />
      </div>
    </AdminShell>
  );
}
