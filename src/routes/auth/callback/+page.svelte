<script lang="ts">
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"

  onMount(() => {
    // This page should redirect via the server load function
    // If we reach here, something went wrong
    setTimeout(() => {
      goto("/login")
    }, 3000)
  })
</script>

<svelte:head>
  <title>Authenticating...</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center">
  <div class="text-center">
    <div class="loading loading-spinner loading-lg mb-4"></div>
    <h1 class="text-2xl font-bold mb-2">Authenticating...</h1>
    <p class="text-gray-600">Please wait while we complete your authentication.</p>
  </div>
</div>