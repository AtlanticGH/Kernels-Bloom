import Link from "next/link";
import { getCmsBlock } from "@/lib/cms/content";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { GrainOverlay } from "./grain-overlay";
import { HairlineRule } from "./hairline-rule";
import { NewsletterForm } from "./newsletter-form";
import { SocialLinks } from "./social-links";

export async function KBFooter() {
  const social = await getCmsBlock("site.social");
  return (
    <footer className="relative overflow-hidden bg-kb-dusk text-kb-parchment">
      <GrainOverlay opacity={0.03} />
      <div className="relative mx-auto max-w-kb-max px-6 py-kb-8">
        <Link
          href="/"
          className="font-display text-[20px] font-normal text-kb-parchment"
        >
          Kernels &amp; Bloom
        </Link>
        <HairlineRule width="100%" variant="gold" className="mt-6" />

        <div className="mt-kb-6 grid gap-kb-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="kb-accent max-w-sm text-[18px] text-kb-parchment/70">
              {SITE.tagline} Science-backed botanicals, crafted in Ghana and
              returned to the circle.
            </p>
            <SocialLinks className="mt-5" links={social} />
            <div className="mt-6 max-w-sm">
              <p className="kb-label text-[11px] text-kb-gold">The Journal, by post</p>
              <NewsletterForm className="mt-3" />
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="kb-label text-[11px] text-kb-gold">{col.heading}</p>
              <ul className="mt-2 space-y-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-[13px] font-light leading-tight text-kb-parchment/60 transition-colors hover:text-kb-parchment"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <HairlineRule width="100%" variant="gold" className="mt-kb-6" />
        <p className="mt-4 font-body text-[11px] font-light text-kb-parchment/40">
          © {new Date().getFullYear()} Kernels &amp; Bloom, Ghana · Made with purpose
        </p>
      </div>
    </footer>
  );
}
