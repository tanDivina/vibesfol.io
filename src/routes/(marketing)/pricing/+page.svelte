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
    <div class="flex place-content-center">
      <div class="join join-vertical max-w-xl py-6 mx-auto">
        <div class="collapse collapse-arrow join-item border border-primary">
          <input type="radio" name="faq-accordion" id="faq-1" />
          <div class="collapse-title text-lg font-medium">
            Can I start with the free plan?
          </div>
          <div class="collapse-content">
            <p>
              Absolutely! Our free plan includes everything you need to create a
              professional portfolio with up to 3 projects, 5 testimonials, and
              automatic screenshot generation.
            </p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-primary">
          <input type="radio" name="faq-accordion" id="faq-2" />
          <div class="collapse-title text-lg font-medium">
            What are Lifetime Deals (LTD)?
          </div>
          <div class="collapse-content">
            <p>
              Lifetime Deals are one-time payments that give you access to
              premium features forever. No monthly subscriptions, no recurring
              charges - just pay once and enjoy the features for life.
            </p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-primary">
          <input type="radio" name="faq-accordion" id="faq-3" />
          <div class="collapse-title text-lg font-medium">
            What's the difference between Starter LTD and Unlimited LTD?
          </div>
          <div class="collapse-content">
            <p>
              Starter LTD ($15) gives you up to 10 projects, unlimited
              testimonials, and analytics. Unlimited LTD ($55) includes
              unlimited projects, custom domains, client portals, and SEO
              optimization.
            </p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-primary">
          <input type="radio" name="faq-accordion" id="faq-4" />
          <div class="collapse-title text-lg font-medium">
            Do you offer refunds on Lifetime Deals?
          </div>
          <div class="collapse-content">
            <p>
              Yes! We offer a 30-day money-back guarantee on all Lifetime Deals.
              If you're not satisfied within the first 30 days, contact us for a
              full refund.
            </p>
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-primary">
          <input type="radio" name="faq-accordion" id="faq-5" />
          <div class="collapse-title text-lg font-medium">
            How does the screenshot generation work?
          </div>
          <div class="collapse-content">
            <p>
              Simply provide your project URL and our system automatically
              captures high-quality screenshots of your live projects. This
              feature is available on both free and Pro plans.
            </p>
          </div>
        </div>
      </div>
    </div>

    <svg style="display:none" version="2.0">
      <defs>
        <symbol
          id="checkcircle"
          viewBox="0 0 24 24"
          stroke-width="2"
          fill="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.105-4.498a.791.791 0 0 0-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 1 0-1.216 1.014l2.459 2.952a.792.792 0 0 0 .608.285.83.83 0 0 0 .068-.003.791.791 0 0 0 .618-.393L12.6 6.866a.791.791 0 0 0-.29-1.081z"
          />
        </symbol>
      </defs>
    </svg>

    <svg style="display:none" version="2.0">
      <defs>
        <symbol id="nocircle" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4,11H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"
          />
        </symbol>
      </defs>
    </svg>

    <h1 class="text-2xl font-bold text-center mt-16">Plan Comparison</h1>
    <h2 class="text-xl text-center text-slate-500 mt-1 pb-3">
      See what's included in each plan
    </h2>

    <div class="overflow-visible mx-auto max-w-4xl mt-4">
      <table class="table">
        <thead
          class="text-lg sticky top-0 bg-base-100/50 z-10 backdrop-blur-sm"
        >
          <tr>
            <th></th>
            <th class="text-center">Free</th>
            <th class="text-center">Starter LTD</th>
            <th class="text-center">Unlimited LTD</th>
          </tr>
        </thead>
        <tbody>
          {#each planFeatures as feature}
            {#if feature.header}
              <tr class="bg-base-200 font-bold">
                <td colspan="4">{feature.name} </td>
              </tr>
            {:else}
              <tr class="relative">
                <td>{feature.name} </td>
                <td class="text-center">
                  {#if feature.freeString}
                    {feature.freeString}
                  {:else if feature.freeIncluded}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 ml-2 inline text-success"
                    >
                      <use href="#checkcircle" />
                    </svg>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[26px] h-[26px] inline text-base-200"
                    >
                      <use href="#nocircle" />
                    </svg>
                  {/if}
                </td>
                <td class="text-center">
                  {#if feature.starterString}
                    {feature.starterString}
                  {:else if feature.starterIncluded}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 ml-2 inline text-success"
                    >
                      <use href="#checkcircle" />
                    </svg>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[26px] h-[26px] inline text-base-200"
                    >
                      <use href="#nocircle" />
                    </svg>
                  {/if}
                </td>
                <td class="text-center">
                  {#if feature.unlimitedString}
                    {feature.unlimitedString}
                  {:else if feature.unlimitedIncluded}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 ml-2 inline text-success"
                    >
                      <use href="#checkcircle" />
                    </svg>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[26px] h-[26px] inline text-base-200"
                    >
                      <use href="#nocircle" />
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
