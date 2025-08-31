<script lang="ts">
  import { WebsiteName } from "$config"
</script>

<svelte:head>
  <title>Terms of Service - {WebsiteName}</title>
  <meta name="description" content="Terms of Service for {WebsiteName}" />
</svelte:head>

<div class="min-h-screen bg-base-100">
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <div class="prose prose-lg mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">Terms of Service</h1>

      <div class="text-sm text-gray-600 mb-8 text-center">
        Last updated: January 1, 2025
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using {WebsiteName}, you accept and agree to be bound
        by the terms and provision of this agreement.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        {WebsiteName} is a portfolio platform that allows developers to create and
        showcase their work through automated screenshots, project management, and
        professional portfolio pages.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        and password. You agree to accept responsibility for all activities that
        occur under your account.
      </p>

      <h2>4. Content and Conduct</h2>
      <p>
        You are solely responsible for the content you upload, post, or display
        on the service. You agree not to use the service for any unlawful
        purposes or to conduct any unlawful activity.
      </p>

      <h2>5. Privacy Policy</h2>
      <p>
        Your privacy is important to us. Please review our Privacy Policy, which
        also governs your use of the service.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The service and its original content, features, and functionality are
        and will remain the exclusive property of {WebsiteName} and its licensors.
      </p>

      <h2>7. Termination</h2>
      <p>
        We may terminate or suspend your account and bar access to the service
        immediately, without prior notice or liability, under our sole
        discretion, for any reason whatsoever.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        In no event shall {WebsiteName}, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential, or punitive damages.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will try to provide at
        least 30 days notice prior to any new terms taking effect.
      </p>

      <h2>10. Contact Information</h2>
      <p>
        If you have any questions about these Terms of Service, please contact
        us through our contact form.
      </p>

      <div class="text-center mt-12">
        <a href="/" class="btn btn-primary">Back to Home</a>
      </div>
    </div>
  </div>
</div>
