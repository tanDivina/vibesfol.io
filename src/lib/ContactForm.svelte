<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { trackEvent } from '$lib/analytics';

  export let portfolioUserId: string;
  export let portfolioUserName: string = '';
  export let title: string = 'Get In Touch';
  export let description: string = "I'd love to hear from you! Send me a message and I'll get back to you as soon as possible.";

  const dispatch = createEventDispatcher();

  let formData = {
    sender_name: '',
    sender_email: '',
    sender_company: '',
    subject: '',
    message: ''
  };

  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let errorMessage = '';

  async function handleSubmit() {
    if (isSubmitting) return;

    // Basic validation
    if (!formData.sender_name.trim() || !formData.sender_email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      errorMessage = 'Please fill in all required fields.';
      submitStatus = 'error';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.sender_email)) {
      errorMessage = 'Please enter a valid email address.';
      submitStatus = 'error';
      return;
    }

    isSubmitting = true;
    submitStatus = 'idle';
    errorMessage = '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio_user_id: portfolioUserId,
          ...formData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      submitStatus = 'success';
      
      // Track successful contact form submission
      trackEvent('contact_form_submit', {
        portfolio_user_id: portfolioUserId,
        sender_email: formData.sender_email,
        subject: formData.subject
      });

      // Reset form
      formData = {
        sender_name: '',
        sender_email: '',
        sender_company: '',
        subject: '',
        message: ''
      };

      // Dispatch success event
      dispatch('success', { submissionId: result.submission_id });

    } catch (error) {
      console.error('Contact form submission error:', error);
      submitStatus = 'error';
      errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      
      // Dispatch error event
      dispatch('error', { error: errorMessage });
    } finally {
      isSubmitting = false;
    }
  }

  function clearError() {
    if (submitStatus === 'error') {
      submitStatus = 'idle';
      errorMessage = '';
    }
  }
</script>

<div class="contact-form-container">
  <div class="contact-form-header">
    <h2 class="text-2xl font-bold mb-2">{title}</h2>
    {#if description}
      <p class="text-gray-600 mb-6">{description}</p>
    {/if}
  </div>

  {#if submitStatus === 'success'}
    <div class="alert alert-success mb-6">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>
        <h3 class="font-bold">Message sent successfully!</h3>
        <div class="text-xs">Thank you for reaching out. {portfolioUserName || 'The portfolio owner'} will get back to you soon.</div>
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      {#if submitStatus === 'error' && errorMessage}
        <div class="alert alert-error">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <span>{errorMessage}</span>
        </div>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label" for="sender_name">
            <span class="label-text">Name *</span>
          </label>
          <input
            type="text"
            id="sender_name"
            bind:value={formData.sender_name}
            on:input={clearError}
            placeholder="Your full name"
            class="input input-bordered w-full"
            required
            disabled={isSubmitting}
          />
        </div>

        <div class="form-control">
          <label class="label" for="sender_email">
            <span class="label-text">Email *</span>
          </label>
          <input
            type="email"
            id="sender_email"
            bind:value={formData.sender_email}
            on:input={clearError}
            placeholder="your.email@example.com"
            class="input input-bordered w-full"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div class="form-control">
        <label class="label" for="sender_company">
          <span class="label-text">Company</span>
        </label>
        <input
          type="text"
          id="sender_company"
          bind:value={formData.sender_company}
          on:input={clearError}
          placeholder="Your company (optional)"
          class="input input-bordered w-full"
          disabled={isSubmitting}
        />
      </div>

      <div class="form-control">
        <label class="label" for="subject">
          <span class="label-text">Subject *</span>
        </label>
        <input
          type="text"
          id="subject"
          bind:value={formData.subject}
          on:input={clearError}
          placeholder="What's this about?"
          class="input input-bordered w-full"
          required
          disabled={isSubmitting}
        />
      </div>

      <div class="form-control">
        <label class="label" for="message">
          <span class="label-text">Message *</span>
        </label>
        <textarea
          id="message"
          bind:value={formData.message}
          on:input={clearError}
          placeholder="Tell me more about your project, question, or how I can help..."
          class="textarea textarea-bordered w-full h-32"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div class="form-control mt-6">
        <button
          type="submit"
          class="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="loading loading-spinner loading-sm"></span>
            Sending...
          {:else}
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Send Message
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  .contact-form-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-form-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .alert {
    @apply flex items-center space-x-4 p-4 rounded-lg;
  }

  .alert-success {
    @apply bg-green-50 text-green-800 border border-green-200;
  }

  .alert-error {
    @apply bg-red-50 text-red-800 border border-red-200;
  }

  .form-control {
    @apply w-full;
  }

  .label {
    @apply block mb-1;
  }

  .label-text {
    @apply text-sm font-medium text-gray-700;
  }

  .input, .textarea {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .input:disabled, .textarea:disabled {
    @apply bg-gray-100 cursor-not-allowed;
  }

  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500;
  }

  .btn:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .loading {
    @apply inline-block animate-spin;
  }

  .loading-spinner {
    @apply border-2 border-current border-t-transparent rounded-full;
    width: 1rem;
    height: 1rem;
  }

  .loading-sm {
    width: 0.875rem;
    height: 0.875rem;
  }
</style>
