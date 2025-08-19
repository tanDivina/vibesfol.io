<script lang="ts">
  import { onMount } from "svelte"
  import { supabase } from "$lib/supabaseClient"
  import type { Database } from "$lib/DatabaseDefinitions"

  let testimonials: Database["public"]["Tables"]["testimonials"]["Row"][] = []
  let loading = true
  let error: string | null = null
  let showForm = false
  let currentTestimonial:
    | Database["public"]["Tables"]["testimonials"]["Row"]
    | null = null

  onMount(async () => {
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
    } finally {
      loading = false
    }
  })

  function openForm(
    testimonial:
      | Database["public"]["Tables"]["testimonials"]["Row"]
      | null = null,
  ) {
    currentTestimonial = testimonial
    showForm = true
  }

  function closeForm() {
    showForm = false
    currentTestimonial = null
  }

  async function handleTestimonialSubmit(event: CustomEvent) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    loading = true
    error = null

    try {
      if (currentTestimonial) {
        // Update testimonial
        const { error: updateError } = await supabase
          .from("testimonials")
          .update(event.detail)
          .eq("id", currentTestimonial.id)

        if (updateError) throw updateError
        testimonials = testimonials.map((t) =>
          t.id === currentTestimonial!.id ? { ...t, ...event.detail } : t,
        )
      } else {
        // Create testimonial
        const { data: newTestimonial, error: insertError } = await supabase
          .from("testimonials")
          .insert({ ...event.detail, user_id: user.id })
          .select()
          .single()

        if (insertError) throw insertError
        testimonials = [newTestimonial, ...testimonials]
      }
    } catch (err: any) {
      error = err.message
    } finally {
      loading = false
      closeForm()
    }
  }
</script>

<svelte:head>
  <title>Testimonials | MyDevfol.io</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Client Testimonials</h1>
    <button class="btn btn-primary" on:click={() => openForm()}
      >Add Testimonial</button
    >
  </div>

  {#if loading}
    <p>Loading testimonials...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if testimonials.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-600 mb-4">You haven't added any testimonials yet.</p>
      <button class="btn btn-primary" on:click={() => openForm()}
        >Add Your First Testimonial</button
      >
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each testimonials as testimonial}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <p class="text-gray-600">"{testimonial.testimonial_text}"</p>
            <div class="mt-4">
              <p class="font-bold">{testimonial.client_name}</p>
              <p class="text-sm text-gray-500">
                {testimonial.client_title}, {testimonial.client_company}
              </p>
            </div>
            <div class="card-actions justify-end mt-4">
              <button
                class="btn btn-sm btn-outline {testimonial.is_published
                  ? 'btn-success'
                  : 'btn-warning'}"
              >
                {testimonial.is_published ? "Published" : "Draft"}
              </button>
              <button
                class="btn btn-sm btn-primary"
                on:click={() => openForm(testimonial)}>Edit</button
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if showForm}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {currentTestimonial ? "Edit" : "Add"} Testimonial
      </h3>
      <form
        on:submit|preventDefault|stopPropagation={(e) => {
          const formData = new FormData(e.target as HTMLFormElement)
          const detail = Object.fromEntries(formData.entries())
          handleTestimonialSubmit(new CustomEvent("submit", { detail }))
        }}
      >
        <div class="form-control">
          <label class="label" for="client_name">Client Name</label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            class="input input-bordered"
            value={currentTestimonial?.client_name || ""}
            required
          />
        </div>
        <div class="form-control">
          <label class="label" for="client_title">Client Title</label>
          <input
            type="text"
            id="client_title"
            name="client_title"
            class="input input-bordered"
            value={currentTestimonial?.client_title || ""}
          />
        </div>
        <div class="form-control">
          <label class="label" for="client_company">Client Company</label>
          <input
            type="text"
            id="client_company"
            name="client_company"
            class="input input-bordered"
            value={currentTestimonial?.client_company || ""}
          />
        </div>
        <div class="form-control">
          <label class="label" for="testimonial_text">Testimonial</label>
          <textarea
            id="testimonial_text"
            name="testimonial_text"
            class="textarea textarea-bordered"
            required>{currentTestimonial?.testimonial_text || ""}</textarea
          >
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Publish</span>
            <input
              type="checkbox"
              name="is_published"
              class="toggle toggle-primary"
              checked={currentTestimonial?.is_published || false}
            />
          </label>
        </div>
        <div class="modal-action">
          <button type="button" class="btn" on:click={closeForm}>Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
{/if}
