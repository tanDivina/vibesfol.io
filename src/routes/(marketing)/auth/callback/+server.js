// src/routes/auth/callback/+server.js
import { redirect } from "@sveltejs/kit"
import { isAuthApiError } from "@supabase/supabase-js"

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next")
  
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      // If you open in another browser, need to redirect to login.
      // Should not display error
      if (isAuthApiError(error)) {
        const redirectUrl = next ? `/login/sign_in?verified=true&next=${encodeURIComponent(next)}` : "/login/sign_in?verified=true"
        redirect(303, redirectUrl)
      } else {
        throw error
      }
    }
  }

  if (next) {
    // For password reset, add a flag to indicate this is a password reset session
    if (next.includes('/dashboard/settings')) {
      redirect(303, `${next}?password_reset=true`)
    } else {
      redirect(303, next)
    }
  }

  redirect(303, "/dashboard")
}
