<script lang="ts">
  import { onMount } from "svelte"
  import { clientSupabase } from "$lib/clientSupabase"

  let user: any = null
  let loading = true

  onMount(async () => {
    const {
      data: { user: currentUser },
    } = await clientSupabase.auth.getUser()
    user = currentUser
    loading = false
  })
</script>

<svelte:head>
  <title>Dashboard | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  {#if loading}
    <div class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4">Loading dashboard...</p>
    </div>
  {:else if user}
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Welcome to Your Dashboard!</h1>
      <div class="alert alert-success">
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
        <div>
          <h3 class="font-bold">Authentication Working!</h3>
          <div class="text-sm">
            You're successfully logged in as: {user.email}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <a
        href="/dashboard/projects"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="card-title">Manage Projects</h2>
              <p class="text-sm text-gray-600">
                Add and edit your portfolio projects
              </p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">Go to Projects</button>
          </div>
        </div>
      </a>

      <a
        href="/dashboard/profile"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-green-600"
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
              <h2 class="card-title">Edit Profile</h2>
              <p class="text-sm text-gray-600">
                Update your portfolio information
              </p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">Edit Profile</button>
          </div>
        </div>
      </a>

      <a
        href="/dashboard/analytics"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="card-title">View Analytics</h2>
              <p class="text-sm text-gray-600">
                Track your portfolio performance
              </p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">View Analytics</button>
          </div>
        </div>
      </a>

      <a
        href="/dashboard/testimonials"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="card-title">Testimonials</h2>
              <p class="text-sm text-gray-600">Manage client testimonials</p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">Manage Testimonials</button>
          </div>
        </div>
      </a>

      <a
        href="/dashboard/hackathons"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002 12c0 2.757 1.125 5.22 2.944 7.071A11.955 11.955 0 0112 21.056a11.955 11.955 0 018.618-3.04A12.007 12.007 0 0022 12c0-2.757-1.125-5.22-2.944-7.071z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="card-title">Hackathon Certificates</h2>
              <p class="text-sm text-gray-600">Showcase your achievements</p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">View Certificates</button>
          </div>
        </div>
      </a>

      <a
        href="/dashboard/client-portals"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m3-10h4m-4 4h4m-9-4h.01M7 16h.01"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="card-title">Client Portals</h2>
              <p class="text-sm text-gray-600">Create private client access</p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm">Manage Portals</button>
          </div>
        </div>
      </a>
    </div>

    <!-- Portfolio Preview -->
    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="card-body">
        <h2 class="card-title mb-4">Your Portfolio</h2>
        <p class="text-gray-600 mb-4">
          Your public portfolio will be available once you complete your profile
          setup.
        </p>
        <div class="card-actions">
          <a href="/dashboard/profile" class="btn btn-primary"
            >Complete Profile Setup</a
          >
          <a href="/demo" class="btn btn-outline">View Demo Portfolio</a>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title">Projects</div>
        <div class="stat-value text-primary">0</div>
        <div class="stat-desc">Add your first project</div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title">Portfolio Views</div>
        <div class="stat-value text-secondary">0</div>
        <div class="stat-desc">Publish to start tracking</div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title">Testimonials</div>
        <div class="stat-value text-accent">0</div>
        <div class="stat-desc">Collect client feedback</div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title">Completion</div>
        <div class="stat-value text-info">0%</div>
        <div class="stat-desc">Complete your profile</div>
      </div>
    </div>
  {:else}
    <div class="text-center py-12">
      <h1 class="text-2xl font-bold mb-4">Authentication Required</h1>
      <p class="text-gray-600 mb-6">Please log in to access your dashboard.</p>
      <a href="/login" class="btn btn-primary">Go to Login</a>
    </div>
  {/if}
</div>
