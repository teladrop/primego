import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getPost as getStaticPost, posts } from "@/lib/data";
import { getPostBySlug } from "@/lib/storage";

// Dynamic so admin-created posts resolve at runtime
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Only pre-generate static built-in slugs; admin slugs are handled at runtime
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const adminPost = getPostBySlug(slug);
  const staticPost = getStaticPost(slug);
  const post = adminPost ?? staticPost;
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adminPost = getPostBySlug(slug);
  const staticPost = getStaticPost(slug);
  const post = adminPost ?? staticPost;
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
          {post.image.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          )}
        </div>
        {post.body.map((paragraph, i) => (
          <p key={i} className="mb-6 text-lg leading-8 text-muted">
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
