import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected PrimeGo work across industrial facilities, commercial properties, construction handover and institutions.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Facilities we help keep clean, safe and well managed."
        description="A sample of industrial cleaning, commercial cleaning, post-construction handover and facility programmes. Client names are withheld where they require it."
      />
      <section className="page-grid grid gap-8 py-20 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="overflow-hidden rounded-2xl border border-line"
          >
            <div className="relative h-56">
              <Image
                src="/hero.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">
                {project.sector} · {project.location}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy-deep">
                {project.title}
              </h2>
              <p className="mt-3 text-muted">{project.summary}</p>
              <p className="mt-4 text-sm font-medium text-navy">
                Outcome: {project.outcome}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
