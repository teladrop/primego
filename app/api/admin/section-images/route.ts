import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSectionImages, saveSectionImages, type SectionImages } from "@/lib/storage";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSectionImages());
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: Partial<SectionImages> = await req.json();
  const current = getSectionImages();
  const updated = { ...current, ...body };
  saveSectionImages(updated);
  return NextResponse.json(updated);
}
