import type { Metadata } from "next";
import { GrainOverlay } from "@/components/grain-overlay";
import { HairlineRule } from "@/components/hairline-rule";
import { GoldCTA } from "@/components/gold-cta";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";
import { TradeForm } from "@/components/trade-form";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.trade");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/trade" },
  };
}

export default async function TradePage() {
  const content = await getCmsBlock("page.trade");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trade", href: "/trade" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <div className="relative mx-auto max-w-kb-max px-6">
          <p className="kb-label text-[11px] text-kb-gold">{content.whyLabel}</p>
          <HairlineRule width="100%" variant="gold" className="mt-4" />
          <ul className="mt-kb-8 grid grid-cols-1 gap-kb-8 md:grid-cols-2 lg:grid-cols-3">
            {content.proof.map((item) => (
              <li key={item.title}>
                <h2 className="font-display text-[22px] font-normal italic text-kb-parchment">
                  {item.title}
                </h2>
                <p className="mt-2 font-body text-[14px] font-light leading-[1.7] text-kb-parchment/70">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto max-w-kb-content px-6">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-light italic text-kb-cacao">
            {content.pricingHeadline}
          </h2>
          <table className="mt-kb-8 w-full text-left">
            <thead>
              <tr className="border-b-[0.5px] border-kb-chalk">
                {["Category", "MOQ", "Tier"].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 kb-label text-[10px] text-kb-terracotta"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.tiers.map((row) => (
                <tr key={row.category} className="border-b-[0.5px] border-kb-chalk">
                  <td className="py-4 font-body text-[15px] font-light text-kb-dusk">
                    {row.category}
                  </td>
                  <td className="py-4 font-body text-[15px] font-light text-kb-dusk/70">
                    {row.moq}
                  </td>
                  <td className="py-4 font-body text-[15px] font-light text-kb-dusk/70">
                    {row.tier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-kb-8">
            <GoldCTA href={content.catalogueHref}>{content.catalogueLabel}</GoldCTA>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kb-gold py-kb-16">
        <GrainOverlay opacity={0.06} />
        <div className="relative mx-auto max-w-kb-content px-6">
          <p className="kb-label text-kb-dusk">{content.appLabel}</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,40px)] font-semibold not-italic text-kb-dusk">
            {content.appHeadline}
          </h2>
          <HairlineRule width="80px" variant="terracotta" className="mt-6" />
          <p className="mt-6 max-w-lg font-body text-body font-light text-kb-dusk/80">
            {content.appIntro}
          </p>
          <div className="mt-kb-8">
            <TradeForm tone="dusk" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
