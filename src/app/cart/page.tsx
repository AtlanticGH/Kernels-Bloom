import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { CartView } from "@/components/cart-view";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Kernels & Bloom ritual.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Cart", href: "/cart" },
        ]}
        label="Your ritual"
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CartView products={getAllProducts()} />
        </div>
      </section>
    </PageShell>
  );
}
