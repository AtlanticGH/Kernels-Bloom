"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);
  const slides = images.length > 0 ? images : [];
  const current = slides[active] ?? slides[0];

  if (!current) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-kb-linen font-body text-[14px] font-light text-kb-dusk/40">
        No image
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-4">
      {slides.length > 1 && (
        <div
          className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:max-h-[min(640px,70vh)] lg:w-[72px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
          role="tablist"
          aria-label="Product images"
        >
          {slides.map((src, index) => {
            const selected = index === active;
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Image ${index + 1} of ${slides.length}`}
                onClick={() => setActive(index)}
                className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-kb border-[0.5px] bg-kb-linen transition-colors ${
                  selected
                    ? "border-kb-cacao ring-1 ring-kb-cacao"
                    : "border-kb-chalk hover:border-kb-gold/60"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="relative order-1 min-w-0 flex-1 overflow-hidden bg-kb-linen lg:order-2">
        <div className="relative aspect-[4/5] w-full">
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        {slides.length > 1 && (
          <p className="absolute bottom-3 right-3 rounded-kb bg-kb-cacao/75 px-2.5 py-1 font-body text-[11px] font-light text-kb-parchment">
            {active + 1} / {slides.length}
          </p>
        )}
      </div>
    </div>
  );
}
