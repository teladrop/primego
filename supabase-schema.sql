-- ============================================================
-- WestMark Supabase Schema
-- Run this in the Supabase SQL Editor (project > SQL Editor)
-- ============================================================

-- Posts
create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  date         text not null default '',
  category     text not null default '',
  read_time    text not null default '5 min',
  image        text not null default '/blog/shutdown.jpg',
  body         text[] not null default '{}',
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Hero slides
create table if not exists hero_slides (
  id        uuid primary key default gen_random_uuid(),
  image     text not null default '/hero.jpg',
  alt       text not null default '',
  headline  text not null default '',
  subtext   text not null default '',
  cta       jsonb not null default '{"label":"Explore Our Services","href":"/services"}',
  "order"   integer not null default 0
);

-- Seed hero slides (delete first to avoid dupes)
delete from hero_slides;
insert into hero_slides (image, alt, headline, subtext, cta, "order") values
  ('/hero.jpg',      'Industrial process plant with yellow safety walkways', 'Clean. Safe. Well-Managed.', 'Integrated industrial cleaning and facility management for facilities that cannot afford downtime.', '{"label":"Explore Our Services","href":"/services"}', 0),
  ('/hero-full.jpg', 'WestMark team at work on a facility',                   'One Partner. Every Facility Need.', 'From factory floors to commercial properties — WestMark delivers a consistent standard across every site.', '{"label":"View Our Projects","href":"/projects"}', 1);

-- Contacts
create table if not exists contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text not null default '',
  email       text not null,
  phone       text not null default '',
  need        text not null default 'General',
  message     text not null,
  received_at timestamptz not null default now(),
  read        boolean not null default false
);

-- Section images (single-row config)
create table if not exists section_images (
  id         integer primary key default 1,
  about      text not null default '/hero.jpg',
  projects   text not null default '/hero.jpg',
  home_about text not null default '/hero.jpg'
);
insert into section_images (id, about, projects, home_about)
  values (1, '/hero.jpg', '/hero.jpg', '/hero.jpg')
  on conflict (id) do nothing;

-- Projects
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  sector      text not null default '',
  location    text not null default '',
  summary     text not null default '',
  outcome     text not null default '',
  description text not null default '',
  images      text[] not null default '{}',
  cover_image text not null default '/hero.jpg',
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Storage bucket ────────────────────────────────────────────────────────────
-- Run this separately in Storage > New Bucket (UI) or via SQL:
-- insert into storage.buckets (id, name, public) values ('westmark-media', 'westmark-media', true);

-- RLS: allow public reads, service-role writes (bucket is public)
-- No extra policies needed if using service role key on the server.
-- For anon uploads (browser direct), add:
-- create policy "allow anon upload" on storage.objects for insert to anon with check (bucket_id = 'westmark-media');
-- create policy "allow public read" on storage.objects for select to anon using (bucket_id = 'westmark-media');
