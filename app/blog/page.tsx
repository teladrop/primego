import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on industrial cleaning, post-construction handover, commercial cleaning, janitorial services and facility management.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on cleaner, safer, better-run facilities."
        description="Short operational pieces from PrimeGo supervisors and account leads on cleaning and facility management."
      />
      <section className="page-grid grid gap-8 py-20 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">
                {post.category} · {post.date} · {post.readTime}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy-deep">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-muted">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex font-semibold text-orange"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
