# Kernels & Bloom

A headless Next.js 14 (App Router) e-commerce and editorial platform for
Kernels & Bloom — a Ghanaian luxury circular beauty brand. Built as a luxury
magazine that sells: editorial-first, ingredient-led, and faithful to the K&B
design system.

## Stack

- **Next.js 14** (App Router) · **TypeScript** (strict)
- **Tailwind CSS** + CSS custom properties (the K&B design tokens)
- **Framer Motion** for scroll-reveals and the circular-process diagram
- Integration adapters for **Supabase** (CMS + form storage), **Shopify**
  (headless cart), **Klaviyo** (newsletter), and **Mapbox**
  (sourcing map). Each falls back to local data / a static fallback until its
  keys are present, so the site runs end-to-end with zero credentials.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site runs without keys
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Architecture

- `src/app` — routes (App Router). Every page exports `generateMetadata`;
  product, article and inner pages emit JSON-LD.
- `src/components` — the K&B component library (corner brackets, hairline
  rules, gold CTAs, botanical illustrations, product cards, quiz, nav, footer…).
- `src/lib/data` — typed local data + the **data-access layer** (`index.ts`)
  that pages import for products, ingredients, articles, and communities.
- `src/lib/cms` — Supabase-backed marketing content blocks edited at `/admin`.
- `src/lib/integrations` — Shopify / Supabase / Klaviyo adapters.
- `_legacy/` — the original static HTML starter, archived for reference.

## Design system

All tokens live in `src/app/globals.css` and `tailwind.config.ts`:
8 palette colours (`kb-cacao` … `kb-parchment`), three font families
(Cormorant Garamond / Jost / Playfair Display, loaded via `next/font`),
spacing scale, and `2px` radius. Rules enforced throughout: no bold Cormorant,
no upright Playfair, no italic Jost, no off-palette colour.

## What needs credentials to go fully live

| Service  | Without keys | With keys |
|----------|--------------|-----------|
| Supabase | local CMS defaults, form submissions logged | live content + form rows |
| Shopify  | localStorage cart, placeholder checkout | real Storefront checkout |
| Klaviyo  | newsletter no-ops to success | real list subscription |
| Mapbox   | static SVG coordinate plot | interactive GL map |

See `.env.example`. CMS dashboard: `/admin/login`.
