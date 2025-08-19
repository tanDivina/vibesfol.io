<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<svelte:head>
  <title>Blog | MyDevfol.io</title>
  <meta
    name="description"
    content="Tips, tutorials, and insights for developers."
  />
</svelte:head>

<div class="container mx-auto px-4 py-8">
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

  <h1 class="text-4xl font-bold mb-8 text-center">Our Blog</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.posts as post}
      <a
        href="/blog/{post.slug}"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <h2 class="card-title">{post.title}</h2>
          <p class="text-gray-600">{post.summary}</p>
          <div class="card-actions justify-end mt-4">
            <div class="text-sm text-gray-500">{post.date}</div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
