import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/account"
  const error_param = url.searchParams.get("error")
  const error_description = url.searchParams.get("error_description")

  console.log(
    "Auth callback - code:",
    !!code,
    "next:",
    next,
    "error:",
    error_param,
  )

  // Handle auth errors from Supabase
  if (error_param) {
    console.error("Auth callback error:", error_param, error_description)
    const errorMessage = encodeURIComponent(error_description || error_param)
    throw redirect(303, `/login?error=${errorMessage}`)
  }

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        const errorMessage = encodeURIComponent(
          error.message || "Authentication failed",
        )
        throw redirect(303, `/login?error=${errorMessage}`)
      }

      if (data.session) {
        console.log("Session created successfully for user:", data.user?.email)

        // Check if this is a password reset flow
        if (
          next.includes("reset_password") ||
          next.includes("change_password")
        ) {
          console.log("Redirecting to password reset page")
          throw redirect(303, "/login/reset_password")
        }

        // For email verification (no specific next page), redirect to dashboard
        if (next === "/account" && !url.searchParams.get("next")) {
          console.log("Email verification complete, redirecting to dashboard")
          throw redirect(303, "/dashboard")
        }

        // If next is still /account, redirect to dashboard instead
        if (next === "/account") {
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
      const errorMessage = encodeURIComponent("Authentication callback failed")
      throw redirect(303, `/login?error=${errorMessage}`)
    }
  }

  // If no code or session creation failed, redirect to login
  console.log("No code or session creation failed, redirecting to login")
  const errorMessage = encodeURIComponent("No authentication code received")
  throw redirect(303, `/login?error=${errorMessage}`)
}
