import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getHeroSlides, saveHeroSlide, deleteHeroSlide } from "@/lib/storage";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const slides = await getHeroSlides();
  const existing = slides.find((s) => s.id === id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  const updated = { ...existing, ...body, id };
  await saveHeroSlide(updated);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteHeroSlide(id);
  return NextResponse.json({ ok: true });
}
