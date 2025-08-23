import { createClient } from "@supabase/supabase-js"
import { env } from "$env/dynamic/public"

// Check if environment variables are available
const supabaseUrl = env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not found. Please connect to Supabase.")
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
)
