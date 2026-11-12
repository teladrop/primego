import { NextRequest, NextResponse } from "next/server";
import { saveContact, type ContactSubmission } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const required = ["name", "company", "email", "phone", "message"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const contact: ContactSubmission = {
    id: randomUUID(),
    name: body.name,
    company: body.company,
    email: body.email,
    phone: body.phone,
    need: body.need ?? "General",
    message: body.message,
    received_at: new Date().toISOString(),
    read: false,
  };

  await saveContact(contact);
  return NextResponse.json({ ok: true }, { status: 201 });
}
