import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { jobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join PrimeGo in industrial cleaning, post-construction cleaning, facility management and janitorial services.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work where the standard is visible."
        description="PrimeGo hires people who take cleaning and facility management seriously — on factories, offices, construction handover and institutions."
      />
      <section className="page-grid py-20">
        <div className="grid gap-6">
          {jobs.map((job) => (
            <article
              key={job.slug}
              className="rounded-2xl border border-line p-8"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <h2 className="text-2xl font-bold text-navy-deep">{job.title}</h2>
                <p className="text-sm text-muted">
                  {job.type} · {job.location}
                </p>
              </div>
              <p className="mt-4 text-muted">{job.summary}</p>
              <ul className="mt-5 grid gap-2 text-sm">
                {job.duties.map((duty) => (
                  <li key={duty} className="flex gap-2">
                    <span className="text-orange">▸</span>
                    {duty}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex font-semibold text-orange"
              >
                Apply via contact form →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
