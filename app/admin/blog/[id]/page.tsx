import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { getPost } from "@/lib/storage";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-navy-deep">Edit Post</h1>
        <BlogEditor mode="edit" initial={post} />
      </div>
    </AdminShell>
  );
}
