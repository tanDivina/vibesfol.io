<script lang="ts">
  import { enhance } from "$app/forms"
  import { invalidateAll } from "$app/navigation"
  import { toasts } from "$lib/stores/toastStore"
  import type { PageData, ActionData } from "./$types"

  export let data: PageData
  export let form: ActionData

  let seoSettings = {
    seo_title: data.settings.seo_title || "",
    seo_description: data.settings.seo_description || "",
    seo_image_url: data.settings.seo_image_url || "",
    seo_keywords: data.settings.seo_keywords || "",
  }

  let contactSettings = {
    contact_form_enabled: data.settings.contact_form_enabled,
    contact_form_title: data.settings.contact_form_title || "",
    contact_form_description: data.settings.contact_form_description || "",
    contact_email_notifications: data.settings.contact_email_notifications,
  }

  let customDomainSettings = {
    custom_domain: data.settings.custom_domain || "",
  }

  let analyticsSettings = {
    analytics_enabled: data.settings.analytics_enabled,
  }
</script>

<svelte:head>
  <title>Advanced Settings | Dashboard</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Advanced Settings</h1>

  <div class="space-y-12">
    <!-- SEO Settings -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">SEO & Social Sharing</h2>
        <p class="text-gray-600 mb-6">
          Customize how your portfolio appears on search engines and social
          media.
        </p>

        <form
          method="POST"
          action="?/updateSeoSettings"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success" && result.data?.success) {
                toasts.success(result.data.message)
              } else if (result.type === "failure") {
                toasts.error(result.data?.message || "An error occurred")
              }
              await invalidateAll()
            }
          }}
        >
          <div class="space-y-4">
            <div class="form-control">
              <label class="label" for="seo_title">SEO Title</label>
              <input
                type="text"
                id="seo_title"
                name="seo_title"
                bind:value={seoSettings.seo_title}
                class="input input-bordered w-full"
                placeholder="e.g., John Doe | Senior Software Engineer"
              />
            </div>
            <div class="form-control">
              <label class="label" for="seo_description">SEO Description</label>
              <textarea
                id="seo_description"
                name="seo_description"
                bind:value={seoSettings.seo_description}
                class="textarea textarea-bordered w-full"
                placeholder="A brief summary of your professional profile."
              ></textarea>
            </div>
            <div class="form-control">
              <label class="label" for="seo_image_url"
                >Social Sharing Image URL</label
              >
              <input
                type="url"
                id="seo_image_url"
                name="seo_image_url"
                bind:value={seoSettings.seo_image_url}
                class="input input-bordered w-full"
                placeholder="https://example.com/your-image.png"
              />
              <p class="text-xs text-gray-500 mt-1">
                Optimal size: 1200x630 pixels.
              </p>
            </div>
            <div class="form-control">
              <label class="label" for="seo_keywords">Keywords</label>
              <input
                type="text"
                id="seo_keywords"
                name="seo_keywords"
                bind:value={seoSettings.seo_keywords}
                class="input input-bordered w-full"
                placeholder="e.g., react, nodejs, full-stack, devops"
              />
              <p class="text-xs text-gray-500 mt-1">
                Comma-separated list of keywords.
              </p>
            </div>
          </div>
          <div class="card-actions justify-end mt-6">
            <button type="submit" class="btn btn-primary"
              >Save SEO Settings</button
            >
          </div>
        </form>
      </div>
    </div>

    <!-- Custom Domain -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Custom Domain</h2>
        <p class="text-gray-600 mb-6">
          Connect your own domain to your portfolio (e.g., yourname.com).
        </p>

        <form
          method="POST"
          action="?/updateCustomDomain"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success" && result.data?.success) {
                toasts.success(result.data.message)
              } else if (result.type === "failure") {
                toasts.error(result.data?.message || "An error occurred")
              }
              await invalidateAll()
            }
          }}
        >
          <div class="form-control">
            <label class="label" for="custom_domain">Your Domain</label>
            <input
              type="text"
              id="custom_domain"
              name="custom_domain"
              bind:value={customDomainSettings.custom_domain}
              class="input input-bordered w-full"
              placeholder="your-domain.com"
            />
          </div>
          {#if data.settings.custom_domain}
            <div class="mt-4">
              {#if data.settings.custom_domain_verified}
                <div class="alert alert-success">
                  <span>Domain verified and active.</span>
                </div>
              {:else}
                <div class="alert alert-warning">
                  <p>
                    <strong>Domain not verified.</strong> To verify, add a TXT record
                    to your DNS settings:
                  </p>
                  <ul class="list-disc list-inside mt-2">
                    <li><strong>Type:</strong> TXT</li>
                    <li><strong>Host/Name:</strong> @ or your domain</li>
                    <li>
                      <strong>Value:</strong>
                      <code
                        >{data.settings.custom_domain_verification_token}</code
                      >
                    </li>
                  </ul>
                  <p class="mt-2">
                    DNS changes can take up to 48 hours to propagate.
                  </p>
                </div>
              {/if}
            </div>
          {/if}
          <div class="card-actions justify-end mt-6">
            <button type="submit" class="btn btn-primary">Save Domain</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Contact Form Settings -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Contact Form</h2>
        <p class="text-gray-600 mb-6">
          Manage the contact form on your public portfolio.
        </p>

        <form
          method="POST"
          action="?/updateContactFormSettings"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success" && result.data?.success) {
                toasts.success(result.data.message)
              } else if (result.type === "failure") {
                toasts.error(result.data?.message || "An error occurred")
              }
              await invalidateAll()
            }
          }}
        >
          <div class="space-y-4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Enable Contact Form</span>
                <input
                  type="checkbox"
                  name="contact_form_enabled"
                  class="toggle toggle-primary"
                  bind:checked={contactSettings.contact_form_enabled}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label" for="contact_form_title">Form Title</label>
              <input
                type="text"
                id="contact_form_title"
                name="contact_form_title"
                bind:value={contactSettings.contact_form_title}
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control">
              <label class="label" for="contact_form_description"
                >Form Description</label
              >
              <textarea
                id="contact_form_description"
                name="contact_form_description"
                bind:value={contactSettings.contact_form_description}
                class="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Receive Email Notifications</span>
                <input
                  type="checkbox"
                  name="contact_email_notifications"
                  class="toggle toggle-primary"
                  bind:checked={contactSettings.contact_email_notifications}
                />
              </label>
            </div>
          </div>
          <div class="card-actions justify-end mt-6">
            <button type="submit" class="btn btn-primary"
              >Save Contact Settings</button
            >
          </div>
        </form>
      </div>
    </div>

    <!-- Analytics Settings -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Analytics</h2>
        <p class="text-gray-600 mb-6">
          Manage analytics tracking on your portfolio.
        </p>

        <form
          method="POST"
          action="?/updateAnalyticsSettings"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success" && result.data?.success) {
                toasts.success(result.data.message)
              } else if (result.type === "failure") {
                toasts.error(result.data?.message || "An error occurred")
              }
              await invalidateAll()
            }
          }}
        >
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Enable Portfolio Analytics</span>
              <input
                type="checkbox"
                name="analytics_enabled"
                class="toggle toggle-primary"
                bind:checked={analyticsSettings.analytics_enabled}
              />
            </label>
            <p class="text-xs text-gray-500 mt-1">
              Allows you to track portfolio views and engagement.
            </p>
          </div>
          <div class="card-actions justify-end mt-6">
            <button type="submit" class="btn btn-primary"
              >Save Analytics Settings</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
