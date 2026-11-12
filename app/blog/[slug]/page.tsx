import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getPost as getStaticPost, posts } from "@/lib/data";
import { getPostBySlug } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const admin = await getPostBySlug(slug);
  const stat = getStaticPost(slug);
  const post = admin ?? stat;
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const admin = await getPostBySlug(slug);
  const stat = getStaticPost(slug);
  const post = admin ?? stat;
  if (!post) notFound();

  const image = "image" in post ? post.image : (post as { image: string }).image;
  const readTime = "read_time" in post ? (post as { read_time: string }).read_time : (post as { readTime: string }).readTime;

  return (
    <>
      <PageHero eyebrow={`${post.category} · ${post.date}`} title={post.title} description={post.excerpt} />
      <article className="page-grid max-w-3xl py-16">
        <div className="relative mb-10 h-72 overflow-hidden rounded-[28px] sm:h-96">
          {image.startsWith("data:") || image.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <Image src={image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
          )}
        </div>
        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-orange uppercase">{post.category} · {post.date} · {readTime}</p>
        {post.body.map((paragraph, i) => (
          <p key={i} className="mb-6 text-lg leading-8 text-muted">{paragraph}</p>
        ))}
        <Link href="/blog" className="font-semibold text-orange">← Back to blog</Link>
      </article>
    </>
  );
}
