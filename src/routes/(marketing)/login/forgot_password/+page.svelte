<script lang="ts">
  import { page } from "$app/stores"

  let { data } = $props()
  let { supabase } = data

  let email = $state("")
  let loading = $state(false)
  let error = $state<string | null>(null)
  let success = $state(false)

  async function handleForgotPassword() {
    loading = true
    error = null

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/login/reset_password`,
        },
      )

      if (resetError) {
        throw resetError
      }

      success = true
    } catch (err: any) {
      error = err.message
      console.error("Password reset error:", err)
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Forgot Password</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-md mx-auto bg-base-100 p-8 rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold mb-6">Forgot Password</h1>

    {#if success}
      <div class="alert alert-success mb-4">
        <span>Check your email for a password reset link!</span>
      </div>
    {:else}
      {#if error}
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          <p>{error}</p>
        </div>
      {/if}

      <form onsubmit={handleForgotPassword}>
        <div class="form-control mb-6">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            class="input input-bordered w-full"
            placeholder="your@example.com"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    {/if}

    <div class="text-l text-slate-800 mt-4">
      Remember your password? <a class="underline" href="/login/sign_in"
        >Sign in</a
      >.
    </div>
  </div>
</div>
