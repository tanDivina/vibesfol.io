<script lang="ts">
  import { invalidate } from "$app/navigation"
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"

  let email = $state("")
  let password = $state("")
  let loading = $state(false)
  let error = $state<string | null>(null)
  let authMode = $state<"signup" | "signin">("signup")

  async function handleAuth() {
    loading = true
    error = null

    try {
      if (authMode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (signUpError) {
          throw signUpError
        }

        if (data.user) {
          alert("Check your email for a login link!")
        } else {
          alert(
            "Sign up successful! Please check your email to confirm your account.",
          )
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          throw signInError
        }
      }
    } catch (err: any) {
      error = err.message
      console.error("Authentication error:", err)
    } finally {
      loading = false
    }
  }

  let session = $state(null)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        session = _session
        invalidate("supabase:auth")
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<svelte:head>
  <title>Log In</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-md mx-auto bg-base-100 p-8 rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up or Sign In</h2>

    {#if error}
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        <p>{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleAuth}>
      <div class="form-control mb-4">
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

      <div class="form-control mb-6">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="input input-bordered w-full"
          placeholder="••••••••"
          required
        />
      </div>

      <div class="flex flex-col gap-4">
        <button
          type="submit"
          class="btn btn-primary w-full"
          disabled={loading}
          on:click={() => (authMode = "signup")}
        >
          {loading && authMode === "signup" ? "Signing Up..." : "Sign Up"}
        </button>
        <button
          type="submit"
          class="btn btn-outline w-full"
          disabled={loading}
          on:click={() => (authMode = "signin")}
        >
          {loading && authMode === "signin" ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  </div>
</div>