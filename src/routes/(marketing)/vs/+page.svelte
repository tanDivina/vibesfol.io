<script lang="ts">
  const competitors = [
    {
      name: "IndiePage",
      description: "Simple landing pages for indie makers",
      pricing: "$19/month",
      strengths: ["Quick setup", "Indie maker focus"],
      weaknesses: ["No automation", "Limited features", "Recurring costs"],
      link: "/vs/indiepage",
    },
    {
      name: "Portfolio.io",
      description: "Template-based portfolio builder",
      pricing: "$0-29/month",
      strengths: ["Multiple templates", "Custom domains"],
      weaknesses: [
        "Manual screenshots",
        "No client portals",
        "Subscription model",
      ],
      link: "/vs/portfolio",
    },
    {
      name: "GitConnected",
      description: "GitHub-centric developer profiles",
      pricing: "Free",
      strengths: ["GitHub integration", "Developer community"],
      weaknesses: ["Limited customization", "No professional features"],
      link: "/vs/gitconnected",
    },
    {
      name: "Devfolio",
      description: "Hackathon-focused portfolios",
      pricing: "Free",
      strengths: ["Hackathon integration", "Student friendly"],
      weaknesses: [
        "Limited scope",
        "No business features",
        "Basic customization",
      ],
      link: "/vs/devfolio",
    },
  ]
</script>

<svelte:head>
  <title>MyDevfol.io Comparisons - How We Stack Up Against Competitors</title>
  <meta
    name="description"
    content="See how MyDevfol.io compares to other portfolio platforms like IndiePage, Portfolio.io, GitConnected, and Devfolio."
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

  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">How MyDevfol.io Compares</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      See how we stack up against other portfolio platforms in the market
    </p>
  </div>

  <!-- MyDevfol.io Overview -->
  <div class="card bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl mb-12">
    <div class="card-body text-center">
      <h2 class="text-3xl font-bold mb-4">MyDevfol.io</h2>
      <p class="text-lg text-gray-700 mb-6">
        The complete portfolio platform designed for modern developers
      </p>
      <div class="grid md:grid-cols-3 gap-6 text-left">
        <div>
          <h3 class="font-bold mb-2">🚀 Automation</h3>
          <p class="text-sm">
            Automated screenshots, tech stack detection, and project management
          </p>
        </div>
        <div>
          <h3 class="font-bold mb-2">💼 Professional</h3>
          <p class="text-sm">
            Client portals, testimonials, and business-ready features
          </p>
        </div>
        <div>
          <h3 class="font-bold mb-2">💰 Affordable</h3>
          <p class="text-sm">
            Free plan + lifetime deals instead of recurring subscriptions
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Competitor Comparison Cards -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    {#each competitors as competitor}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <h3 class="card-title text-xl">{competitor.name}</h3>
            <div class="badge badge-outline">{competitor.pricing}</div>
          </div>
          <p class="text-gray-600 mb-4">{competitor.description}</p>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 class="font-semibold text-green-600 mb-2">Strengths</h4>
              <ul class="text-sm space-y-1">
                {#each competitor.strengths as strength}
                  <li class="flex items-start">
                    <svg
                      class="w-3 h-3 text-green-500 mr-1 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {strength}
                  </li>
                {/each}
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-red-600 mb-2">Limitations</h4>
              <ul class="text-sm space-y-1">
                {#each competitor.weaknesses as weakness}
                  <li class="flex items-start">
                    <svg
                      class="w-3 h-3 text-red-500 mr-1 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {weakness}
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <div class="card-actions justify-end">
            <a href={competitor.link} class="btn btn-outline btn-sm">
              Detailed Comparison
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Why MyDevfol.io Wins -->
  <div class="card bg-base-100 shadow-xl mb-12">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">
        Why Developers Choose MyDevfol.io
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Save Time</h3>
          <p class="text-sm text-gray-600">
            Automated screenshots and tech stack tagging eliminate manual work
          </p>
        </div>
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Save Money</h3>
          <p class="text-sm text-gray-600">
            Lifetime deals instead of recurring monthly subscriptions
          </p>
        </div>
        <div class="text-center">
          <div
            class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              ></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Look Professional</h3>
          <p class="text-sm text-gray-600">
            Client portals, testimonials, and business features that impress
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Call to Action -->
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">
      Ready to Build Your Professional Portfolio?
    </h2>
    <p class="text-gray-600 mb-6">
      Join thousands of developers who chose the platform that grows with their
      career
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/login" class="btn btn-primary btn-lg"> Get Started Free </a>
      <a href="/pricing" class="btn btn-outline btn-lg"> View Pricing </a>
    </div>
  </div>
</div>
