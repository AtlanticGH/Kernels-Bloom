import type { Article } from "@/lib/types";

const IMG_A = "/images/DSC09553.jpg"; // shea bar soap, linen-wrapped
const IMG_B = "/images/DSC09548.jpg"; // amber candle / trio

export const articles: Article[] = [
  {
    slug: "the-women-who-grind-the-shea",
    title: "The women who grind the shea",
    category: "sourcing-journey",
    excerpt:
      "A dry-season morning with the cooperative near Tamale, where the kernel becomes butter by hand.",
    body: [
      "The work begins before the heat. By the time the sun is high, the kernels have already been cracked, the fires already lit.",
      "Shea butter made this way carries the rhythm of the hands that made it — a craft held almost entirely by women, passed between generations.",
      "We buy at the cooperative, in cash, at a price the women set. It is the least a brand can do, and far less than the work deserves.",
    ],
    pullQuote: "The butter carries the rhythm of the hands that made it.",
    readTime: 6,
    publishedAt: "2026-05-18",
    image: IMG_A,
    relatedProducts: ["shea-body-butter", "shea-baby-balm"],
  },
  {
    slug: "why-we-never-fell-the-baobab",
    title: "Why we never fell the baobab",
    category: "sustainability",
    excerpt:
      "The upside-down tree can live a thousand years. Our sourcing is built around leaving it standing.",
    body: [
      "There is a way to harvest baobab that ends with the tree, and a way that does not. We chose the slower one.",
      "Gatherers collect the fallen pods, dry the pulp and cold-press the seed. The tree is never touched.",
      "It costs more and yields less per season. It also means the grove outlives us all.",
    ],
    pullQuote: "The grove outlives us all.",
    readTime: 5,
    publishedAt: "2026-04-29",
    image: IMG_B,
    relatedProducts: ["baobab-night-oil", "baobab-scalp-tonic"],
  },
  {
    slug: "reading-the-skin-an-oil-primer",
    title: "Reading the skin: an oil primer",
    category: "ritual-guide",
    excerpt:
      "Oleic or linoleic? A short guide to choosing the botanical oil your skin is actually asking for.",
    body: [
      "Not all oils behave the same. The difference is mostly in two fatty acids — oleic and linoleic — and which one dominates.",
      "Drier, more mature skin tends to want the richness of oleic oils like marula and baobab. Oilier, congestion-prone skin often prefers lighter, linoleic oils like kalahari melon.",
      "The quiz at the end of this piece will point you toward a starting place. Skin changes; revisit it with the seasons.",
    ],
    pullQuote: "Skin changes; revisit it with the seasons.",
    readTime: 7,
    publishedAt: "2026-04-10",
    image: IMG_A,
    relatedProducts: ["marula-facial-serum", "kalahari-circular-oil"],
  },
  {
    slug: "hibiscus-the-quiet-acid",
    title: "Hibiscus, the quiet acid",
    category: "ingredient-story",
    excerpt:
      "The flower that becomes a drink, a dye and a gentle resurfacer — without the sting of stronger acids.",
    body: [
      "In Ghana the flower steeps into sobolo. On the skin, the same calyx offers a gentle, gradual smoothing.",
      "Its naturally occurring acids work slowly, which is exactly the point — resurfacing without the rawness that harsher actives can leave behind.",
      "We dry the calyces in the coastal sun, then draw the extract cold.",
    ],
    pullQuote: "Gentle is not the same as weak.",
    readTime: 4,
    publishedAt: "2026-03-22",
    image: IMG_B,
    relatedProducts: ["hibiscus-resurfacing-essence", "hibiscus-lip-tint"],
  },
  {
    slug: "the-seed-left-in-the-field",
    title: "The seed left in the field",
    category: "sustainability",
    excerpt:
      "How a discarded Kalahari melon seed became the heart of our circular line.",
    body: [
      "For generations the seed of the Kalahari melon was left in the field after harvest — a by-product with no buyer.",
      "We press it. The result is a light, balancing oil, and a discarded crop given new worth.",
      "Circularity is not a marketing layer for us. It is, increasingly, where the formulations begin.",
    ],
    pullQuote: "Waste is mostly a failure of imagination.",
    readTime: 5,
    publishedAt: "2026-03-05",
    image: "/images/DSC09564.jpg",
    relatedProducts: ["kalahari-circular-oil"],
  },
];
