<script lang="ts">
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  let { data } = $props()
  let { supabase } = data

  let email = $state("")
  let password = $state("")
  let loading = $state(false)
  let error = $state<string | null>(null)

  onMount(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        setTimeout(() => {
          goto("/dashboard")
        }, 1)
      }
    })
  })

  async function handleSignUp() {
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

      if (signUpData.user) {
        alert("Check your email for a confirmation link!")
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

{#if error}
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
  >
    <p>{error}</p>
  </div>
{/if}

<form on:submit|preventDefault={handleSignUp}>
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
    {loading ? "Signing Up..." : "Sign Up"}
  </button>
</form>

<div class="text-l text-slate-800 mt-4 mb-2">
  Have an account? <a class="underline" href="/login/sign_in">Sign in</a>.
</div>