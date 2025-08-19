<script lang="ts">
  const comparisonData = [
    {
      feature: "Portfolio Creation",
      mydevfol: "Visual editor",
      competitor: "Profile-based",
      mydevfolDetails: "Drag & drop project management",
      competitorDetails: "GitHub integration focus"
    },
    {
      feature: "Automated Screenshots",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "AI-powered screenshot generation",
      competitorDetails: "Manual uploads only"
    },
    {
      feature: "Tech Stack Display",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Curated database of 50+ technologies",
      competitorDetails: "GitHub repository analysis"
    },
    {
      feature: "Professional Features",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Testimonials, client portals, certificates",
      competitorDetails: "Basic profile only"
    },
    {
      feature: "Custom Domains",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Free custom domain support",
      competitorDetails: "Not available"
    },
    {
      feature: "Analytics",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Portfolio views, project clicks",
      competitorDetails: "No analytics"
    },
    {
      feature: "Contact Management",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Built-in contact forms & management",
      competitorDetails: "External contact methods"
    },
    {
      feature: "Pricing",
      mydevfol: "Free + LTD",
      competitor: "Free",
      mydevfolDetails: "Free plan + lifetime upgrades",
      competitorDetails: "Free with limited features"
    }
  ];
</script>

<svelte:head>
  <title>MyDevfol.io vs GitConnected - Developer Portfolio Platform Comparison</title>
  <meta name="description" content="Compare MyDevfol.io with GitConnected. See why MyDevfol.io offers better portfolio customization, automation, and professional features." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/" class="btn btn-outline btn-sm">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Homepage
    </a>
  </div>

  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">MyDevfol.io vs GitConnected</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      Comparing portfolio platforms: Visual editor vs GitHub-centric approach
    </p>
  </div>

  <!-- Approach Comparison -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    <div class="card bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl border-2 border-blue-200">
      <div class="card-body">
        <div class="badge badge-primary mb-4">Visual First</div>
        <h2 class="card-title text-2xl mb-4">MyDevfol.io</h2>
        <p class="text-gray-600 mb-4">Complete portfolio platform with visual editing and professional features</p>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Visual project management with automated screenshots
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Professional features: testimonials, client portals
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Built-in analytics and contact management
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Lifetime deals - no recurring fees
          </li>
        </ul>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="badge badge-neutral mb-4">GitHub Focused</div>
        <h2 class="card-title text-2xl mb-4">GitConnected</h2>
        <p class="text-gray-600 mb-4">GitHub-centric developer profiles with automatic repository integration</p>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Automatic GitHub repository sync
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Developer community features
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            Limited customization options
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            No client-facing features
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Feature Comparison Table -->
  <div class="card bg-base-100 shadow-xl mb-12">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Feature by Feature</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="text-center">MyDevfol.io</th>
              <th class="text-center">GitConnected</th>
            </tr>
          </thead>
          <tbody>
            {#each comparisonData as item}
              <tr>
                <td class="font-medium">{item.feature}</td>
                <td class="text-center">
                  {#if typeof item.mydevfol === 'boolean'}
                    {#if item.mydevfol}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium text-primary">{item.mydevfol}</span>
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">{item.mydevfolDetails}</div>
                </td>
                <td class="text-center">
                  {#if typeof item.competitor === 'boolean'}
                    {#if item.competitor}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium">{item.competitor}</span>
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">{item.competitorDetails}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Key Differences -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title text-xl mb-4">🎯 MyDevfol.io Approach</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <div>
              <strong>Visual Portfolio Builder:</strong> Create stunning portfolios with drag-and-drop simplicity
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <div>
              <strong>Professional Focus:</strong> Built for freelancers and professionals who need client-facing features
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <div>
              <strong>Automation First:</strong> Automated screenshots and tech stack detection save time
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title text-xl mb-4">⚙️ GitConnected Approach</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-gray-500 mr-2">•</span>
            <div>
              <strong>GitHub Integration:</strong> Automatically pulls data from your GitHub repositories
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 mr-2">•</span>
            <div>
              <strong>Developer Community:</strong> Focus on connecting developers with each other
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 mr-2">•</span>
            <div>
              <strong>Profile Based:</strong> More like a social network for developers
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Detailed Comparison Table -->
  <div class="card bg-base-100 shadow-xl mb-12">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Detailed Feature Comparison</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="text-center">MyDevfol.io</th>
              <th class="text-center">GitConnected</th>
            </tr>
          </thead>
          <tbody>
            {#each comparisonData as item}
              <tr>
                <td class="font-medium">{item.feature}</td>
                <td class="text-center">
                  {#if typeof item.mydevfol === 'boolean'}
                    {#if item.mydevfol}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium text-primary">{item.mydevfol}</span>
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">{item.mydevfolDetails}</div>
                </td>
                <td class="text-center">
                  {#if typeof item.competitor === 'boolean'}
                    {#if item.competitor}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    {/if}
                  {:else}
                    <span class="font-medium">{item.competitor}</span>
                  {/if}
                  <div class="text-xs text-gray-500 mt-1">{item.competitorDetails}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Call to Action -->
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Choose the Right Platform for Your Needs</h2>
    <p class="text-gray-600 mb-6">
      If you want a professional portfolio with client-facing features and automation, MyDevfol.io is the clear choice.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/login" class="btn btn-primary btn-lg">
        Start Building Your Portfolio
      </a>
      <a href="/demo" class="btn btn-outline btn-lg">
        See MyDevfol.io in Action
      </a>
    </div>
  </div>
</div>