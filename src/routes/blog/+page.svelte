<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Blog | MyDevfol.io</title>
  <meta name="description" content="Tips, tutorials, and insights for developers." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-8 text-center">Our Blog</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.posts as post}
      <a href="/blog/{post.slug}" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
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
