import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";

const CATEGORY_LABEL: Record<Article["category"], string> = {
  "ingredient-story": "Ingredient Story",
  "sourcing-journey": "Sourcing Journey",
  "ritual-guide": "Ritual Guide",
  sustainability: "Sustainability",
};

type Variant = "featured" | "medium" | "small";

const RATIO: Record<Variant, string> = {
  featured: "aspect-[2/3]",
  medium: "aspect-[3/4]",
  small: "aspect-[4/5]",
};

/** Journal article preview in three editorial size variants. */
export function ArticleCard({
  article,
  variant = "medium",
  imageAspect,
}: {
  article: Article;
  variant?: Variant;
  /** Override the default aspect ratio for this variant (e.g. journal lead). */
  imageAspect?: string;
}) {
  const aspect = imageAspect ?? RATIO[variant];

  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className={`relative ${aspect} overflow-hidden bg-kb-chalk`}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-4 kb-label text-[10px] text-kb-terracotta">
        {CATEGORY_LABEL[article.category]}
      </p>
      <h3
        className={`mt-1 font-display font-normal italic text-kb-cacao ${
          variant === "featured" ? "text-[28px]" : "text-[22px]"
        } leading-tight`}
      >
        {article.title}
      </h3>
      {variant !== "small" && (
        <p className="mt-2 font-body text-[15px] font-light leading-relaxed text-kb-dusk/80">
          {article.excerpt}
        </p>
      )}
      <p className="mt-3 kb-label text-[10px] text-kb-dusk/50">
        {article.readTime} min read
      </p>
    </Link>
  );
}
