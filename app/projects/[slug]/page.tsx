import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects as staticProjects } from "@/lib/data";
import { getAdminProjectBySlug } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const admin = await getAdminProjectBySlug(slug);
  if (admin) return { title: admin.title, description: admin.summary };
  const stat = staticProjects.find((p) => p.slug === slug);
  if (stat) return { title: stat.title, description: stat.summary };
  return { title: "Project" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const admin = await getAdminProjectBySlug(slug);

  if (admin) {
    const bodyParagraphs = admin.description
      ? admin.description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
      : [];

    return (
      <>
        <PageHero eyebrow={`${admin.sector}${admin.location ? ` · ${admin.location}` : ""}`} title={admin.title} description={admin.summary} />
        <article className="page-grid py-16">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            <div>
              {admin.images.length > 0 && <ProjectGallery images={admin.images} />}
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
                  {admin.sector && <div><dt className="font-semibold text-white/50">Sector</dt><dd className="mt-0.5">{admin.sector}</dd></div>}
                  {admin.location && <div><dt className="font-semibold text-white/50">Location</dt><dd className="mt-0.5">{admin.location}</dd></div>}
                  {admin.outcome && <div><dt className="font-semibold text-white/50">Outcome</dt><dd className="mt-0.5 leading-relaxed">{admin.outcome}</dd></div>}
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

  const stat = staticProjects.find((p) => p.slug === slug);
  if (!stat) notFound();

  return (
    <>
      <PageHero eyebrow={`${stat.sector} · ${stat.location}`} title={stat.title} description={stat.summary} />
      <article className="page-grid py-16">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            <div className="relative mb-10 h-72 overflow-hidden rounded-2xl bg-slate-100 sm:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero.jpg" alt={stat.title} className="h-full w-full object-cover" />
            </div>
            <p className="text-lg leading-8 text-muted">{stat.summary}</p>
            <Link href="/projects" className="mt-10 inline-flex font-semibold text-orange">← Back to projects</Link>
          </div>
          <aside className="mt-12 lg:mt-0">
            <div className="rounded-2xl bg-navy-deep p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Project details</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="font-semibold text-white/50">Sector</dt><dd className="mt-0.5">{stat.sector}</dd></div>
                <div><dt className="font-semibold text-white/50">Location</dt><dd className="mt-0.5">{stat.location}</dd></div>
                <div><dt className="font-semibold text-white/50">Outcome</dt><dd className="mt-0.5 leading-relaxed">{stat.outcome}</dd></div>
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
