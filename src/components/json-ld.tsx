import { SITE } from "@/lib/site";
import type { Article, Product } from "@/lib/types";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        slogan: SITE.tagline,
        foundingLocation: { "@type": "Place", name: "Ghana" },
        sameAs: [
          SITE.social.facebook,
          SITE.social.instagram,
          SITE.social.youtube,
        ],
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.tagline,
        image: `${SITE.url}${product.image}`,
        brand: { "@type": "Brand", name: SITE.name },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          url: `${SITE.url}/shop/${product.category}/${product.slug}`,
        },
      }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: Article }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: `${SITE.url}${article.image}`,
        datePublished: article.publishedAt,
        author: { "@type": "Organization", name: SITE.name },
        publisher: { "@type": "Organization", name: SITE.name },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE.url}${item.href}`,
        })),
      }}
    />
  );
}
