import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { posts as staticPosts } from "@/lib/data";
import { getPosts } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical writing on industrial cleaning, post-construction handover, commercial cleaning, janitorial services and facility management.",
};

export default async function BlogPage() {
  const adminPosts = await getPosts();
  const published = adminPosts.filter((p) => p.published);

  const allPosts = [
    ...published.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      category: p.category,
      readTime: p.read_time,
      image: p.image,
    })),
    ...staticPosts,
  ];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on cleaner, safer, better-run facilities."
        description="Short operational pieces from PrimeGo supervisors and account leads on cleaning and facility management."
      />
      <section className="page-grid grid gap-8 py-20 md:grid-cols-2">
        {allPosts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-2xl border border-line bg-white">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-56">
                {post.image.startsWith("http") || post.image.startsWith("/") ? (
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                )}
              </div>
            </Link>
            <div className="p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">{post.category} · {post.date} · {post.readTime}</p>
              <h2 className="mt-3 text-2xl font-bold text-navy-deep"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="mt-3 text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex font-semibold text-orange">Read article →</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
