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
  {
    slug: "marula-pressed-at-first-crack",
    title: "Marula, pressed at first crack",
    category: "sourcing-journey",
    excerpt:
      "In Limpopo the kernel is cracked by hand and pressed within hours — a rhythm that keeps the oil bright.",
    body: [
      "Marula fruit is so loved by elephants that folklore names the tree after them. For our partners in Limpopo, the work is quieter but no less skilled.",
      "The kernel is cracked by hand, a rhythm passed between generations. Pressing happens within hours, before the oil dulls.",
      "What reaches the bottle is near-scentless, fast-absorbing, and bright — the reason it anchors our lightest facial serums.",
    ],
    pullQuote: "Pressed within hours, to keep the oil bright.",
    readTime: 5,
    publishedAt: "2026-06-04",
    image: "/images/DSC09530.jpg",
    relatedProducts: ["marula-facial-serum", "ritual-discovery-set"],
  },
  {
    slug: "moringa-between-the-rows",
    title: "Moringa between the rows",
    category: "ingredient-story",
    excerpt:
      "Intercropped with food in the Volta Region — the same land feeding families and our formulations.",
    body: [
      "Moringa is often called the miracle tree for how little it asks and how much it gives. Our growers in the Volta Region intercrop it with food.",
      "The same plot feeds families and supplies our leaf and seed — a model where skincare and subsistence share ground.",
      "On the skin, moringa helps hold composure against pollution and sun. In the field, it asks for almost nothing in return.",
    ],
    pullQuote: "It asks for little and gives back almost everything.",
    readTime: 6,
    publishedAt: "2026-06-01",
    image: "/images/DSC09564.jpg",
    relatedProducts: ["moringa-clarity-mask", "hibiscus-resurfacing-essence"],
  },
  {
    slug: "the-long-bath",
    title: "The long bath",
    category: "ritual-guide",
    excerpt:
      "A slow body ritual — from damp skin to whipped shea, working from the feet up.",
    body: [
      "The long bath is not about duration alone. It is about sequence: warm water, damp skin, then oil or butter applied with intention.",
      "We work from the feet upward — where the skin is thickest and driest — letting each pass of shea rebuild the barrier before moving on.",
      "Three minutes is enough when the product is right and the pace is unhurried. Luxury, here, is slowness.",
    ],
    pullQuote: "Luxury, here, is slowness.",
    readTime: 4,
    publishedAt: "2026-05-28",
    image: "/images/DSC09558.jpg",
    relatedProducts: ["shea-body-butter", "kalahari-circular-oil"],
  },
  {
    slug: "refillable-by-design",
    title: "Refillable, by design",
    category: "sustainability",
    excerpt:
      "How returnable bottles and upcycled oils turned circular from a promise into a shelf line.",
    body: [
      "Circularity only matters if a customer can actually close the loop. Our refillable programme accepts returned bottles and jars at stockists and through trade partners.",
      "The circular line begins with ingredients others leave behind — Kalahari melon seed pressed from a crop long discarded in the field.",
      "Refillable by design means the vessel is worth keeping. The oil inside has to earn that, too.",
    ],
    pullQuote: "The vessel is worth keeping. The oil inside has to earn that.",
    readTime: 5,
    publishedAt: "2026-05-22",
    image: "/images/DSC09536.jpg",
    relatedProducts: ["kalahari-circular-oil", "baobab-night-oil"],
  },
];
