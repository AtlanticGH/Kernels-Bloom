-- Public CMS image bucket for admin uploads

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms',
  'cms',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "CMS images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'cms');

create policy "Service role can upload CMS images"
  on storage.objects for insert
  with check (bucket_id = 'cms');

create policy "Service role can update CMS images"
  on storage.objects for update
  using (bucket_id = 'cms');

create policy "Service role can delete CMS images"
  on storage.objects for delete
  using (bucket_id = 'cms');
