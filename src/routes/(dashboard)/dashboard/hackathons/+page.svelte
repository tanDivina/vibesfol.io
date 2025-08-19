<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import type { Database } from "$lib/DatabaseDefinitions"

  let certificates: (Database["public"]["Tables"]["hackathon_certificates"]["Row"] & {
    hackathons: Database["public"]["Tables"]["hackathons"]["Row"]
  })[] = []
  let loading = true
  let error: string | null = null

  onMount(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/login"
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("hackathon_certificates")
        .select("*, hackathons (*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError
      certificates = data || []
    } catch (err: any) {
      error = err.message
    } finally {
      loading = false
    }
  })
</script>

<svelte:head>
  <title>Hackathon Certificates | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Hackathon Certificates</h1>

  {#if loading}
    <p>Loading certificates...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each certificates as certificate}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{certificate.hackathons.name}</h2>
            <p class="text-sm text-gray-500">
              {certificate.hackathons.organizer}
            </p>
            <p class="mt-4">
              <strong>Project:</strong>
              {certificate.project_name}
            </p>
            <p><strong>Award:</strong> {certificate.award}</p>
            {#if certificate.certificate_url}
              <a
                href={certificate.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                class="link link-primary mt-2">View Certificate</a
              >
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>