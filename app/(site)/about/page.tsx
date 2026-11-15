import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { audiences, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "WestMark helps businesses, property owners and organisations maintain clean, safe, functional and well-managed facilities.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Integrated industrial cleaning and facility management."
        description="WestMark helps businesses, property owners and organisations maintain clean, safe, functional and well-managed facilities — from factories and offices to new builds, hospitals and schools."
      />

      <section className="page-grid grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden rounded-[28px]">
          <Image
            src="/hero.jpg"
            alt="Facilities supported by WestMark"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted">
          <p>
            Too many organisations buy cleaning and facility support in pieces:
            one contractor for the factory, another for the offices, another
            for handover, and a fourth for daily hygiene. Standards drift, and
            nobody owns the whole building.
          </p>
          <p>
            WestMark brings those services together. We clean industrial
            facilities, prepare properties after construction, maintain
            commercial premises, run janitorial programmes and coordinate
            day-to-day facility operations.
          </p>
          <p>
            The name is simple. West is the standard we hold. Mark is how we
            show up: on schedule, on the agreed scope, and ready for inspection.
          </p>
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="page-grid py-20">
          <h2 className="text-3xl font-extrabold text-navy-deep">
            Who we work with
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {audiences.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-line bg-white p-7"
              >
                <h3 className="text-xl font-bold text-navy-deep">{item.title}</h3>
                <p className="mt-3 text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-grid py-20">
        <h2 className="text-3xl font-extrabold text-navy-deep">
          What we refuse to compromise
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {values.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line bg-white p-7"
            >
              <h3 className="text-xl font-bold text-navy-deep">{item.title}</h3>
              <p className="mt-3 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
