import type { Metadata } from "next";
import { GrainOverlay } from "@/components/grain-overlay";
import { HairlineRule } from "@/components/hairline-rule";
import { GoldCTA } from "@/components/gold-cta";
import { PageHero, PageShell } from "@/components/page-hero";
import { TradeForm } from "@/components/trade-form";

export const metadata: Metadata = {
  title: "Trade & Wholesale",
  description:
    "A brand built for those who care about what's on the shelf — wholesale and custom formulation for hospitality, spa and retail partners.",
  alternates: { canonical: "/trade" },
};

const PROOF = [
  { title: "Science-driven formulations", body: "Evidence-led, small-batch, made in Ghana." },
  { title: "A sustainability story worth telling", body: "Zero-waste target and upcycled ingredients your guests will ask about." },
  { title: "Heritage credentials", body: "Ghanaian-owned, with 20+ community partnerships." },
  { title: "A multi-category range", body: "Six product categories, from facial to body to circular." },
  { title: "Custom formulation", body: "Bespoke blends and formats for hospitality clients." },
];

const TIERS = [
  { category: "Body & Bath", moq: "24 units", tier: "Wholesale 50%" },
  { category: "Skin & Facial", moq: "18 units", tier: "Wholesale 50%" },
  { category: "Amenities (custom)", moq: "250 units", tier: "On enquiry" },
];

export default function TradePage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trade", href: "/trade" },
        ]}
        label="Trade & Wholesale"
      />

      {/* why */}
      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <div className="relative mx-auto max-w-kb-max px-6">
          <p className="kb-label text-[11px] text-kb-gold">Why Kernels &amp; Bloom</p>
          <HairlineRule width="100%" variant="gold" className="mt-4" />
          <ul className="mt-kb-8 grid grid-cols-1 gap-kb-8 md:grid-cols-2 lg:grid-cols-3">
            {PROOF.map((p) => (
              <li key={p.title}>
                <h2 className="font-display text-[22px] font-normal italic text-kb-parchment">
                  {p.title}
                </h2>
                <p className="mt-2 font-body text-[14px] font-light leading-[1.7] text-kb-parchment/70">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* pricing */}
      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto max-w-kb-content px-6">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-light italic text-kb-cacao">
            Minimum order &amp; pricing
          </h2>
          <table className="mt-kb-8 w-full text-left">
            <thead>
              <tr className="border-b-[0.5px] border-kb-chalk">
                {["Category", "MOQ", "Tier"].map((h) => (
                  <th key={h} className="py-3 kb-label text-[10px] text-kb-terracotta">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIERS.map((row) => (
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
            <GoldCTA href="/wholesale-catalogue.pdf">
              Download the wholesale catalogue (PDF) →
            </GoldCTA>
          </div>
        </div>
      </section>

      {/* application */}
      <section className="relative overflow-hidden bg-kb-gold py-kb-16">
        <GrainOverlay opacity={0.06} />
        <div className="relative mx-auto max-w-kb-content px-6">
          <p className="kb-label text-kb-dusk">Partner Application</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,40px)] font-semibold not-italic text-kb-dusk">
            Apply to stock K&amp;B
          </h2>
          <HairlineRule width="80px" variant="terracotta" className="mt-6" />
          <p className="mt-6 max-w-lg font-body text-body font-light text-kb-dusk/80">
            Tell us about your business. We review every application personally.
          </p>
          <div className="mt-kb-8">
            <TradeForm tone="dusk" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
