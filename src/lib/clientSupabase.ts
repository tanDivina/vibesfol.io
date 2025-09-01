import { createClient } from "@supabase/supabase-js"
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public"
import type { Database } from "./DatabaseDefinitions"

// Client-only Supabase instance - safe for browser use
export const clientSupabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)