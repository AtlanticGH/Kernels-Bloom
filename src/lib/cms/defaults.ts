import { articles } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";
import { communities } from "@/lib/data/communities";
import { ingredients } from "@/lib/data/ingredients";
import { products } from "@/lib/data/products";
import { QUIZ_QUESTIONS } from "@/lib/quiz";
import { SITE } from "@/lib/site";
import type { CmsBlockMap } from "./types";

export const CMS_BLOCK_DEFAULTS: CmsBlockMap = {
  "site.social": {
    facebook: SITE.social.facebook,
    instagram: SITE.social.instagram,
    youtube: SITE.social.youtube,
  },
  "site.global": {
    footerTagline:
      "Science-backed botanicals, crafted in Ghana and returned to the circle.",
    newsletterLabel: "The Journal, by post",
    copyright: "Made with purpose",
    careEmail: "care@kernelsandbloom.com",
    tradeEmail: "trade@kernelsandbloom.com",
    careIntro: "Questions about an order, a product or your ritual.",
    tradeIntro: "Wholesale, hospitality and custom formulation.",
    studioLocation: "Accra, Ghana · Worldwide shipping",
  },
  "home.hero": {
    eyebrow: "Ghanaian Luxury Botanicals",
    headlineLine1: "From the kernel,",
    headlineLine2: "To your bloom.",
    subcopy:
      "Science-backed formulations rooted in Africa's richest botanicals. Crafted in Ghana, for skin that remembers where it comes from.",
    backgroundImage: "/images/beth-macdonald-QiGt-xFWkLU-unsplash.jpg",
    ctaPrimary: "Explore the collection →",
    ctaPrimaryHref: "/shop/all",
    ctaSecondary: "Discover our botanicals",
    ctaSecondaryHref: "/botanicals",
  },
  "home.stats": {
    items: [
      { number: "95%", label: "Botanical Ingredients" },
      { number: "50+", label: "Species Utilised" },
      { number: "20+", label: "Community Partnerships" },
      { number: "Zero", label: "Waste Target" },
    ],
  },
  "home.ingredient-spotlight": {
    sectionLabel: "Ingredient Story",
    commonName: "Palm",
    latinName: "Elaeis guineensis",
    body:
      "The oil palm has shaded West African forest edges for millennia — its fruit pressed for a rich, golden oil that carries vitamins A and E deep into the skin. Our partners harvest at peak ripeness and cold-press within hours, keeping the oil bright and the forest standing.",
    pullQuote: "Pressed at peak ripeness, to keep the oil bright.",
    image: "/images/beth-macdonald-QiGt-xFWkLU-unsplash.jpg",
    illustrationBotanical: "Palm",
    ctaLabel: "Read the full palm story →",
    ctaHref: "/botanicals/palm",
  },
  "home.collection": {
    sectionLabel: "The Collection",
    headline: "Rooted in nature. Refined by science.",
    ctaLabel: "View all products →",
    ctaHref: "/shop/all",
  },
  "home.circular": {
    sectionLabel: "Our Circular Commitment",
    headline: "Waste transformed into luxury.",
    steps: [
      {
        name: "Botanical Sourcing",
        body: "Wild-gathered and cooperative-grown across Ghana and the wider continent — never at the cost of the tree.",
        botanical: "Baobab",
      },
      {
        name: "Upcycle & Refine",
        body: "Seeds and by-products others discard are pressed and refined into clear, capable oils.",
        botanical: "Kalahari melon",
      },
      {
        name: "Circular Packaging",
        body: "Glass and refill returned through our programme, closing the loop on every formulation.",
        botanical: "Moringa",
      },
    ],
    ctaLabel: "Read the full story →",
    ctaHref: "/story/circular-process",
  },
  "home.community": {
    quote:
      "We buy at the cooperative, in cash, at a price the women set. It is the least a brand can do.",
    attribution: "On sourcing — Kernels & Bloom",
    stats: [
      { number: "20+", label: "Communities" },
      { number: "50+", label: "Botanicals" },
      { number: "Ghana", label: "Rooted" },
      { number: "Zero", label: "Waste Vision" },
    ],
    ctaLabel: "Meet our community partners →",
    ctaHref: "/story/communities",
  },
  "home.ritual-cta": {
    label: "Personalised Ritual",
    headline: "Botanicals chosen for you, specifically.",
    body:
      "A short ritual quiz reads your skin and hair, then builds a routine from the botanicals that suit them. No two skins are generic.",
    quizCta: "Take the skin quiz",
    quizHref: "/skin-ritual/quiz",
    consultCta: "Book a consultation →",
    consultHref: "/skin-ritual/consultation",
  },
  "home.journal": {
    sectionLabel: "The Journal",
    headline: "Field notes and ingredient lives.",
    ctaLabel: "Read the journal →",
    ctaHref: "/journal",
  },
  "home.trade-banner": {
    headline: "Partner with a brand the world is watching.",
    body:
      "Hospitality, spa and retail partners — a sustainability story, a six-category range, and custom formulation built in Ghana.",
    ctaLabel: "Explore wholesale →",
    ctaHref: "/trade",
  },
  "page.shop": {
    metaTitle: "Shop",
    metaDescription:
      "Botanical skin, hair, body, lip and circular essentials — organised by ritual, not by SKU.",
    label: "The Collection",
    headline: "The Collection",
    intro:
      "Six categories of botanical care, and one circular line. Begin with a ritual, or browse everything at once.",
    ctaLabel: "Browse all products →",
    ctaHref: "/shop/all",
  },
  "page.botanicals": {
    metaTitle: "The Botanicals",
    metaDescription:
      "Every ingredient has a home. The K&B botanical index — shea, baobab, moringa, hibiscus, marula and more, with their origins and uses.",
    label: "The Botanicals",
    headline: "Every ingredient has a home.",
    intro:
      "Fifty-plus species, each tied to a place and a practice. This is the index — start with the plant, not the claim.",
  },
  "page.journal": {
    metaTitle: "The Journal",
    metaDescription:
      "Ingredient stories, sourcing journeys, ritual guides and sustainability reports from Kernels & Bloom.",
    label: "The Journal",
    headline: "Field notes and ingredient lives.",
    intro: "",
    weeklyLabel: "This week",
  },
  "page.skin-ritual": {
    metaTitle: "Skin Ritual",
    metaDescription:
      "A short ritual quiz reads your skin and hair, then builds a routine from the botanicals that suit them.",
    label: "Personalised Ritual",
    headline: "Botanicals chosen for you, specifically.",
    intro:
      "No two skins are generic. Choose the path that suits you — a quick quiz, or a conversation.",
    paths: [
      {
        label: "Skin Quiz",
        title: "Read your skin in seven questions.",
        body: "A guided quiz that translates how your skin behaves into a starting routine.",
        href: "/skin-ritual/quiz",
        cta: "Take the skin quiz",
      },
      {
        label: "Consultation",
        title: "One-to-one, with a formulator.",
        body: "Book a private consultation to build a considered routine around your skin and hair.",
        href: "/skin-ritual/consultation",
        cta: "Book a consultation →",
      },
    ],
  },
  "page.contact": {
    metaTitle: "Contact",
    metaDescription: "Customer care and B2B enquiries for Kernels & Bloom, Ghana.",
    label: "Get in touch",
    headline: "We'd love to hear from you.",
    intro: "",
    careLabel: "Customer Care",
    careIntro: "Questions about an order, a product or your ritual.",
    tradeLabel: "B2B Enquiries",
    tradeIntro: "Wholesale, hospitality and custom formulation.",
    studioLabel: "Studio",
    tradeCtaLabel: "Visit the trade page →",
    tradeCtaHref: "/trade",
  },
  "page.trade": {
    metaTitle: "Trade & Wholesale",
    metaDescription:
      "A brand built for those who care about what's on the shelf — wholesale and custom formulation for hospitality, spa and retail partners.",
    label: "Trade & Wholesale",
    headline: "A brand built for those who care about what's on the shelf.",
    intro: "",
    whyLabel: "Why Kernels & Bloom",
    proof: [
      {
        title: "Science-driven formulations",
        body: "Evidence-led, small-batch, made in Ghana.",
      },
      {
        title: "A sustainability story worth telling",
        body: "Zero-waste target and upcycled ingredients your guests will ask about.",
      },
      {
        title: "Heritage credentials",
        body: "Ghanaian-owned, with 20+ community partnerships.",
      },
      {
        title: "A multi-category range",
        body: "Six product categories, from facial to body to circular.",
      },
      {
        title: "Custom formulation",
        body: "Bespoke blends and formats for hospitality clients.",
      },
    ],
    pricingHeadline: "Minimum order & pricing",
    tiers: [
      { category: "Body & Bath", moq: "24 units", tier: "Wholesale 50%" },
      { category: "Skin & Facial", moq: "18 units", tier: "Wholesale 50%" },
      { category: "Amenities (custom)", moq: "250 units", tier: "On enquiry" },
    ],
    catalogueLabel: "Download the wholesale catalogue (PDF) →",
    catalogueHref: "/wholesale-catalogue.pdf",
    appLabel: "Partner Application",
    appHeadline: "Apply to stock K&B",
    appIntro: "Tell us about your business. We review every application personally.",
  },
  "page.press": {
    metaTitle: "Press & Awards",
    metaDescription:
      "Recognition and coverage of Kernels & Bloom — Africa's luxury circular beauty brand.",
    label: "Recognition",
    headline: "Press & Awards",
    intro: "",
    awardsLabel: "Awards",
    awards: [
      {
        year: "2026",
        name: "Sustainable Beauty Award — Circular Innovation",
        body: "Recognised for the Kalahari Circular line.",
      },
      {
        year: "2026",
        name: "Best New Luxury Skincare — Editor's Choice",
        body: "For the Marula Facial Serum.",
      },
      {
        year: "2025",
        name: "Ethical Sourcing Commendation",
        body: "For community-led botanical supply.",
      },
    ],
    pressLabel: "In the press",
    press: [
      {
        outlet: "The Editorial",
        quote:
          "An argument that African botanicals belong at the very top of the luxury tier.",
      },
      {
        outlet: "Bloom & Field",
        quote: "Provenance you can trace to a season and a source.",
      },
      {
        outlet: "Continent",
        quote: "Quiet, confident, and unmistakably rooted in Ghana.",
      },
    ],
    ctaLabel: "Press enquiries →",
    ctaHref: "/contact",
  },
  "story.index": {
    metaTitle: "Our Story",
    metaDescription:
      "Rooted in Ghanaian heritage, powered by science, built on community — the story behind Kernels & Bloom.",
    label: "Our Story",
    headline: "Rooted in heritage. Powered by science.",
    intro: "",
    chapters: [
      {
        name: "Discover the Bloom",
        href: "/story/brand",
        body: "A tribute to the beauty of Africa, told plainly.",
      },
      {
        name: "Heart of Operation",
        href: "/story/facility",
        body: "Where the botanicals become formulations.",
      },
      {
        name: "Transformation Zone",
        href: "/story/circular-process",
        body: "Waste, transformed into luxury.",
      },
      {
        name: "Sustainability Drivers",
        href: "/story/communities",
        body: "The twenty-plus communities we source with.",
      },
      {
        name: "Founder",
        href: "/story/founder",
        body: "The vision, and the why.",
      },
    ],
  },
  "story.brand": {
    metaTitle: "Brand Story",
    metaDescription:
      "A heartfelt tribute to the timeless beauty of Africa — the heritage, science and community behind Kernels & Bloom.",
    label: "Brand Story",
    headline: "A heartfelt tribute to the timeless beauty of Africa.",
    intro: "",
    paragraph1:
      "Kernels & Bloom began with a question that sounds simple and is not: why are Africa's botanicals so often treated as raw material for someone else's luxury?",
    paragraph2:
      "Shea, baobab, moringa, hibiscus, marula — ingredients with deep cultural lives and serious efficacy, named here with the specificity they deserve. We formulate them in Ghana, and we keep the value close to where the plants grow.",
    pullQuote:
      "Sustainability is not a compromise. At its best, it is an elevation.",
    pillars: [
      {
        title: "Heritage",
        body: "We begin with place — Northern Ghana, the Sahel, the groves of the south — and the practices held there across generations.",
      },
      {
        title: "Science",
        body: "Botanicals are formulated with rigour, small-batch and evidence-led, so heritage and efficacy sit together.",
      },
      {
        title: "Community",
        body: "We source with cooperatives and gatherers on fair terms, because a supply chain is also a set of relationships.",
      },
    ],
    closingQuote:
      "Africa's first luxury circular beauty brand — rooted in Ghanaian heritage, powered by science, built on community.",
  },
  "story.facility": {
    metaTitle: "The Facility",
    metaDescription:
      "Where Africa's botanicals become formulations — small-batch, science-led, and close to source, in Ghana.",
    label: "The Facility",
    headline: "Where the botanicals become formulations.",
    intro: "",
    image: "/images/DSC09558.jpg",
    paragraphs: [
      "Our facility sits close to the communities we source from, which keeps kernels and pulp fresh and keeps decisions accountable to the people who grow them.",
      "We work in small batches. Oils are pressed or received cold, blended with care, and held to the same standards a clinical brand would recognise — only with botanicals named for where they come from.",
      "Every batch carries a code, so what reaches you can be traced back to a season and a source.",
    ],
  },
  "story.circular": {
    metaTitle: "The Circular Process",
    metaDescription:
      "From botanical sourcing to upcycling, formulation and circular return — how Kernels & Bloom closes the loop.",
    label: "Circular Process",
    headline: "Waste, transformed into luxury.",
    intro:
      "Circularity is not a marketing layer for us. Increasingly, it is where the formulations begin.",
    accordion: [
      {
        label: "Botanical Sourcing",
        content:
          "We gather wild and cooperative-grown botanicals across Ghana and the continent, designed around leaving the tree standing — fallen baobab pods rather than felled trees, cooperative shea rather than extractive supply.",
      },
      {
        label: "Upcycle & Refine",
        content:
          "The Kalahari melon seed — long discarded after harvest — is pressed into a clear, balancing oil. Upcycling turns a by-product into the heart of a luxury line.",
      },
      {
        label: "Formulation",
        content:
          "Small-batch, science-led formulation in Ghana, with batch codes for traceability and minimal, recyclable packaging.",
      },
      {
        label: "Circular Return",
        content:
          "Glass and refills return through our programme. The goal is a closed loop: nothing in the chain treated as waste.",
      },
    ],
    diagramStages: [
      {
        name: "Botanical Sourcing",
        body: "Wild-gathered and cooperative-grown across Ghana and the continent, with the tree always left standing.",
        botanical: "Baobab",
      },
      {
        name: "Upcycle & Refine",
        body: "Seeds and by-products others discard — the Kalahari melon seed chief among them — are pressed and refined.",
        botanical: "Kalahari melon",
      },
      {
        name: "Formulation",
        body: "Botanical oils and extracts are formulated in Ghana, science-led and small-batch.",
        botanical: "Moringa",
      },
      {
        name: "Circular Return",
        body: "Glass and refills return through our programme, closing the loop on every product.",
        botanical: "Hibiscus",
      },
    ],
  },
  "story.communities": {
    metaTitle: "Community Partners",
    metaDescription:
      "The twenty-plus cooperatives and gatherers we source with, shown as geography — from Northern Ghana to the Kalahari.",
    label: "Community Partners",
    headline: "Twenty-plus communities, named.",
    intro:
      "We buy at the cooperative, in cash, at a price the partners set. Hover a pin to read who supplies what, and from where.",
  },
  "story.founder": {
    metaTitle: "Founder",
    metaDescription:
      "The vision behind Kernels & Bloom — and the conviction that Africa's botanicals belong at the luxury tier.",
    label: "Founder",
    headline: "The vision, and the why.",
    intro: "",
    founderName: SITE.founder.name,
    founderOrigin: SITE.origin,
    portraitImage: "/images/founder-portrait.png",
    paragraphs: [
      "Kernels & Bloom was founded on a conviction: that the botanicals of this continent are as sophisticated as any luxury ingredient, and ought to be presented as such — from the place they come from.",
      "The brand is built to keep value close to source, to formulate with rigour, and to treat sustainability as the standard rather than the story.",
    ],
    pullQuote: "We are not borrowing from Africa. We are building from it.",
    videoSrc: "/videos/founder.mp4",
    videoPoster: "/images/founder-portrait.png",
  },
  "page.cart": {
    metaTitle: "Cart",
    metaDescription: "Your Kernels & Bloom ritual.",
    label: "Your ritual",
    headline: "Your ritual",
    intro: "",
  },
  "page.quiz": {
    metaTitle: "The Ritual Quiz",
    metaDescription:
      "Seven questions to read your skin and hair, then a routine built from the botanicals that suit them.",
    label: "Skin Quiz",
    headline: "Read your skin in seven questions.",
    intro:
      "Seven questions to read your skin and hair, then a routine built from the botanicals that suit them.",
    questions: QUIZ_QUESTIONS.map((q) => ({
      id: q.id,
      stepLabel: q.stepLabel,
      question: q.question,
      options: [...q.options],
    })),
    resultsLabel: "Your ritual",
    resultsHeadline: "Your ritual starts here.",
    resultsBody:
      "Three botanicals chosen for what you told us. Adjust with the seasons — skin rarely stays still.",
    saveSectionLabel: "Save your results",
    emailPlaceholder: "Your email",
    saveButtonLabel: "Save",
    savedMessage: "Saved — we'll send your ritual and tips to your inbox.",
    consultationCta: "Prefer to talk? Book a consultation →",
    consultationHref: "/skin-ritual/consultation",
    retakeLabel: "Retake the quiz",
  },
  "page.consultation": {
    metaTitle: "Book a Consultation",
    metaDescription:
      "A private, one-to-one consultation to build a considered routine around your skin and hair.",
    label: "Consultation",
    headline: "One-to-one, with a formulator.",
    intro:
      "Tell us a little about your skin and hair. We'll arrange a private consultation and build a routine around them.",
  },
  "page.results": {
    metaTitle: "Your Ritual Results",
    metaDescription: "Your personalised K&B ritual, built from your quiz answers.",
    label: "Your Ritual",
    headline: "Your personalised ritual.",
    intro: "Your personalised K&B ritual, built from your quiz answers.",
    emptyHeadline: "No ritual saved yet.",
    emptyBody: "Take the quiz and save your results to see them here.",
    emptyCta: "Take the skin quiz",
    savedLabel: "Your saved ritual",
    savedHeadline: "Your ritual starts here.",
  },
  "page.not-found": {
    metaTitle: "Page not found",
    metaDescription: "The page you're after isn't here.",
    label: "404",
    headline: "This path hasn't bloomed.",
    intro:
      "The page you're after isn't here. Let's find your way back to the botanicals.",
    ctaPrimary: "Return home",
    ctaPrimaryHref: "/",
    ctaSecondary: "Browse the collection →",
    ctaSecondaryHref: "/shop/all",
  },
  "catalog.products": { items: products },
  "catalog.ingredients": { items: ingredients },
  "catalog.articles": { items: articles },
  "catalog.categories": { items: categories },
  "catalog.communities": { items: communities },
};
