import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSectionImages, saveSectionImages } from "@/lib/storage";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSectionImages());
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const current = await getSectionImages();
  const updated = { ...current, ...body };
  await saveSectionImages(updated);
  return NextResponse.json(updated);
}
