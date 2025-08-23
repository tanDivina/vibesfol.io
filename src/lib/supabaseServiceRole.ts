import { createClient } from "@supabase/supabase-js"
import { PRIVATE_SUPABASE_SERVICE_ROLE } from "$env/static/private"
import { PUBLIC_SUPABASE_URL } from "$env/static/public"
import type { Database } from "./DatabaseDefinitions"

export const supabaseServiceRole = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PRIVATE_SUPABASE_SERVICE_ROLE,
)
