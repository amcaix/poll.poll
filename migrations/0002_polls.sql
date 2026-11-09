-- Shared polls. Rows are unowned (no accounts): a random host token
-- gates reset, and a per-phone voter token allows one vote per device.
create table if not exists polls (
  id          text primary key,
  question    text not null,
  host_token  text not null,
  created_at  timestamptz not null default now()
);

create table if not exists poll_options (
  id        text primary key,
  poll_id   text not null references polls (id) on delete cascade,
  label     text not null,
  position  integer not null
);

create index if not exists poll_options_poll_idx on poll_options (poll_id, position);

create table if not exists poll_votes (
  id           text primary key,
  poll_id      text not null references polls (id) on delete cascade,
  option_id    text not null references poll_options (id) on delete cascade,
  voter_token  text not null,
  created_at   timestamptz not null default now(),
  unique (poll_id, voter_token)
);

create index if not exists poll_votes_poll_idx on poll_votes (poll_id);
