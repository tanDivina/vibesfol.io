<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import type { Database } from "$lib/DatabaseDefinitions"

  export let open = false
  export let project: Database["public"]["Tables"]["projects"]["Row"] | null =
    null

  const dispatch = createEventDispatcher<{
    close: void
    submit: {
      project: Database["public"]["Tables"]["projects"]["Insert"]
      technologies: Database["public"]["Tables"]["technologies"]["Row"][]
    }
  }>()

  let title = ""
  let url = ""
  let description = ""
  let screenshotUrl = ""
  let status: "LIVE" | "IN PROGRESS" | "DEMO" = "LIVE"
  let selectedTechnologies: Database["public"]["Tables"]["technologies"]["Row"][] =
    []
  let technologies: Database["public"]["Tables"]["technologies"]["Row"][] = []
  let loading = false
  let screenshotLoading = false
  let error: string | null = null

  onMount(async () => {
    if (open) {
      const { data, error: fetchError } = await supabase
        .from("technologies")
        .select("id, name")
        .order("name")

      if (fetchError) {
        console.error("Error fetching technologies:", fetchError)
        error = "Failed to load technologies"
      } else {
        technologies = data || []
      }

      if (project) {
        title = project.title
        url = project.url || ""
        description = project.description || ""
        screenshotUrl = project.screenshot_url || ""
        status = project.status
        // TODO: Fetch selected technologies for the project
      }
    }
  })

  $: if (open && !project) {
    title = ""
    url = ""
    description = ""
    screenshotUrl = ""
    status = "LIVE"
    selectedTechnologies = []
  }

  async function handleSubmit() {
    if (!title.trim()) {
      error = "Title is required"
      return
    }

    loading = true
    error = null

    const projectData: Database["public"]["Tables"]["projects"]["Insert"] = {
      title: title.trim(),
      url: url.trim() || null,
      description: description.trim() || null,
      screenshot_url: screenshotUrl.trim() || null,
      status,
    }

    try {
      if (project) {
        // TODO: Update project
        console.log("Updating project:", projectData)
      } else {
        // TODO: Create project
        console.log("Creating project:", projectData)
      }

      dispatch("submit", {
        project: projectData,
        technologies: selectedTechnologies,
      })
    } catch (err) {
      console.error("Error saving project:", err)
      error = "Failed to save project"
    } finally {
      loading = false
    }
  }

  async function generateScreenshot() {
    if (!url.trim()) {
      error = "URL is required to generate a screenshot"
      return
    }

    screenshotLoading = true
    error = null

    try {
      const response = await fetch("/api/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to generate screenshot")
      }

      const { url: newScreenshotUrl } = await response.json()
      screenshotUrl = newScreenshotUrl
    } catch (err) {
      console.error("Error generating screenshot:", err)
      error =
        "Failed to generate screenshot. Please check the URL and try again."
    } finally {
      screenshotLoading = false
    }
  }

  function close() {
    dispatch("close")
  }
</script>

{#if open}
  <div
    class="fixed inset-0 bg-black-50 flex items-center justify-center z-50"
  >
    <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4">
        {project ? "Edit Project" : "Add New Project"}
      </h2>

      {#if error}
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          <p>{error}</p>
        </div>
      {/if}

      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-control mb-4">
          <div class="label">
            <span class="label-text">Title *</span>
          </div>
          <input
            type="text"
            id="project-title"
            bind:value={title}
            class="input input-bordered w-full"
            placeholder="Project Title"
            required
          />
        </div>

        <div class="form-control mb-4">
          <div class="label">
            <span class="label-text">URL</span>
          </div>
          <div class="flex gap-2">
            <input
              type="url"
              id="project-url"
              bind:value={url}
              class="input input-bordered w-full"
              placeholder="https://example.com"
            />
            <button
              type="button"
              class="btn btn-secondary"
              on:click={generateScreenshot}
              disabled={!url.trim() || screenshotLoading}
            >
              {#if screenshotLoading}
                <span class="loading loading-spinner loading-sm"></span>
                Generating...
              {:else}
                📸 Generate Screenshot
              {/if}
            </button>
          </div>
        </div>

        <!-- Screenshot Preview -->
        {#if screenshotUrl}
          <div class="form-control mb-4">
            <div class="label">
              <span class="label-text">Screenshot Preview</span>
            </div>
            <div class="border border-base-300 rounded-lg p-2">
              <img
                src={screenshotUrl}
                alt="Project screenshot"
                class="w-full h-32 object-cover rounded"
                loading="lazy"
              />
              <div class="flex justify-between items-center mt-2">
                <span class="text-sm text-base-content/70"
                  >Screenshot generated successfully</span
                >
                <button
                  type="button"
                  class="btn btn-xs btn-ghost"
                  on:click={() => (screenshotUrl = "")}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        {/if}

        <div class="form-control mb-4">
          <div class="label">
            <span class="label-text">Description</span>
          </div>
          <textarea
            id="project-description"
            bind:value={description}
            class="textarea textarea-bordered w-full"
            placeholder="Project Description"
            rows={3}
          ></textarea>
        </div>

        <div class="form-control mb-4">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select bind:value={status} class="select select-bordered w-full">
            <option value="LIVE">Live</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="DEMO">Demo</option>
          </select>
        </div>

        <div class="form-control mb-6">
          <div class="label">
            <span class="label-text">Tech Stack</span>
          </div>
          <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-base-300 rounded p-3">
            {#each technologies as tech (tech.id)}
              <label class="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  bind:group={selectedTechnologies}
                  value={tech}
                  class="checkbox checkbox-primary checkbox-sm mr-2"
                />
                <span class="label-text text-sm">{tech.name}</span>
              </label>
            {/each}
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" on:click={close} class="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : project ? "Update" : "Add"} Project
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}