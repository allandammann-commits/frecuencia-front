-- Idempotent schema for Supabase (progress tracking)
-- Run this in Supabase SQL or via MCP

-- Ensure pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

-- Create table
create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  frequency_id integer not null,
  status text not null check (status in ('STARTED','COMPLETED')),
  duration_seconds integer,
  volume integer,
  listened_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists progress_entries_user_id_listened_at_idx on public.progress_entries (user_id, listened_at);
create index if not exists progress_entries_frequency_idx on public.progress_entries (frequency_id);

-- Enable RLS
alter table public.progress_entries enable row level security;

-- Drop policies if they already exist
drop policy if exists insert_own_progress on public.progress_entries;
drop policy if exists select_own_progress on public.progress_entries;

-- Only allow inserting your own rows
create policy insert_own_progress
  on public.progress_entries
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Only allow selecting your own rows
create policy select_own_progress
  on public.progress_entries
  for select
  to authenticated
  using (auth.uid() = user_id);

-- (Optional) Grant privileges for PostgREST roles
grant usage on schema public to authenticated;
grant select, insert on public.progress_entries to authenticated;