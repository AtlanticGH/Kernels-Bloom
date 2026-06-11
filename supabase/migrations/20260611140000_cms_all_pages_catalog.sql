-- Register utility pages and catalog CMS blocks (merge with code defaults at runtime).

insert into public.site_content (id, data) values
  ('page.cart', '{}'::jsonb),
  ('page.quiz', '{}'::jsonb),
  ('page.consultation', '{}'::jsonb),
  ('page.results', '{}'::jsonb),
  ('page.not-found', '{}'::jsonb),
  ('catalog.products', '{}'::jsonb),
  ('catalog.ingredients', '{}'::jsonb),
  ('catalog.articles', '{}'::jsonb),
  ('catalog.categories', '{}'::jsonb),
  ('catalog.communities', '{}'::jsonb)
on conflict (id) do nothing;
