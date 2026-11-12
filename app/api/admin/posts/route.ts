import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPosts, savePost, type AdminPost } from "@/lib/storage";
import { randomUUID } from "crypto";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getPosts());
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const now = new Date().toISOString();
  const post: AdminPost = {
    id: randomUUID(),
    slug: slugify(body.title),
    title: body.title,
    excerpt: body.excerpt ?? "",
    date: body.date ?? new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    category: body.category ?? "General",
    read_time: body.read_time ?? body.readTime ?? "5 min",
    image: body.image ?? "/blog/shutdown.jpg",
    body: Array.isArray(body.body) ? body.body : [body.body ?? ""],
    published: body.published ?? false,
    created_at: now,
    updated_at: now,
  };
  await savePost(post);
  return NextResponse.json(post, { status: 201 });
}
