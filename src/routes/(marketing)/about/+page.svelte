<script lang="ts">
  import { WebsiteName } from "$config"
</script>

<svelte:head>
  <title>About Us | {WebsiteName}</title>
  <meta
    name="description"
    content="Learn about MyDevfol.io - the ultimate portfolio platform for developers, indie hackers, and creative professionals."
  />
</svelte:head>

<div class="container mx-auto px-4 py-8">
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
  <div class="text-center mb-16">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">About {WebsiteName}</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      We're building the ultimate portfolio platform for developers, indie
      hackers, and creative professionals who want to showcase their work
      beautifully and professionally.
    </p>
  </div>

  <!-- Spacer -->
  <div class="py-8"></div>

  <!-- Mission Section -->
  <div class="grid md:grid-cols-2 gap-12 mb-16">
    <div>
      <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
      <p class="text-lg text-gray-700 mb-4">
        Every developer deserves a portfolio that truly represents their skills
        and achievements. We believe that creating a professional portfolio
        shouldn't require hours of manual work or expensive monthly
        subscriptions.
      </p>
      <p class="text-lg text-gray-700">
        That's why we built {WebsiteName} - to automate the tedious parts of portfolio
        creation while giving you the tools to showcase your work in the best possible
        light.
      </p>
    </div>
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
      <h3 class="text-2xl font-bold mb-4">What Makes Us Different</h3>
      <ul class="space-y-3">
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Automated screenshot generation saves hours of work</span>
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Lifetime deals instead of recurring subscriptions</span>
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Professional features like client portals and testimonials</span
          >
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Built by developers, for developers</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Spacer -->
  <div class="py-8"></div>

  <!-- Story Section -->
  <div class="bg-white rounded-lg shadow-xl p-8 mb-16">
    <h2 class="text-3xl font-bold mb-6 text-center">Our Story</h2>
    <div class="prose lg:prose-xl mx-auto">
      <p>
        {WebsiteName} was born out of frustration with existing portfolio solutions.
        As developers ourselves, we were tired of:
      </p>
      <ul>
        <li>
          Manually taking and updating screenshots every time we made changes
        </li>
        <li>Paying monthly fees for basic portfolio features</li>
        <li>
          Limited customization options that didn't fit our professional needs
        </li>
        <li>Lack of client-facing features for freelancers and consultants</li>
      </ul>
      <p>
        We decided to build the portfolio platform we wished existed - one that
        automates the tedious work, provides professional features, and offers
        fair pricing that doesn't break the bank.
      </p>
    </div>
  </div>

  <!-- Spacer -->
  <div class="py-8"></div>

  <!-- Values Section -->
  <div class="grid md:grid-cols-3 gap-8 mb-16">
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
      <h3 class="text-xl font-bold mb-3">Automation First</h3>
      <p class="text-gray-600">
        We believe technology should work for you, not against you. That's why
        we automate everything we can.
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
      <h3 class="text-xl font-bold mb-3">Fair Pricing</h3>
      <p class="text-gray-600">
        No hidden fees, no recurring subscriptions. Pay once, use forever with
        our lifetime deals.
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
      <h3 class="text-xl font-bold mb-3">Professional Quality</h3>
      <p class="text-gray-600">
        Every feature is designed to help you look professional and land better
        opportunities.
      </p>
    </div>
  </div>

  <!-- Spacer -->
  <div class="py-8"></div>

  <!-- Team Section -->
  <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-16">
    <h2 class="text-3xl font-bold mb-8 text-center">Built by Developers</h2>
    <div class="text-center">
      <p class="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
        Our team consists of experienced developers who understand the
        challenges of showcasing technical work. We've built products for
        startups, enterprises, and everything in between.
      </p>
      <p class="text-gray-600">
        We're committed to building the best portfolio platform for the
        developer community, and we're always listening to feedback from our
        users.
      </p>
    </div>
  </div>

  <!-- Spacer -->
  <div class="py-8"></div>

  <!-- Call to Action -->
  <div class="text-center">
    <h2 class="text-3xl font-bold mb-4">Ready to Build Your Portfolio?</h2>
    <p class="text-xl text-gray-600 mb-8">
      Join thousands of developers who trust {WebsiteName} to showcase their work
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/login/sign_up" class="btn btn-primary btn-lg">
        Get Started Free
      </a>
      <a href="/demo" class="btn btn-outline btn-lg"> View Demo </a>
    </div>
  </div>
</div>
