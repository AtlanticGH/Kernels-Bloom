import { getCmsBlock } from "@/lib/cms/content";
import { KBButton } from "@/components/kb-button";
import { GoldCTA } from "@/components/gold-cta";
import { PageHero, PageShell } from "@/components/page-hero";

export default async function NotFound() {
  const content = await getCmsBlock("page.not-found");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ name: "Home", href: "/" }]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <KBButton href={content.ctaPrimaryHref}>{content.ctaPrimary}</KBButton>
          <GoldCTA href={content.ctaSecondaryHref} tone="parchment">
            {content.ctaSecondary}
          </GoldCTA>
        </div>
      </PageHero>
    </PageShell>
  );
}
