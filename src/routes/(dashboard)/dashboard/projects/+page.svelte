<script lang="ts">
  import { onMount } from "svelte"
  import { clientSupabase } from "$lib/clientSupabase"
  import ProjectForm from "$lib/ProjectForm.svelte"
  import type { Database } from "$lib/DatabaseDefinitions"

  let projects: Database["public"]["Tables"]["projects"]["Row"][] = []
  let loading = true
  let error: string | null = null
  let showForm = false
  let currentProject: Database["public"]["Tables"]["projects"]["Row"] | null =
    null

  onMount(async () => {
    const {
      data: { user },
    } = await clientSupabase.auth.getUser()
    if (!user) {
      window.location.href = "/login"
      return
    }

    const { data, error: fetchError } = await clientSupabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (fetchError) {
      error = fetchError.message
    } else {
      projects = data || []
    }

    loading = false
  })

  function openForm(
    project: Database["public"]["Tables"]["projects"]["Row"] | null = null,
  ) {
    currentProject = project
    showForm = true
  }

  function closeForm() {
    showForm = false
    currentProject = null
  }

  async function handleProjectSubmit({
    project: projectData,
    technologies,
  }: {
    project: Database["public"]["Tables"]["projects"]["Insert"]
    technologies: Database["public"]["Tables"]["technologies"]["Row"][]
  }) {
    loading = true
    error = null

    try {
      const {
        data: { user },
      } = await clientSupabase.auth.getUser()
      if (!user) {
        throw new Error("User not authenticated")
      }

      let newProject = null

      if (currentProject) {
        // Update project
        const { error: updateError } = await clientSupabase
          .from("projects")
          .update(projectData)
          .eq("id", currentProject.id)
          .eq("user_id", user.id)

        if (updateError) throw updateError
        newProject = { ...currentProject, ...projectData }
      } else {
        // Create project
        const { data: createdProject, error: insertError } = await clientSupabase
          .from("projects")
          .insert({ ...projectData, user_id: user.id })
          .select()
          .single()

        if (insertError) throw insertError
        newProject = createdProject
      }

      // Update project_technologies join table
      if (newProject) {
        // Delete existing technologies
        const { error: deleteError } = await clientSupabase
          .from("project_technologies")
          .delete()
          .eq("project_id", newProject.id)

        if (deleteError) throw deleteError

        // Insert new technologies
        if (technologies.length > 0) {
          const projectTechnologies = technologies.map((tech) => ({
            project_id: newProject.id,
            technology_id: tech.id,
          }))

          const { error: insertError } = await clientSupabase
            .from("project_technologies")
            .insert(projectTechnologies)

          if (insertError) throw insertError
        }
      }

      // Refresh the projects list
      const { data } = await clientSupabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      projects = data || []
    } catch (err) {
      console.error("Error saving project:", err)
      error = "Failed to save project"
    } finally {
      loading = false
      closeForm()
    }
  }

  async function deleteProject(projectId: string) {
    if (!confirm("Are you sure you want to delete this project?")) return

    loading = true
    error = null

    try {
      const {
        data: { user },
      } = await clientSupabase.auth.getUser()
      if (!user) {
        throw new Error("User not authenticated")
      }

      const { error: deleteError } = await clientSupabase
        .from("projects")
        .delete()
        .eq("id", projectId)
        .eq("user_id", user.id)

      if (deleteError) throw deleteError

      // Remove from projects array
      projects = projects.filter((p) => p.id !== projectId)
    } catch (err) {
      console.error("Error deleting project:", err)
      error = "Failed to delete project"
    } finally {
      loading = false
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
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{error}</p>
    </div>
  {:else if projects.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-600 mb-4">You haven't added any projects yet.</p>
      <button class="btn btn-primary" on:click={() => openForm()}
        >Add Your First Project</button
      >
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project (project.id)}
        <div class="card bg-base-100 shadow-xl">
          <figure class="h-48 bg-gray-200">
            {#if project.screenshot_url}
              <img
                src={project.screenshot_url}
                alt={project.title}
                class="object-cover w-full h-full"
              />
            {:else}
              <div
                class="flex items-center justify-center w-full h-full text-gray-500"
              >
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
                <button
                  class="btn btn-sm btn-primary"
                  on:click={() => openForm(project)}>Edit</button
                >
                <button
                  class="btn btn-sm btn-error"
                  on:click={() => deleteProject(project.id)}>Delete</button
                >
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