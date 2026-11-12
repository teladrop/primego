"use client";

import { useState } from "react";

export function ProjectGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) return null;

  return (
    <>
      {/* Main image */}
      <div
        className="relative mb-4 h-72 cursor-zoom-in overflow-hidden rounded-2xl bg-slate-100 sm:h-[420px]"
        onClick={() => setLightbox(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`Project image ${active + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white backdrop-blur hover:bg-black/70"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white backdrop-blur hover:bg-black/70"
              aria-label="Next image"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mb-10 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === active ? "border-orange" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-2xl text-white hover:bg-white/20"
            aria-label="Previous"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={`Project image ${active + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-2xl text-white hover:bg-white/20"
            aria-label="Next"
          >
            ›
          </button>
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {active + 1} / {images.length} — click outside to close
          </span>
        </div>
      )}
    </>
  );
}
