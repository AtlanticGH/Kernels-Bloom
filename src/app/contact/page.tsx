import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { GoldCTA } from "@/components/gold-cta";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Customer care and B2B enquiries for Kernels & Bloom, Ghana.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-[88px]">
      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
          <div className="mt-6">
            <SectionHeader label="Get in touch" headline="We'd love to hear from you." />
          </div>

          <div className="mt-kb-12 grid grid-cols-1 gap-kb-12 md:grid-cols-2">
            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">Customer Care</p>
              <p className="mt-3 font-body text-[16px] font-light leading-[1.8] text-kb-dusk/80">
                Questions about an order, a product or your ritual.
              </p>
              <a
                href="mailto:care@kernelsandbloom.com"
                className="mt-4 inline-block font-display text-[22px] font-normal italic text-kb-cacao hover:text-kb-terracotta"
              >
                care@kernelsandbloom.com
              </a>
            </div>

            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">B2B Enquiries</p>
              <p className="mt-3 font-body text-[16px] font-light leading-[1.8] text-kb-dusk/80">
                Wholesale, hospitality and custom formulation.
              </p>
              <a
                href="mailto:trade@kernelsandbloom.com"
                className="mt-4 inline-block font-display text-[22px] font-normal italic text-kb-cacao hover:text-kb-terracotta"
              >
                trade@kernelsandbloom.com
              </a>
              <div className="mt-4">
                <GoldCTA href="/trade">Visit the trade page →</GoldCTA>
              </div>
            </div>
          </div>

          <div className="mt-kb-16 border-t-[0.5px] border-kb-chalk pt-8">
            <p className="kb-label text-[10px] text-kb-dusk/50">Studio</p>
            <p className="mt-2 font-body text-[15px] font-light text-kb-dusk/80">
              Accra, Ghana · Worldwide shipping
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
