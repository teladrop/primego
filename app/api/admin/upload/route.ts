import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase";
import { randomUUID } from "crypto";

const BUCKET = "westmark-media";

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

  const filename = `uploads/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const sb = getSupabaseServer();

  const { error } = await sb.storage.from(BUCKET).upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error("upload error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: urlData.publicUrl }, { status: 201 });
}
