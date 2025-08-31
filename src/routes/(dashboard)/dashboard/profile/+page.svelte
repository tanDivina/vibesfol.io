<script lang="ts">
  import { enhance } from "$app/forms"
  import { supabase } from "$lib/supabaseClient"
  import type { PageData, ActionData } from "./$types"

  export let data: PageData
  export let form: ActionData

  let loading = false
  let uploadingAvatar = false
  let previewUrl = ""
  let selectedTheme = data.profile?.portfolio_theme || "modern"

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

  // Generate preview URL when username changes
  $: if (data.profile?.username) {
    previewUrl = `${window.location.origin}/${data.profile.username}`
  }

  async function uploadAvatar(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    uploadingAvatar = true

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${data.session?.user.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName)

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", data.session?.user.id)

      if (updateError) throw updateError

      // Update local data
      if (data.profile) {
        data.profile.avatar_url = publicUrl
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      alert("Failed to upload avatar. Please try again.")
    } finally {
      uploadingAvatar = false
    }
  }

  function handleSubmit() {
    loading = true
    return async ({ update }) => {
      await update()
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Edit Profile | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Edit Your Portfolio</h1>

    <!-- Success/Error Messages -->
    {#if form?.success}
      <div class="alert alert-success mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{form.message}</span>
      </div>
    {/if}

    {#if form?.error}
      <div class="alert alert-error mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{form.error}</span>
      </div>
    {/if}

    <form method="POST" action="?/updateProfile" use:enhance={handleSubmit}>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title mb-4">Portfolio Information</h2>

              <!-- Avatar Upload -->
              <div class="form-control mb-6">
                <label class="label" for="avatar_upload_input">
                  <span class="label-text font-medium">Profile Picture</span>
                </label>
                <div class="flex items-center gap-4">
                  <div class="avatar">
                    <div class="w-20 h-20 rounded-full">
                      {#if data.profile?.avatar_url}
                        <img
                          src={data.profile.avatar_url}
                          alt="Profile"
                          class="w-full h-full object-cover rounded-full"
                        />
                      {:else}
                        <div
                          class="w-full h-full bg-gray-300 rounded-full flex items-center justify-center"
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
                      {/if}
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="avatar_upload_input"
                      accept="image/*"
                      on:change={uploadAvatar}
                      class="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      disabled={uploadingAvatar}
                    />
                    <div class="text-xs text-gray-500 mt-1">
                      Max file size: 5MB. Supported formats: JPG, PNG, GIF
                    </div>
                  </div>
                </div>
              </div>

              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="form-control">
                  <label class="label" for="full_name">
                    <span class="label-text font-medium">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={data.profile?.full_name || ""}
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
                    name="username"
                    value={data.profile?.username || ""}
                    class="input input-bordered w-full"
                    placeholder="johndoe"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Only letters, numbers, underscores, and hyphens allowed"
                    required
                  />
                  <div class="label">
                    <span class="label-text-alt"
                      >Portfolio URL: /{data.profile?.username ||
                        "username"}</span
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
                  name="bio"
                  value={data.profile?.bio || ""}
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
                  name="website"
                  value={data.profile?.website || ""}
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
                    name="github_url"
                    value={data.profile?.github_url || ""}
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
                    name="linkedin_url"
                    value={data.profile?.linkedin_url || ""}
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
                    name="twitter_url"
                    value={data.profile?.twitter_url || ""}
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
                    name="medium_url"
                    value={data.profile?.medium_url || ""}
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
                    name="gumroad_url"
                    value={data.profile?.gumroad_url || ""}
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
                    name="substack_url"
                    value={data.profile?.substack_url || ""}
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
                    name="amazon_gear_list_url"
                    value={data.profile?.amazon_gear_list_url || ""}
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
                    name="whatsapp_number"
                    value={data.profile?.whatsapp_number || ""}
                    class="input input-bordered w-full"
                    placeholder="+1234567890"
                  />
                  <div class="label">
                    <span class="label-text-alt"
                      >Include country code (e.g., +1 for US)</span
                    >
                  </div>
                </div>

                <div class="form-control">
                  <label class="label" for="youtube_url">
                    <span class="label-text font-medium">YouTube</span>
                  </label>
                  <input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    value={data.profile?.youtube_url || ""}
                    class="input input-bordered w-full"
                    placeholder="https://youtube.com/c/username"
                  />
                </div>
              </div>

              <!-- Community & Discovery -->
              <div class="divider">Community & Discovery</div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="form-control">
                  <label class="label" for="availability">
                    <span class="label-text font-medium">Availability</span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    class="select select-bordered w-full"
                    value={data.profile?.availability || ""}
                  >
                    <option value="">Not specified</option>
                    <option value="available_for_hire"
                      >Available for hire</option
                    >
                    <option value="open_to_offers">Open to offers</option>
                    <option value="not_available">Not available</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label" for="location">
                    <span class="label-text font-medium">Location</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={data.profile?.location || ""}
                    class="input input-bordered w-full"
                    placeholder="City, Country"
                  />
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
                    <label class="cursor-pointer">
                      <input
                        type="radio"
                        name="portfolio_theme"
                        value={theme.id}
                        bind:group={selectedTheme}
                        class="radio radio-primary mr-3"
                      />
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
                  {/each}
                </div>
              </div>

              <div class="card-actions justify-end">
                <button
                  type="submit"
                  class="btn btn-primary"
                  class:loading
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
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
                    class="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                  >
                    {#if data.profile?.avatar_url}
                      <img
                        src={data.profile.avatar_url}
                        alt="Profile"
                        class="w-full h-full object-cover"
                      />
                    {:else}
                      <div
                        class="w-full h-full bg-gray-300 flex items-center justify-center"
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
                    {/if}
                  </div>
                  <div>
                    <h3
                      class="text-xl font-bold {selectedTheme === 'dark'
                        ? 'text-white'
                        : 'text-gray-800'}"
                    >
                      {data.profile?.full_name || "Your Name"}
                    </h3>
                    <p
                      class="text-sm {selectedTheme === 'dark'
                        ? 'text-gray-300'
                        : 'text-gray-600'}"
                    >
                      {data.profile?.bio || "Your bio will appear here..."}
                    </p>
                  </div>
                </div>

                {#if data.profile?.website}
                  <div class="mb-3">
                    <a href={data.profile.website} class="text-blue-600 text-sm"
                      >🔗 {data.profile.website}</a
                    >
                  </div>
                {/if}

                <div class="flex gap-3">
                  {#if data.profile?.github_url}
                    <div class="w-6 h-6 bg-gray-800 rounded"></div>
                  {/if}
                  {#if data.profile?.linkedin_url}
                    <div class="w-6 h-6 bg-blue-600 rounded"></div>
                  {/if}
                  {#if data.profile?.twitter_url}
                    <div class="w-6 h-6 bg-blue-400 rounded"></div>
                  {/if}
                  {#if data.profile?.medium_url}
                    <div class="w-6 h-6 bg-black rounded"></div>
                  {/if}
                  {#if data.profile?.gumroad_url}
                    <div class="w-6 h-6 bg-pink-400 rounded"></div>
                  {/if}
                  {#if data.profile?.substack_url}
                    <div class="w-6 h-6 bg-orange-500 rounded"></div>
                  {/if}
                  {#if data.profile?.amazon_gear_list_url}
                    <div class="w-6 h-6 bg-yellow-400 rounded"></div>
                  {/if}
                </div>
              </div>

              <!-- Portfolio URL -->
              {#if data.profile?.username}
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
                      on:click={() => navigator.clipboard.writeText(previewUrl)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              {/if}

              <!-- View Portfolio Button -->
              {#if data.profile?.username}
                <div class="card-actions justify-center">
                  <a
                    href="/{data.profile.username}"
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
              {/if}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
