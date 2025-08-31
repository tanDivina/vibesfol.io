<script lang="ts">
  // Demo data for showcasing the profile editing functionality
  let demoProfile = {
    full_name: "John Doe",
    username: "johndoe",
    bio: "Full-stack developer passionate about creating beautiful, functional web applications. I love working with modern technologies and building solutions that make a difference.",
    website: "https://johndoe.dev",
    github_url: "https://github.com/johndoe",
    linkedin_url: "https://linkedin.com/in/johndoe",
    twitter_url: "https://twitter.com/johndoe",
    medium_url: "https://medium.com/@johndoe",
    gumroad_url: "https://johndoe.gumroad.com",
    substack_url: "https://johndoe.substack.com",
    amazon_gear_list_url: "https://www.amazon.com/shop/johndoe",
    whatsapp_number: "+1234567890",
    portfolio_theme: "modern",
  }

  let selectedTheme = demoProfile.portfolio_theme
  let previewUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/demo`

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

  function handleSubmit() {
    alert(
      "This is a demo! In the real app, your profile would be saved to the database.",
    )
  }

  function copyUrl() {
    navigator.clipboard.writeText(previewUrl)
    alert("Portfolio URL copied to clipboard!")
  }
</script>

<svelte:head>
  <title>Demo: Edit Profile | MyDevfol.io</title>
</svelte:head>

<!-- Demo Banner -->
<div
  class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
>
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm">
        <strong>Demo Mode:</strong> This is a demonstration of the profile
        editing features. In the real app, you would need to sign up/login to
        access this page.
        <a href="/login" class="underline ml-2">Go to Login →</a>
      </p>
    </div>
  </div>
</div>

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

  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">
      Edit Your Portfolio <span class="badge badge-warning">DEMO</span>
    </h1>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2">
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
                    bind:value={demoProfile.full_name}
                    class="input input-bordered w-full"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label" for="username">
                    <span class="label-text font-medium">Username *</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    bind:value={demoProfile.username}
                    class="input input-bordered w-full"
                    placeholder="johndoe"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Only letters, numbers, underscores, and hyphens allowed"
                    required
                  />
                  <div class="label">
                    <span class="label-text-alt"
                      >Portfolio URL: /{demoProfile.username}</span
                    >
                  </div>
                </div>
              </div>

              <div class="form-control mb-6">
                <label class="label" for="bio">
                  <span class="label-text font-medium">Bio</span>
                </label>
                <textarea
                  id="bio"
                  bind:value={demoProfile.bio}
                  class="textarea textarea-bordered w-full h-24"
                  placeholder="Tell people about yourself and what you do..."
                ></textarea>
              </div>

              <!-- Contact Information -->
              <div class="divider">Contact & Links</div>

              <div class="form-control mb-4">
                <label class="label" for="website">
                  <span class="label-text font-medium">Website</span>
                </label>
                <input
                  type="url"
                  id="website"
                  bind:value={demoProfile.website}
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
                    bind:value={demoProfile.github_url}
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
                    bind:value={demoProfile.linkedin_url}
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
                    bind:value={demoProfile.twitter_url}
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
                    bind:value={demoProfile.medium_url}
                    class="input input-bordered w-full"
                    placeholder="https://medium.com/@username"
                  />
                </div>
                <div class="form-control">
                  <label class="label" for="gumroad_url">
                    <span class="label-text font-medium">Gumroad</span>
                  </label>
                  <input
                    type="url"
                    id="gumroad_url"
                    bind:value={demoProfile.gumroad_url}
                    class="input input-bordered w-full"
                    placeholder="https://username.gumroad.com"
                  />
                </div>
                <div class="form-control">
                  <label class="label" for="substack_url">
                    <span class="label-text font-medium">Substack</span>
                  </label>
                  <input
                    type="url"
                    id="substack_url"
                    bind:value={demoProfile.substack_url}
                    class="input input-bordered w-full"
                    placeholder="https://username.substack.com"
                  />
                </div>
                <div class="form-control">
                  <label class="label" for="amazon_gear_list_url">
                    <span class="label-text font-medium">Amazon Gear List</span>
                  </label>
                  <input
                    type="url"
                    id="amazon_gear_list_url"
                    bind:value={demoProfile.amazon_gear_list_url}
                    class="input input-bordered w-full"
                    placeholder="https://www.amazon.com/shop/username"
                  />
                  <div class="label">
                    <span class="label-text-alt"
                      >This can be an affiliate link.</span
                    >
                  </div>
                </div>
                <div class="form-control">
                  <label class="label" for="whatsapp_number">
                    <span class="label-text font-medium">WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp_number"
                    bind:value={demoProfile.whatsapp_number}
                    class="input input-bordered w-full"
                    placeholder="+1234567890"
                  />
                  <div class="label">
                    <span class="label-text-alt"
                      >Include country code (e.g., +1 for US)</span
                    >
                  </div>
                </div>
              </div>

              <!-- Theme Selection -->
              <div class="divider">Portfolio Theme</div>

              <div class="form-control mb-6">
                <div class="label">
                  <span class="label-text font-medium"
                    >Choose Your Portfolio Style</span
                  >
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each themes as theme}
                    <div class="cursor-pointer">
                      <input
                        type="radio"
                        bind:group={selectedTheme}
                        value={theme.id}
                        class="radio radio-primary mr-3"
                        id="theme-{theme.id}"
                      />
                      <label for="theme-{theme.id}" class="cursor-pointer">
                        <div
                          class="card bg-base-100 border-2 {selectedTheme ===
                          theme.id
                            ? 'border-primary'
                            : 'border-base-300'} hover:border-primary transition-colors"
                        >
                          <div class="card-body p-4">
                            <div
                              class="h-16 rounded {theme.preview} mb-2 flex items-center justify-center"
                            >
                              <span class="text-xs opacity-70">Preview</span>
                            </div>
                            <h3 class="font-bold">{theme.name}</h3>
                            <p class="text-sm text-gray-600">
                              {theme.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="card-actions justify-end">
                <button type="submit" class="btn btn-primary">
                  Save Profile (Demo)
                </button>
              </div>
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
                class="rounded-lg p-6 mb-4 {themes.find(
                  (t) => t.id === selectedTheme,
                )?.preview || 'bg-gradient-to-r from-purple-50 to-blue-50'}"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center"
                  >
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
                    <h3
                      class="text-xl font-bold {selectedTheme === 'dark'
                        ? 'text-white'
                        : 'text-gray-800'}"
                    >
                      {demoProfile.full_name}
                    </h3>
                    <p
                      class="text-sm {selectedTheme === 'dark'
                        ? 'text-gray-300'
                        : 'text-gray-600'}"
                    >
                      {demoProfile.bio}
                    </p>
                  </div>
                </div>

                {#if demoProfile.website}
                  <div class="mb-3">
                    <a href={demoProfile.website} class="text-blue-600 text-sm"
                      >🔗 {demoProfile.website}</a
                    >
                  </div>
                {/if}

                <div class="flex gap-3">
                  {#if demoProfile.github_url}
                    <div class="w-6 h-6 bg-gray-800 rounded"></div>
                  {/if}
                  {#if demoProfile.linkedin_url}
                    <div class="w-6 h-6 bg-blue-600 rounded"></div>
                  {/if}
                  {#if demoProfile.twitter_url}
                    <div class="w-6 h-6 bg-blue-400 rounded"></div>
                  {/if}
                  {#if demoProfile.medium_url}
                    <div class="w-6 h-6 bg-black rounded"></div>
                  {/if}
                  {#if demoProfile.gumroad_url}
                    <div class="w-6 h-6 bg-pink-400 rounded"></div>
                  {/if}
                  {#if demoProfile.substack_url}
                    <div class="w-6 h-6 bg-orange-500 rounded"></div>
                  {/if}
                  {#if demoProfile.amazon_gear_list_url}
                    <div class="w-6 h-6 bg-yellow-400 rounded"></div>
                  {/if}
                  {#if demoProfile.whatsapp_number}
                    <div class="w-6 h-6 bg-green-500 rounded"></div>
                  {/if}
                </div>
              </div>

              <!-- Portfolio URL -->
              <div class="bg-base-200 p-4 rounded-lg mb-4">
                <p class="text-sm font-medium mb-2">Your Portfolio URL:</p>
                <div class="flex items-center gap-2">
                  <code
                    class="text-xs bg-base-300 px-2 py-1 rounded flex-1 break-all"
                    >{previewUrl}</code
                  >
                  <button
                    type="button"
                    class="btn btn-xs btn-outline"
                    on:click={copyUrl}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <!-- View Portfolio Button -->
              <div class="card-actions justify-center">
                <a
                  href="/demo"
                  target="_blank"
                  class="btn btn-outline btn-primary btn-sm"
                >
                  View Live Portfolio
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
