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
import { CurrencyToggle } from "@/components/currency-toggle";
import { HeroHeadline } from "@/components/hero-headline";
import { BrandMarquee } from "@/components/brand-marquee";
import { parseBotanicalName } from "@/lib/cms/botanical";
import { getCmsBlock } from "@/lib/cms/content";
import { getFeaturedProducts, getAllArticles } from "@/lib/data";

export default async function HomePage() {
  const [
    featured,
    articles,
    hero,
    stats,
    spotlight,
    collection,
    circular,
    community,
    ritual,
    journal,
    tradeBanner,
  ] = await Promise.all([
    getFeaturedProducts(4),
    getAllArticles(),
    getCmsBlock("home.hero"),
    getCmsBlock("home.stats"),
    getCmsBlock("home.ingredient-spotlight"),
    getCmsBlock("home.collection"),
    getCmsBlock("home.circular"),
    getCmsBlock("home.community"),
    getCmsBlock("home.ritual-cta"),
    getCmsBlock("home.journal"),
    getCmsBlock("home.trade-banner"),
  ]);
  const articlePreview = articles.slice(0, 3);

  const spotlightBotanical = parseBotanicalName(
    spotlight.illustrationBotanical,
    "Palm"
  );

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-kb-kola">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-kb-kola/95" />
        <GrainOverlay opacity={0.08} className="z-[1]" />
        <CornerBrackets arm={80} inset={40} className="z-[1]" />
        <div className="relative z-10 mx-auto w-full max-w-kb-max px-6 sm:px-kb-12">
          <div className="max-w-[820px]">
            <p className="kb-label text-kb-terracotta">{hero.eyebrow}</p>
            <HeroHeadline tone="light" className="mt-5">
              {hero.headlineLine1}
              <br />
              {hero.headlineLine2}
            </HeroHeadline>
            <HairlineRule width="80px" variant="gold" className="mt-6" />
            <p className="mt-6 max-w-[480px] font-body text-body-lg font-light text-kb-dusk/70">
              {hero.subcopy}
            </p>
            <div className="mt-10 flex flex-col gap-4">
              <GoldCTA href={hero.ctaPrimaryHref}>{hero.ctaPrimary}</GoldCTA>
              <GoldCTA href={hero.ctaSecondaryHref} tone="dusk">
                {hero.ctaSecondary}
              </GoldCTA>
            </div>
          </div>
        </div>
      </section>

      <section className="kb-home-band relative overflow-hidden bg-kb-dusk">
        <GrainOverlay opacity={0.04} />
        <div className="relative mx-auto grid max-w-kb-max grid-cols-2 gap-y-6 px-6 md:grid-cols-4">
          {stats.items.map((stat, i) => (
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

      <section className="overflow-hidden bg-kb-parchment">
        <div className="grid w-full grid-cols-1 items-stretch md:grid-cols-2">
          <div className="relative min-h-[400px] bg-kb-chalk md:min-h-[600px]">
            <Image
              src={spotlight.image}
              alt={`${spotlight.commonName} — botanical ingredient story`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-kb-cacao/20" />
            <GrainOverlay opacity={0.06} />
          </div>
          <div className="relative flex flex-col justify-center bg-kb-gold px-6 py-kb-12 md:pl-kb-12 md:pr-[max(1.5rem,calc(50vw_-_744px))]">
            <BotanicalIllustration
              name={spotlightBotanical}
              size={280}
              opacity={0.4}
              color="var(--kb-cacao)"
              className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2"
            />
            <div className="relative">
              <p className="kb-label text-[12px] text-kb-dusk/60">
                {spotlight.sectionLabel}
              </p>
              <h2 className="mt-3 font-display text-[clamp(40px,6vw,52px)] font-light italic text-kb-dusk">
                {spotlight.commonName}
              </h2>
              <p className="mt-1 font-body text-[13px] font-light text-kb-dusk/70">
                {spotlight.latinName}
              </p>
              <p className="mt-6 max-w-[400px] font-body text-[16px] font-light leading-[1.85] text-kb-dusk">
                {spotlight.body}
              </p>
              <p className="mt-4 kb-accent text-[18px] text-kb-cacao">
                &ldquo;{spotlight.pullQuote}&rdquo;
              </p>
              <div className="mt-8">
                <GoldCTA href={spotlight.ctaHref} tone="dusk">
                  {spotlight.ctaLabel}
                </GoldCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="bg-kb-parchment pt-kb-16 pb-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              label={collection.sectionLabel}
              headline={collection.headline}
            />
            <CurrencyToggle />
          </div>
          <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} square />
              </Reveal>
            ))}
          </div>
          <div className="mt-kb-8">
            <GoldCTA href={collection.ctaHref}>{collection.ctaLabel}</GoldCTA>
          </div>
        </div>
      </section>

      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <SectionHeader
            label={circular.sectionLabel}
            headline={circular.headline}
            align="center"
            labelColor="cacao"
            italic={false}
          />
          <div className="mt-kb-12 grid grid-cols-1 gap-kb-8 md:grid-cols-3">
            {circular.steps.map((step, i) => (
              <Reveal key={step.name} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center">
                    <BotanicalIllustration
                      name={parseBotanicalName(step.botanical, "Baobab")}
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
            <GoldCTA href={circular.ctaHref}>{circular.ctaLabel}</GoldCTA>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <div className="relative mx-auto grid max-w-kb-max grid-cols-1 gap-kb-12 px-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <HairlineRule width="40%" variant="gold" />
            <blockquote className="mt-6 kb-accent text-[clamp(22px,3vw,28px)] leading-[1.4] text-kb-parchment">
              {community.quote}
            </blockquote>
            <p className="mt-6 kb-label text-[13px] text-kb-kola">
              {community.attribution}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px md:col-span-3">
            {community.stats.map((stat) => (
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
          <GoldCTA href={community.ctaHref} tone="parchment">
            {community.ctaLabel}
          </GoldCTA>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        <CornerBrackets arm={60} inset={32} />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="kb-label text-kb-terracotta">{ritual.label}</p>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
            {ritual.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
            {ritual.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <KBButton href={ritual.quizHref}>{ritual.quizCta}</KBButton>
            <GoldCTA href={ritual.consultHref}>{ritual.consultCta}</GoldCTA>
          </div>
        </div>
      </section>

      <section className="bg-kb-parchment py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <SectionHeader
            label={journal.sectionLabel}
            headline={journal.headline}
          />
          <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 md:grid-cols-[35fr_35fr_30fr]">
            {articlePreview[0] && (
              <ArticleCard article={articlePreview[0]} variant="featured" />
            )}
            {articlePreview[1] && (
              <ArticleCard article={articlePreview[1]} variant="medium" />
            )}
            {articlePreview[2] && (
              <ArticleCard article={articlePreview[2]} variant="small" />
            )}
          </div>
          <div className="mt-kb-8">
            <GoldCTA href={journal.ctaHref}>{journal.ctaLabel}</GoldCTA>
          </div>
        </div>
      </section>

      <section className="bg-kb-cacao py-kb-12">
        <div className="mx-auto grid max-w-kb-max grid-cols-1 items-center gap-kb-8 px-6 md:grid-cols-2 md:divide-x md:divide-kb-gold/40">
          <h2 className="font-display text-[clamp(28px,4vw,36px)] font-light italic text-kb-parchment">
            {tradeBanner.headline}
          </h2>
          <div className="md:pl-kb-8">
            <p className="max-w-[360px] font-body text-[15px] font-light leading-relaxed text-kb-parchment/80">
              {tradeBanner.body}
            </p>
            <div className="mt-6">
              <GoldCTA href={tradeBanner.ctaHref} tone="parchment">
                {tradeBanner.ctaLabel}
              </GoldCTA>
            </div>
          </div>
        </div>
      </section>

      <noscript>
        <Link href="/shop/all">Browse the full collection</Link>
      </noscript>
    </>
  );
}
