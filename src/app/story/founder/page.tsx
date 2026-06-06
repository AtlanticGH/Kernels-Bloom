import type { Metadata } from "next";
import Image from "next/image";
import { HairlineRule } from "@/components/hairline-rule";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "The vision behind Kernels & Bloom — and the conviction that Africa's botanicals belong at the luxury tier.",
  alternates: { canonical: "/story/founder" },
};

export default function FounderPage() {
  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-kb-max px-6 py-kb-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Our Story", href: "/story" },
            { name: "Founder", href: "/story/founder" },
          ]}
        />
        <div className="mt-kb-8 grid grid-cols-1 gap-kb-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-kb-chalk">
            <Image
              src="/images/IMG_0141.jpg"
              alt="Portrait in warm light against a textured stone wall"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:py-kb-8">
            <h1 className="font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
              The vision, and the why.
            </h1>
            <HairlineRule width="80px" variant="gold" className="mt-6" />
            <div className="mt-8 space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
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
              <p className="kb-accent text-[20px] text-kb-terracotta">
                &ldquo;We are not borrowing from Africa. We are building from
                it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
