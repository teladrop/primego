import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { audiences, services, testimonials, values } from "@/lib/data";
import { getHeroSlides, getAdminProjects, getPosts } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [slides, dbProjects, dbPosts] = await Promise.all([
    getHeroSlides(),
    getAdminProjects(),
    getPosts(),
  ]);

  const publishedProjects = dbProjects.filter((p) => p.published).slice(0, 3);
  const publishedPosts = dbPosts.filter((p) => p.published).slice(0, 3);

  return (
    <>
      <HomeHero slides={slides} />

      {/* About snippet */}
      <section className="page-grid grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
          <Image src="/hero.jpg" alt="PrimeGo supports industrial and commercial facilities" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">About PrimeGo</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">
            Clean, safe, well-managed facilities — delivered reliably.
          </h2>
          <ul className="mt-6 space-y-3">
            {values.map((v) => (
              <li key={v.title} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" />
                <div>
                  <span className="font-semibold text-navy-deep">{v.title}: </span>
                  <span className="text-muted">{v.description}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-orange">
            Read our story →
          </Link>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-[#f6f8fb] py-20">
        <div className="page-grid">
          <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">Who we work with</p>
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">Built for facilities that need consistency.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="font-bold text-navy-deep">{a.title}</h3>
                <p className="mt-2 text-muted">{a.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="page-grid">
          <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">Services</p>
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">Everything your facility needs, under one contract.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-2xl border border-line bg-white p-7 transition hover:border-orange/40 hover:shadow-md">
                <h3 className="font-bold text-navy-deep group-hover:text-orange transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.summary}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-orange">Service details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-[#f6f8fb] py-20">
        <div className="page-grid">
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">Projects</p>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">Work we're proud of.</h2>
            </div>
            <Link href="/projects" className="hidden font-semibold text-orange sm:block">View all →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-md">
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover_image || "/hero.jpg"} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">{p.sector}{p.location ? ` · ${p.location}` : ""}</p>
                  <h3 className="mt-2 font-bold text-navy-deep">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="page-grid">
          <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">Testimonials</p>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">What clients say.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-line bg-white p-7">
                <p className="text-muted">"{t.quote}"</p>
                <footer className="mt-4">
                  <p className="font-semibold text-navy-deep">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}, {t.company}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-[#f6f8fb] py-20">
        <div className="page-grid">
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-orange uppercase">Blog</p>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">Insights from the field.</h2>
            </div>
            <Link href="/blog" className="hidden font-semibold text-orange sm:block">View all →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-md">
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  {post.image.startsWith("http") || post.image.startsWith("/") ? (
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">{post.category}</p>
                  <h3 className="mt-2 font-bold text-navy-deep">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-20">
        <div className="page-grid text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Need a cleaner, safer, better-run facility?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">Talk to PrimeGo about industrial cleaning, facility management or a post-construction handover clean.</p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-semibold text-white transition hover:bg-orange-hot">
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
