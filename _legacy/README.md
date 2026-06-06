# Kernels & Bloom — Circular Beauty Starter

This project is a **Tailwind-configured** static site scaffold (HTML + CSS + JS) reinterpreted as an **eco-luxury, circular beauty brand**:

- Upcycled ingredients / circular economy storytelling
- Ethical sourcing & production
- Transparency + SDG-aligned impact reporting

## Structure

- `public/`: pages + built assets
  - `index.html`, `shop.html`, `impact.html`, `about.html`, `refill.html`, `cart.html`, `account.html`
  - `assets/css/styles.css`: Tailwind output (generated) + minimal fallback
  - `assets/js/main.js`: theme toggle + cart badge + assistant placeholder
  - `assets/img/`: images (hero backgrounds, product photos, etc.)
- `src/`: Tailwind source
  - `input.css`: Tailwind entry + component classes
  - `components/`: copy/paste HTML sections
- `tailwind.config.js`, `postcss.config.js`, `package.json`: build config

## Quick start

- Open `index.html` (project root) to be redirected into `public/index.html`.

## Build Tailwind CSS

You currently don't have `npm` available in this workspace. To enable builds:

1. Install **Node.js LTS** (which includes npm).
2. In this folder, run:

```bash
npm install
npm run dev
```

Then open `public/index.html` in your browser.

## Notes

- All placeholder copy is original and intended to be replaced with real product/supplier data.
- This is a starter; you can later migrate it to Next.js and add motion + full e-commerce.

