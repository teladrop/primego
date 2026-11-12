import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PrimeGo for industrial cleaning, post-construction cleaning, commercial cleaning, facility management and janitorial services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Tell us about the facility, the schedule and the standard you need. We respond with a service plan and next step."
      />
      <section className="page-grid grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-navy-deep">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-2 block text-orange">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-deep">Phone</h2>
            <a href={site.phoneHref} className="mt-2 block text-orange">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-deep">Office</h2>
            <p className="mt-2 text-muted">{site.address}</p>
            <p className="mt-2 text-muted">{site.hours}</p>
          </div>
        </div>
      </section>
    </>
  );
}
