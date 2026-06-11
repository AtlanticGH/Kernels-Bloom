export type CmsStat = { number: string; label: string };

export type CmsTextItem = { title: string; body: string };

export type CmsChapter = { name: string; href: string; body: string };

export type CmsPillar = { title: string; body: string };

export type CmsAward = { year: string; name: string; body: string };

export type CmsPressQuote = { outlet: string; quote: string };

export type CmsProcessStep = { name: string; body: string; botanical: string };

export type CmsAccordionItem = { label: string; content: string };

export type CmsPath = {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

export type CmsTier = { category: string; moq: string; tier: string };

export type PageHeroFields = {
  metaTitle: string;
  metaDescription: string;
  label: string;
  headline: string;
  intro: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subcopy: string;
  /** Poster and fallback when no background video is set. */
  backgroundImage: string;
  /** Optional looping hero background (MP4/WebM). */
  backgroundVideo: string;
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
  illustrationBotanical: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SiteSocialContent = {
  facebook: string;
  instagram: string;
  youtube: string;
};

export type SiteGlobalContent = {
  footerTagline: string;
  newsletterLabel: string;
  copyright: string;
  careEmail: string;
  tradeEmail: string;
  careIntro: string;
  tradeIntro: string;
  studioLocation: string;
};

export type HomeStatsContent = { items: CmsStat[] };

export type HomeSectionContent = {
  sectionLabel: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeCircularContent = {
  sectionLabel: string;
  headline: string;
  steps: CmsProcessStep[];
  ctaLabel: string;
  ctaHref: string;
};

export type HomeCommunityContent = {
  quote: string;
  attribution: string;
  stats: CmsStat[];
  ctaLabel: string;
  ctaHref: string;
};

export type HomeRitualCtaContent = {
  label: string;
  headline: string;
  body: string;
  quizCta: string;
  quizHref: string;
  consultCta: string;
  consultHref: string;
};

export type HomeTradeBannerContent = {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PageShopContent = PageHeroFields & {
  ctaLabel: string;
  ctaHref: string;
};

export type PageJournalContent = PageHeroFields & {
  weeklyLabel: string;
};

export type PageSkinRitualContent = PageHeroFields & {
  paths: CmsPath[];
};

export type PageContactContent = PageHeroFields & {
  careLabel: string;
  careIntro: string;
  tradeLabel: string;
  tradeIntro: string;
  studioLabel: string;
  tradeCtaLabel: string;
  tradeCtaHref: string;
};

export type PageTradeContent = PageHeroFields & {
  whyLabel: string;
  proof: CmsTextItem[];
  pricingHeadline: string;
  tiers: CmsTier[];
  catalogueLabel: string;
  catalogueHref: string;
  appLabel: string;
  appHeadline: string;
  appIntro: string;
};

export type PagePressContent = PageHeroFields & {
  awardsLabel: string;
  awards: CmsAward[];
  pressLabel: string;
  press: CmsPressQuote[];
  ctaLabel: string;
  ctaHref: string;
};

export type StoryIndexContent = PageHeroFields & {
  chapters: CmsChapter[];
};

export type StoryBrandContent = PageHeroFields & {
  paragraph1: string;
  paragraph2: string;
  pullQuote: string;
  pillars: CmsPillar[];
  closingQuote: string;
};

export type StoryFacilityContent = PageHeroFields & {
  image: string;
  paragraphs: string[];
};

export type StoryCircularContent = PageHeroFields & {
  accordion: CmsAccordionItem[];
  diagramStages: CmsProcessStep[];
};

export type StoryFounderContent = PageHeroFields & {
  founderName: string;
  founderOrigin: string;
  portraitImage: string;
  paragraphs: string[];
  pullQuote: string;
  videoSrc: string;
  videoPoster: string;
};

export type CmsQuizQuestion = {
  id: string;
  stepLabel: string;
  question: string;
  options: string[];
};

export type PageCartContent = PageHeroFields;

export type PageQuizContent = PageHeroFields & {
  questions: CmsQuizQuestion[];
  resultsLabel: string;
  resultsHeadline: string;
  resultsBody: string;
  saveSectionLabel: string;
  emailPlaceholder: string;
  saveButtonLabel: string;
  savedMessage: string;
  consultationCta: string;
  consultationHref: string;
  retakeLabel: string;
};

export type PageConsultationContent = PageHeroFields;

export type PageResultsContent = PageHeroFields & {
  emptyHeadline: string;
  emptyBody: string;
  emptyCta: string;
  savedLabel: string;
  savedHeadline: string;
};

export type PageNotFoundContent = PageHeroFields & {
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

export type CatalogListContent<T> = { items: T[] };

export type CmsBlockId =
  | "site.social"
  | "site.global"
  | "home.hero"
  | "home.stats"
  | "home.ingredient-spotlight"
  | "home.collection"
  | "home.circular"
  | "home.community"
  | "home.ritual-cta"
  | "home.journal"
  | "home.trade-banner"
  | "page.shop"
  | "page.botanicals"
  | "page.journal"
  | "page.skin-ritual"
  | "page.contact"
  | "page.trade"
  | "page.press"
  | "story.index"
  | "story.brand"
  | "story.facility"
  | "story.circular"
  | "story.communities"
  | "story.founder"
  | "page.cart"
  | "page.quiz"
  | "page.consultation"
  | "page.results"
  | "page.not-found"
  | "catalog.products"
  | "catalog.ingredients"
  | "catalog.articles"
  | "catalog.categories"
  | "catalog.communities";

export type CmsBlockMap = {
  "site.social": SiteSocialContent;
  "site.global": SiteGlobalContent;
  "home.hero": HomeHeroContent;
  "home.stats": HomeStatsContent;
  "home.ingredient-spotlight": HomeIngredientSpotlight;
  "home.collection": HomeSectionContent;
  "home.circular": HomeCircularContent;
  "home.community": HomeCommunityContent;
  "home.ritual-cta": HomeRitualCtaContent;
  "home.journal": HomeSectionContent;
  "home.trade-banner": HomeTradeBannerContent;
  "page.shop": PageShopContent;
  "page.botanicals": PageHeroFields;
  "page.journal": PageJournalContent;
  "page.skin-ritual": PageSkinRitualContent;
  "page.contact": PageContactContent;
  "page.trade": PageTradeContent;
  "page.press": PagePressContent;
  "story.index": StoryIndexContent;
  "story.brand": StoryBrandContent;
  "story.facility": StoryFacilityContent;
  "story.circular": StoryCircularContent;
  "story.communities": PageHeroFields;
  "story.founder": StoryFounderContent;
  "page.cart": PageCartContent;
  "page.quiz": PageQuizContent;
  "page.consultation": PageConsultationContent;
  "page.results": PageResultsContent;
  "page.not-found": PageNotFoundContent;
  "catalog.products": CatalogListContent<import("@/lib/types").Product>;
  "catalog.ingredients": CatalogListContent<import("@/lib/types").Ingredient>;
  "catalog.articles": CatalogListContent<import("@/lib/types").Article>;
  "catalog.categories": CatalogListContent<import("@/lib/types").ProductCategory>;
  "catalog.communities": CatalogListContent<import("@/lib/types").Community>;
};
