SaaS Starter Blog
rss feed
A demo blog with sample content.
How we built a beautiful 41kb SaaS website with this template
Mar 10, 2024
How to use this template you to bootstrap your own site.
Example Blog Post
Mar 13, 2023
A sample blog post, showing our blog engine
Example Blog Post 2
Sep 23, 2022
Even more example content!
Explore
Overview
Pricing
Blog
Contact Us
Github
[plugin:vite-plugin-svelte] Error while preprocessing /Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/src/lib/ContactForm.svelte - [postcss] Cannot apply unknown utility class: gap-3
/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/src/lib/ContactForm.svelte
Error: Error while preprocessing /Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/src/lib/ContactForm.svelte - [postcss] Cannot apply unknown utility class: gap-3
    at onInvalidCandidate (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:17:297)
    at ne (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:12:115877)
    at /Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:17:260
    at _ (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:5:1652)
    at _ (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:5:1930)
    at $e (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:17:150)
    at Lr (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:33:724)
    at async Mr (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/tailwindcss/dist/lib.js:33:977)
    at async ot (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@tailwindcss/node/dist/index.js:10:3272)
    at async p (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@tailwindcss/postcss/dist/index.js:8:3242)
    at async Object.Once (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@tailwindcss/postcss/dist/index.js:8:3422)
    at async LazyResult.runAsync (/Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/postcss/lib/lazy-result.js:293:11)
    at async runPostCSS (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:43824:21)
    at async compilePostCSS (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:43794:18)
    at async compileCSS (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:43649:27)
    at async preprocessCSS (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:43930:10)
    at async style (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@sveltejs/vite-plugin-svelte/src/preprocess.js:77:31)
    at async process_single_tag (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/svelte/src/compiler/preprocess/index.js:283:21)
    at async Promise.all (index 0)
    at async replace_in_code (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/svelte/src/compiler/preprocess/replace_in_code.js:70:23)
    at async process_tag (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/svelte/src/compiler/preprocess/index.js:300:26)
    at async Module.preprocess (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/svelte/src/compiler/preprocess/index.js:363:25)
    at async compileSvelte (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@sveltejs/vite-plugin-svelte/src/utils/compile.js:85:20)
    at async TransformPluginContext.transform (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/@sveltejs/vite-plugin-svelte/src/index.js:164:20)
    at async EnvironmentPluginContainer.transform (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42294:18)
    at async loadAndTransform (file:///Users/dorienvandenabbeele/vibe-catcher/vibesfol.io/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:35735:27
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.ts.<script lang="ts">
  import { WebsiteName } from "./../../config"
  import "../../app.css"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

<div class="navbar bg-base-100 container mx-auto">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">{WebsiteName}</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 hidden sm:flex font-bold text-lg">
      <li class="md:mx-4">
        <a
          href="https://github.com/CriticalMoments/CMSaasStarter"
          class="border border-primary">★ us on Github</a
        >
      </li>
      <li class="md:mx-2"><a href="/blog">Blog</a></li>
      <li class="md:mx-2"><a href="/pricing">Pricing</a></li>
      <li class="md:mx-2"><a href="/account">Account</a></li>
      <li class="md:mx-0">
        <a href="/search" aria-label="Search">
          <svg
            fill="#000000"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"
              fill="currentColor"
            /></svg
          >
        </a>
      </li>
    </ul>
    <div class="dropdown dropdown-end sm:hidden">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          /></svg
        >
      </label>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ul
        tabindex="0"
        class="menu menu-lg dropdown-content mt-3 z-1 p-2 shadow-sm bg-base-100 rounded-box w-52 font-bold"
      >
        <li><a href="/blog">Blog</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href="/search">Search</a></li>
        <li>
          <a
            href="https://github.com/CriticalMoments/CMSaasStarter"
            class="border border-primary">★ us on Github</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="">
  {@render children?.()}
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="grow"></div>
<div class="">
  <div class="border-t max-w-[1000px] mx-auto"></div>
  <footer
    class="footer md:footer-horizontal p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
  >
    <nav>
      <span class="footer-title opacity-80">Explore</span>
      <a class="link link-hover mb-1" href="/">Overview</a>
      <a class="link link-hover my-1" href="/pricing">Pricing</a>
      <a class="link link-hover my-1" href="/blog">Blog</a>
      <a class="link link-hover my-1" href="/contact_us">Contact Us</a>
      <a
        class="link link-hover my-1"
        href="https://github.com/CriticalMoments/CMSaasStarter">Github</a
      >
    </nav>
    <aside>
      <!-- Sponsor section removed -->
    </aside>
  </footer>
</div>
