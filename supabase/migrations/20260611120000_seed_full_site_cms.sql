-- Register all site-wide CMS blocks. Empty JSON merges with code defaults at runtime.

insert into public.site_content (id, data) values
  ('site.global', '{}'::jsonb),
  ('home.stats', '{}'::jsonb),
  ('home.collection', '{}'::jsonb),
  ('home.circular', '{}'::jsonb),
  ('home.community', '{}'::jsonb),
  ('home.ritual-cta', '{}'::jsonb),
  ('home.journal', '{}'::jsonb),
  ('home.trade-banner', '{}'::jsonb),
  ('page.shop', '{}'::jsonb),
  ('page.botanicals', '{}'::jsonb),
  ('page.journal', '{}'::jsonb),
  ('page.skin-ritual', '{}'::jsonb),
  ('page.contact', '{}'::jsonb),
  ('page.trade', '{}'::jsonb),
  ('page.press', '{}'::jsonb),
  ('story.index', '{}'::jsonb),
  ('story.brand', '{}'::jsonb),
  ('story.facility', '{}'::jsonb),
  ('story.circular', '{}'::jsonb),
  ('story.communities', '{}'::jsonb),
  ('story.founder', '{}'::jsonb)
on conflict (id) do nothing;
