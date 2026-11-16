import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { audiences, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Viscon helps businesses, property owners and organisations maintain clean, safe, functional and well-managed facilities.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Integrated industrial cleaning and facility management."
        description="Viscon helps businesses, property owners and organisations maintain clean, safe, functional and well-managed facilities — from factories and offices to new builds, hospitals and schools."
      />

      <section className="page-grid grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden rounded-[28px]">
          <Image
            src="/hero.jpg"
            alt="Facilities supported by Viscon"
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
            Viscon brings those services together. We clean industrial
            facilities, prepare properties after construction, maintain
            commercial premises, run janitorial programmes and coordinate
            day-to-day facility operations.
          </p>
          <p>
          The name is simple. Viscon is the standard we hold — on schedule, on the agreed scope, and ready for inspection.
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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => {
            const isOrange = i % 2 === 0;
            return (
              <article
                key={item.title}
                className={`rounded-2xl border-t-4 ${isOrange ? "border-orange" : "border-navy"} bg-white p-7 shadow-sm`}
              >
                <div className={`mb-4 inline-flex rounded-xl ${isOrange ? "bg-orange/10 text-orange" : "bg-navy/10 text-navy"} p-3`}>
                  {i === 0 && (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <path d="M12 3 5 6v6c0 5 3.2 8.4 7 9.5 3.8-1.1 7-4.5 7-9.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="m8.5 12 2.3 2.3 4.7-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <path d="M17 11h2.5a1.5 1.5 0 0 1 0 3H17m0-3v3m0-3H9m8 0V8a2 2 0 0 0-2-2H9a4 4 0 0 0-4 4v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                      <path d="M3 17 8 11l4 4 5-7 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 7v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-bold text-navy-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
