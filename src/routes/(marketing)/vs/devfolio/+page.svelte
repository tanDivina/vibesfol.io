<script lang="ts">
  const comparisonData = [
    {
      feature: "Target Audience",
      mydevfol: "All Developers",
      competitor: "Hackathon Focus",
      mydevfolDetails: "Freelancers, professionals, students",
      competitorDetails: "Primarily hackathon participants",
    },
    {
      feature: "Automated Screenshots",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "AI-powered screenshot generation",
      competitorDetails: "Manual image uploads",
    },
    {
      feature: "Professional Features",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Testimonials, client portals, certificates",
      competitorDetails: "Basic project showcase",
    },
    {
      feature: "Hackathon Integration",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Certificate management system",
      competitorDetails: "Native hackathon platform",
    },
    {
      feature: "Custom Domains",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Free custom domain support",
      competitorDetails: "Subdomain only",
    },
    {
      feature: "Analytics",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Portfolio views, engagement tracking",
      competitorDetails: "Basic view counts",
    },
    {
      feature: "Contact Management",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Built-in contact forms & CRM",
      competitorDetails: "External contact only",
    },
    {
      feature: "Pricing",
      mydevfol: "Free + LTD",
      competitor: "Free",
      mydevfolDetails: "Free plan + lifetime upgrades",
      competitorDetails: "Free with limited features",
    },
  ]
</script>

<svelte:head>
  <title>MyDevfol.io vs Devfolio - Portfolio Platform Comparison</title>
  <meta
    name="description"
    content="Compare MyDevfol.io with Devfolio. See why MyDevfol.io offers better professional features beyond hackathon portfolios."
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
    <h1 class="text-4xl font-bold mb-4">MyDevfol.io vs Devfolio</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      Professional portfolios vs hackathon-focused platforms
    </p>
  </div>

  <!-- Target Audience Comparison -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    <div
      class="card bg-gradient-to-br from-green-50 to-blue-50 shadow-xl border-2 border-green-200"
    >
      <div class="card-body">
        <div class="badge badge-success mb-4">All Developers</div>
        <h2 class="card-title text-2xl mb-4">MyDevfol.io</h2>
        <p class="text-gray-600 mb-4">
          Complete portfolio solution for all types of developers
        </p>
        <div class="text-left">
          <div class="font-semibold mb-2">Perfect for:</div>
          <ul class="space-y-1 text-sm">
            <li>• Freelance developers seeking clients</li>
            <li>• Job seekers building their personal brand</li>
            <li>• Students showcasing academic projects</li>
            <li>• Professionals managing client relationships</li>
            <li>• Indie hackers promoting their products</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="badge badge-warning mb-4">Hackathon Focused</div>
        <h2 class="card-title text-2xl mb-4">Devfolio</h2>
        <p class="text-gray-600 mb-4">
          Specialized platform for hackathon participants
        </p>
        <div class="text-left">
          <div class="font-semibold mb-2">Best for:</div>
          <ul class="space-y-1 text-sm">
            <li>• Hackathon participants</li>
            <li>• Students in competitive programming</li>
            <li>• Developers focused on contests</li>
            <li>• Basic project showcasing</li>
            <li>• Community networking</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Feature Comparison -->
  <div class="card bg-base-100 shadow-xl mb-12">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Feature Comparison</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="text-center">MyDevfol.io</th>
              <th class="text-center">Devfolio</th>
            </tr>
          </thead>
          <tbody>
            {#each comparisonData as item}
              <tr>
                <td class="font-medium">{item.feature}</td>
                <td class="text-center">
                  {#if typeof item.mydevfol === "boolean"}
                    {#if item.mydevfol}
                      <div class="flex items-center justify-center">
                        <svg
                          class="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg
                          class="w-5 h-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium text-primary">{item.mydevfol}</span
                    >
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">
                    {item.mydevfolDetails}
                  </div>
                </td>
                <td class="text-center">
                  {#if typeof item.competitor === "boolean"}
                    {#if item.competitor}
                      <div class="flex items-center justify-center">
                        <svg
                          class="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg
                          class="w-5 h-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium">{item.competitor}</span>
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">
                    {item.competitorDetails}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Bottom Line -->
  <div class="card bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl">
    <div class="card-body text-center">
      <h2 class="card-title text-2xl justify-center mb-4">The Bottom Line</h2>
      <p class="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
        While Devfolio excels for hackathon participants, MyDevfol.io provides a
        comprehensive solution for developers at all stages of their career who
        need professional portfolio features.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/login/sign_up" class="btn btn-primary btn-lg">
          Create Your Professional Portfolio
        </a>
        <a href="/demo" class="btn btn-outline btn-lg"> See the Difference </a>
      </div>
    </div>
  </div>
</div>
