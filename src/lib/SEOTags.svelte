<script lang="ts">
  import { page } from "$app/stores"

  export let title: string =
    "MyDevfol.io - Your Professional Developer Portfolio"
  export let description: string =
    "Create and share a professional developer portfolio in minutes. Showcase your projects, skills, and experience with a stunning, modern design."
  export let imageUrl: string | null = null
  export let keywords: string | null =
    "developer, portfolio, projects, software engineer, web developer, coding, programming"

  const siteName = "MyDevfol.io"
  const twitterHandle = "@MyDevfolApp" // Replace with your actual Twitter handle if you have one

  $: canonicalUrl = $page.url.href
  $: finalImageUrl = imageUrl || `${$page.url.origin}/logo512.png`
</script>

<svelte:head>
  <!-- Standard SEO -->
  <title>{title}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={finalImageUrl} />
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={finalImageUrl} />
  {#if twitterHandle}
    <meta name="twitter:site" content={twitterHandle} />
    <meta name="twitter:creator" content={twitterHandle} />
  {/if}

  <!-- Favicons -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/logo.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>
