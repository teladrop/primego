import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getPost, posts } from "@/lib/data";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${post.date}`}
        title={post.title}
        description={post.excerpt}
      />
      <article className="page-grid max-w-3xl py-16">
        <div className="relative mb-10 h-72 overflow-hidden rounded-[28px] sm:h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            preload
          />
        </div>
        {post.body.map((paragraph) => (
          <p key={paragraph} className="mb-6 text-lg leading-8 text-muted">
            {paragraph}
          </p>
        ))}
        <Link href="/blog" className="font-semibold text-orange">
          ← Back to blog
        </Link>
      </article>
    </>
  );
}
