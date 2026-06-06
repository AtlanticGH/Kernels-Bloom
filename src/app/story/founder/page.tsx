import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "The vision behind Kernels & Bloom — and the conviction that Africa's botanicals belong at the luxury tier.",
  alternates: { canonical: "/story/founder" },
};

export default function FounderPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Founder", href: "/story/founder" },
        ]}
        label="Founder"
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-kb-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-kb-chalk">
              <Image
                src="/images/DSC09530.jpg"
                alt="K&B signature trio — barrier repair lotion, scented candle and nourishing cream against a lush botanical backdrop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:py-kb-8">
              <div className="space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
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
        </div>
      </section>
    </PageShell>
  );
}
