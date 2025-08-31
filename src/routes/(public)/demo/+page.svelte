<script lang="ts">
  import { onMount } from "svelte"
  import { trackEvent } from "$lib/analytics"
  import ContactForm from "$lib/ContactForm.svelte"
  import SEOTags from "$lib/SEOTags.svelte"

  // Demo data for showcasing the portfolio functionality
  const demoUser = {
    id: "demo-user",
    full_name: "John Doe",
    username: "demo",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    website: "https://johndoe.dev",
    bio: "Full-stack developer passionate about creating beautiful, functional web applications. I love working with modern technologies and building solutions that make a difference.",
    github_url: "https://github.com/johndoe",
    linkedin_url: "https://linkedin.com/in/johndoe",
    twitter_url: "https://twitter.com/johndoe",
    medium_url: "https://medium.com/@johndoe",
    gumroad_url: "https://gumroad.com/johndoe",
    substack_url: "https://johndoe.substack.com",
    amazon_gear_list_url: "https://amazon.com/shop/johndoe",
    whatsapp_number: "+1234567890",
    youtube_url: "https://youtube.com/@johndoe",
    portfolio_theme: "modern",
    contact_form_enabled: true,
    contact_form_title: "Get In Touch",
    contact_form_description: "I'd love to hear from you! Send me a message and I'll get back to you as soon as possible.",
    contact_email_notifications: true,
    seo_title: "John Doe | Full-Stack Developer Portfolio",
    seo_description: "Full-stack developer passionate about creating beautiful, functional web applications.",
    seo_image_url: null,
    seo_keywords: "full-stack developer, web development, react, node.js"
  }

  const demoProjects = [
    {
      id: "project-1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with modern technologies. Features include user authentication, payment processing, and admin dashboard.",
      url: "https://mystore.example.com",
      screenshot_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      status: "LIVE",
      technologies: [
        { technologies: { id: "1", name: "React" } },
        { technologies: { id: "2", name: "Node.js" } },
        { technologies: { id: "3", name: "PostgreSQL" } },
        { technologies: { id: "4", name: "Stripe" } },
      ],
    },
    {
      id: "project-2", 
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      url: "https://taskapp.example.com",
      screenshot_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      status: "LIVE",
      technologies: [
        { technologies: { id: "5", name: "Vue.js" } },
        { technologies: { id: "6", name: "Express.js" } },
        { technologies: { id: "7", name: "MongoDB" } },
        { technologies: { id: "8", name: "Socket.io" } },
      ],
    },
    {
      id: "project-3",
      title: "Weather Dashboard", 
      description: "A beautiful weather dashboard showing current conditions, forecasts, and weather maps with a clean, responsive design.",
      url: "https://weather.example.com",
      screenshot_url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      status: "IN PROGRESS",
      technologies: [
        { technologies: { id: "9", name: "Next.js" } },
        { technologies: { id: "10", name: "TypeScript" } },
        { technologies: { id: "11", name: "Tailwind CSS" } },
      ],
    },
  ]

  // Theme configurations
  const themes = {
    modern: {
      heroClass: "bg-gradient-to-r from-purple-50 to-blue-50",
      textClass: "text-gray-800",
      subtextClass: "text-gray-600",
      cardClass: "bg-base-100",
    },
    minimal: {
      heroClass: "bg-white border border-gray-200",
      textClass: "text-gray-900",
      subtextClass: "text-gray-700",
      cardClass: "bg-white border border-gray-100",
    },
    dark: {
      heroClass: "bg-gray-900",
      textClass: "text-white",
      subtextClass: "text-gray-300",
      cardClass: "bg-gray-800",
    },
    creative: {
      heroClass: "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100",
      textClass: "text-gray-800",
      subtextClass: "text-gray-600",
      cardClass: "bg-white/80 backdrop-blur-sm",
    },
  }

  $: currentTheme = themes[demoUser.portfolio_theme as keyof typeof themes] || themes.modern

  onMount(() => {
    trackEvent("portfolio_view", {
      user_id: demoUser.id,
      page_path: "/demo",
    })
  })

  function handleSocialClick(platform: string) {
    trackEvent("social_click", {
      user_id: demoUser.id,
      platform,
    })
  }

  function handleProjectClick(projectId: string, clickType: string) {
    trackEvent("project_click", {
      user_id: demoUser.id,
      project_id: projectId,
      click_type: clickType,
    })
  }
</script>

<SEOTags
  title={demoUser.seo_title}
  description={demoUser.seo_description}
  imageUrl={demoUser.seo_image_url || demoUser.avatar_url}
  keywords={demoUser.seo_keywords}
/>

<div class="container mx-auto px-4 py-8 {demoUser.portfolio_theme === 'dark' ? 'bg-gray-900 min-h-screen' : ''}">
  <!-- Demo Banner -->
  <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm">
          <strong>Live Demo:</strong> This is a fully functional demo portfolio showing all the features of MyDevfol.io. 
          <a href="/login/sign_up" class="underline font-medium">Sign up to create your own!</a>
        </p>
      </div>
    </div>
  </div>

  <!-- Back to Homepage Button -->
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

  <!-- Hero Section -->
  <div class="{currentTheme.heroClass} rounded-lg p-8 mb-8">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      {#if demoUser.avatar_url}
        <img
          src={demoUser.avatar_url}
          alt={demoUser.full_name}
          class="w-32 h-32 rounded-full shadow-lg"
        />
      {/if}
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl md:text-5xl font-bold {currentTheme.textClass} mb-2">
          {demoUser.full_name}
        </h1>

        {#if demoUser.bio}
          <p class="text-lg {currentTheme.subtextClass} mb-4 max-w-2xl">
            {demoUser.bio}
          </p>
        {/if}

        <!-- Website Link -->
        {#if demoUser.website}
          <div class="mb-4">
            <a
              href={demoUser.website}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              on:click={() => handleSocialClick('website')}
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
              {demoUser.website}
            </a>
          </div>
        {/if}

        <!-- Social Links -->
        <div class="flex justify-center md:justify-start gap-4">
          {#if demoUser.github_url}
            <a 
              href={demoUser.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              on:click={() => handleSocialClick('github')}
              aria-label="GitHub Profile"
            >
              <div class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </a>
          {/if}
          {#if demoUser.linkedin_url}
            <a 
              href={demoUser.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              on:click={() => handleSocialClick('linkedin')}
              aria-label="LinkedIn Profile"
            >
              <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </a>
          {/if}
          {#if demoUser.twitter_url}
            <a 
              href={demoUser.twitter_url} 
              target="_blank" 
              rel="noopener noreferrer"
              on:click={() => handleSocialClick('twitter')}
              aria-label="Twitter Profile"
            >
              <div class="w-8 h-8 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500 transition-colors">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
            </a>
          {/if}
          {#if demoUser.medium_url}
            <a 
              href={demoUser.medium_url} 
              target="_blank" 
              rel="noopener noreferrer"
              on:click={() => handleSocialClick('medium')}
              aria-label="Medium Profile"
            >
              <div class="w-8 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Projects Section -->
  <h2 class="text-3xl font-bold mb-6 {currentTheme.textClass}">Featured Projects</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
    {#each demoProjects as project (project.id)}
      <div class="card {currentTheme.cardClass} shadow-xl">
        <figure class="h-48 bg-gray-200">
          {#if project.screenshot_url}
            <button
              class="w-full h-full p-0 border-0 bg-transparent cursor-pointer"
              on:click={() => handleProjectClick(project.id, "view_screenshot")}
              aria-label="View screenshot of {project.title}"
            >
              <img
                src={project.screenshot_url}
                alt={project.title}
                class="object-cover w-full h-full"
              />
            </button>
          {:else}
            <div class="flex items-center justify-center w-full h-full text-gray-500">
              <span>No Screenshot</span>
            </div>
          {/if}
        </figure>
        <div class="card-body">
          <h2 class="card-title">{project.title}</h2>
          <p class="text-gray-600">{project.description}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            {#each project.technologies as tech}
              <div class="badge badge-secondary">
                {tech.technologies.name}
              </div>
            {/each}
          {/each}
          <div class="card-actions justify-between items-center mt-4">
            <div class="badge badge-outline">{project.status}</div>
            {#if project.url}
              <a
                href={project.url}
                on:click={() => handleProjectClick(project.id, "visit_link")}
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-sm btn-primary"
              >
                View Project
              </a>
            {/if}
          </div>
        </div>
      </div>
  </div>

  <!-- Contact Form Section -->
  {#if demoUser.contact_form_enabled}
    <div class="mt-16">
      <div class="{currentTheme.cardClass} rounded-lg p-8 shadow-xl">
        <ContactForm
          portfolioUserId={demoUser.id}
          portfolioUserName={demoUser.full_name}
          title={demoUser.contact_form_title}
          description={demoUser.contact_form_description}
          on:success={() => {
            trackEvent("contact_form_success", {
              portfolio_user_id: demoUser.id,
            })
          }}
          on:error={() => {
            trackEvent("contact_form_error", {
              portfolio_user_id: demoUser.id,
            })
          }}
        />
      </div>
    </div>
  {/if}

  <!-- Call to Action -->
  <div class="mt-16 text-center">
    <div class="{currentTheme.cardClass} rounded-lg p-8 shadow-xl">
      <h3 class="text-2xl font-bold mb-4">Ready to Create Your Own Portfolio?</h3>
      <p class="text-gray-600 mb-6">
        This demo shows what's possible with MyDevfol.io. Create your own professional portfolio in minutes!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/login/sign_up" class="btn btn-primary btn-lg">
          Get Started Free
        </a>
        <a href="/pricing" class="btn btn-outline btn-lg">
          View Pricing
        </a>
      </div>
    </div>
  </div>
</div>