import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/account"

  console.log("Auth callback - code:", !!code, "next:", next)

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error("Error exchanging code for session:", error)
        throw redirect(303, "/login?error=auth_callback_failed")
      }

      if (data.session) {
        console.log("Session created successfully for user:", data.user?.email)
        
        // Check if this is a password reset flow
        if (next.includes("reset_password") || next.includes("change_password")) {
          console.log("Redirecting to password reset page")
          throw redirect(303, "/login/reset_password")
        }
        
        // For email verification, redirect to sign in with verification message
        if (!url.searchParams.get("next")) {
          throw redirect(303, "/login/sign_in?verified=true")
        }
        
        // Otherwise redirect to the specified next page
        throw redirect(303, next)
      }
    } catch (redirectError) {
      // If it's already a redirect, re-throw it
      if (redirectError instanceof Response) {
        throw redirectError
      }
      console.error("Unexpected error in auth callback:", redirectError)
    }
  }

  // If no code or session creation failed, redirect to login
  console.log("No code or session creation failed, redirecting to login")
  throw redirect(303, "/login?error=no_auth_code")
}