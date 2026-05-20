-- Run this SQL once in your Supabase project dashboard
-- (SQL Editor → New Query → Paste → Run)

CREATE TABLE IF NOT EXISTS reservations (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_code text UNIQUE NOT NULL,
  name             text NOT NULL,
  phone            text NOT NULL,
  date             date NOT NULL,
  time             text NOT NULL,
  persons          integer NOT NULL DEFAULT 1,
  occasion         text NOT NULL DEFAULT 'other',
  notes            text,
  status           text NOT NULL DEFAULT 'Neu',
  created_at       timestamptz DEFAULT now() NOT NULL
);

-- Index for fast queries by date
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the reservation form)
CREATE POLICY "Allow public insert" ON reservations
  FOR INSERT WITH CHECK (true);

-- Allow service role to do everything (for the admin API)
CREATE POLICY "Allow service role full access" ON reservations
  USING (auth.role() = 'service_role');
