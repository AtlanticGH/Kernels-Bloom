import { KBButton } from "@/components/kb-button";
import { GoldCTA } from "@/components/gold-cta";
import { PageHero, PageShell } from "@/components/page-hero";

export default function NotFound() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ name: "Home", href: "/" }]}
        label="404"
        intro="The page you're after isn't here. Let's find your way back to the botanicals."
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <KBButton href="/">Return home</KBButton>
          <GoldCTA href="/shop/all" tone="parchment">
            Browse the collection →
          </GoldCTA>
        </div>
      </PageHero>
    </PageShell>
  );
}
