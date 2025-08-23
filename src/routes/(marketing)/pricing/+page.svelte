<script lang="ts">
  import PricingModule from "./pricing_module.svelte"
  import { WebsiteName } from "$config"

  type PlanFeatureRow = {
    name: string
    freeIncluded?: boolean
    starterIncluded?: boolean
    unlimitedIncluded?: boolean
    freeString?: string
    starterString?: string
    unlimitedString?: string
    header?: boolean
  }

  const planFeatures: PlanFeatureRow[] = [
    {
      name: "Portfolio Features",
      header: true,
    },
    {
      name: "Projects",
      freeString: "Up to 3",
      starterString: "Up to 10",
      unlimitedString: "Unlimited",
    },
    {
      name: "Custom Domain",
      freeIncluded: false,
      starterIncluded: false,
      unlimitedIncluded: true,
    },
    {
      name: "Screenshot Generation",
      freeIncluded: true,
      starterIncluded: true,
      unlimitedIncluded: true,
    },
    {
      name: "Tech Stack Tags",
      freeIncluded: true,
      starterIncluded: true,
      unlimitedIncluded: true,
    },
    {
      name: "Professional Features",
      header: true,
    },
    {
      name: "Testimonials",
      freeString: "Up to 5",
      starterString: "Unlimited",
      unlimitedString: "Unlimited",
    },
    {
      name: "Hackathon Certificates",
      freeString: "Up to 3",
      starterString: "Unlimited",
      unlimitedString: "Unlimited",
    },
    {
      name: "Client Portals",
      freeIncluded: false,
      starterIncluded: false,
      unlimitedIncluded: true,
    },
    {
      name: "Contact Form",
      freeIncluded: true,
      starterIncluded: true,
      unlimitedIncluded: true,
    },
    {
      name: "Analytics & SEO",
      header: true,
    },
    {
      name: "Portfolio Analytics",
      freeIncluded: false,
      starterIncluded: true,
      unlimitedIncluded: true,
    },
    {
      name: "SEO Optimization",
      freeIncluded: false,
      starterIncluded: false,
      unlimitedIncluded: true,
    },
    {
      name: "Social Media Integration",
      freeIncluded: true,
      starterIncluded: true,
      unlimitedIncluded: true,
    },
  ]
</script>

<svelte:head>
  <title>Pricing - MyDevfol.io</title>
  <meta
    name="description"
    content="Choose the perfect plan for your developer portfolio. Start free and upgrade as you grow."
  />
</svelte:head>

<div class="min-h-[70vh] pb-8 pt-[5vh] px-4">
  <h1 class="text-3xl font-bold text-center">Simple, Transparent Pricing</h1>
  <h2 class="text-xl text-center text-slate-500 mt-1 pb-3">
    Start free, upgrade when you're ready to showcase more
  </h2>

  <div class="w-full my-8">
    <PricingModule
      callToAction="Get Started"
      highlightedPlanId="unlimited_ltd"
    />

    <h1 class="text-2xl font-bold text-center mt-24">
      Frequently Asked Questions
    </h1>
    
    <!-- FAQ Section -->
    <div class="max-w-4xl mx-auto mt-8 mb-16">
      <div class="join join-vertical max-w-xl py-6 mx-auto">
      <div class="space-y-4">
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" checked="checked" />
          <div class="collapse-title text-xl font-medium">
            Can I start with the free plan?
          </div>
          <div class="collapse-content">
            <p class="text-gray-700">
              Absolutely! Our free plan includes everything you need to create a
              professional portfolio with up to 3 projects, 5 testimonials, and
              automatic screenshot generation.
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">
            What are Lifetime Deals (LTD)?
          </div>
          <div class="collapse-content">
            <p class="text-gray-700">
              Lifetime Deals are one-time payments that give you access to
              premium features forever. No monthly subscriptions, no recurring
              charges - just pay once and enjoy the features for life.
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">
            What's the difference between Starter LTD and Unlimited LTD?
          </div>
          <div class="collapse-content">
            <p class="text-gray-700">
              Starter LTD ($15) gives you up to 10 projects, unlimited
              testimonials, and analytics. Unlimited LTD ($55) includes
              unlimited projects, custom domains, client portals, and SEO
              optimization.
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">
            Do you offer refunds on Lifetime Deals?
          </div>
          <div class="collapse-content">
            <p class="text-gray-700">
              Yes! We offer a 30-day money-back guarantee on all Lifetime Deals.
              If you're not satisfied within the first 30 days, contact us for a
              full refund.
            </p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">
            How does the screenshot generation work?
          </div>
          <div class="collapse-content">
            <p class="text-gray-700">
              Simply provide your project URL and our system automatically
              captures high-quality screenshots of your live projects. This
              feature is available on both free and Pro plans.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Plan Comparison Section -->
    <div class="max-w-6xl mx-auto mt-24 mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">Plan Comparison</h2>
      <p class="text-xl text-center text-gray-600 mb-12">
        See what's included in each plan
      </p>

      <div class="bg-white rounded-xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left font-bold text-gray-900 py-4">Features</th>
                <th class="text-center font-bold text-gray-900 py-4">Free</th>
                <th class="text-center font-bold text-gray-900 py-4">Starter LTD</th>
                <th class="text-center font-bold text-gray-900 py-4">Unlimited LTD</th>
              </tr>
            </thead>
            <tbody>
              {#each planFeatures as feature}
                {#if feature.header}
                  <tr class="bg-blue-50">
                    <td colspan="4" class="font-bold text-blue-900 py-3 text-lg">{feature.name}</td>
                  </tr>
                {:else}
                  <tr class="hover:bg-gray-50">
                    <td class="font-medium py-4">{feature.name}</td>
                    <td class="text-center py-4">
                      {#if feature.freeString}
                        <span class="text-gray-700 font-medium">{feature.freeString}</span>
                      {:else if feature.freeIncluded}
                        <svg
                          class="w-6 h-6 text-green-500 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {:else}
                        <svg
                          class="w-6 h-6 text-gray-300 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {/if}
                    </td>
                    <td class="text-center py-4">
                      {#if feature.starterString}
                        <span class="text-gray-700 font-medium">{feature.starterString}</span>
                      {:else if feature.starterIncluded}
                        <svg
                          class="w-6 h-6 text-green-500 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {:else}
                        <svg
                          class="w-6 h-6 text-gray-300 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {/if}
                    </td>
                    <td class="text-center py-4">
                      {#if feature.unlimitedString}
                        <span class="text-gray-700 font-medium">{feature.unlimitedString}</span>
                      {:else if feature.unlimitedIncluded}
                        <svg
                          class="w-6 h-6 text-green-500 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {:else}
                        <svg
                          class="w-6 h-6 text-gray-300 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      {/if}
                    </td>
                  </tr>
                {/if}
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>