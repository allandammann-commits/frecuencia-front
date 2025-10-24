-- Audio App Progress Tracker schema (Supabase/Postgres)
-- Idempotent: safe to rerun

create extension if not exists pgcrypto;

-- Enum for session status
do $$
begin
  if not exists (select 1 from pg_type where typname = 'progress_status_enum') then
    create type progress_status_enum as enum ('STARTED','COMPLETED');
  end if;
end$$;

-- Users (app-level)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  password_hash varchar(255) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz null,
  accepted_terms_at timestamptz null
);

-- User profiles
create table if not exists public.user_profiles (
  user_id uuid primary key references public.users(id) on delete cascade on update cascade,
  display_name varchar(255) null,
  avatar_url varchar(255) null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Frequencies catalog
create table if not exists public.frequencies (
  id serial primary key,
  slug varchar(255) unique not null,
  title varchar(255) not null,
  description text null,
  audio_url varchar(255) not null,
  duration_seconds integer not null,
  unlock_day smallint not null,
  order_in_day smallint not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_frequencies_unlock_day check (unlock_day between 1 and 7),
  constraint chk_frequencies_order_in_day check (order_in_day between 1 and 2),
  constraint chk_frequencies_duration_positive check (duration_seconds > 0)
);
create unique index if not exists uq_frequencies_unlock_order on public.frequencies (unlock_day, order_in_day);

-- User program progress
create table if not exists public.user_progress (
  user_id uuid primary key references public.users(id) on delete cascade on update cascade,
  started_at date not null,
  last_unlocked_day smallint not null default 1,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_user_progress_last_unlocked_day check (last_unlocked_day between 1 and 7)
);
create index if not exists user_progress_last_seen_idx on public.user_progress (last_seen_at);

-- Listening sessions
create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade on update cascade,
  frequency_id integer not null references public.frequencies(id) on delete restrict on update cascade,
  status progress_status_enum not null,
  duration_seconds integer null,
  volume integer null,
  listened_at timestamptz not null default now(),
  constraint chk_progress_entries_duration_nonneg check (duration_seconds is null or duration_seconds >= 0),
  constraint chk_progress_entries_volume_range check (volume is null or (volume between 0 and 100))
);
create index if not exists idx_progress_entries_user_listened_at_desc on public.progress_entries (user_id, listened_at desc);
create index if not exists idx_progress_entries_frequency on public.progress_entries (frequency_id);

-- RLS policies
alter table public.users enable row level security;
drop policy if exists users_select_own on public.users;
drop policy if exists users_insert_own on public.users;
drop policy if exists users_update_own on public.users;
create policy users_select_own on public.users for select to authenticated using (id = auth.uid());
create policy users_insert_own on public.users for insert to authenticated with check (id = auth.uid());
create policy users_update_own on public.users for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

alter table public.user_profiles enable row level security;
drop policy if exists user_profiles_select_own on public.user_profiles;
drop policy if exists user_profiles_upsert_own on public.user_profiles;
create policy user_profiles_select_own on public.user_profiles for select to authenticated using (user_id = auth.uid());
create policy user_profiles_upsert_own on public.user_profiles for insert to authenticated with check (user_id = auth.uid());

alter table public.user_progress enable row level security;
drop policy if exists user_progress_select_own on public.user_progress;
drop policy if exists user_progress_upsert_own on public.user_progress;
drop policy if exists user_progress_update_own on public.user_progress;
create policy user_progress_select_own on public.user_progress for select to authenticated using (user_id = auth.uid());
create policy user_progress_upsert_own on public.user_progress for insert to authenticated with check (user_id = auth.uid());
create policy user_progress_update_own on public.user_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table public.progress_entries enable row level security;
drop policy if exists progress_entries_insert_own on public.progress_entries;
drop policy if exists progress_entries_select_own on public.progress_entries;
create policy progress_entries_insert_own on public.progress_entries for insert to authenticated with check (user_id = auth.uid());
create policy progress_entries_select_own on public.progress_entries for select to authenticated using (user_id = auth.uid());

-- Frequencies: habilitar RLS e permitir leitura pública
alter table public.frequencies enable row level security;
drop policy if exists frequencies_select_all on public.frequencies;
create policy frequencies_select_all on public.frequencies for select using (true);

grant usage on schema public to authenticated;

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end$$;

-- attach updated_at triggers
create trigger trg_users_set_updated_at before update on public.users
  for each row execute procedure public.set_updated_at();
create trigger trg_user_profiles_set_updated_at before update on public.user_profiles
  for each row execute procedure public.set_updated_at();
create trigger trg_frequencies_set_updated_at before update on public.frequencies
  for each row execute procedure public.set_updated_at();
create trigger trg_user_progress_set_updated_at before update on public.user_progress
  for each row execute procedure public.set_updated_at();

-- compute current day helper (clamp 1..7)
create or replace function public.compute_current_day(started date)
returns smallint language plpgsql as $$
declare
  diff_days int;
begin
  diff_days := floor(extract(epoch from (now()::date - started)) / 86400)::int + 1;
  if diff_days < 1 then diff_days := 1; end if;
  if diff_days > 7 then diff_days := 7; end if;
  return diff_days::smallint;
end$$;

-- bump progress on entry
create or replace function public.bump_progress_on_entry()
returns trigger language plpgsql as $$
declare
  cur_day smallint;
  cur_last smallint;
begin
  update public.user_progress up
     set last_seen_at = now(),
         updated_at = now(),
         last_unlocked_day = greatest(up.last_unlocked_day, public.compute_current_day(up.started_at))
   where up.user_id = new.user_id;
  return new;
end$$;

-- attach trigger to progress_entries
create trigger trg_progress_entries_after_insert
  after insert on public.progress_entries
  for each row execute procedure public.bump_progress_on_entry();

-- seed minimal frequencies (2 per day, days 1..7)
insert into public.frequencies (slug, title, description, audio_url, duration_seconds, unlock_day, order_in_day, is_active)
select s.slug, s.title, s.description, s.audio_url, s.duration_seconds, s.unlock_day, s.order_in_day, true
from (
  values
  ('dia1-freq1','Día 1 - Frecuencia 1','Primera sesión del día 1','https://example.com/audio/dia1_f1.mp3',900,1,1),
  ('dia1-freq2','Día 1 - Frecuencia 2','Segunda sesión del día 1','https://example.com/audio/dia1_f2.mp3',900,1,2),
  ('dia2-freq1','Día 2 - Frecuencia 1','Primera sesión del día 2','https://example.com/audio/dia2_f1.mp3',900,2,1),
  ('dia2-freq2','Día 2 - Frecuencia 2','Segunda sesión del día 2','https://example.com/audio/dia2_f2.mp3',900,2,2),
  ('dia3-freq1','Día 3 - Frecuencia 1','Primera sesión del día 3','https://example.com/audio/dia3_f1.mp3',900,3,1),
  ('dia3-freq2','Día 3 - Frecuencia 2','Segunda sesión del día 3','https://example.com/audio/dia3_f2.mp3',900,3,2),
  ('dia4-freq1','Día 4 - Frecuencia 1','Primera sesión del día 4','https://example.com/audio/dia4_f1.mp3',900,4,1),
  ('dia4-freq2','Día 4 - Frecuencia 2','Segunda sesión del día 4','https://example.com/audio/dia4_f2.mp3',900,4,2),
  ('dia5-freq1','Día 5 - Frecuencia 1','Primera sesión del día 5','https://example.com/audio/dia5_f1.mp3',900,5,1),
  ('dia5-freq2','Día 5 - Frecuencia 2','Segunda sesión del día 5','https://example.com/audio/dia5_f2.mp3',900,5,2),
  ('dia6-freq1','Día 6 - Frecuencia 1','Primera sesión del día 6','https://example.com/audio/dia6_f1.mp3',900,6,1),
  ('dia6-freq2','Día 6 - Frecuencia 2','Segunda sesión del día 6','https://example.com/audio/dia6_f2.mp3',900,6,2),
  ('dia7-freq1','Día 7 - Frecuencia 1','Primera sesión del día 7','https://example.com/audio/dia7_f1.mp3',900,7,1),
  ('dia7-freq2','Día 7 - Frecuencia 2','Segunda sesión del día 7','https://example.com/audio/dia7_f2.mp3',900,7,2)
) as s(slug,title,description,audio_url,duration_seconds,unlock_day,order_in_day)
where not exists (
  select 1 from public.frequencies f where f.slug = s.slug
);