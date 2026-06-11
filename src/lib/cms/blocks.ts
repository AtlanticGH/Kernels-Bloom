export type {
  CmsBlockId,
  CmsBlockMap,
  HomeHeroContent,
  HomeIngredientSpotlight,
  SiteSocialContent,
} from "./types";

export { CMS_BLOCK_DEFAULTS } from "./defaults";

export const CMS_BLOCK_META: Record<
  import("./types").CmsBlockId,
  { label: string; description: string }
> = {
  "site.social": {
    label: "Social links",
    description: "Footer social profile URLs.",
  },
  "site.global": {
    label: "Site-wide copy",
    description: "Footer tagline, contact emails, studio location, and newsletter label.",
  },
  "home.hero": {
    label: "Homepage hero",
    description: "Headline, eyebrow, subcopy, background image, and CTAs.",
  },
  "home.stats": {
    label: "Homepage statistics",
    description: "Four statistics shown below the hero.",
  },
  "home.ingredient-spotlight": {
    label: "Ingredient story",
    description: "Featured botanical block on the homepage.",
  },
  "home.collection": {
    label: "Featured collection",
    description: "Product grid section header and CTA.",
  },
  "home.circular": {
    label: "Circular process (home)",
    description: "Three-step circular commitment section on the homepage.",
  },
  "home.community": {
    label: "Community sourcing (home)",
    description: "Quote, stats, and CTA on the homepage.",
  },
  "home.ritual-cta": {
    label: "Skin ritual CTA (home)",
    description: "Quiz and consultation call-to-action on the homepage.",
  },
  "home.journal": {
    label: "Journal preview (home)",
    description: "Journal section header and CTA on the homepage.",
  },
  "home.trade-banner": {
    label: "Trade banner (home)",
    description: "B2B wholesale banner at the bottom of the homepage.",
  },
  "page.shop": {
    label: "Shop page",
    description: "Shop landing hero, SEO, and browse CTA.",
  },
  "page.botanicals": {
    label: "Botanicals page",
    description: "Botanicals index hero and SEO.",
  },
  "page.journal": {
    label: "Journal page",
    description: "Journal index hero, SEO, and weekly label.",
  },
  "page.skin-ritual": {
    label: "Skin ritual page",
    description: "Skin ritual landing hero, paths, and SEO.",
  },
  "page.contact": {
    label: "Contact page",
    description: "Contact hero, emails, studio, and SEO.",
  },
  "page.trade": {
    label: "Trade page",
    description: "Trade hero, proof points, pricing table, and application copy.",
  },
  "page.press": {
    label: "Press page",
    description: "Press hero, awards, quotes, and SEO.",
  },
  "story.index": {
    label: "Our Story index",
    description: "Story hub hero and chapter list.",
  },
  "story.brand": {
    label: "Brand story",
    description: "Brand story page hero, body copy, pillars, and closing quote.",
  },
  "story.facility": {
    label: "The facility",
    description: "Facility page hero, image, and body paragraphs.",
  },
  "story.circular": {
    label: "Circular process",
    description: "Circular process page hero, diagram stages, and accordion.",
  },
  "story.communities": {
    label: "Community partners",
    description: "Communities page hero and intro.",
  },
  "story.founder": {
    label: "Founder",
    description: "Founder page hero, bio, portrait, quote, and video.",
  },
  "page.cart": {
    label: "Cart page",
    description: "Cart page hero and SEO.",
  },
  "page.quiz": {
    label: "Skin quiz",
    description: "Quiz page hero, all questions, answer options, and results screen copy.",
  },
  "page.consultation": {
    label: "Consultation page",
    description: "Consultation booking page hero and SEO.",
  },
  "page.results": {
    label: "Quiz results",
    description: "Saved results page hero, empty state, and saved ritual headings.",
  },
  "page.not-found": {
    label: "404 page",
    description: "Not-found page copy and CTAs.",
  },
  "catalog.products": {
    label: "Product tile images",
    description: "Photos for each product card across the shop and homepage grids.",
  },
  "catalog.ingredients": {
    label: "Botanical tile images",
    description: "Photos for each botanical on the index grid — upload and preview per ingredient.",
  },
  "catalog.articles": {
    label: "Journal posts",
    description: "Add and edit journal articles — title, body, cover image, and related products.",
  },
  "catalog.categories": {
    label: "Shop category tile images",
    description: "Photos for each collection tile on the shop landing page.",
  },
  "catalog.communities": {
    label: "Community partners",
    description: "Sourcing communities for the map and ingredient pages.",
  },
};

export type CmsNavGroup =
  | "Site"
  | "Homepage"
  | "Shop"
  | "Botanicals"
  | "Journal"
  | "Skin ritual"
  | "Our story"
  | "Company"
  | "Utility";

export const CMS_NAV_GROUP_ORDER: CmsNavGroup[] = [
  "Site",
  "Homepage",
  "Shop",
  "Botanicals",
  "Journal",
  "Skin ritual",
  "Our story",
  "Company",
  "Utility",
];

export type CmsBlockKind = "copy" | "images" | "quiz" | "catalog" | "journal";

export function getCmsBlockKind(
  id: import("./types").CmsBlockId
): CmsBlockKind {
  if (id === "catalog.articles") return "journal";
  if (id === "page.quiz") return "quiz";
  if (
    id === "catalog.products" ||
    id === "catalog.categories" ||
    id === "catalog.ingredients"
  ) {
    return "images";
  }
  if (id.startsWith("catalog.")) return "catalog";
  return "copy";
}

/** Page-by-page CMS navigation — one row per live site page. */
export const CMS_PAGE_NAV: {
  label: string;
  path?: string;
  group: CmsNavGroup;
  ids: import("./types").CmsBlockId[];
}[] = [
  {
    label: "Site-wide",
    group: "Site",
    ids: ["site.social", "site.global"],
  },
  {
    label: "Homepage",
    group: "Homepage",
    path: "/",
    ids: [
      "home.hero",
      "home.stats",
      "home.ingredient-spotlight",
      "home.collection",
      "home.circular",
      "home.community",
      "home.ritual-cta",
      "home.journal",
      "home.trade-banner",
    ],
  },
  {
    label: "Shop",
    group: "Shop",
    path: "/shop",
    ids: ["page.shop", "catalog.products", "catalog.categories"],
  },
  {
    label: "Botanicals",
    group: "Botanicals",
    path: "/botanicals",
    ids: ["page.botanicals", "catalog.ingredients"],
  },
  {
    label: "Journal",
    group: "Journal",
    path: "/journal",
    ids: ["page.journal", "catalog.articles"],
  },
  {
    label: "Skin Ritual",
    group: "Skin ritual",
    path: "/skin-ritual",
    ids: [
      "page.skin-ritual",
      "page.quiz",
      "page.consultation",
      "page.results",
    ],
  },
  {
    label: "Cart",
    group: "Utility",
    path: "/cart",
    ids: ["page.cart"],
  },
  {
    label: "Trade",
    group: "Company",
    path: "/trade",
    ids: ["page.trade"],
  },
  {
    label: "Press",
    group: "Company",
    path: "/press",
    ids: ["page.press"],
  },
  {
    label: "Contact",
    group: "Company",
    path: "/contact",
    ids: ["page.contact"],
  },
  {
    label: "Our Story",
    group: "Our story",
    path: "/story",
    ids: [
      "story.index",
      "story.brand",
      "story.facility",
      "story.circular",
      "story.communities",
      "story.founder",
      "catalog.communities",
    ],
  },
  {
    label: "404 page",
    group: "Utility",
    ids: ["page.not-found"],
  },
];

/** @deprecated Use CMS_PAGE_NAV */
export const CMS_BLOCK_GROUPS = CMS_PAGE_NAV.map((page) => ({
  label: page.label,
  ids: page.ids,
}));

/** Structured list fields — hidden from the CMS UI (not raw JSON editing). */
export const CMS_JSON_FIELDS = new Set([
  "items",
  "steps",
  "stats",
  "paths",
  "proof",
  "tiers",
  "awards",
  "press",
  "chapters",
  "pillars",
  "paragraphs",
  "accordion",
  "diagramStages",
]);

export const CMS_IMAGE_FIELDS = new Set([
  "backgroundImage",
  "image",
  "portraitImage",
  "videoPoster",
]);
