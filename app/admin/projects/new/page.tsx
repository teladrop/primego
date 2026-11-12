import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default function NewProjectPage() {
  return (
    <AdminShell>
      <div className="max-w-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-navy-deep">New Project</h1>
        <ProjectEditor mode="new" />
      </div>
    </AdminShell>
  );
}
