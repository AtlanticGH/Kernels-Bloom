import type { Community } from "@/lib/types";

export const communities: Community[] = [
  {
    slug: "northern-ghana-shea",
    name: "Northern Shea Cooperative",
    location: "Tamale, Northern Region, Ghana",
    coordinates: { lat: 9.4008, lng: -0.8393 },
    description:
      "A women-led cooperative hand-harvesting and stone-grinding shea through the dry season. The kernels travel less than a day to our facility.",
    supplies: ["shea"],
  },
  {
    slug: "sahel-baobab",
    name: "Sahel Baobab Gatherers",
    location: "Upper East Region, Ghana",
    coordinates: { lat: 10.7854, lng: -0.8514 },
    description:
      "Families who gather fallen baobab pods rather than fell the trees, drying the pulp in open air before cold-pressing the seed.",
    supplies: ["baobab"],
  },
  {
    slug: "moringa-volta",
    name: "Volta Moringa Growers",
    location: "Ho, Volta Region, Ghana",
    coordinates: { lat: 6.6008, lng: 0.4713 },
    description:
      "Smallholders intercropping moringa with food crops, supplying leaf and seed across the year.",
    supplies: ["moringa"],
  },
  {
    slug: "hibiscus-accra",
    name: "Greater Accra Hibiscus Collective",
    location: "Accra, Greater Accra, Ghana",
    coordinates: { lat: 5.6037, lng: -0.187 },
    description:
      "A collective drying hibiscus calyces in the coastal sun for our extracts and lip colour.",
    supplies: ["hibiscus"],
  },
  {
    slug: "marula-limpopo",
    name: "Limpopo Marula Partners",
    location: "Limpopo, South Africa",
    coordinates: { lat: -23.4013, lng: 29.4179 },
    description:
      "Custodians of the marula groves, pressing the kernel within hours of cracking to protect the oil.",
    supplies: ["marula"],
  },
  {
    slug: "kalahari-melon",
    name: "Kalahari Melon Growers",
    location: "Ghanzi, Botswana",
    coordinates: { lat: -21.6995, lng: 21.6452 },
    description:
      "Growers reclaiming the seed of a desert melon long left in the field — the heart of our circular line.",
    supplies: ["kalahari-melon"],
  },
];
