import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/login/sign_in?verified=true"

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Check if this is a password reset by looking at the next parameter
      if (next.includes("reset_password")) {
        throw redirect(303, "/login/reset_password")
      }
      // If this is an email confirmation (no specific next parameter), redirect to sign in
      else if (!url.searchParams.get("next")) {
        throw redirect(303, "/login/sign_in?verified=true")
      }
      else {
        throw redirect(303, next)
      }
    }
  }

  // If there's an error or no code, redirect to login
  throw redirect(303, "/login")
}