import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/dashboard"

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      throw redirect(303, next)
    }
  }

  // If there's an error or no code, redirect to login
  throw redirect(303, "/login")
}