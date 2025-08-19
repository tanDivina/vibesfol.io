<script lang="ts">
  const comparisonData = [
    {
      feature: "Automated Screenshots",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "AI-powered screenshot generation",
      competitorDetails: "Manual upload required"
    },
    {
      feature: "Tech Stack Tagging",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "50+ curated technologies",
      competitorDetails: "Basic skill tags"
    },
    {
      feature: "Custom Domains",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Free with verification",
      competitorDetails: "Available on pro plans"
    },
    {
      feature: "Templates & Themes",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "4 professional themes",
      competitorDetails: "Multiple templates"
    },
    {
      feature: "Contact Forms",
      mydevfol: true,
      competitor: true,
      mydevfolDetails: "Built-in with email notifications",
      competitorDetails: "Basic contact functionality"
    },
    {
      feature: "Analytics",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Detailed visitor analytics",
      competitorDetails: "No built-in analytics"
    },
    {
      feature: "Client Portals",
      mydevfol: true,
      competitor: false,
      mydevfolDetails: "Private client project access",
      competitorDetails: "Not available"
    },
    {
      feature: "Pricing Model",
      mydevfol: "Free + LTD",
      competitor: "Free + Pro",
      mydevfolDetails: "One-time lifetime payments",
      competitorDetails: "Monthly/yearly subscriptions"
    }
  ];
</script>

<svelte:head>
  <title>MyDevfol.io vs Portfolio.io - Developer Portfolio Comparison</title>
  <meta name="description" content="Compare MyDevfol.io with Portfolio.io. Discover why MyDevfol.io offers superior automation, better pricing, and more professional features." />
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
    <h1 class="text-4xl font-bold mb-4">MyDevfol.io vs Portfolio.io</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      A detailed comparison of developer portfolio platforms
    </p>
  </div>

  <!-- Quick Comparison Cards -->
  <div class="grid md:grid-cols-2 gap-8 mb-12">
    <div class="card bg-gradient-to-br from-green-50 to-blue-50 shadow-xl border-2 border-green-200">
      <div class="card-body text-center">
        <div class="badge badge-success mb-4">Recommended</div>
        <h2 class="card-title text-2xl justify-center mb-4">MyDevfol.io</h2>
        <div class="text-4xl font-bold text-primary mb-2">$0 - $55</div>
        <p class="text-gray-600 mb-4">Free plan + lifetime deals</p>
        <div class="text-left">
          <div class="font-semibold mb-2">Key Advantages:</div>
          <ul class="space-y-1 text-sm">
            <li>✅ Automated screenshot generation</li>
            <li>✅ Advanced tech stack database</li>
            <li>✅ Client portals for professionals</li>
            <li>✅ Lifetime pricing options</li>
            <li>✅ Built-in analytics</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-2xl justify-center mb-4">Portfolio.io</h2>
        <div class="text-4xl font-bold text-gray-600 mb-2">$0 - $29/mo</div>
        <p class="text-gray-600 mb-4">Free + subscription plans</p>
        <div class="text-left">
          <div class="font-semibold mb-2">What they offer:</div>
          <ul class="space-y-1 text-sm">
            <li>✅ Multiple template options</li>
            <li>✅ Custom domains</li>
            <li>✅ Basic contact forms</li>
            <li>❌ Manual screenshot uploads</li>
            <li>❌ No client portals</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Feature Table -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-6">Detailed Feature Comparison</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="text-center">MyDevfol.io</th>
              <th class="text-center">Portfolio.io</th>
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
    <h2 class="text-2xl font-bold mb-4">Ready to create your professional portfolio?</h2>
    <p class="text-gray-600 mb-6">Join thousands of developers who chose MyDevfol.io for their portfolio needs</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/login" class="btn btn-primary btn-lg">
        Get Started Free
      </a>
      <a href="/demo" class="btn btn-outline btn-lg">
        View Demo
      </a>
    </div>
  </div>
</div>