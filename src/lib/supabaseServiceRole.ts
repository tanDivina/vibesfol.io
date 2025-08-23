import { createClient } from "@supabase/supabase-js"
import { env } from "$env/dynamic/private"
import { env as publicEnv } from "$env/dynamic/public"
import type { Database } from "./DatabaseDefinitions"

// Check if environment variables are available
const supabaseUrl = publicEnv.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || ""
const serviceRoleKey = env.PRIVATE_SUPABASE_SERVICE_ROLE || process.env.PRIVATE_SUPABASE_SERVICE_ROLE || ""

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("Supabase service role environment variables not found. Please connect to Supabase.")
}

export const supabaseServiceRole = createClient<Database>(
  supabaseUrl,
  serviceRoleKey,
)
