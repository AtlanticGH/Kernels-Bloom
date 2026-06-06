import Image from "next/image";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { HairlineRule } from "@/components/hairline-rule";
import { SITE } from "@/lib/site";

export function FounderProfile() {
  return (
    <div className="relative mx-auto max-w-kb-content">
      <BotanicalIllustration
        name="Shea"
        size={280}
        opacity={0.07}
        className="pointer-events-none absolute -right-8 top-0 hidden lg:block"
      />

      <div className="relative grid grid-cols-1 items-center gap-kb-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-stretch lg:gap-kb-16">
        <div className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:h-full lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 -right-4 -top-4 hidden bg-kb-linen lg:block"
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-kb-chalk lg:aspect-auto lg:h-full">
            <Image
              src="/images/founder-portrait.png"
              alt="Maud Lindsay-Gamrat — Founder, Kernels & Bloom"
              fill
              priority
              sizes="(max-width: 1024px) 320px, 320px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:py-kb-4">
          <p className="kb-label text-kb-terracotta">Founder</p>
          <HairlineRule width="48px" variant="gold" className="mt-4" />
          <h2 className="mt-4 font-display text-[clamp(28px,3.5vw,36px)] font-semibold not-italic leading-tight text-kb-cacao">
            {SITE.founder.name}
          </h2>
          <p className="mt-2 font-body text-[13px] font-light text-kb-dusk/60">
            {SITE.origin}
          </p>

          <div className="mt-kb-6 max-w-[540px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            <p>
              Kernels &amp; Bloom was founded on a conviction: that the
              botanicals of this continent are as sophisticated as any
              luxury ingredient, and ought to be presented as such — from
              the place they come from.
            </p>
            <p>
              The brand is built to keep value close to source, to formulate
              with rigour, and to treat sustainability as the standard rather
              than the story.
            </p>
          </div>

          <figure className="mt-kb-8 max-w-[540px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(20px,2.5vw,24px)] leading-snug text-kb-terracotta">
              &ldquo;We are not borrowing from Africa. We are building from
              it.&rdquo;
            </blockquote>
          </figure>
        </div>
      </div>
    </div>
  );
}
