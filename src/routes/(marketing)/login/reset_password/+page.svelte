<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"

  let newPassword = ""
  let confirmPassword = ""
  let loading = false
  let error: string | null = null
  let success = false
  let sessionValid = false

  onMount(async () => {
    console.log("Reset password page mounted")

    try {
      // Get the current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session error:", sessionError)
        error =
          "Authentication error. Please try the password reset process again."
        return
      }

      if (!session) {
        console.log("No session found, redirecting to forgot password")
        error =
          "No valid session found. Please request a new password reset link."
        return
      }

      console.log("Session found for user:", session.user.email)

      // Check if this is a recovery session by looking at the AMR (Authentication Method Reference)
      const { data: aal, error: amrError } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

      if (amrError) {
        console.error("AMR error:", amrError)
        // AMR might not be available, continue anyway
        console.log("AMR not available, continuing with password reset")
        sessionValid = true
        return
      }

      const recoveryAmr = aal?.currentAuthenticationMethods?.find(
        (x) => x.method === "recovery",
      )

      if (!recoveryAmr) {
        console.log("Not a recovery session, but allowing password reset")
        sessionValid = true
        return
      }

      // Check if recovery session is still valid (15 minutes)
      const timeSinceLogin = Date.now() - recoveryAmr.timestamp * 1000
      const fifteenMinutes = 1000 * 60 * 15

      if (timeSinceLogin > fifteenMinutes) {
        console.log("Recovery session expired")
        error = "Password reset link has expired. Please request a new one."
        return
      }

      console.log("Valid recovery session found")
      sessionValid = true
    } catch (err) {
      console.error("Error in reset password page:", err)
      // If there's an error checking the session, still allow password reset
      console.log("Error checking session, but allowing password reset")
      sessionValid = true
    }
  })

  async function handlePasswordReset() {
    if (!newPassword || !confirmPassword) {
      error = "Please fill in both password fields"
      return
    }

    if (newPassword !== confirmPassword) {
      error = "Passwords don't match"
      return
    }

    if (newPassword.length < 6) {
      error = "Password must be at least 6 characters"
      return
    }

    loading = true
    error = null

    try {
      console.log("Attempting to update password")

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        console.error("Password update error:", updateError)
        throw updateError
      }

      console.log("Password updated successfully")
      success = true

      // Redirect to sign in after successful password reset
      setTimeout(() => {
        goto("/login/sign_in?password_reset=true")
      }, 2000)
    } catch (err: any) {
      console.error("Password reset error:", err)
      error = err.message || "Failed to update password"
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Reset Password</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-base-200">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h1 class="text-2xl font-bold text-center mb-6">Reset Your Password</h1>

      {#if success}
        <div class="alert alert-success mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="font-bold">Password Updated!</h3>
            <div class="text-sm">Redirecting you to sign in...</div>
          </div>
        </div>
      {:else if !sessionValid && error}
        <div class="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="font-bold">Session Error</h3>
            <div class="text-sm">{error}</div>
          </div>
        </div>
        <div class="text-center">
          <a href="/login/forgot_password" class="btn btn-primary">
            Request New Reset Link
          </a>
        </div>
      {:else if sessionValid}
        {#if error}
          <div class="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        {/if}

        <form on:submit|preventDefault={handlePasswordReset}>
          <div class="form-control mb-4">
            <label class="label" for="new_password">
              <span class="label-text">New Password</span>
            </label>
            <input
              type="password"
              id="new_password"
              bind:value={newPassword}
              class="input input-bordered w-full"
              placeholder="Enter your new password"
              required
              disabled={loading}
            />
          </div>

          <div class="form-control mb-6">
            <label class="label" for="confirm_password">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirm_password"
              bind:value={confirmPassword}
              class="input input-bordered w-full"
              placeholder="Confirm your new password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full"
            disabled={loading || !sessionValid}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div class="text-center mt-4">
          <a href="/login/forgot_password" class="link text-sm">
            Need a new reset link?
          </a>
        </div>
      {:else}
        <div class="text-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="mt-4">Verifying your session...</p>
        </div>
      {/if}
    </div>
  </div>
</div>
