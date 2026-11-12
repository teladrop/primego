import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { getAdminProject } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getAdminProject(id);
  if (!project) notFound();
  return (
    <AdminShell>
      <div className="max-w-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-navy-deep">Edit Project</h1>
        <ProjectEditor mode="edit" initial={project} />
      </div>
    </AdminShell>
  );
}
