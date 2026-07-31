create extension if not exists pgcrypto;

create table if not exists public.reader_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (
    event_type in (
      'reader.answer',
      'reader.action_confirmed',
      'reader.content_gap',
      'experiment.replayed'
    )
  ),
  publication_key text not null,
  page_number integer check (page_number between 1 and 9),
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists reader_events_publication_created_idx
  on public.reader_events (publication_key, created_at desc);

alter table public.reader_events enable row level security;

-- The application writes through a server-only service role. No anonymous
-- browser read or write policy is intentionally defined.
