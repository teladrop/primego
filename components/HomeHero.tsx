"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { HeroSlide } from "@/lib/storage";

const pillars = [
  {
    title: "Safety First",
    description: "Clean, organised workplaces that eliminate slip, trip and hygiene hazards before they occur.",
    color: "border-orange",
    iconBg: "bg-orange/10",
    iconColor: "text-orange",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path d="M12 3 5 6v6c0 5 3.2 8.4 7 9.5 3.8-1.1 7-4.5 7-9.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m8.5 12 2.3 2.3 4.7-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Operational Excellence",
    description: "Schedules, standards and reporting that keep every facility running to spec, every day.",
    color: "border-navy",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Trusted Partner",
    description: "One accountable team across industrial, commercial, handover and janitorial work.",
    color: "border-orange",
    iconBg: "bg-orange/10",
    iconColor: "text-orange",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path d="M17 11h2.5a1.5 1.5 0 0 1 0 3H17m0-3v3m0-3H9m8 0V8a2 2 0 0 0-2-2H9a4 4 0 0 0-4 4v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sustainable Growth",
    description: "Methods that protect buildings, equipment and the people who use them for the long term.",
    color: "border-navy",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
        <path d="M3 17 8 11l4 4 5-7 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 7v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HomeHero({ slides: initialSlides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const slides = initialSlides.length > 0 ? initialSlides : [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[current] ?? {
    id: "fallback",
    image: "/hero.jpg",
    alt: "Industrial process plant with yellow safety walkways",
    headline: "Viscon Industrial Services Ltd",
    subtext: "Integrated industrial cleaning and facility management for clean, safe, functional and well-managed facilities.",
    cta: { label: "Explore Our Services", href: "/services" },
    order: 0,
  };

  return (
    <section className="overflow-hidden bg-white">
      <div className="relative lg:min-h-[480px]">
        {/* Desktop image carousel with mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52%,720px)] lg:block">
          <div className="relative h-full w-full overflow-hidden">
            {slides.map((slide, i) => (
              slide.image.startsWith("data:") || slide.image.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 0vw, 52vw"
                  className={`object-cover object-center transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              )
            ))}
          </div>
          <svg
            className="absolute inset-y-0 left-0 h-full w-[38%]"
            viewBox="0 0 220 800"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path fill="#ffffff" d="M0 0h150C48 210 190 430 36 800H0V0Z" />
            <path
              fill="#e7eef6"
              d="M118 0C42 230 205 470 70 800H36C190 430 48 210 150 0Z"
            />
          </svg>
        </div>

        {/* Text content */}
        <div className="page-grid relative z-10 flex min-h-[400px] items-center py-10 lg:min-h-[480px] lg:py-8">
          <div className="max-w-[560px]">
            <p className="mb-5 text-[12px] font-semibold tracking-[0.34em] text-slate-400 uppercase">
              Cleaning <span className="mx-1 text-orange">•</span> Facilities{" "}
              <span className="mx-1 text-orange">•</span> Management
            </p>
            <h1 className="text-5xl leading-[0.95] font-extrabold tracking-tight text-[#163a62] sm:text-6xl lg:text-[64px]">
              <span className="transition-opacity duration-500">
                {activeSlide.headline}
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-500 transition-opacity duration-500">
              {activeSlide.subtext}
            </p>
            <Link
              href={activeSlide.cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(244,122,31,0.28)] transition hover:bg-orange-hot"
            >
              {activeSlide.cta.label}
              <span aria-hidden>→</span>
            </Link>

            {/* Carousel indicators */}
            {slides.length > 1 && (
              <div className="mt-6 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? "w-8 bg-orange" : "w-1.5 bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile image carousel */}
        <div className="page-grid pb-4 lg:hidden">
          <div className="relative h-52 overflow-hidden rounded-[28px]">
            {slides.map((slide, i) => (
              slide.image.startsWith("data:") || slide.image.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={`object-cover object-center transition-opacity duration-700 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              )
            ))}
          </div>
        </div>
      </div>

      {/* Pillars cards */}
      <div className="page-grid">
        <div className="grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border-t-4 ${item.color} bg-white px-5 py-6 shadow-sm`}
            >
              <div className={`mb-4 inline-flex rounded-xl ${item.iconBg} p-3 ${item.iconColor}`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-navy-deep">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
