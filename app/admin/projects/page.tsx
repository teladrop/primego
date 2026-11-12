import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminProjects } from "@/lib/storage";
import { projects as staticProjects } from "@/lib/data";
import Link from "next/link";
import { ProjectDeleteButton } from "@/components/admin/ProjectDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const adminProjects = await getAdminProjects();

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-navy-deep">Projects</h1>
            <p className="mt-1 text-sm text-muted">Add and manage project case studies with images.</p>
          </div>
          <Link href="/admin/projects/new" className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-hot">
            + New Project
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Admin Projects ({adminProjects.length})</h2>
          {adminProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-sm text-muted">
              No projects yet. <Link href="/admin/projects/new" className="text-orange hover:underline">Create your first project →</Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
              {adminProjects.map((project, i) => (
                <div key={project.id} className={`flex items-center gap-4 px-6 py-4 ${i < adminProjects.length - 1 ? "border-b border-line" : ""}`}>
                  {project.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover_image} alt={project.title} className="h-12 w-16 flex-shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-slate-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-navy-deep">{project.title}</p>
                    <p className="text-xs text-muted mt-0.5">{project.sector}{project.location ? ` · ${project.location}` : ""} · {project.images.length} image{project.images.length !== 1 ? "s" : ""}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${project.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {project.published ? "Published" : "Draft"}
                  </span>
                  <Link href={`/admin/projects/${project.id}`} className="text-sm font-medium text-orange hover:underline">Edit</Link>
                  <ProjectDeleteButton id={project.id} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Built-in Projects ({staticProjects.length}) — read only</h2>
          <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
            {staticProjects.map((project, i) => (
              <div key={project.slug} className={`flex items-center gap-4 px-6 py-4 ${i < staticProjects.length - 1 ? "border-b border-line" : ""}`}>
                <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-navy-deep">{project.title}</p>
                  <p className="text-xs text-muted mt-0.5">{project.sector} · {project.location}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">Built-in</span>
                <Link href={`/projects/${project.slug}`} target="_blank" className="text-sm font-medium text-slate-400 hover:text-orange">View →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
