<script lang="ts">
  import { WebsiteName } from "$config"
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
          href="https://github.com/tanDivina/vibesfol.io"
          class="border border-primary">★ us on Github
        </a>
      </li>
      <li class="md:mx-2">
        <a href="/blog">
          Blog
        </a>
      </li>
      <li class="md:mx-2">
        <a href="/pricing">
          Pricing
        </a>
      </li>
      <li class="md:mx-2">
        <a href="/account">
          Account
        </a>
      </li>
      <li class="md:mx-0">
        <a href="/search" aria-label="Search">
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"
            /></svg
          >
        </a>
      </li>
    </ul>
    <div class="dropdown dropdown-end sm:hidden">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
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
            href="https://github.com/tanDivina/vibesfol.io"
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
  <footer class="footer p-10 bg-base-200 text-base-content">
    <div
      class="footer-content max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <nav>
        <h6 class="footer-title text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Product</h6>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover" href="/">Overview</a>
          <a class="link link-hover" href="/pricing">Pricing</a>
          <a class="link link-hover" href="/demo">Live Demo</a>
          <a class="link link-hover" href="/demo-profile">Demo Profile</a>
        </div>
      </nav>
      <nav>
        <h6 class="footer-title text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Resources</h6>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover" href="/blog">Blog</a>
          <a
            class="link link-hover"
            href="https://github.com/tanDivina/vibesfol.io">GitHub</a
          >
          <a class="link link-hover" href="/search">Search</a>
        </div>
      </nav>
      <nav>
        <h6 class="footer-title text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Comparisons</h6>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover" href="/vs/indiepage">vs. IndiePage</a>
          <a class="link link-hover" href="/vs/portfolio">vs. Portfolio.io</a>
          <a class="link link-hover" href="/vs/gitconnected">vs. GitConnected</a
          >
          <a class="link link-hover" href="/vs/devfolio">vs. Devfolio</a>
        </div>
      </nav>
      <nav>
        <h6 class="footer-title text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Company</h6>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover" href="/about">About</a>
          <a class="link link-hover" href="/contact_us">Contact Us</a>
          <a class="link link-hover" href="/privacy">Privacy Policy</a>
          <a class="link link-hover" href="/terms">Terms of Service</a>
          <a class="link link-hover" href="/support">Support</a>
        </div>
      </nav>
    </div>

    <div class="footer-bottom border-t border-base-300 pt-8 mt-8">
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-sm text-base-content/70">
          © 2025 MyDevfol.io. All rights reserved.
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <span class="text-sm text-base-content/70"
            >Built for developers, by developers</span
          >
          <a
            href="https://github.com/tanDivina/vibesfol.io"
            class="btn btn-ghost btn-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            Star on GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>
