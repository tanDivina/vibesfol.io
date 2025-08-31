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

  async function handleSignIn() {
    if (!email || !password) {
      error = "Please fill in both email and password"
      return
    }

    loading = true
    error = null

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }
    } catch (err: any) {
      error = err.message
      console.error("Sign in error:", err)
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>

{#if $page.url.searchParams.get("verified") == "true"}
  <div role="alert" class="alert alert-success mb-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>Email verified! Please sign in.</span>
  </div>
{/if}

{#if $page.url.searchParams.get("password_reset") == "true"}
  <div role="alert" class="alert alert-success mb-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>Password reset successful! Please sign in with your new password.</span>
  </div>
{/if}

<h1 class="text-2xl font-bold mb-6">Sign In</h1>

{#if error}
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
  >
    <p>{error}</p>
  </div>
{/if}

<form on:submit|preventDefault={handleSignIn}>
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

  <button
    type="submit"
    class="btn btn-primary w-full"
    disabled={loading}
  >
    {loading ? "Signing In..." : "Sign In"}
  </button>
</form>

<div class="text-l text-slate-800 mt-4">
  <a class="underline" href="/login/forgot_password">Forgot password?</a>
</div>
<div class="text-l text-slate-800 mt-3">
  Don't have an account? <a class="underline" href="/login/sign_up">Sign up</a>.
</div>