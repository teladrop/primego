import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { audiences, posts, projects, services, testimonials, values } from "@/lib/data";

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="page-grid grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
          <Image
            src="/hero.jpg"
            alt="PrimeGo supports industrial and commercial facilities"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
            About PrimeGo
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-deep">
            Integrated industrial cleaning and facility management.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            PrimeGo helps businesses, property owners and organisations
            maintain clean, safe, functional and well-managed facilities. We
            combine industrial cleaning, post-construction cleaning, commercial
            cleaning, janitorial services and day-to-day facility management in
            one accountable team.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-navy">
            {values.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange" />
                <span>
                  <strong>{item.title}.</strong> {item.description}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-orange"
          >
            Read our story →
          </Link>
        </div>
      </section>

      <section className="page-grid py-4 pb-20">
        <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
          Who we serve
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-navy-deep">
          Built for the facilities you actually run.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line p-7"
            >
              <h3 className="text-xl font-bold text-navy-deep">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="page-grid py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
                Services
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight text-navy-deep">
                Core services for every type of facility.
              </h2>
            </div>
            <Link
              href="/services"
              className="font-semibold text-orange hover:text-orange-hot"
            >
              View all services →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-navy-deep group-hover:text-orange">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {service.summary}
                </p>
                <span className="mt-6 inline-block text-sm font-semibold text-orange">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-grid py-20">
        <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
          Projects
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-navy-deep">
          Work across factories, offices, new builds and institutions.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative h-48">
                <Image
                  src="/hero.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {project.sector}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy-deep">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex font-semibold text-orange"
        >
          See all projects →
        </Link>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="page-grid py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
                Testimonials
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight text-navy-deep">
                What clients say once the facility is in our care.
              </h2>
            </div>
            <Link href="/testimonials" className="font-semibold text-orange">
              All testimonials →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <blockquote
                key={item.name}
                className="rounded-2xl border border-line bg-white p-7"
              >
                <p className="text-navy-deep">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-6">
                  <p className="font-semibold text-navy-deep">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role}, {item.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="page-grid py-20">
        <p className="text-xs font-semibold tracking-[0.32em] text-orange uppercase">
          Blog
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-deep">
          Practical notes on cleaning and facility management.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-2xl border border-line transition hover:border-orange/40"
            >
              <div className="relative h-44">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-xs font-semibold tracking-wide text-orange uppercase">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-3 text-xl font-bold text-navy-deep">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="page-grid flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-deep sm:text-4xl">
              Need a cleaner, safer, better-run facility?
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Tell us about the building, the schedule and the standard you
              need. PrimeGo will come back with a clear service plan.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-orange px-7 py-3.5 font-semibold text-white hover:bg-orange-hot"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  );
}
