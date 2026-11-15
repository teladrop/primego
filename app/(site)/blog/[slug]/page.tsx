import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug, getPosts } from "@/lib/storage";

export const dynamic = "force-dynamic";

const BASE = "https://www.westmarkservicesltd.com";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${post.slug}`,
      images: [{ url: post.image.startsWith("http") ? post.image : `${BASE}${post.image}` }],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ["WestMark Industrial Services Ltd"],
      tags: [post.category],
    },
    alternates: { canonical: `${BASE}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.image.startsWith("http") ? post.image : `${BASE}${post.image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "WestMark Industrial Services Ltd",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "WestMark Industrial Services Ltd",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
    articleSection: post.category,
    wordCount: post.body.join(" ").split(" ").length,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero eyebrow={`${post.category} · ${post.date}`} title={post.title} description={post.excerpt} />
      <article className="page-grid max-w-3xl py-16">
        <div className="relative mb-10 h-72 overflow-hidden rounded-[28px] sm:h-96">
          {post.image.startsWith("data:") || post.image.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
          )}
        </div>
        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-orange uppercase">{post.category} · {post.date} · {post.read_time}</p>
        {post.body.map((paragraph, i) => (
          <p key={i} className="mb-6 text-lg leading-8 text-muted">{paragraph}</p>
        ))}
        <Link href="/blog" className="font-semibold text-orange">← Back to blog</Link>
      </article>
    </>
  );
}
