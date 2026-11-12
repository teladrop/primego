import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#f6f8fb] text-slate-600">
      <div className="page-grid grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="max-w-xs text-sm leading-6">
            Integrated industrial cleaning and facility management for
            businesses, property owners and organisations.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-[0.2em] text-navy-deep uppercase">
            Explore
          </h2>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-orange">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/testimonials" className="hover:text-orange">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-[0.2em] text-navy-deep uppercase">
            Services
          </h2>
          <ul className="space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-orange"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-[0.2em] text-navy-deep uppercase">
            Contact
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-orange">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-orange">
                {site.phone}
              </a>
            </li>
            <li className="max-w-[16rem] leading-6">{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="page-grid flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.legalName}. All rights reserved.</p>
          <p>Safety first. Operational excellence. Trusted partner.</p>
        </div>
      </div>
    </footer>
  );
}
