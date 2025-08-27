<script lang="ts">
  const comparisonData = [
    {
      feature: "Automated Screenshots",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "AI-powered screenshot generation",
      competitorDetails: "Manual upload only",
    },
    {
      feature: "Tech Stack Tagging",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "50+ curated technologies",
      competitorDetails: "Basic tags only",
    },
    {
      feature: "Custom Domains",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Free custom domains",
      competitorDetails: "Premium feature only",
    },
    {
      feature: "Contact Forms",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Built-in with notifications",
      competitorDetails: "Basic contact form",
    },
    {
      feature: "Analytics",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Detailed portfolio analytics",
      competitorDetails: "No analytics",
    },
    {
      feature: "Client Portals",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Private client project portals",
      competitorDetails: "Not available",
    },
    {
      feature: "Testimonials",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Unlimited testimonials",
      competitorDetails: "Limited testimonials",
    },
    {
      feature: "Pricing",
      mydevfol: "Free + LTD",
      competitor: "$19/month",
      mydevfolDetails: "One-time payment options",
      competitorDetails: "Recurring subscription only",
    },
  ]
</script>

<svelte:head>
  <title>MyDevfol.io vs IndiePage - Feature Comparison</title>
  <meta
    name="description"
    content="Compare MyDevfol.io with IndiePage. See why MyDevfol.io offers better value with automated screenshots, tech stack tagging, and lifetime deals."
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
    <h1 class="text-4xl font-bold mb-4">MyDevfol.io vs IndiePage</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      See how MyDevfol.io compares to IndiePage for creating developer
      portfolios
    </p>
  </div>

  <!-- Hero Comparison -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    <div class="card bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-2xl justify-center mb-4">MyDevfol.io</h2>
        <div class="text-4xl font-bold text-primary mb-2">Free + LTD</div>
        <p class="text-gray-600 mb-4">
          Start free, upgrade with one-time payments
        </p>
        <ul class="text-left space-y-2">
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Automated screenshots
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Tech stack tagging
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Client portals
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Portfolio analytics
          </li>
        </ul>
        <div class="card-actions justify-center mt-6">
          <a href="/login" class="btn btn-primary">Get Started Free</a>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-2xl justify-center mb-4">IndiePage</h2>
        <div class="text-4xl font-bold text-gray-600 mb-2">$19/month</div>
        <p class="text-gray-600 mb-4">Recurring subscription required</p>
        <ul class="text-left space-y-2">
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Manual screenshots only
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Basic tags only
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            No client portals
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Limited analytics
          </li>
        </ul>
        <div class="card-actions justify-center mt-6">
          <button class="btn btn-outline" disabled>External Service</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Comparison Table -->
  <div class="card bg-base-100 shadow-xl mb-12">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Feature Comparison</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="text-center">MyDevfol.io</th>
              <th class="text-center">IndiePage</th>
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
                    <span class="font-medium">{item.mydevfol}</span>
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

  <!-- Why Choose MyDevfol.io -->
  <div class="card bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Why Choose MyDevfol.io?</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-bold mb-3">🚀 Better Features</h3>
          <ul class="space-y-2">
            <li>• Automated screenshot generation saves hours of work</li>
            <li>• Advanced tech stack tagging with 50+ technologies</li>
            <li>• Client portals for professional project management</li>
            <li>• Detailed analytics to track portfolio performance</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-3">💰 Better Value</h3>
          <ul class="space-y-2">
            <li>• Start completely free with 3 projects</li>
            <li>• Lifetime deals instead of recurring subscriptions</li>
            <li>• No monthly fees - pay once, use forever</li>
            <li>• More features at a fraction of the cost</li>
          </ul>
        </div>
      </div>
      <div class="card-actions justify-center mt-8">
        <a href="/login" class="btn btn-primary btn-lg">
          Try MyDevfol.io Free
        </a>
        <a href="/pricing" class="btn btn-outline btn-lg"> View Pricing </a>
      </div>
    </div>
  </div>
</div>