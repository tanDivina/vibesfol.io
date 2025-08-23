<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"
  import { onMount } from "svelte"

  let heroElement: HTMLElement
  let mouseX = 0
  let mouseY = 0

  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width) * 100
        mouseY = ((e.clientY - rect.top) / rect.height) * 100
        
        heroElement.style.setProperty('--mouse-x', `${mouseX}%`)
        heroElement.style.setProperty('--mouse-y', `${mouseY}%`)
      }
    }

    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  })

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
      description:
        "Track portfolio views and optimize for search engines with built-in SEO tools and social sharing.",
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
      description:
        "Beautiful, mobile-first design that looks great on all devices and screen sizes.",
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

<div 
  bind:this={heroElement}
  class="hero min-h-[60vh] interactive-gradient animate-gradient-slow"
  style="--mouse-x: 50%; --mouse-y: 50%"
>
  <div class="hero-content text-center py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <div
        class="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-6 md:mb-10 tracking-tight drop-shadow-2xl"
        style="text-shadow: 0 0 30px rgba(44, 62, 80, 0.4);"
      >
        MyDevfol.io
      </div>

      <div
        class="text-5xl md:text-7xl font-black leading-tight mb-6 md:mb-8"
        style="color: #2c3e50;"
      >
        The
        <span
          class="underline decoration-4 md:decoration-8 underline-offset-4"
          style="text-decoration-color: white;"
          >ultimate</span
        >
        <span
          class="underline decoration-4 md:decoration-8 underline-offset-4"
          style="text-decoration-color: white;"
          >portfolio platform</span
        >
        for
        <span
          class="underline decoration-4 md:decoration-8 underline-offset-4"
          style="text-decoration-color: white;"
          >developers</span
        >
      </div>
      <div class="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12">
        Create stunning portfolios in minutes with <span class="font-bold"
          >automated screenshots</span
        >, <span class="font-bold">tech stack tagging</span>, and
        <span class="font-bold">professional themes</span>. Perfect for
        developers, indie hackers, and creative professionals.
      </div>
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <a href="/login">
          <button class="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Get Started Free
          </button>
        </a>
        <a href="/pricing">
          <button class="btn btn-outline btn-primary btn-lg px-8 py-4 text-lg font-semibold hover:bg-blue-50 transition-all duration-200">
            View Pricing
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
<div class="min-h-[60vh]">
  <div class="pt-20 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent"
      >
        Powerful Features
      </div>
      <div class="text-xl font-bold">
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
            <div class="flex justify-center items-center">
              <svg
                width="50px"
                height="50px"
                class="mb-2 mt-1 mx-auto"
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
            <div></div>
            {#if feature.link}

              <a
                href={feature.link}
                class="pb-4 mt-auto"
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

<!-- Portfolio Preview Section -->
<div class="min-h-[80vh] bg-base-200 py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        See Your Portfolio in Action
      </div>
      <div class="mt-4 text-xl">
        Here's what your developer portfolio will look like
      </div>
    </div>

    <!-- Portfolio Preview -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
        <!-- Portfolio Header -->
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-8">
          <div
            class="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="John Doe"
              class="w-32 h-32 rounded-full shadow-lg"
            />
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                John Doe
              </h1>
              <p class="text-lg text-gray-600 mb-4 max-w-2xl">
                Full-stack developer passionate about creating beautiful,
                functional web applications. I love working with modern
                technologies and building solutions that make a difference.
              </p>
              <div class="mb-4">
                <a
                  href="https://johndoe.dev"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  johndoe.dev
                </a>
              </div>
              <div class="flex justify-center md:justify-start gap-4">
                <div
                  class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </div>
                <div
                  class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </div>
                <div
                  class="w-8 h-8 bg-blue-400 rounded flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                  </svg>
                </div>
                <div
                  class="w-8 h-8 bg-black rounded flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="p-8">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">
            Featured Projects
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Project 1 -->
            <div
              class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <div class="h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                  alt="E-commerce Platform"
                  class="object-cover w-full h-full"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">E-commerce Platform</h3>
                <p class="text-gray-600 mb-4">
                  A full-stack e-commerce platform with user authentication,
                  payment processing, and admin dashboard.
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >React</span
                  >
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >Node.js</span
                  >
                  <span
                    class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >PostgreSQL</span
                  >
                  <span
                    class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                    >Stripe</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >LIVE</span
                  >
                  <button class="btn btn-sm btn-primary">View Project</button>
                </div>
              </div>
            </div>

            <!-- Project 2 -->
            <div
              class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <div class="h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
                  alt="Task Management App"
                  class="object-cover w-full h-full"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Task Management App</h3>
                <p class="text-gray-600 mb-4">
                  Collaborative task management with real-time updates and team
                  collaboration features.
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >Vue.js</span
                  >
                  <span
                    class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                    >Express.js</span
                  >
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >MongoDB</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >LIVE</span
                  >
                  <button class="btn btn-sm btn-primary">View Project</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Preview -->
          <div
            class="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8"
          >
            <h3 class="text-2xl font-bold mb-4 text-center">Get In Touch</h3>
            <p class="text-gray-600 text-center mb-6">
              I'd love to hear from you! Send me a message and I'll get back to
              you as soon as possible.
            </p>
            <div class="max-w-md mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  class="input input-bordered w-full"
                  disabled
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  class="input input-bordered w-full"
                  disabled
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                class="input input-bordered w-full mb-4"
                disabled
              />
              <textarea
                placeholder="Your message..."
                class="textarea textarea-bordered w-full h-24 mb-4"
                disabled
              ></textarea>
              <button class="btn btn-primary w-full" disabled
                >Send Message</button
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-12">
        <div class="text-xl mb-4">
          Ready to create your own portfolio like this?
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/demo">
            <button class="btn btn-outline btn-primary">View Full Demo</button>
          </a>
          <a href="/login">
            <button class="btn btn-primary">Start Building Now</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="min-h-[60vh] mt-12" style="background-color: #fefce8; color: #374151;">
  <div class="text-center pb-16 pt-4 px-4 text-gray-700">
    <div class="max-w-lg mx-auto text-center">
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