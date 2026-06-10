import { SITE } from "@/lib/site";

export type HomeHeroContent = {
  eyebrow: string;
  subcopy: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

export type HomeIngredientSpotlight = {
  sectionLabel: string;
  commonName: string;
  latinName: string;
  body: string;
  pullQuote: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SiteSocialContent = {
  facebook: string;
  instagram: string;
  youtube: string;
};

export type CmsBlockId =
  | "home.hero"
  | "home.ingredient-spotlight"
  | "site.social";

export type CmsBlockMap = {
  "home.hero": HomeHeroContent;
  "home.ingredient-spotlight": HomeIngredientSpotlight;
  "site.social": SiteSocialContent;
};

export const CMS_BLOCK_DEFAULTS: CmsBlockMap = {
  "home.hero": {
    eyebrow: "Ghanaian Luxury Botanicals",
    subcopy:
      "Science-backed formulations rooted in Africa's richest botanicals. Crafted in Ghana, for skin that remembers where it comes from.",
    ctaPrimary: "Explore the collection →",
    ctaPrimaryHref: "/shop/all",
    ctaSecondary: "Discover our botanicals",
    ctaSecondaryHref: "/botanicals",
  },
  "home.ingredient-spotlight": {
    sectionLabel: "Ingredient Story",
    commonName: "Palm",
    latinName: "Elaeis guineensis",
    body:
      "The oil palm has shaded West African forest edges for millennia — its fruit pressed for a rich, golden oil that carries vitamins A and E deep into the skin. Our partners harvest at peak ripeness and cold-press within hours, keeping the oil bright and the forest standing.",
    pullQuote: "Pressed at peak ripeness, to keep the oil bright.",
    image: "/images/beth-macdonald-QiGt-xFWkLU-unsplash.jpg",
    ctaLabel: "Read the full palm story →",
    ctaHref: "/botanicals/palm",
  },
  "site.social": {
    facebook: SITE.social.facebook,
    instagram: SITE.social.instagram,
    youtube: SITE.social.youtube,
  },
};

export const CMS_BLOCK_META: Record<
  CmsBlockId,
  { label: string; description: string }
> = {
  "home.hero": {
    label: "Homepage hero",
    description: "Eyebrow, subcopy, and call-to-action links above the fold.",
  },
  "home.ingredient-spotlight": {
    label: "Ingredient story",
    description: "Featured botanical block on the homepage.",
  },
  "site.social": {
    label: "Social links",
    description: "Footer social profile URLs.",
  },
};
