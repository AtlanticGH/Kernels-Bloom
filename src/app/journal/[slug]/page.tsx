import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, resolveProducts } from "@/lib/data";
import { HairlineRule } from "@/components/hairline-rule";
import { JournalStoryProducts } from "@/components/journal-story-products";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero, PageShell } from "@/components/page-hero";

type Params = { slug: string };

const CATEGORY_LABEL: Record<string, string> = {
  "ingredient-story": "Ingredient Story",
  "sourcing-journey": "Sourcing Journey",
  "ritual-guide": "Ritual Guide",
  sustainability: "Sustainability",
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
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

export default async function ArticlePage({ params }: { params: Params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = await resolveProducts(article.relatedProducts);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: article.title, href: `/journal/${article.slug}` },
  ];

  return (
    <PageShell>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        breadcrumbs={crumbs}
        label={`${CATEGORY_LABEL[article.category]} · ${article.readTime} min read`}
        headline={article.title}
        intro={article.excerpt}
      />

      <article className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-[720px] px-6">
          <div className="relative mb-kb-8 aspect-[16/9] overflow-hidden bg-kb-chalk">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 720px) 100vw, 720px"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 font-body text-[17px] font-light leading-[1.9] text-kb-dusk/85">
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

      <JournalStoryProducts products={related} />
    </PageShell>
  );
}
