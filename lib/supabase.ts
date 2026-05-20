/**
 * Supabase client setup for Milano Pizzeria
 *
 * Required .env.local variables:
 *   NEXT_PUBLIC_SUPABASE_URL=https://XXXX.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...   (for server-side admin operations)
 *
 * Install: npm install @supabase/supabase-js
 *
 * SQL setup (run once in Supabase SQL Editor):
 *   CREATE TABLE IF NOT EXISTS reservations (
 *     id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *     reservation_code text UNIQUE NOT NULL,
 *     name             text NOT NULL,
 *     phone            text NOT NULL,
 *     date             date NOT NULL,
 *     time             text NOT NULL,
 *     persons          integer NOT NULL DEFAULT 1,
 *     occasion         text NOT NULL DEFAULT 'other',
 *     notes            text,
 *     status           text NOT NULL DEFAULT 'Neu',
 *     created_at       timestamptz DEFAULT now() NOT NULL
 *   );
 *   ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "public_insert" ON reservations FOR INSERT WITH CHECK (true);
 *   CREATE POLICY "service_all"  ON reservations USING (auth.role() = 'service_role');
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url     = process.env.NEXT_PUBLIC_SUPABASE_URL         || '';
const anon    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY    || '';
const service = process.env.SUPABASE_SERVICE_ROLE_KEY        || anon;

if (!url || !anon) {
  console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

// Browser client (respects RLS)
export const supabase: SupabaseClient = createClient(url, anon);

// Server/admin client (bypasses RLS — use ONLY in API routes)
export const supabaseAdmin: SupabaseClient = createClient(url, service);

export type ReservationStatus = 'Neu' | 'Bestätigt' | 'Storniert';

export interface Reservation {
  id: string;
  reservation_code: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  persons: number;
  occasion: string;
  notes: string | null;
  status: ReservationStatus;
  created_at: string;
}
