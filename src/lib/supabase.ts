import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/** Browser client (uses anon key) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Server client (uses service role key — never expose to browser) */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/** Check if Supabase is configured (not placeholder) */
export function isSupabaseConfigured(): boolean {
  return (
    !!supabaseUrl &&
    !supabaseUrl.includes("placeholder") &&
    !!supabaseAnonKey &&
    supabaseAnonKey !== "placeholder"
  );
}

/**
 * Track a generation for usage limits.
 * Table schema (create in Supabase):
 *   CREATE TABLE usage (
 *     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *     user_id text NOT NULL,
 *     month text NOT NULL,  -- e.g. '2026-03'
 *     created_at timestamptz DEFAULT now()
 *   );
 */
export async function trackGeneration(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const month = new Date().toISOString().slice(0, 7);
  await supabaseAdmin.from("usage").insert({ user_id: userId, month });
}

/** Get generation count for a user this month */
export async function getMonthlyUsage(userId: string): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const month = new Date().toISOString().slice(0, 7);
  const { count } = await supabaseAdmin
    .from("usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("month", month);
  return count || 0;
}
