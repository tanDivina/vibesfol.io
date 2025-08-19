<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`

  const features = [
    {
      name: "Automated Screenshots",
      description:
        "Generate high-quality screenshots of your live projects automatically. No more manual screenshot taking or outdated images.",
      link: "/dashboard/projects",
      linkText: "Try It",
      svgContent: `<path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M2 10L22 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="6" cy="7" r="1" fill="#1C274C"/>
<circle cx="8.5" cy="7" r="1" fill="#1C274C"/>
<circle cx="11" cy="7" r="1" fill="#1C274C"/>
<path d="M7 14L10 17L17 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Tech Stack Tagging",
      link: "/dashboard/projects",
      description:
        "Tag your projects with technologies from our curated database of 50+ popular frameworks, languages, and tools.",
      linkText: "Try It",
      svgContent: `<path d="M9.5 2C8.11929 2 7 3.11929 7 4.5C7 5.88071 8.11929 7 9.5 7C10.8807 7 12 5.88071 12 4.5C12 3.11929 10.8807 2 9.5 2Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M14.5 9C13.1193 9 12 10.1193 12 11.5C12 12.8807 13.1193 14 14.5 14C15.8807 14 17 12.8807 17 11.5C17 10.1193 15.8807 9 14.5 9Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M9.5 16C8.11929 16 7 17.1193 7 18.5C7 19.8807 8.11929 21 9.5 21C10.8807 21 12 19.8807 12 18.5C12 17.1193 10.8807 16 9.5 16Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M12 4.5L12 11.5" stroke="#1C274C" stroke-width="1.5"/>
<path d="M12 11.5L12 18.5" stroke="#1C274C" stroke-width="1.5"/>`,
    },
    {
      name: "Public Portfolios",
      link: "/demo-profile",
      description:
        "Beautiful public portfolio pages with custom URLs. Share your work with a clean, professional presentation.",
      linkText: "View Demo",
      svgContent: `<path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M7 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 9H22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13 13H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13 17H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 13H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 17H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      name: "Professional Features",
      link: "/dashboard/testimonials",
      description:
        "Showcase testimonials, hackathon achievements, and create client portals for a complete professional presence.",
      linkText: "Try It",
      svgContent: `<path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Analytics & SEO",
      link: "/dashboard/analytics",
      description: "Track portfolio views and optimize for search engines with built-in SEO tools and social sharing.",
      linkText: "Try It",
      svgContent: `<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Custom Domains",
      link: "/dashboard/settings",
      description:
        "Connect your own domain to your portfolio for a professional branded experience.",
      linkText: "Try It",
      svgContent: `<path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Contact Forms",
      link: "/contact_us",
      description:
        "Built-in contact forms for potential clients to reach out directly through your portfolio.",
      linkText: "Try It",
      svgContent: `<path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Client Portals",
      link: "/dashboard/client-portals",
      description:
        "Create secure, private portals for clients to view project progress and deliverables.",
      linkText: "Try It",
      svgContent: `<path d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m3-10h4m-4 4h4m-9-4h.01M7 16h.01" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Responsive Design",
      description: "Beautiful, mobile-first design that looks great on all devices and screen sizes.",
      svgContent: `<path d="M11 17H8C5.17157 17 3.75736 17 2.87868 16.1213C2 15.2426 2 13.8284 2 11V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H15.5C17.8346 2 19.0019 2 19.8856 2.47231C20.5833 2.84525 21.1548 3.4167 21.5277 4.11441C22 4.99805 22 6.16537 22 8.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 15C14 13.1144 14 12.1716 14.5858 11.5858C15.1716 11 16.1144 11 18 11C19.8856 11 20.8284 11 21.4142 11.5858C22 12.1716 22 13.1144 22 15V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V15Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M19 20H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 22H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 22V17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 13H2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
  ]
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <div
        class="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mb-3 md:mb-7 pb-1"
      >
        MyDevfol.io
      </div>

      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        The
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >ultimate</span
        >
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >portfolio platform</span
        >
        for
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >developers</span
        >
      </div>
      <div class="mt-6 md:mt-10 text-sm md:text-lg">
        Create stunning portfolios in minutes with <span class="font-bold">automated screenshots</span>, <span class="font-bold">tech stack tagging</span>, and <span class="font-bold">professional themes</span>. Perfect for developers, indie hackers, and creative professionals.
      </div>
      <div
        class="mt-6 md:mt-4 flex flex-row flex-wrap gap-4 place-content-center"
      >
        <a href="/login">
          <button class="btn btn-primary px-6">Get Started Free</button>
        </a>
        <a href="/pricing">
          <button class="btn btn-outline btn-primary px-6">View Pricing</button
          >
        </a>
      </div>
    </div>
  </div>
</div>
<div class="min-h-[60vh]">
  <div class="pt-20 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        Powerful Features
      </div>
      <div class="mt-4 text-xl font-bold">
        Everything you need to create a
        <span
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          professional developer portfolio
        </span>
      </div>
    </div>

    <div
      class="flex gap-6 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap"
    >
      {#each features as feature}
        <div class="card bg-white w-[270px] min-h-[300px] flex-none shadow-xl">
          <div class="card-body items-center text-center p-[24px] pt-[32px]">
            <div>
              <svg
                width="50px"
                height="50px"
                class="mb-2 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html feature.svgContent}
              </svg>
            </div>
            <h2 class="card-title">
              {feature.name}
            </h2>
            <p class="text-sm">
              {feature.description}
            </p>
            {#if feature.link}
              <a
                href={feature.link}
                class="pb-4"
                target={feature.newPage ? "_blank" : ""}
              >
                <button
                  class="btn btn-xs btn-outline rounded-full btn-primary min-w-[100px]"
                  >{feature.linkText ? feature.linkText : "Try It"}</button
                >
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
<div class="hero min-h-[60vh] mt-12">
  <div class="hero-content text-center pb-16 pt-4 px-4">
    <div class="max-w-lg">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mt-4 pb-2"
      >
        See it in Action
      </div>
      <div class="mt-6 text-lg md:text-xl">
        Check out our demo portfolio to see how your projects will look
      </div>
      <div class="mt-8">
        <a href="/demo-profile">
          <button class="btn btn-primary btn-wide">View Demo Portfolio</button>
        </a>
      </div>
      <div class="mt-6 text-base">
        Or start building your own portfolio today
      </div>
      <div class="mt-4">
        <a href="/login">
          <button class="btn btn-outline btn-primary">Get Started Free</button>
        </a>
      </div>
    </div>
  </div>
</div>
