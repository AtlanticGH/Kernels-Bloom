import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { CartView } from "@/components/cart-view";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Kernels & Bloom ritual.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-kb-max px-6 py-kb-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Cart", href: "/cart" },
          ]}
        />
        <h1 className="mt-6 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
          Your ritual
        </h1>
        <div className="mt-kb-12">
          <CartView products={getAllProducts()} />
        </div>
      </section>
    </div>
  );
}
