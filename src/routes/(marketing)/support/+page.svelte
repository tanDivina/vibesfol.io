<script lang="ts">
  import { WebsiteName } from "$config"

  let openFaq = -1 // Track which FAQ is open

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? -1 : index
  }

  const faqs = [
    {
      question: "How do I add projects to my portfolio?",
      answer:
        'Go to your dashboard, click on "Projects", then "Add Project". Fill in your project details, add a URL, and we\'ll automatically generate a screenshot for you. You can also tag your project with relevant technologies.',
    },
    {
      question: "How does automated screenshot generation work?",
      answer:
        "Simply provide your project's live URL and our system will automatically capture a high-quality screenshot. This saves you time and ensures your portfolio always shows current versions of your projects.",
    },
    {
      question: "Can I use my own domain?",
      answer:
        "Yes! With our Unlimited LTD plan, you can connect your own custom domain. Go to Dashboard → Settings → Custom Domain to set this up.",
    },
    {
      question: "How do I customize my portfolio theme?",
      answer:
        "In your dashboard, go to Profile → Portfolio Theme. Choose from Modern, Minimal, Dark, or Creative themes. Changes are applied instantly to your live portfolio.",
    },
    {
      question: "What are client portals and how do I use them?",
      answer:
        "Client portals are private, secure pages where you can share project updates with specific clients. Create a portal in Dashboard → Client Portals, and share the unique link with your client.",
    },
    {
      question: "How do I manage contact form submissions?",
      answer:
        "All contact form submissions from your portfolio are collected in Dashboard → Messages. You can mark messages as read, star important ones, and reply directly via email.",
    },
  ]
</script>

<svelte:head>
  <title>Support - {WebsiteName}</title>
  <meta
    name="description"
    content="Get help and support for {WebsiteName}. Find answers to common questions and contact our support team."
  />
</svelte:head>

<div class="min-h-screen bg-base-100">
  <div class="container mx-auto px-4 py-16 max-w-4xl">
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

    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Support Center</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Get help with your developer portfolio and find answers to common
        questions
      </p>
    </div>

    <!-- Quick Help Cards -->
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Getting Started</h3>
          <p class="text-gray-600 mb-4">
            Learn how to create your first portfolio
          </p>
          <a
            href="/blog/how-to-build-a-killer-developer-portfolio"
            class="btn btn-primary btn-sm">Read Guide</a
          >
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Contact Support</h3>
          <p class="text-gray-600 mb-4">Get personalized help from our team</p>
          <a href="/contact_us" class="btn btn-primary btn-sm">Contact Us</a>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Documentation</h3>
          <p class="text-gray-600 mb-4">Browse our comprehensive guides</p>
          <a href="/blog" class="btn btn-primary btn-sm">View Blog</a>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4 max-w-3xl mx-auto">
        {#each faqs as faq, index}
          <div
            class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            <button
              class="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              on:click={() => toggleFaq(index)}
            >
              <span class="text-xl font-medium text-gray-900"
                >{faq.question}</span
              >
              <svg
                class="w-6 h-6 text-gray-500 transform transition-transform {openFaq ===
                index
                  ? 'rotate-45'
                  : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            {#if openFaq === index}
              <div class="px-6 pb-6">
                <p class="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Contact Support Section -->
    <div
      class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center"
    >
      <h2 class="text-2xl font-bold mb-4">Still Need Help?</h2>
      <p class="text-gray-600 mb-6">
        Can't find what you're looking for? Our support team is here to help you
        succeed.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact_us" class="btn btn-primary"> Contact Support </a>
        <a href="/demo" class="btn btn-outline"> View Demo </a>
      </div>
    </div>

    <!-- Additional Resources -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-center mb-8">Additional Resources</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title">📚 Documentation</h3>
            <p class="text-gray-600">
              Comprehensive guides and tutorials to help you make the most of
              your portfolio.
            </p>
            <div class="card-actions">
              <a href="/blog" class="btn btn-outline btn-sm">Browse Blog</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title">💡 Feature Requests</h3>
            <p class="text-gray-600">
              Have an idea for a new feature? We'd love to hear from you!
            </p>
            <div class="card-actions">
              <a href="/contact_us" class="btn btn-outline btn-sm"
                >Submit Idea</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
