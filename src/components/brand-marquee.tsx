import Image from "next/image";
import { partnerBrands } from "@/lib/data/partner-brands";

type BrandMarqueeProps = {
  className?: string;
  /** band = full-width linen strip; inline = sits inside a parchment section */
  variant?: "band" | "inline";
};

function LogoStrip() {
  return (
    <ul className="flex shrink-0 items-center gap-kb-12 pr-kb-12 md:gap-kb-16 md:pr-kb-16">
      {partnerBrands.map((brand) => (
        <li key={brand.name} className="shrink-0">
          <Image
            src={brand.src}
            alt={brand.name}
            width={brand.width}
            height={brand.height}
            className="h-8 w-auto opacity-55 transition-opacity duration-300 hover:opacity-80"
          />
        </li>
      ))}
    </ul>
  );
}

function MarqueeTrack({ fadeFrom }: { fadeFrom: string }) {
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
        <LogoStrip />
        <div aria-hidden="true">
          <LogoStrip />
        </div>
      </div>
    </div>
  );
}

function BrandsLabel() {
  return (
    <p className="kb-label mb-0 text-center text-[12px] leading-none text-kb-dusk/50">
      Brands worked with
    </p>
  );
}

/** Infinite horizontal logo scroll for partner / stockist proof. */
export function BrandMarquee({
  className = "",
  variant = "band",
}: BrandMarqueeProps) {
  const isInline = variant === "inline";
  const fadeFrom = isInline ? "from-kb-parchment" : "from-kb-linen";

  if (isInline) {
    return (
      <div
        className={className}
        aria-label="Brands worked with"
      >
        <BrandsLabel />
        <MarqueeTrack fadeFrom={fadeFrom} />
      </div>
    );
  }

  return (
    <section
      className={`kb-home-band border-y-[0.5px] border-kb-chalk bg-kb-linen ${className}`}
      aria-label="Brands worked with"
    >
      <div className="mx-auto w-full max-w-kb-max px-6">
        <BrandsLabel />
        <MarqueeTrack fadeFrom={fadeFrom} />
      </div>
    </section>
  );
}
