<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import type { Database } from "$lib/DatabaseDefinitions"

  let portfolioViews: any[] = []
  let projectClicks: any[] = []
  let socialClicks: any[] = []
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
      const [views, pClicks, sClicks] = await Promise.all([
        supabase.from("portfolio_views").select("*").eq("user_id", user.id),
        supabase.from("project_clicks").select("*").eq("user_id", user.id),
        supabase.from("social_clicks").select("*").eq("user_id", user.id),
      ])

      if (views.error) throw views.error
      if (pClicks.error) throw pClicks.error
      if (sClicks.error) throw sClicks.error

      portfolioViews = views.data
      projectClicks = pClicks.data
      socialClicks = sClicks.data
    } catch (err: any) {
      error = err.message
    } finally {
      loading = false
    }
  })
</script>

<svelte:head>
  <title>Analytics | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Portfolio Analytics</h1>

  {#if loading}
    <div class="text-center py-12">
      <p class="text-gray-600">Loading analytics...</p>
    </div>
  {:else if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{error}</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Total Portfolio Views</h2>
          <p class="text-4xl font-bold">{portfolioViews.length}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Total Project Clicks</h2>
          <p class="text-4xl font-bold">{projectClicks.length}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Total Social Clicks</h2>
          <p class="text-4xl font-bold">{socialClicks.length}</p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Recent Activity</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Event</th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {#each [...portfolioViews, ...projectClicks, ...socialClicks]
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 20) as event}
                <tr>
                  <td>
                    {#if event.page_path}
                      <span class="badge badge-primary">View</span>
                    {:else if event.click_type}
                      <span class="badge badge-secondary">Project Click</span>
                    {:else if event.platform}
                      <span class="badge badge-accent">Social Click</span>
                    {/if}
                  </td>
                  <td>
                    {#if event.page_path}
                      {event.page_path}
                    {:else if event.click_type}
                      {event.click_type} on project ID {event.project_id}
                    {:else if event.platform}
                      {event.platform}
                    {/if}
                  </td>
                  <td>{new Date(event.created_at).toLocaleString()}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {/if}
</div>