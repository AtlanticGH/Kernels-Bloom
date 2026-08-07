import type { Metadata } from "next";
import { GoldCTA } from "@/components/gold-cta";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsBlock("page.contact");
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const [page, global] = await Promise.all([
    getCmsBlock("page.contact"),
    getCmsBlock("site.global"),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        label={page.label}
        headline={page.headline}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-kb-12 md:grid-cols-2">
            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">{page.careLabel}</p>
              <p className="mt-3 font-body text-[16px] font-light leading-[1.8] text-kb-dusk/80">
                {page.careIntro}
              </p>
              <a
                href={`mailto:${global.careEmail}`}
                className="mt-4 inline-block font-display text-[22px] font-normal italic text-kb-cacao hover:text-kb-terracotta"
              >
                {global.careEmail}
              </a>
            </div>

            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">{page.tradeLabel}</p>
              <p className="mt-3 font-body text-[16px] font-light leading-[1.8] text-kb-dusk/80">
                {page.tradeIntro}
              </p>
              <a
                href={`mailto:${global.tradeEmail}`}
                className="mt-4 inline-block font-display text-[22px] font-normal italic text-kb-cacao hover:text-kb-terracotta"
              >
                {global.tradeEmail}
              </a>
              <div className="mt-4">
                <GoldCTA href={page.tradeCtaHref}>{page.tradeCtaLabel}</GoldCTA>
              </div>
            </div>
          </div>

          <div className="mt-kb-16 border-t-[0.5px] border-kb-chalk pt-8">
            <p className="kb-label text-[10px] text-kb-dusk/50">{page.studioLabel}</p>
            <p className="mt-2 font-body text-[15px] font-light text-kb-dusk/80">
              {global.studioLocation}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
