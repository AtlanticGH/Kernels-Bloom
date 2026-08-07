-- Kernels & Bloom — form submission tables for API routes in src/app/api/

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  answers jsonb not null default '{}'::jsonb,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.trade_applications (
  id uuid primary key default gen_random_uuid(),
  "businessName" text not null,
  "contactName" text,
  email text not null,
  phone text,
  "businessType" text,
  country text,
  volume text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  focus text,
  format text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;
alter table public.trade_applications enable row level security;
alter table public.consultations enable row level security;
