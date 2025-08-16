<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import ProjectForm from '$lib/ProjectForm.svelte';
  import type { Database } from '$lib/DatabaseDefinitions';

  let projects: Database['public']['Tables']['projects']['Row'][] = [];
  let loading = true;
  let error: string | null = null;
  let showForm = false;
  let currentProject: Database['public']['Tables']['projects']['Row'] | null = null;

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      error = fetchError.message;
    } else {
      projects = data || [];
    }

    loading = false;
  });

  function openForm(project: Database['public']['Tables']['projects']['Row'] | null = null) {
    currentProject = project;
    showForm = true;
  }

  function closeForm() {
    showForm = false;
    currentProject = null;
  }

  async function handleProjectSubmit({ project: projectData, technologies }: { project: Database['public']['Tables']['projects']['Insert']; technologies: Database['public']['Tables']['technologies']['Row'][] }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    loading = true;
    error = null;

    try {
      let newProject: Database['public']['Tables']['projects']['Row'] | null = null;

      if (currentProject) {
        // Update project
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', currentProject.id);

        if (updateError) throw updateError;

        // Update projects array
        projects = projects.map(p => p.id === currentProject!.id ? { ...p, ...projectData } : p);
        newProject = { ...currentProject, ...projectData };
      } else {
        // Create project
        const { data: createdProject, error: insertError } = await supabase
          .from('projects')
          .insert({ ...projectData, user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;

        newProject = createdProject;
        // Add to projects array
        projects = [newProject, ...projects];
      }

      // Update project_technologies join table
      if (newProject) {
        // Delete existing technologies
        const { error: deleteError } = await supabase
          .from('project_technologies')
          .delete()
          .eq('project_id', newProject.id);

        if (deleteError) throw deleteError;

        // Insert new technologies
        if (technologies.length > 0) {
          const projectTechnologies = technologies.map(tech => ({
            project_id: newProject!.id,
            technology_id: tech.id,
          }));

          const { error: insertError } = await supabase
            .from('project_technologies')
            .insert(projectTechnologies);

          if (insertError) throw insertError;
        }
      }
    } catch (err) {
      console.error('Error saving project:', err);
      error = 'Failed to save project';
    } finally {
      loading = false;
      closeForm();
    }

    // After successful save, trigger gamification checks
    if (!error) {
      const { gamificationService } = await import('$lib/gamification');
      await gamificationService.calculatePortfolioScore(user.id);
      await gamificationService.checkAchievements(user.id);
    }
  }

  async function deleteProject(projectId: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    loading = true;
    error = null;

    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (deleteError) throw deleteError;

      // Remove from projects array
      projects = projects.filter(p => p.id !== projectId);
    } catch (err) {
      console.error('Error deleting project:', err);
      error = 'Failed to delete project';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>My Projects | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">My Projects</h1>

  {#if loading}
    <div class="text-center py-12">
      <p class="text-gray-600">Loading projects...</p>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>{error}</p>
    </div>
  {:else if projects.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-600 mb-4">You haven't added any projects yet.</p>
      <button class="btn btn-primary" on:click={() => openForm()}>Add Your First Project</button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project (project.id)}
        <div class="card bg-base-100 shadow-xl">
          <figure class="h-48 bg-gray-200">
            {#if project.screenshot_url}
              <img src={project.screenshot_url} alt={project.title} class="object-cover w-full h-full" />
            {:else}
              <div class="flex items-center justify-center w-full h-full text-gray-500">
                <span>No Screenshot</span>
              </div>
            {/if}
          </figure>
          <div class="card-body">
            <h2 class="card-title">{project.title}</h2>
            <p class="text-gray-600">{project.description}</p>
            <div class="card-actions justify-between items-center">
              <div class="badge badge-outline">{project.status}</div>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-primary" on:click={() => openForm(project)}>Edit</button>
                <button class="btn btn-sm btn-error" on:click={() => deleteProject(project.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <ProjectForm 
    open={showForm} 
    project={currentProject} 
    on:close={closeForm}
    on:submit={handleProjectSubmit}
  />
</div>
