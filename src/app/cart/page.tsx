import type { Metadata } from "next";
import { getCmsBlock } from "@/lib/cms/content";
import { getAllProducts } from "@/lib/data";
import { CartView } from "@/components/cart-view";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.cart");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/cart" },
    robots: { index: false },
  };
}

export default async function CartPage() {
  const [content, products] = await Promise.all([
    getCmsBlock("page.cart"),
    getAllProducts(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Cart", href: "/cart" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro || undefined}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CartView products={products} />
        </div>
      </section>
    </PageShell>
  );
}
