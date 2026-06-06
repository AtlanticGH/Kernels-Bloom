import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, resolveProducts } from "@/lib/data";
import { HairlineRule } from "@/components/hairline-rule";
import { CornerBrackets } from "@/components/corner-brackets";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

type Params = { slug: string };

const CATEGORY_LABEL: Record<string, string> = {
  "ingredient-story": "Ingredient Story",
  "sourcing-journey": "Sourcing Journey",
  "ritual-guide": "Ritual Guide",
  sustainability: "Sustainability",
};

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt.slice(0, 160),
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630 }],
    },
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = resolveProducts(article.relatedProducts);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: article.title, href: `/journal/${article.slug}` },
  ];

  return (
    <div className="pt-[72px]">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="relative h-[60vh] min-h-[360px] overflow-hidden bg-kb-chalk">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <CornerBrackets arm={64} inset={32} />
      </section>

      <article className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-[720px] px-6">
          <Breadcrumbs items={crumbs} />
          <p className="mt-6 kb-label text-[10px] text-kb-terracotta">
            {CATEGORY_LABEL[article.category]} · {article.readTime} min read
          </p>
          <h1 className="mt-3 font-display text-[clamp(32px,5vw,52px)] font-light italic leading-[1.1] text-kb-cacao">
            {article.title}
          </h1>
          <HairlineRule width="80px" variant="gold" className="mt-6" />

          <div className="mt-kb-8 space-y-5 font-body text-[17px] font-light leading-[1.9] text-kb-dusk/85">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {article.pullQuote && (
            <figure className="my-kb-12">
              <HairlineRule width="40px" variant="terracotta" />
              <blockquote className="mt-4 kb-accent text-[clamp(22px,3vw,32px)] leading-snug text-kb-terracotta">
                {article.pullQuote}
              </blockquote>
            </figure>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-kb-linen py-kb-12">
          <div className="mx-auto max-w-kb-max px-6">
            <h2 className="font-display text-[28px] font-light italic text-kb-cacao">
              From this story
            </h2>
            <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
