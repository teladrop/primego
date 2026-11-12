import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "gif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(
    path.join(process.cwd(), "public", "uploads", filename),
    buffer,
  );

  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
