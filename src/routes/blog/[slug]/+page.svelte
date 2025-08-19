<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.post.title} | MyDevfol.io</title>
  <meta name="description" content={data.post.summary} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6 flex justify-between items-center">
    <a href="/" class="btn btn-outline btn-sm">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Homepage
    </a>
    <a href="/blog" class="btn btn-ghost btn-sm">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      All Posts
    </a>
  </div>

  <article class="prose lg:prose-xl mx-auto">
    <h1>{data.post.title}</h1>
    <p class="text-gray-500">By {data.post.author} on {data.post.date}</p>
    {@html data.post.content}
  </article>
</div>
