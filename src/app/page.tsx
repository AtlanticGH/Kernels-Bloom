import Image from "next/image";
import Link from "next/link";
import { CornerBrackets } from "@/components/corner-brackets";
import { GrainOverlay } from "@/components/grain-overlay";
import { GoldCTA } from "@/components/gold-cta";
import { HairlineRule } from "@/components/hairline-rule";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { ArticleCard } from "@/components/article-card";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { KBButton } from "@/components/kb-button";
import { Reveal } from "@/components/reveal";
import {
  getFeaturedProducts,
  getAllArticles,
  getIngredient,
} from "@/lib/data";

const STATS = [
  { number: "95%", label: "Botanical Ingredients" },
  { number: "50+", label: "Species Utilised" },
  { number: "20+", label: "Community Partnerships" },
  { number: "Zero", label: "Waste Target" },
];

const PROCESS = [
  {
    name: "Botanical Sourcing",
    body: "Wild-gathered and cooperative-grown across Ghana and the wider continent — never at the cost of the tree.",
    botanical: "Baobab" as const,
  },
  {
    name: "Upcycle & Refine",
    body: "Seeds and by-products others discard are pressed and refined into clear, capable oils.",
    botanical: "Kalahari melon" as const,
  },
  {
    name: "Circular Packaging",
    body: "Glass and refill returned through our programme, closing the loop on every formulation.",
    botanical: "Moringa" as const,
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const articles = getAllArticles().slice(0, 3);
  const shea = getIngredient("shea")!;

  return (
    <>
      {/* 1. Navigation is global (layout). */}

      {/* 2. Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-kb-kola">
        <GrainOverlay opacity={0.08} />
        <CornerBrackets arm={80} inset={40} />
        <div className="relative z-10 mx-auto w-full max-w-kb-max px-6 sm:px-kb-12">
          <div className="max-w-[820px]">
            <p className="kb-label text-kb-terracotta">
              Ghanaian Luxury Botanicals
            </p>
            <h1 className="mt-5 font-display text-[clamp(40px,5vw,72px)] font-semibold not-italic leading-[1.1] tracking-tight text-kb-cacao">
              From the kernel,
              <br />
              To your bloom.
            </h1>
            <HairlineRule width="80px" variant="gold" className="mt-6" />
            <p className="mt-6 max-w-[480px] font-body text-body-lg font-light text-kb-dusk/70">
              Science-backed formulations rooted in Africa&apos;s richest
              botanicals. Crafted in Ghana, for skin that remembers where it
              comes from.
            </p>
            <div className="mt-10 flex flex-col gap-4">
              <GoldCTA href="/shop/all">Explore the collection →</GoldCTA>
              <GoldCTA href="/botanicals" tone="dusk">
                Discover our botanicals
              </GoldCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand statistics bar */}
      <section className="relative overflow-hidden bg-kb-dusk py-kb-6">
        <GrainOverlay opacity={0.04} />
        <div className="relative mx-auto grid max-w-kb-max grid-cols-2 gap-y-6 px-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 text-center ${
                i !== 0 ? "md:border-l-[0.5px] md:border-kb-gold/40" : ""
              }`}
            >
              <p className="font-display text-[clamp(36px,5vw,48px)] font-light italic text-kb-parchment">
                {stat.number}
              </p>
              <p className="mt-2 kb-label text-[12px] text-kb-parchment/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ingredient story feature */}
      <section className="overflow-hidden bg-kb-parchment pb-kb-16">
        <div className="grid w-full grid-cols-1 items-stretch md:grid-cols-2">
          <div className="relative min-h-[400px] bg-kb-chalk md:min-h-[600px]">
            <Image
              src="/images/DSC09553.jpg"
              alt="Absolute Shea moisturising bar soap, wrapped in kraft and linen, against a lush botanical backdrop"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <GrainOverlay opacity={0.06} />
          </div>
          <div className="relative flex flex-col justify-center px-6 py-kb-12 md:px-kb-12">
            <BotanicalIllustration
              name="Shea"
              size={240}
              opacity={0.12}
              className="pointer-events-none absolute -right-6 top-6"
            />
            <div className="relative">
              <p className="kb-label text-kb-terracotta">Ingredient Story</p>
              <h2 className="mt-3 font-display text-[clamp(40px,6vw,52px)] font-light italic text-kb-cacao">
                {shea.commonName}
              </h2>
              <p className="mt-1 font-body text-[13px] font-light text-kb-dusk/60">
                {shea.latinName}
              </p>
              <p className="mt-6 max-w-[400px] font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
                Stone-ground by the women&apos;s cooperatives of Northern Ghana,
                shea rebuilds the skin barrier and holds the day&apos;s warmth
                in. A craft held across generations.
              </p>
              <p className="mt-4 kb-accent text-[18px] text-kb-terracotta">
                &ldquo;{shea.pullQuote}&rdquo;
              </p>
              <div className="mt-8">
                <GoldCTA href="/botanicals">
                  Explore the botanical index →
                </GoldCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured products */}
      <section className="bg-kb-parchment pb-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <SectionHeader
            label="The Collection"
            headline="Rooted in nature. Refined by science."
          />
          <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} square />
              </Reveal>
            ))}
          </div>
          <div className="mt-kb-8">
            <GoldCTA href="/shop/all">View all products →</GoldCTA>
          </div>
        </div>
      </section>

      {/* 6. The circular process */}
      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <SectionHeader
            label="Our Circular Commitment"
            headline="Waste transformed into luxury."
            align="center"
            labelColor="cacao"
            italic={false}
          />
          <div className="mt-kb-12 grid grid-cols-1 gap-kb-8 md:grid-cols-3">
            {PROCESS.map((step, i) => (
              <Reveal key={step.name} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center">
                    <BotanicalIllustration
                      name={step.botanical}
                      size={88}
                      opacity={0.6}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[22px] font-semibold text-kb-cacao">
                    {step.name}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <HairlineRule width="40%" variant="gold" center className="mt-kb-12" />
          <div className="mt-8 text-center">
            <GoldCTA href="/story/circular-process">Read the full story →</GoldCTA>
          </div>
        </div>
      </section>

      {/* 7. Community sourcing */}
      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <div className="relative mx-auto grid max-w-kb-max grid-cols-1 gap-kb-12 px-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <HairlineRule width="40%" variant="gold" />
            <blockquote className="mt-6 kb-accent text-[clamp(22px,3vw,28px)] leading-[1.4] text-kb-parchment">
              We buy at the cooperative, in cash, at a price the women set. It is
              the least a brand can do.
            </blockquote>
            <p className="mt-6 kb-label text-[13px] text-kb-kola">
              On sourcing — Kernels &amp; Bloom
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px md:col-span-3">
            {[
              { number: "20+", label: "Communities" },
              { number: "50+", label: "Botanicals" },
              { number: "Ghana", label: "Rooted" },
              { number: "Zero", label: "Waste Vision" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-[0.5px] border-kb-gold/40 bg-kb-cacao/20 p-8 text-center"
              >
                <p className="font-display text-[clamp(32px,4vw,44px)] font-light italic text-kb-parchment">
                  {stat.number}
                </p>
                <p className="mt-2 kb-label text-[12px] text-kb-parchment/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto mt-kb-8 max-w-kb-max px-6">
          <GoldCTA href="/story/communities" tone="parchment">
            Meet our community partners →
          </GoldCTA>
        </div>
      </section>

      {/* 8. Skin Ritual / quiz CTA */}
      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        <CornerBrackets arm={60} inset={32} />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="kb-label text-kb-terracotta">Personalised Ritual</p>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
            Botanicals chosen for you, specifically.
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
            A short ritual quiz reads your skin and hair, then builds a routine
            from the botanicals that suit them. No two skins are generic.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <KBButton href="/skin-ritual/quiz">Take the skin quiz</KBButton>
            <GoldCTA href="/skin-ritual/consultation">
              Book a consultation →
            </GoldCTA>
          </div>
        </div>
      </section>

      {/* 9. Journal preview */}
      <section className="bg-kb-parchment py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <SectionHeader label="The Journal" headline="Field notes and ingredient lives." />
          <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 md:grid-cols-[35fr_35fr_30fr]">
            {articles[0] && (
              <ArticleCard article={articles[0]} variant="featured" />
            )}
            {articles[1] && (
              <ArticleCard article={articles[1]} variant="medium" />
            )}
            {articles[2] && (
              <ArticleCard article={articles[2]} variant="small" />
            )}
          </div>
          <div className="mt-kb-8">
            <GoldCTA href="/journal">Read the journal →</GoldCTA>
          </div>
        </div>
      </section>

      {/* 10. Trade / B2B banner */}
      <section className="bg-kb-cacao py-kb-12">
        <div className="mx-auto grid max-w-kb-max grid-cols-1 items-center gap-kb-8 px-6 md:grid-cols-2 md:divide-x md:divide-kb-gold/40">
          <h2 className="font-display text-[clamp(28px,4vw,36px)] font-light italic text-kb-parchment">
            Partner with a brand the world is watching.
          </h2>
          <div className="md:pl-kb-8">
            <p className="max-w-[360px] font-body text-[15px] font-light leading-relaxed text-kb-parchment/80">
              Hospitality, spa and retail partners — a sustainability story, a
              six-category range, and custom formulation built in Ghana.
            </p>
            <div className="mt-6">
              <GoldCTA href="/trade" tone="parchment">
                Explore wholesale →
              </GoldCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer is global (layout). */}
      <noscript>
        <Link href="/shop/all">Browse the full collection</Link>
      </noscript>
    </>
  );
}
