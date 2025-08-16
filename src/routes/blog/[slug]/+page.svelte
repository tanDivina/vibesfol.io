<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.post.title} | MyDevfol.io</title>
  <meta name="description" content={data.post.summary} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <article class="prose lg:prose-xl mx-auto">
    <h1>{data.post.title}</h1>
    <p class="text-gray-500">By {data.post.author} on {data.post.date}</p>
    {@html data.post.content}
  </article>
</div>
