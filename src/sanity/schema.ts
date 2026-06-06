/**
 * Kernels & Bloom — Sanity content schema.
 *
 * These are framework-agnostic schema definitions. To mount a live Studio:
 *   1. npm i sanity next-sanity @sanity/vision
 *   2. Wrap each object below with `defineType` from "sanity".
 *   3. Create src/app/studio/[[...tool]]/page.tsx rendering <NextStudio />.
 *   4. Set NEXT_PUBLIC_SANITY_PROJECT_ID.
 * The local data in src/lib/data mirrors these exact shapes, so the data
 * layer can switch to GROQ queries without page changes.
 */

type Field = {
  name: string;
  title?: string;
  type: string;
  to?: { type: string }[];
  of?: { type: string }[];
  options?: Record<string, unknown>;
  description?: string;
};

type SchemaType = {
  name: string;
  title: string;
  type: "document" | "object";
  fields: Field[];
};

export const productCategory: SchemaType = {
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "description", type: "text" },
    { name: "primarySurface", type: "string" },
    { name: "accent", type: "string" },
    { name: "botanicalAnchor", type: "reference", to: [{ type: "ingredient" }] },
  ],
};

export const ingredient: SchemaType = {
  name: "ingredient",
  title: "Ingredient",
  type: "document",
  fields: [
    { name: "commonName", type: "string" },
    { name: "latinName", type: "string" },
    { name: "slug", type: "slug", options: { source: "commonName" } },
    { name: "origin", type: "string" },
    { name: "region", type: "string" },
    { name: "primaryBenefit", type: "string" },
    { name: "bodyText", type: "array", of: [{ type: "block" }] },
    { name: "pullQuote", type: "string" },
    { name: "heroImage", type: "image" },
    { name: "botanicalIllustration", type: "image" },
    { name: "communityPartner", type: "reference", to: [{ type: "community" }] },
  ],
};

export const community: SchemaType = {
  name: "community",
  title: "Community",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "location", type: "string" },
    { name: "coordinates", type: "geopoint" },
    { name: "description", type: "array", of: [{ type: "block" }] },
    { name: "supplyIngredients", type: "array", of: [{ type: "reference" }] },
    { name: "image", type: "image" },
  ],
};

export const product: SchemaType = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "category", type: "reference", to: [{ type: "productCategory" }] },
    { name: "keyIngredient", type: "reference", to: [{ type: "ingredient" }] },
    { name: "ingredients", type: "array", of: [{ type: "reference" }] },
    { name: "description", type: "array", of: [{ type: "block" }] },
    { name: "usage", type: "array", of: [{ type: "block" }] },
    { name: "sustainability", type: "array", of: [{ type: "block" }] },
    { name: "price", type: "number" },
    { name: "volume", type: "string" },
    { name: "images", type: "array", of: [{ type: "image" }] },
    { name: "inci", type: "text" },
    { name: "batchCode", type: "string" },
    { name: "inStock", type: "boolean" },
    { name: "featured", type: "boolean" },
    { name: "relatedProducts", type: "array", of: [{ type: "reference" }] },
  ],
};

export const article: SchemaType = {
  name: "article",
  title: "Journal Article",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    {
      name: "category",
      type: "string",
      options: {
        list: [
          "ingredient-story",
          "sourcing-journey",
          "ritual-guide",
          "sustainability",
        ],
      },
    },
    { name: "heroImage", type: "image" },
    { name: "excerpt", type: "string" },
    { name: "body", type: "array", of: [{ type: "block" }] },
    { name: "readTime", type: "number" },
    { name: "publishedAt", type: "datetime" },
    { name: "relatedProducts", type: "array", of: [{ type: "reference" }] },
  ],
};

export const schemaTypes = [
  productCategory,
  ingredient,
  community,
  product,
  article,
];
