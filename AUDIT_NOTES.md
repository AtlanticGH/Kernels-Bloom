# AUDIT NOTES — Visual Refinement Pass

Audit of the existing implementation before the refinement pass. The site was
already built against the K&B design system; this documents the gap between
spec and current code, and how the refinement reconciles the two.

## File inventory (src/)

- **Routing/pages (`src/app`)**: `page.tsx` (home), `shop/`, `shop/[category]`,
  `shop/[category]/[slug]`, `botanicals/`, `botanicals/[slug]`, `skin-ritual/`
  (+ `quiz`, `results`, `consultation`), `story/` (+ `brand`, `facility`,
  `circular-process`, `communities`, `founder`), `journal/` (+ `[slug]`),
  `trade`, `press`, `contact`, `cart`, `studio`, `not-found`, `sitemap.ts`,
  `robots.ts`, `api/*`.
- **Components (`src/components`)**:
  - Primitives: `corner-brackets`, `hairline-rule`, `gold-cta`, `grain-overlay`,
    `botanical-illustration`, `section-header`, `reveal` (Framer Motion).
  - UI: `kb-navigation`, `kb-footer`, `kb-button`, `kb-input`, `breadcrumbs`,
    `accordion`, `newsletter-form`, `json-ld`.
  - Cards/tiles: `product-card`, `ingredient-tile`, `article-card`, `quiz-step`.
  - Interactive: `collection-view`, `botanicals-grid`, `quiz-flow`,
    `results-view`, `cart-view`, `add-to-cart`, `consultation-form`,
    `trade-form`, `sourcing-map`, `circular-diagram`.
- **Lib (`src/lib`)**: `site`, `types`, `cart`, `quiz`, `data/*`,
  `integrations/*`.

## CSS variables (defined in `globals.css :root`)

- Colours: `--kb-cacao/terracotta/gold/kola/linen/chalk/dusk/parchment`.
- Fonts: `--font-display`, `--font-body`, `--font-accent` (note: the new spec
  names these `--font-cormorant/jost/playfair` — reconciled via aliases).
- Spacing: `--space-1..20`. Widths: `--max-width`, `--content-width`,
  `--gutter` (was fixed `24px`; refinement makes it `clamp(24px,5vw,80px)`).

## Fonts — how loaded

`next/font/google` in `layout.tsx`: Cormorant Garamond (300/400/600 + italic),
Jost (300/400), Playfair Display (400 italic). Exposed as CSS variables
`--font-display/body/accent` on `<html>` via `.variable` classNames.
**No raw Google `@import`** (kept that way — `next/font` is faster and avoids
render-blocking; the spec's `@import` is intentionally NOT added).

## Tailwind custom tokens (`tailwind.config.ts`)

- `colors`: all 8 `kb-*` colours. ✔
- `fontFamily`: `display/body/accent` → CSS vars. ✔
- `borderRadius.kb = 2px`. ✔
- `maxWidth`: `kb-content` (900px), `kb-max` (1280px). (Spec adds `kb`,
  `kb-text`, `kb-narrow` — added in refinement.)
- `spacing`: `kb-1..20`. (Spec adds semantic `section/section-sm/section-xs/
  component` — added in refinement.)
- **Missing before**: semantic `fontSize` scale (display/headline/subhead/
  body-lg/label/etc.) — added in refinement.

## Pre-existing design-system features

- **Grain texture**: YES — `<GrainOverlay>` component + `.kb-grain` class
  (SVG fractal-noise, low opacity). Used on hero, stats, footer, dark sections.
- **Corner brackets**: YES — `<CornerBrackets>` React component (gold L-shapes,
  configurable arm/inset). Used on hero, quiz CTA, product callout, etc.
  (Refinement ALSO adds a CSS `.kb-brackets` utility for class-based usage.)
- **Gold hairline CTA**: YES — `<GoldCTA>` + `.kb-gold-cta` (underline extends
  on hover). (Refinement adds `.kb-cta` alias matching spec naming.)
- **Hairline rules**: YES — `<HairlineRule>`. (Refinement adds `.kb-rule`.)
- **Scroll reveal**: YES — Framer Motion `<Reveal>` (translateY + fade, 600ms
  editorial easing). Spec proposes an IntersectionObserver + `.kb-reveal`;
  refinement ADDS that CSS + observer so both systems are available, but the
  existing Framer reveals are kept (no duplication/regression).
- **Hero height**: `min-h-[90vh]` already. ✔
- **Cart icon**: already an inline bag SVG (not `/cart` text). ✔

## Reconciliation strategy (this pass)

1. Purely **additive** token + utility-class work in `tailwind.config.ts` and
   `globals.css` — nothing removed, so existing classes keep working (rule 6).
2. Font variable **aliases** (`--font-cormorant` → `--font-display`, etc.) so
   both naming schemes resolve.
3. Adopt spec values for shared classes (`.kb-label`) inside `@layer
   components` so Tailwind utilities still override them.
4. Apply spacing/typography rhythm + new utilities across home, nav, footer and
   key pages **without changing copy, routes, data, or functionality**
   (rules 1–5).
5. Keep `next/font` (no blocking `@import`) and keep working client components
   (quiz, cart, forms, nav state) intact.
