<script lang="ts">
  import { onMount } from "svelte"
  import { enhance } from "$app/forms"
  import { invalidateAll } from "$app/navigation"
  import { supabase } from "$lib/supabaseClient"
  import { toasts } from "$lib/stores/toastStore"
  import type { Database } from "$lib/DatabaseDefinitions"

  let testimonials: Database["public"]["Tables"]["testimonials"]["Row"][] = []
  let loading = true
  let error: string | null = null
  let showForm = false
  let currentTestimonial:
    | Database["public"]["Tables"]["testimonials"]["Row"]
    | null = null

  // Form data
  let formData = {
    client_name: "",
    client_title: "",
    client_company: "",
    testimonial_text: "",
    is_published: false,
  }

  onMount(async () => {
    await loadTestimonials()
  })

  async function loadTestimonials() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/login"
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("testimonials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError
      testimonials = data || []
    } catch (err: any) {
      error = err.message
      toasts.error("Failed to load testimonials")
    } finally {
      loading = false
    }
  }

  function openForm(
    testimonial:
      | Database["public"]["Tables"]["testimonials"]["Row"]
      | null = null,
  ) {
    currentTestimonial = testimonial
    if (testimonial) {
      formData = {
        client_name: testimonial.client_name,
        client_title: testimonial.client_title || "",
        client_company: testimonial.client_company || "",
        testimonial_text: testimonial.testimonial_text,
        is_published: testimonial.is_published,
      }
    } else {
      formData = {
        client_name: "",
        client_title: "",
        client_company: "",
        testimonial_text: "",
        is_published: false,
      }
    }
    showForm = true
  }

  function closeForm() {
    showForm = false
    currentTestimonial = null
    formData = {
      client_name: "",
      client_title: "",
      client_company: "",
      testimonial_text: "",
      is_published: false,
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formDataObj = new FormData(form)

    loading = true
    error = null

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        throw new Error("User not authenticated")
      }

      const testimonialData = {
        client_name: formDataObj.get("client_name") as string,
        client_title: formDataObj.get("client_title") as string,
        client_company: formDataObj.get("client_company") as string,
        testimonial_text: formDataObj.get("testimonial_text") as string,
        is_published: formDataObj.get("is_published") === "on",
      }

      if (currentTestimonial) {
        // Update existing testimonial
        const { error: updateError } = await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", currentTestimonial.id)
          .eq("user_id", user.id)

        if (updateError) throw updateError
        toasts.success("Testimonial updated successfully!")
      } else {
        // Create new testimonial
        const { error: insertError } = await supabase
          .from("testimonials")
          .insert({
            ...testimonialData,
            user_id: user.id,
          })

        if (insertError) throw insertError
        toasts.success("Testimonial created successfully!")
      }

      await loadTestimonials()
      closeForm()
    } catch (err: any) {
      error = err.message
      toasts.error("Failed to save testimonial")
    } finally {
      loading = false
    }
  }

  async function deleteTestimonial(testimonialId: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error: deleteError } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonialId)
        .eq("user_id", user.id)

      if (deleteError) throw deleteError

      testimonials = testimonials.filter((t) => t.id !== testimonialId)
      toasts.success("Testimonial deleted successfully!")
    } catch (err: any) {
      toasts.error("Failed to delete testimonial")
    }
  }

  async function togglePublished(
    testimonial: Database["public"]["Tables"]["testimonials"]["Row"],
  ) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error: updateError } = await supabase
        .from("testimonials")
        .update({ is_published: !testimonial.is_published })
        .eq("id", testimonial.id)
        .eq("user_id", user.id)

      if (updateError) throw updateError

      await loadTestimonials()
      toasts.success(
        `Testimonial ${!testimonial.is_published ? "published" : "unpublished"} successfully!`,
      )
    } catch (err: any) {
      toasts.error("Failed to update testimonial")
    }
  }
</script>

<svelte:head>
  <title>Testimonials | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-bold">Client Testimonials</h1>
      <p class="text-gray-600 mt-2">
        Manage testimonials from your clients and showcase social proof
      </p>
    </div>
    <button class="btn btn-primary" onclick={() => openForm()}>
      <svg
        class="w-5 h-5 mr-2"
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
      Add Testimonial
    </button>
  </div>

  {#if loading}
    <div class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4 text-gray-600">Loading testimonials...</p>
    </div>
  {:else if error}
    <div class="alert alert-error mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{error}</span>
    </div>
  {:else if testimonials.length === 0}
    <div class="text-center py-12">
      <div class="max-w-md mx-auto">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No testimonials</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by adding your first client testimonial.
        </p>
        <div class="mt-6">
          <button class="btn btn-primary" onclick={() => openForm()}>
            <svg
              class="w-5 h-5 mr-2"
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
            Add Your First Testimonial
          </button>
        </div>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each testimonials as testimonial (testimonial.id)}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <blockquote class="text-gray-700 italic mb-4">
                  "{testimonial.testimonial_text}"
                </blockquote>
                <div class="border-t pt-4">
                  <p class="font-semibold text-gray-900">
                    {testimonial.client_name}
                  </p>
                  {#if testimonial.client_title}
                    <p class="text-sm text-gray-600">
                      {testimonial.client_title}
                    </p>
                  {/if}
                  {#if testimonial.client_company}
                    <p class="text-sm text-gray-500">
                      {testimonial.client_company}
                    </p>
                  {/if}
                </div>
              </div>
            </div>

            <div class="card-actions justify-between items-center">
              <div class="flex items-center gap-2">
                <button
                  class="btn btn-sm {testimonial.is_published
                    ? 'btn-success'
                    : 'btn-warning'}"
                  onclick={() => togglePublished(testimonial)}
                >
                  {testimonial.is_published ? "✓ Published" : "○ Draft"}
                </button>
              </div>
              <div class="flex gap-2">
                <button
                  class="btn btn-sm btn-outline"
                  onclick={() => openForm(testimonial)}
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-error"
                  onclick={() => deleteTestimonial(testimonial.id)}
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Testimonial Form Modal -->
{#if showForm}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">
          {currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <button
          class="text-gray-400 hover:text-gray-600"
          onclick={closeForm}
          aria-label="Close form"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <form onsubmit={handleSubmit}>
        <div class="space-y-4">
          <div class="form-control">
            <label class="label" for="client_name">
              <span class="label-text font-medium">Client Name *</span>
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              class="input input-bordered w-full"
              placeholder="John Smith"
              required
            />
          </div>

          <div class="form-control">
            <label class="label" for="client_title">
              <span class="label-text font-medium">Client Title</span>
            </label>
            <input
              type="text"
              id="client_title"
              name="client_title"
              value={formData.client_title}
              class="input input-bordered w-full"
              placeholder="CEO, CTO, etc."
            />
          </div>

          <div class="form-control">
            <label class="label" for="client_company">
              <span class="label-text font-medium">Client Company</span>
            </label>
            <input
              type="text"
              id="client_company"
              name="client_company"
              value={formData.client_company}
              class="input input-bordered w-full"
              placeholder="Company Name"
            />
          </div>

          <div class="form-control">
            <label class="label" for="testimonial_text">
              <span class="label-text font-medium">Testimonial *</span>
            </label>
            <textarea
              id="testimonial_text"
              name="testimonial_text"
              value={formData.testimonial_text}
              class="textarea textarea-bordered w-full h-32"
              placeholder="Write the testimonial here..."
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text font-medium">Publish on Portfolio</span>
              <input
                type="checkbox"
                name="is_published"
                class="toggle toggle-primary"
                checked={formData.is_published}
              />
            </label>
            <div class="label">
              <span class="label-text-alt"
                >Published testimonials will appear on your public portfolio</span
              >
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-ghost" on:click={closeForm}>
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : currentTestimonial ? "Update" : "Add"} Testimonial
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
