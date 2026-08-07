import Image from "next/image";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { HairlineRule } from "@/components/hairline-rule";
import type { StoryFounderContent } from "@/lib/cms/types";

type FounderProfileProps = {
  content: Pick<
    StoryFounderContent,
    "founderName" | "founderOrigin" | "portraitImage" | "paragraphs" | "pullQuote"
  >;
};

export function FounderProfile({ content }: FounderProfileProps) {
  return (
    <div className="relative mx-auto max-w-kb-content">
      <BotanicalIllustration
        name="Shea"
        size={280}
        opacity={0.07}
        className="pointer-events-none absolute -right-8 top-0 hidden lg:block"
      />

      <div className="relative grid grid-cols-1 items-center gap-kb-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-stretch lg:gap-kb-16">
        <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:h-full lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 -right-4 -top-4 hidden bg-kb-linen lg:block"
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-kb-chalk lg:aspect-auto lg:h-full">
            <Image
              src={content.portraitImage}
              alt={`${content.founderName} — Founder, Kernels & Bloom`}
              fill
              priority
              sizes="(max-width: 1024px) 380px, 380px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:py-kb-4">
          <p className="kb-label text-kb-terracotta">Founder</p>
          <HairlineRule width="48px" variant="gold" className="mt-4" />
          <h2 className="mt-4 font-display text-[clamp(28px,3.5vw,36px)] font-semibold not-italic leading-tight text-kb-cacao">
            {content.founderName}
          </h2>
          <p className="mt-2 font-body text-[13px] font-light text-kb-dusk/60">
            {content.founderOrigin}
          </p>

          <div className="mt-kb-6 max-w-[540px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <figure className="mt-kb-8 max-w-[540px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(20px,2.5vw,24px)] leading-snug text-kb-terracotta">
              &ldquo;{content.pullQuote}&rdquo;
            </blockquote>
          </figure>
        </div>
      </div>
    </div>
  );
}
