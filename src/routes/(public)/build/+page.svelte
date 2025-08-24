<script lang="ts">
  import { onMount } from "svelte"
  import { browser } from "$app/environment"

  // Guest portfolio data stored in localStorage
  let guestProfile = {
    full_name: "",
    username: "",
    bio: "",
    website: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    medium_url: "",
    gumroad_url: "",
    substack_url: "",
    amazon_gear_list_url: "",
    whatsapp_number: "",
    youtube_url: "",
    portfolio_theme: "modern",
  }

  let guestProjects: Array<{
    id: string
    title: string
    description: string
    url: string
    screenshot_url: string
    status: string
    technologies: string[]
  }> = []

  let selectedTheme = guestProfile.portfolio_theme
  let showProjectForm = false
  let currentProject: any = null
  let previewUrl = ""
  let screenshotUrl = ""
  let url = ""
  let screenshotLoading = false
  let error: string | null = null

  // Available themes
  const themes = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean gradient design with cards",
      preview: "bg-gradient-to-r from-purple-50 to-blue-50",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple white background, focus on content",
      preview: "bg-white border border-gray-200",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Dark theme with accent colors",
      preview: "bg-gray-900 text-white",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Colorful and artistic layout",
      preview: "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100",
    },
  ]

  async function generateScreenshot() {
    if (!url.trim()) {
      error = "URL is required to generate a screenshot"
      return
    }

    screenshotLoading = true
    error = null

    try {
      const response = await fetch("/api/screenshot/public", {
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
      error = "Failed to generate screenshot. Please check the URL and try again."
    } finally {
      screenshotLoading = false
    }
  }

  // Available technologies
  const availableTechnologies = [
    "React", "Next.js", "Svelte", "SvelteKit", "TypeScript", "JavaScript",
    "Tailwind CSS", "CSS", "HTML", "Node.js", "Express", "PostgreSQL",
    "Supabase", "Firebase", "Vercel", "Netlify", "AWS", "Docker",
    "Vue.js", "Angular", "Python", "Django", "Flask", "MongoDB",
    "MySQL", "Redis", "GraphQL", "REST API", "Jest", "Cypress"
  ]

  onMount(() => {
    if (browser) {
      // Load saved data from localStorage
      const savedProfile = localStorage.getItem("guestProfile")
      const savedProjects = localStorage.getItem("guestProjects")
      
      if (savedProfile) {
        guestProfile = JSON.parse(savedProfile)
        selectedTheme = guestProfile.portfolio_theme
      }
      
      if (savedProjects) {
        guestProjects = JSON.parse(savedProjects)
      }
      
      updatePreviewUrl()
    }
  })

  function saveToLocalStorage() {
    if (browser) {
      localStorage.setItem("guestProfile", JSON.stringify(guestProfile))
      localStorage.setItem("guestProjects", JSON.stringify(guestProjects))
    }
  }

  function updatePreviewUrl() {
    if (guestProfile.username) {
      previewUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/preview/${guestProfile.username}`
    }
  }

  function handleProfileUpdate() {
    guestProfile.portfolio_theme = selectedTheme
    saveToLocalStorage()
    updatePreviewUrl()
  }

  function openProjectForm(project: any = null) {
    currentProject = project
    showProjectForm = true
    
    // Reset form state when opening
    if (project) {
      url = project.url || ""
      screenshotUrl = project.screenshot_url || ""
    } else {
      url = ""
      screenshotUrl = ""
    }
    error = null
  }

  function closeProjectForm() {
    showProjectForm = false
    currentProject = null
  }

  function handleProjectSubmit(event: Event) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    
    const projectData = {
      id: currentProject?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      url: url || (formData.get("url") as string),
      screenshot_url: screenshotUrl || (formData.get("screenshot_url") as string),
      status: formData.get("status") as string,
      technologies: Array.from(formData.getAll("technologies")) as string[]
    }

    if (currentProject) {
      // Update existing project
      guestProjects = guestProjects.map(p => p.id === currentProject.id ? projectData : p)
    } else {
      // Add new project
      guestProjects = [projectData, ...guestProjects]
    }

    saveToLocalStorage()
    closeProjectForm()
    
    // Reset form state
    url = ""
    screenshotUrl = ""
    error = null
  }

  function deleteProject(projectId: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      guestProjects = guestProjects.filter(p => p.id !== projectId)
      saveToLocalStorage()
    }
  }

</script>

<svelte:head>
  <title>Build Your Portfolio | MyDevfol.io</title>
  <meta name="description" content="Create your developer portfolio without signing up. Preview your portfolio before publishing." />
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

  <!-- Guest Builder Banner -->
  <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm">
          <strong>Guest Mode:</strong> You're building a portfolio without an account. Your data is saved locally. 
          <strong>Sign up to publish and get a live URL!</strong>
        </p>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Build Your Portfolio</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form Section -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Profile Information -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Portfolio Information</h2>

            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="form-control">
                <label class="label" for="full_name">
                  <span class="label-text font-medium">Full Name *</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  bind:value={guestProfile.full_name}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="John Doe"
                />
              </div>

              <div class="form-control">
                <label class="label" for="username">
                  <span class="label-text font-medium">Username *</span>
                </label>
                <input
                  type="text"
                  id="username"
                  bind:value={guestProfile.username}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="johndoe"
                  pattern="[a-zA-Z0-9_-]+"
                  title="Only letters, numbers, underscores, and hyphens allowed"
                />
                <label class="label" for="username">
                  <span class="label-text-alt">Portfolio URL: /{guestProfile.username || "username"}</span>
                </label>
              </div>
            </div>

            <div class="form-control mb-6">
              <label class="label" for="bio">
                <span class="label-text font-medium">Bio</span>
              </label>
              <textarea
                id="bio"
                bind:value={guestProfile.bio}
                on:input={handleProfileUpdate}
                class="textarea textarea-bordered w-full h-24"
                placeholder="Tell people about yourself and what you do..."
              ></textarea>
            </div>
            <div class="divider">Contact & Links</div>

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
                    <span class="text-sm text-base-content/70">Screenshot generated successfully</span>
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
              <label class="label" for="website">
                <span class="label-text font-medium">Website</span>
              </label>
              <input
                type="url"
                id="website"
                bind:value={guestProfile.website}
                on:input={handleProfileUpdate}
                class="input input-bordered w-full"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <!-- Social Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="form-control">
                <label class="label" for="github_url">
                  <span class="label-text font-medium">GitHub</span>
                </label>
                <input
                  type="url"
                  id="github_url"
                  bind:value={guestProfile.github_url}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="https://github.com/username"
                />
              </div>

              <div class="form-control">
                <label class="label" for="linkedin_url">
                  <span class="label-text font-medium">LinkedIn</span>
                </label>
                <input
                  type="url"
                  id="linkedin_url"
                  bind:value={guestProfile.linkedin_url}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div class="form-control">
                <label class="label" for="twitter_url">
                  <span class="label-text font-medium">Twitter</span>
                </label>
                <input
                  type="url"
                  id="twitter_url"
                  bind:value={guestProfile.twitter_url}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div class="form-control">
                <label class="label" for="medium_url">
                  <span class="label-text font-medium">Medium</span>
                </label>
                <input
                  type="url"
                  id="medium_url"
                  bind:value={guestProfile.medium_url}
                  on:input={handleProfileUpdate}
                  class="input input-bordered w-full"
                  placeholder="https://medium.com/@username"
                />
              </div>
            </div>

            <!-- Theme Selection -->
            <div class="divider">Portfolio Theme</div>

            <div class="form-control mb-6">
              <div class="label">
                <span class="label-text font-medium">Choose Your Portfolio Style</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each themes as theme}
                  <div class="cursor-pointer justify-start">
                    <input
                      type="radio"
                      bind:group={selectedTheme}
                      value={theme.id}
                      on:change={handleProfileUpdate}
                      class="radio radio-primary mr-3"
                      id="theme-{theme.id}"
                    />
                    <div
                      class="card bg-base-100 border-2 {selectedTheme === theme.id
                        ? 'border-primary'
                        : 'border-base-300'} hover:border-primary transition-colors"
                    >
                      <label for="theme-{theme.id}" class="cursor-pointer card-body p-4 block">
                        <div
                          class="h-16 rounded {theme.preview} mb-2 flex items-center justify-center"
                        >
                          <span class="text-xs opacity-70">Preview</span>
                        </div>
                        <h3 class="font-bold">{theme.name}</h3>
                        <p class="text-sm text-gray-600">{theme.description}</p>
                      </label>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex justify-between items-center mb-4">
              <h2 class="card-title">Your Projects</h2>
              <button class="btn btn-primary" on:click={() => openProjectForm()}>
                Add Project
              </button>
            </div>

            {#if guestProjects.length === 0}
              <div class="text-center py-8">
                <p class="text-gray-600 mb-4">No projects added yet.</p>
                <button class="btn btn-primary" on:click={() => openProjectForm()}>
                  Add Your First Project
                </button>
              </div>
            {:else}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each guestProjects as project}
                  <div class="card bg-base-200 shadow">
                    <div class="card-body p-4">
                      <h3 class="card-title text-lg">{project.title}</h3>
                      <p class="text-sm text-gray-600">{project.description}</p>
                      <div class="flex flex-wrap gap-1 mt-2">
                        {#each project.technologies as tech}
                          <span class="badge badge-secondary text-xs">{tech}</span>
                        {/each}
                      </div>
                      <div class="card-actions justify-end mt-4">
                        <button class="btn btn-sm btn-outline" on:click={() => openProjectForm(project)}>
                          Edit
                        </button>
                        <button class="btn btn-sm btn-error" on:click={() => deleteProject(project.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl sticky top-8">
          <div class="card-body">
            <h2 class="card-title mb-4">Live Preview</h2>

            <!-- Theme Preview -->
            <div
              class="rounded-lg p-6 mb-4 {themes.find(t => t.id === selectedTheme)?.preview || 'bg-gradient-to-r from-purple-50 to-blue-50'}"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    class="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold {selectedTheme === 'dark' ? 'text-white' : 'text-gray-800'}">
                    {guestProfile.full_name || "Your Name"}
                  </h3>
                  <p class="text-sm {selectedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">
                    {guestProfile.bio || "Your bio will appear here..."}
                  </p>
                </div>
              </div>

              {#if guestProfile.website}
                <div class="mb-3">
                  <a href={guestProfile.website} class="text-blue-600 text-sm">
                    🔗 {guestProfile.website}
                  </a>
                </div>
              {/if}
              <div class="flex gap-3">
                {#if guestProfile.github_url}
                  <div class="w-6 h-6 bg-gray-800 rounded"></div>
                {/if}
                {#if guestProfile.linkedin_url}
                  <div class="w-6 h-6 bg-blue-600 rounded"></div>
                {/if}
                {#if guestProfile.twitter_url}
                  <div class="w-6 h-6 bg-blue-400 rounded"></div>
                {/if}
                {#if guestProfile.medium_url}
                  <div class="w-6 h-6 bg-black rounded"></div>
                {/if}
              </div>
            </div>

            <!-- Projects Preview -->
            {#if guestProjects.length > 0}
              <div class="mb-4">
                <h4 class="font-bold mb-2">Projects ({guestProjects.length})</h4>
                <div class="space-y-2">
                  {#each guestProjects.slice(0, 2) as project}
                    <div class="bg-base-200 p-3 rounded">
                      <p class="font-medium text-sm">{project.title}</p>
                      <p class="text-xs text-gray-600">{project.status}</p>
                    </div>
                  {/each}
                  {#if guestProjects.length > 2}
                    <p class="text-xs text-gray-500">+{guestProjects.length - 2} more projects</p>
                  {/if}
                </div>
              </div>
            {/if}

            <!-- Preview URL -->
            {#if guestProfile.username}
              <div class="bg-base-200 p-4 rounded-lg mb-4">
                <p class="text-sm font-medium mb-2">Preview URL:</p>
                <code class="text-xs bg-base-300 px-2 py-1 rounded block break-all">
                  {previewUrl}
                </code>
              </div>
            {/if}

            <!-- Action Buttons -->
            <div class="space-y-3">
              <a
                target="_blank"
                class="btn btn-outline btn-primary btn-sm w-full"
                class="btn btn-secondary"
              >
                Preview Portfolio
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              
              <a href="/login" class="btn btn-primary w-full">
                Sign Up to Publish
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Project Form Modal -->
{#if showProjectForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
      <h2 class="text-2xl font-bold mb-4">
        {currentProject ? "Edit Project" : "Add New Project"}
      </h2>

      <form on:submit={handleProjectSubmit}>
        <div class="form-control mb-4">
          <label class="label" for="project_title">
            <span class="label-text">Title *</span>
          </label>
          <input
            type="text"
            id="project_title"
            name="title"
            value={currentProject?.title || ""}
            class="input input-bordered w-full"
            placeholder="Project Title"
            required
          />
        </div>

        <div class="form-control mb-4">
          <label class="label" for="project_url">
            <span class="label-text">URL</span>
          </label>
          <div class="flex gap-2">
            <input
              type="url"
              id="project_url"
              name="url"
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
                📸 Screenshot
              {/if}
            </button>
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
                <span class="text-sm text-base-content/70">Screenshot generated successfully</span>
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
          <label class="label" for="project_screenshot_url">
            <span class="label-text">Screenshot URL</span>
          </label>
          <input
            type="url"
            id="project_screenshot_url"
            name="screenshot_url"
            value={currentProject?.screenshot_url || ""}
            class="input input-bordered w-full"
            placeholder="https://example.com/screenshot.png"
          />
          <div class="text-info text-sm mt-1">
            Or use the screenshot button above to generate automatically
          </div>
        </div>

        <div class="form-control mb-4">
          <label class="label" for="project_description">
            <span class="label-text">Description</span>
          </label>
          <textarea
            id="project_description"
            name="description"
            value={currentProject?.description || ""}
            class="textarea textarea-bordered w-full"
            placeholder="Project Description"
            rows={3}
          ></textarea>
        </div>

        <div class="form-control mb-4">
          <label class="label" for="project_status">
            <span class="label-text">Status</span>
          </label>
          <select id="project_status" name="status" value={currentProject?.status || "LIVE"} class="select select-bordered w-full">
            <option value="LIVE">Live</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="DEMO">Demo</option>
          </select>
        </div>

        <div class="form-control mb-6">
          <fieldset>
            <legend class="label">
            <span class="label-text">Technologies</span>
            </legend>
          <div class="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-base-300 rounded p-2">
            {#each availableTechnologies as tech}
              <label class="cursor-pointer flex items-center" for="tech-{tech.replace(/[^a-zA-Z0-9]/g, '_')}">
                <input
                  type="checkbox"
                  name="technologies"
                  value={tech}
                  id="tech-{tech.replace(/[^a-zA-Z0-9]/g, '_')}"
                  checked={currentProject?.technologies?.includes(tech) || false}
                  class="checkbox checkbox-primary checkbox-sm mr-2"
                />
                <span class="text-sm">{tech}</span>
              </label>
            {/each}
          </div>
          </fieldset>
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" on:click={closeProjectForm} class="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {currentProject ? "Update" : "Add"} Project
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}