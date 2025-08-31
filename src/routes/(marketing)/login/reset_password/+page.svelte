<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"

  let newPassword = ""
  let confirmPassword = ""
  let loading = false
  let error: string | null = null
  let success = false

  onMount(async () => {
    // Check if user has a valid session for password reset
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      // No valid session, redirect to forgot password
      goto("/login/forgot_password")
      return
    }

    // Check if this is a recovery session
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    const recoveryAmr = aal?.currentAuthenticationMethods?.find(x => x.method === 'recovery')
    
    if (!recoveryAmr) {
      // Not a recovery session, redirect to regular password change
      goto("/account/settings/change_password")
      return
    }

    // Check if recovery session is still valid (15 minutes)
    const timeSinceLogin = Date.now() - recoveryAmr.timestamp * 1000
    if (timeSinceLogin > 1000 * 60 * 15) {
      error = "Password reset link has expired. Please request a new one."
      return
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
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword
      })
      
      if (updateError) throw updateError
      
      success = true
      
      // Redirect to sign in after successful password reset
      setTimeout(() => {
        goto("/login/sign_in?password_reset=true")
      }, 2000)
      
    } catch (err: any) {
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
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="font-bold">Password Updated!</h3>
            <div class="text-sm">Redirecting you to sign in...</div>
          </div>
        </div>
      {:else}
        {#if error}
          <div class="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            disabled={loading}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div class="text-center mt-4">
          <a href="/login/forgot_password" class="link text-sm">
            Need a new reset link?
          </a>
        </div>
      {/if}
    </div>
  </div>
</div>
</svelte:head>
</script>