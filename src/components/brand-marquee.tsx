import Image from "next/image";
import { partnerBrands } from "@/lib/data/partner-brands";

type BrandMarqueeProps = {
  className?: string;
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

/** Infinite horizontal logo scroll for partner / stockist proof. */
export function BrandMarquee({ className = "" }: BrandMarqueeProps) {
  return (
    <section
      className={`border-y-[0.5px] border-kb-chalk bg-kb-linen py-kb-8 ${className}`}
      aria-label="Brands we've worked with"
    >
      <div className="mx-auto max-w-kb-max px-6">
        <p className="kb-label text-center text-[10px] text-kb-dusk/50">
          Brands we&apos;ve worked with
        </p>
      </div>

      <div className="relative mt-kb-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-kb-linen to-transparent md:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-kb-linen to-transparent md:w-24"
        />

        <div className="kb-marquee-track flex w-max items-center">
          <LogoStrip />
          <div aria-hidden="true">
            <LogoStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
