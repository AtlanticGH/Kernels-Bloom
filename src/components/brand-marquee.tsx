import Image from "next/image";
import type { PartnerBrand } from "@/lib/types";

type BrandMarqueeProps = {
  brands: PartnerBrand[];
  sectionLabel?: string;
  className?: string;
  /** band = full-width linen strip; inline = sits inside a parchment section */
  variant?: "band" | "inline";
};

function LogoStrip({ brands }: { brands: PartnerBrand[] }) {
  return (
    <ul className="flex shrink-0 items-center gap-kb-12 pr-kb-12 md:gap-kb-16 md:pr-kb-16">
      {brands.map((brand) => (
        <li key={brand.id} className="shrink-0">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={168}
            height={32}
            className="h-8 w-auto max-w-[168px] object-contain opacity-55 transition-opacity duration-300 hover:opacity-80"
            unoptimized={brand.logo.startsWith("http")}
          />
        </li>
      ))}
    </ul>
  );
}

function MarqueeTrack({
  brands,
  fadeFrom,
}: {
  brands: PartnerBrand[];
  fadeFrom: string;
}) {
  if (brands.length === 0) return null;

  return (
    <div className="relative mt-4 overflow-hidden">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r ${fadeFrom} to-transparent md:w-20`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l ${fadeFrom} to-transparent md:w-20`}
      />

      <div className="kb-marquee-track flex w-max items-center">
        <LogoStrip brands={brands} />
        <div aria-hidden="true">
          <LogoStrip brands={brands} />
        </div>
      </div>
    </div>
  );
}

function BrandsLabel({ children }: { children: string }) {
  return (
    <p className="kb-label mb-0 text-center text-[12px] leading-none text-kb-dusk/50">
      {children}
    </p>
  );
}

/** Infinite horizontal logo scroll for partner / stockist proof. */
export function BrandMarquee({
  brands,
  sectionLabel = "Brands worked with",
  className = "",
  variant = "band",
}: BrandMarqueeProps) {
  if (brands.length === 0) return null;

  const isInline = variant === "inline";
  const fadeFrom = isInline ? "from-kb-parchment" : "from-kb-linen";

  if (isInline) {
    return (
      <div className={className} aria-label={sectionLabel}>
        <BrandsLabel>{sectionLabel}</BrandsLabel>
        <MarqueeTrack brands={brands} fadeFrom={fadeFrom} />
      </div>
    );
  }

  return (
    <section
      className={`kb-home-band border-y-[0.5px] border-kb-chalk bg-kb-linen ${className}`}
      aria-label={sectionLabel}
    >
      <div className="mx-auto w-full max-w-kb-max px-6">
        <BrandsLabel>{sectionLabel}</BrandsLabel>
        <MarqueeTrack brands={brands} fadeFrom={fadeFrom} />
      </div>
    </section>
  );
}
