CREATE TABLE IF NOT EXISTS messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  username varchar(128) NOT NULL,
  orig_msg text NOT NULL,
  tl_msg text,
  country varchar(2)
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  username varchar(128) NOT NULL,
  title varchar(256) NOT NULL,
  art_link text NOT NULL,
  artist_link text
);

CREATE TABLE IF NOT EXISTS games (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(256) NOT NULL,
  game_description text NOT NULL,
  git_link text,
  game_link text NOT NULL,
  thumbnail text
);