-- Indie RPG Leads — table + lockdown.
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Security model: RLS is enabled with NO policies, so the anon/publishable key
-- (exposed to the browser) can read and write NOTHING here. All app access is
-- server-side via the service-role key, which bypasses RLS, and only runs behind
-- the admin-gated (dashboard) layout + per-action admin checks.

create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  game       text not null,
  stage      text,
  fit        text,
  contact    text,
  link       text,
  source     text,
  found      date default current_date,
  status     text not null default 'new'
             check (status in ('new','contacted','replied','talks','won','nofit')),
  status_at  timestamptz,
  starred    boolean not null default false,
  notes      text default '',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
-- Intentionally no policies: deny-by-default for anon/authenticated clients.
