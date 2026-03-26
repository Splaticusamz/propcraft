#!/usr/bin/env npx ts-node
/**
 * Check and report PropCraft usage stats.
 * Run: npx ts-node scripts/check-usage.ts
 */

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    console.log("⚠️  Supabase not configured. Skipping usage check.");
    console.log("   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
    return;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, supabaseKey);

  const month = new Date().toISOString().slice(0, 7);

  const { count: totalThisMonth } = await supabase
    .from("usage")
    .select("*", { count: "exact", head: true })
    .eq("month", month);

  const { data: users } = await supabase
    .from("usage")
    .select("user_id")
    .eq("month", month);

  const uniqueUsers = new Set(users?.map((u: { user_id: string }) => u.user_id)).size;

  console.log("📊 PropCraft Usage Report");
  console.log("========================");
  console.log(`Month: ${month}`);
  console.log(`Total generations: ${totalThisMonth || 0}`);
  console.log(`Unique users: ${uniqueUsers}`);
}

main().catch(console.error);
