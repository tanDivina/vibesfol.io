<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import type { Database } from "$lib/DatabaseDefinitions"
  import { page } from "$app/stores"

  let portal: Database["public"]["Tables"]["client_portals"]["Row"] | null =
    null
  let loading = true
  let error: string | null = null

  onMount(async () => {
    const token = $page.params.token
    if (!token) {
      error = "Access token missing."
      loading = false
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("client_portals")
        .select("*")
        .eq("access_token", token)
        .eq("is_active", true)
        .single()

      if (fetchError) throw fetchError
      if (!data) {
        error = "Invalid or inactive portal."
      } else {
        portal = data
      }
    } catch (err: any) {
      error = err.message
    } finally {
      loading = false
    }
  })
</script>

<svelte:head>
  <title
    >{portal?.client_name ? `${portal.client_name}'s Portal` : "Client Portal"} |
    MyDevfol.io</title
  >
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Back to Homepage Button -->
  <div class="mb-6">
    <a href="/" class="btn btn-outline btn-sm">
      <svg
        class="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      Back to Homepage
    </a>
  </div>

  {#if loading}
    <p>Loading client portal...</p>
  {:else if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{error}</p>
    </div>
  {:else if portal}
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-3xl mb-4">Welcome, {portal.client_name}!</h1>
        <p class="text-lg mb-6">Here's an update on your project:</p>

        <div class="prose max-w-none">
          {#if portal.project_description}
            <p>{portal.project_description}</p>
          {:else}
            <p class="text-gray-500">No project description provided yet.</p>
          {/if}
        </div>

        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Project Files & Updates</h2>
          <p class="text-gray-600">
            This section will display project files, mockups, and progress
            updates.
          </p>
          <!-- TODO: Implement file display and updates -->
        </div>
      </div>
    </div>
  {/if}
</div>
