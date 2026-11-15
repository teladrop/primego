import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { getService, services } from "@/lib/data";

const BASE = "https://www.westmarkservicesltd.com";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
      url: `${BASE}/services/${service.slug}`,
    },
    alternates: { canonical: `${BASE}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "WestMark Industrial Services Ltd",
      url: BASE,
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
    serviceType: service.title,
    url: `${BASE}/services/${service.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.summary}
      />
      <section className="page-grid grid gap-12 py-20 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-lg leading-8 text-muted">{service.description}</p>
          <h2 className="mt-10 text-2xl font-bold text-navy-deep">
            What this typically includes
          </h2>
          <ul className="mt-4 grid gap-3">
            {service.points.map((point) => (
              <li key={point} className="rounded-xl border border-line px-4 py-3">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-2xl bg-navy-deep p-8 text-white">
          <h2 className="text-xl font-bold">Need this for your facility?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Tell us the building type, access hours and the standard you need.
            We will return a clear service outline.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-orange px-5 py-2.5 text-sm font-semibold"
          >
            Get in Touch →
          </Link>
        </aside>
      </section>
    </>
  );
}
