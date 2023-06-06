CREATE TABLE IF NOT EXISTS tp_organizations(
  id SERIAL PRIMARY KEY,
  tp_org_id integer UNIQUE,
  tp_org_name VARCHAR(100),
  tp_org_description_html text,
  tp_org_url text,
  tp_org_logo_image_default_url text,
  tp_org_subdomain VARCHAR(100),
  updated TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS events(
  id SERIAL PRIMARY KEY,
  tp_org_id integer,
  tp_id integer UNIQUE,
  tp_starts_at TIMESTAMP(0) WITH TIME ZONE,
  tp_name text,
  tp_description_short text,
  tp_description_html text,
  tp_url text,
  tp_poster_image_default_url text,
  created TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(0),
  updated TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(0),
  removed boolean DEFAULT FALSE,
  FOREIGN KEY (tp_org_id) REFERENCES tp_organizations (tp_org_id)
);