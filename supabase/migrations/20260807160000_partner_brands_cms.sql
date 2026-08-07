-- Partner brand logos for homepage marquee (CMS: catalog.partner-brands)
insert into public.site_content (id, data)
values ('catalog.partner-brands', '{}'::jsonb)
on conflict (id) do nothing;
