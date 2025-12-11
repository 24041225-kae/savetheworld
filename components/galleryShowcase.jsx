"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GalleryShowcase({ images = [], autoPlay = false, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const [captions, setCaptions] = useState(images.map((img) => img.caption || ""));
  const timerRef = useRef(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setCaptions(images.map((img) => img.caption || ""));
    }
  }, [images]);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(timerRef.current);
  }, [images.length, autoPlay, interval]);

  const go = (i) => setIndex(((i % images.length) + images.length) % images.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const updateCaption = (val) => {
    setCaptions((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <div className="w-full h-56 sm:h-72 md:h-80 flex items-center justify-center bg-black">
          <img
            src={images[index].src}
            alt={captions[index] || `image-${index}`}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 w-full p-3 border rounded-lg border-gray-300 bg-gray-50">
        {images[index]?.subtitle && (
          <p className="text-sm text-gray-600 mb-2 font-semibold">{images[index].subtitle}</p>
        )}
        <p className="text-gray-700 text-sm leading-relaxed">{captions[index] || "No caption"}</p>
      </div>
    </div>
  );
}
