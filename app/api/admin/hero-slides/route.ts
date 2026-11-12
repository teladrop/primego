import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getHeroSlides, saveHeroSlide, saveHeroSlides, type HeroSlide } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getHeroSlides());
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slides = await getHeroSlides();
  const slide: HeroSlide = {
    id: randomUUID(),
    image: body.image ?? "/hero.jpg",
    alt: body.alt ?? "",
    headline: body.headline ?? "",
    subtext: body.subtext ?? "",
    cta: body.cta ?? { label: "Explore Our Services", href: "/services" },
    order: slides.length,
  };
  await saveHeroSlide(slide);
  return NextResponse.json(slide, { status: 201 });
}

// PUT — full reorder
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: HeroSlide[] = await req.json();
  const reordered = body.map((s, i) => ({ ...s, order: i }));
  await saveHeroSlides(reordered);
  return NextResponse.json(reordered);
}
