<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import type { Database } from '$lib/DatabaseDefinitions';

  let clientPortals: Database['public']['Tables']['client_portals']['Row'][] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('client_portals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      clientPortals = data || [];
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Client Portals | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Client Portals</h1>

  {#if loading}
    <p>Loading client portals...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each clientPortals as portal}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{portal.client_name}</h2>
            <p class="text-sm text-gray-500">{portal.client_email}</p>
            <p class="mt-4">{portal.project_description}</p>
            <div class="card-actions justify-end mt-4">
              <span class="badge {portal.is_active ? 'badge-success' : 'badge-error'}">
                {portal.is_active ? 'Active' : 'Inactive'}
              </span>
              <a href="/client-portal/{portal.access_token}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                View Portal
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
