
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'image_formats') THEN
    CREATE TYPE image_formats AS ENUM ('jpeg', 'png', 'webp', 'gif', 'svg');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,

  created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  pathname VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT '',
  description VARCHAR(10000) NOT NULL DEFAULT '',

  -- metadata
  format image_formats NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  space VARCHAR(10) NOT NULL, -- how long can this be?
  channels SMALLINT NOT NULL,
  density SMALLINT DEFAULT -1,
  has_profile BOOLEAN NOT NULL,
  has_alpha BOOLEAN NOT NULL,
  orientation SMALLINT NOT NULL,
  exif BYTEA,
  icc BYTEA,
  iptc BYTEA,
  xmp BYTEA,

  -- stats
  channel_stats JSONB NOT NULL,
  is_opaque BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,

  CHECK (name = LOWER(TRIM(name)))
);

CREATE TABLE IF NOT EXISTS images_to_tags (
  image_id INTEGER NOT NULL REFERENCES images,
  tag_id INTEGER NOT NULL REFERENCES tags,

  UNIQUE (image_id, tag_id)
);
