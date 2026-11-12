import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getAdminProjects } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected PrimeGo work across industrial facilities, commercial properties, construction handover and institutions.",
};

export default async function ProjectsPage() {
  const allProjects = (await getAdminProjects()).filter((p) => p.published);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Facilities we help keep clean, safe and well managed."
        description="A sample of industrial cleaning, commercial cleaning, post-construction handover and facility programmes."
      />
      <section className="page-grid grid gap-8 py-20 lg:grid-cols-2">
        {allProjects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-lg hover:border-orange/30">
            <div className="relative h-56 overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.cover_image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">{project.sector}{project.location ? ` · ${project.location}` : ""}</p>
              <h2 className="mt-3 text-2xl font-bold text-navy-deep group-hover:text-orange transition-colors">{project.title}</h2>
              <p className="mt-3 text-muted line-clamp-2">{project.summary}</p>
              <p className="mt-4 text-sm font-medium text-navy">Outcome: {project.outcome}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange">View project →</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
