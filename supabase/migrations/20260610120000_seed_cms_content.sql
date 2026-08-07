-- Seed editable CMS blocks (safe to re-run).

insert into public.site_content (id, data) values
  (
    'home.hero',
    '{
      "eyebrow": "Ghanaian Luxury Botanicals",
      "subcopy": "Science-backed formulations rooted in Africa''s richest botanicals. Crafted in Ghana, for skin that remembers where it comes from.",
      "ctaPrimary": "Explore the collection →",
      "ctaPrimaryHref": "/shop/all",
      "ctaSecondary": "Discover our botanicals",
      "ctaSecondaryHref": "/botanicals"
    }'::jsonb
  ),
  (
    'home.ingredient-spotlight',
    '{
      "sectionLabel": "Ingredient Story",
      "commonName": "Palm",
      "latinName": "Elaeis guineensis",
      "body": "The oil palm has shaded West African forest edges for millennia — its fruit pressed for a rich, golden oil that carries vitamins A and E deep into the skin. Our partners harvest at peak ripeness and cold-press within hours, keeping the oil bright and the forest standing.",
      "pullQuote": "Pressed at peak ripeness, to keep the oil bright.",
      "image": "/images/beth-macdonald-QiGt-xFWkLU-unsplash.jpg",
      "ctaLabel": "Read the full palm story →",
      "ctaHref": "/botanicals/palm"
    }'::jsonb
  ),
  (
    'site.social',
    '{
      "facebook": "https://facebook.com/kernelsandbloom",
      "instagram": "https://instagram.com/kernelsandbloom",
      "youtube": "https://youtube.com/@kernelsandbloom"
    }'::jsonb
  )
on conflict (id) do nothing;
