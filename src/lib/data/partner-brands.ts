export type PartnerBrand = {
  name: string;
  src: string;
  width: number;
  height: number;
};

/** Hospitality, spa and retail partners — swap SVGs in /public/images/brands/ as needed. */
export const partnerBrands: PartnerBrand[] = [
  {
    name: "Kempinski Hotel Gold Coast",
    src: "/images/brands/kempinski.svg",
    width: 140,
    height: 32,
  },
  {
    name: "Mövenpick Ambassador Hotel",
    src: "/images/brands/movenpick.svg",
    width: 148,
    height: 32,
  },
  {
    name: "Labadi Beach Hotel",
    src: "/images/brands/labadi-beach.svg",
    width: 132,
    height: 32,
  },
  {
    name: "Villa Monticello",
    src: "/images/brands/villa-monticello.svg",
    width: 156,
    height: 32,
  },
  {
    name: "Alisa Hotel",
    src: "/images/brands/alisa-hotel.svg",
    width: 108,
    height: 32,
  },
  {
    name: "Number One Oxford Street",
    src: "/images/brands/oxford-street.svg",
    width: 168,
    height: 32,
  },
  {
    name: "The Spa Collective",
    src: "/images/brands/spa-collective.svg",
    width: 144,
    height: 32,
  },
  {
    name: "Bloom & Field",
    src: "/images/brands/bloom-field.svg",
    width: 128,
    height: 32,
  },
];
