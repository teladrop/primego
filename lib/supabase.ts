import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client (uses service role key for admin writes)
export function getSupabaseServer() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? key;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

// Public client (browser-safe, anon key only)
export function getSupabaseClient() {
  return createClient(url, key);
}
