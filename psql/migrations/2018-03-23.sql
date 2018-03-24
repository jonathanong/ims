
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'image_formats') THEN
    CREATE TYPE image_formats AS ENUM ('jpeg', 'png', 'webp', 'gif', 'svg');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,

  created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  s3_key VARCHAR(255) UNIQUE NOT NULL,
  pathname VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT '',
  description VARCHAR(10000) NOT NULL DEFAULT '',

  deleted BOOLEAN DEFAULT FALSE,
  deleted_ts TIMESTAMP,

  -- metadata
  format image_formats NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  space VARCHAR(10) NOT NULL, -- how long can this be?
  channels SMALLINT NOT NULL,
  density SMALLINT,
  has_profile BOOLEAN NOT NULL,
  has_alpha BOOLEAN NOT NULL,
  orientation SMALLINT,
  is_opaque BOOLEAN NOT NULL,

  CHECK (pathname = LOWER(TRIM(pathname)))
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

CREATE TABLE IF NOT EXISTS image_pathname_history (
  image_id INTEGER NOT NULL REFERENCES images,
  pathname VARCHAR(255) NOT NULL,
  created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CHECK (pathname = LOWER(TRIM(pathname)))
);
