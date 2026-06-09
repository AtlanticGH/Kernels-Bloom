export const SITE = {
  name: "Kernels & Bloom",
  shortName: "K&B",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kernelsandbloom.com",
  description:
    "Science-backed formulations rooted in Africa's richest botanicals. Crafted in Ghana, for skin that remembers where it comes from.",
  tagline: "From the kernel. To your bloom.",
  origin: "Ghana",
  founder: {
    name: "Maud Lindsay-Gamrat",
  },
  social: {
    facebook: "https://facebook.com/kernelsandbloom",
    instagram: "https://instagram.com/kernelsandbloom",
    youtube: "https://youtube.com/@kernelsandbloom",
  },
} as const;

export type NavLink = { label: string; href: string };

export const STORY_NAV: NavLink[] = [
  { label: "Discover the Bloom", href: "/story/brand" },
  { label: "Heart of Operation", href: "/story/facility" },
  { label: "Transformation Zone", href: "/story/circular-process" },
  { label: "Sustainability Drivers", href: "/story/communities" },
  { label: "Founder", href: "/story/founder" },
];

export const PRIMARY_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Botanicals", href: "/botanicals" },
  { label: "Skin Ritual", href: "/skin-ritual" },
  { label: "Our Story", href: "/story" },
  { label: "Journal", href: "/journal" },
  { label: "Trade", href: "/trade" },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop/all" },
      { label: "Skin & Facial", href: "/shop/skin-facial" },
      { label: "Hair & Scalp", href: "/shop/hair-scalp" },
      { label: "Body & Bath", href: "/shop/body-bath" },
      { label: "Bundles & Gifts", href: "/shop/bundles" },
      { label: "Circular Essentials", href: "/shop/circular" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "The Botanicals", href: "/botanicals" },
      { label: "Skin Ritual", href: "/skin-ritual" },
      { label: "The Journal", href: "/journal" },
      { label: "Circular Process", href: "/story/circular-process" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "Our Story", href: "/story/brand" },
      { label: "Community Partners", href: "/story/communities" },
      { label: "Trade & Wholesale", href: "/trade" },
      { label: "Press & Awards", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
