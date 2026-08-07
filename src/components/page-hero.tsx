import { GrainOverlay } from "@/components/grain-overlay";
import { HairlineRule } from "@/components/hairline-rule";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { HeroHeadline } from "@/components/hero-headline";

export type PageHeroProps = {
  breadcrumbs: Crumb[];
  label: string;
  headline: string;
  intro?: string;
  children?: React.ReactNode;
  /** Optional overrides for the outer section (e.g. tighter bottom when stacked on another band). */
  className?: string;
};

/** Standard cacao page header — breadcrumbs, gold label, page headline, rule. */
export function PageHero({
  breadcrumbs,
  label,
  headline,
  intro,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-kb-cacao pb-kb-16 pt-[var(--header-height)] ${className}`}
    >
      <GrainOverlay opacity={0.05} />
      <div className="relative z-10 mx-auto max-w-kb-max px-6 pt-kb-12">
        <Breadcrumbs tone="dark" items={breadcrumbs} />
        <p className="mt-6 kb-label text-kb-gold">{label}</p>
        <HeroHeadline className="mt-3 max-w-3xl">{headline}</HeroHeadline>
        <HairlineRule width="80px" variant="gold" className="mt-6" />
        {intro && (
          <p className="mt-6 max-w-xl font-body text-body-lg font-light text-kb-parchment/80">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Wraps inner pages; hero bands handle header offset so no top padding is needed. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
