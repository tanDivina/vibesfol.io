<script lang="ts">
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"
  import { page } from "$app/stores"

  let { data } = $props()
  let { supabase } = data

  let email = $state("")
  let password = $state("")
  let loading = $state(false)
  let error = $state<string | null>(null)
  let success = $state(false)
  let emailSent = $state(false)

  onMount(() => {
    // Check for error in URL params
    const urlError = $page.url.searchParams.get("error")
    if (urlError) {
      error = decodeURIComponent(urlError)
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        setTimeout(() => {
          goto("/dashboard")
        }, 1)
      }
    })
  })

  async function handleSignUp() {
    if (!email || !password) {
      error = "Please fill in both email and password"
      return
    }

    if (password.length < 6) {
      error = "Password must be at least 6 characters long"
      return
    }

    loading = true
    error = null

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        throw signUpError
      }

      if (signUpData.user && !signUpData.session) {
        // Email confirmation required
        emailSent = true
        success = true
      } else if (signUpData.session) {
        // Immediate sign in (email confirmation disabled)
        console.log("User signed up and logged in immediately")
        goto("/dashboard")
      }
    } catch (err: any) {
      error = err.message
      console.error("Sign up error:", err)
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Sign Up</h1>

{#if success && emailSent}
  <div class="alert alert-success mb-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <h3 class="font-bold">Check your email!</h3>
      <div class="text-sm">We've sent a confirmation link to {email}. Click the link to complete your registration.</div>
    </div>
  </div>
  <div class="text-center">
    <a href="/login/sign_in" class="btn btn-outline">Go to Sign In</a>
  </div>
{:else}
{#if error}
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
  >
    <p>{error}</p>
  </div>
{/if}

<form onsubmit={handleSignUp}>
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
      disabled={loading}
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
      disabled={loading}
    />
    <div class="label">
      <span class="label-text-alt">Minimum 6 characters</span>
    </div>
  </div>

  <button
    type="submit"
    class="btn btn-primary w-full"
    disabled={loading}
  >
    {loading ? "Signing Up..." : "Sign Up"}
  </button>
</form>

<div class="text-l text-slate-800 mt-4 mb-2">
  Have an account? <a class="underline" href="/login/sign_in">Sign in</a>.
</div>
{/if}