import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WestMark core services: industrial cleaning, post-construction cleaning, commercial cleaning, facility management and janitorial services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five services. One integrated partner."
        description="Industrial cleaning, post-construction cleaning, commercial cleaning, facility management and janitorial services — scoped to the way your facility actually operates."
      />
      <section className="page-grid grid gap-6 py-20 lg:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.slug}
            className="flex flex-col rounded-2xl border border-line p-8"
          >
            <h2 className="text-2xl font-bold text-navy-deep">{service.title}</h2>
            <p className="mt-3 leading-7 text-muted">{service.description}</p>
            <ul className="mt-6 grid gap-2 text-sm text-navy">
              {service.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-orange">▸</span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-8 font-semibold text-orange"
            >
              Service details →
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
