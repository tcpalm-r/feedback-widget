import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.DIRECTORY_SUPABASE_URL;
const key = process.env.DIRECTORY_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getDirectoryClient(): SupabaseClient {
  if (!url || !key) {
    throw new Error('DIRECTORY_SUPABASE_URL and DIRECTORY_SUPABASE_ANON_KEY must be set.');
  }
  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
