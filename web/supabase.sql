-- Crear en Supabase (SQL Editor), gratis:
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  gift_id text not null,
  reserved_by text not null,
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

create policy "Anyone can read reservations"
  on public.reservations for select
  using (true);

create policy "Anyone can insert reservations"
  on public.reservations for insert
  with check (true);

create policy "Anyone can delete reservations"
  on public.reservations for delete
  using (true);
