import { createClient } from "@supabase/supabase-js"
import { env } from "$env/dynamic/private"
import { env as publicEnv } from "$env/dynamic/public"

export const supabaseServiceRole = createClient(
  publicEnv.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || "",
  env.PRIVATE_SUPABASE_SERVICE_ROLE || process.env.PRIVATE_SUPABASE_SERVICE_ROLE || "",
)
