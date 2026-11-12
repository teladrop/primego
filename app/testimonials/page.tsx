import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Feedback from operations, property and facilities leaders who work with PrimeGo on industrial, commercial and institutional sites.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trusted by the people who run the building."
        description="Comments from operations, property, project and facilities leads after PrimeGo has taken on cleaning and facility management."
      />
      <section className="page-grid grid gap-6 py-20 md:grid-cols-2">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="rounded-2xl border border-line p-8"
          >
            <p className="text-lg leading-8 text-navy-deep">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">
                {item.role}, {item.company}
              </p>
            </footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
