-- Drop existing table and recreate with correct schema
DROP TABLE IF EXISTS users CASCADE;

-- Create users table for learning platform
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  topics TEXT[] DEFAULT '{}',
  level INTEGER GENERATED ALWAYS AS (FLOOR(xp / 100) + 1) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for leaderboard queries (sorted by XP desc)
CREATE INDEX idx_users_xp ON users(xp DESC);

-- Index for name lookups
CREATE INDEX idx_users_name ON users(name);

-- Enable Row Level Security (RLS) but allow all operations (no auth system)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
