import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getAdminProjectBySlug, getAdminProjects } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getAdminProjects();
  return projects.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getAdminProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getAdminProjectBySlug(slug);
  if (!project) notFound();

  const bodyParagraphs = project.description
    ? project.description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <>
      <PageHero eyebrow={`${project.sector}${project.location ? ` · ${project.location}` : ""}`} title={project.title} description={project.summary} />
      <article className="page-grid py-16">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            {project.images.length > 0 && <ProjectGallery images={project.images} />}
            {bodyParagraphs.length > 0 && (
              <div className="mt-8 space-y-5">
                {bodyParagraphs.map((para, i) => (
                  <p key={i} className="text-lg leading-8 text-muted">{para}</p>
                ))}
              </div>
            )}
            <Link href="/projects" className="mt-10 inline-flex font-semibold text-orange">← Back to projects</Link>
          </div>
          <aside className="mt-12 lg:mt-0">
            <div className="rounded-2xl bg-navy-deep p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Project details</p>
              <dl className="mt-5 space-y-4 text-sm">
                {project.sector && <div><dt className="font-semibold text-white/50">Sector</dt><dd className="mt-0.5">{project.sector}</dd></div>}
                {project.location && <div><dt className="font-semibold text-white/50">Location</dt><dd className="mt-0.5">{project.location}</dd></div>}
                {project.outcome && <div><dt className="font-semibold text-white/50">Outcome</dt><dd className="mt-0.5 leading-relaxed">{project.outcome}</dd></div>}
              </dl>
              <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold transition hover:bg-orange-hot">
                Discuss a similar project →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
