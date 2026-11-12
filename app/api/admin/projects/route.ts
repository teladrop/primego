import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAdminProjects, saveAdminProject, type AdminProject } from "@/lib/storage";
import { randomUUID } from "crypto";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAdminProjects());
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const now = new Date().toISOString();
  const images: string[] = Array.isArray(body.images) ? body.images : [];
  const project: AdminProject = {
    id: randomUUID(),
    slug: slugify(body.title),
    title: body.title,
    sector: body.sector ?? "",
    location: body.location ?? "",
    summary: body.summary ?? "",
    outcome: body.outcome ?? "",
    description: body.description ?? "",
    images,
    coverImage: images[0] ?? "/hero.jpg",
    published: body.published ?? false,
    createdAt: now,
    updatedAt: now,
  };
  saveAdminProject(project);
  return NextResponse.json(project, { status: 201 });
}
