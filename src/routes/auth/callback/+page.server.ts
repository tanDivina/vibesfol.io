import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/login/sign_in?verified=true"

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // If this is an email confirmation (no specific next parameter), redirect to sign in
      if (!url.searchParams.get("next")) {
        throw redirect(303, "/login/sign_in?verified=true")
      }
      throw redirect(303, next)
    }
  }

  // If there's an error or no code, redirect to login
  throw redirect(303, "/login")
}