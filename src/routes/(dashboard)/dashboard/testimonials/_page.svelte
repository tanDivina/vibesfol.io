<div class="card-actions justify-end mt-4">
  <button
    type="button"
    class="btn btn-sm btn-outline {testimonial.is_published
      ? 'btn-success'
      : 'btn-warning'}"
  >
    {testimonial.is_published ? "Published" : "Draft"}
  </button>
  <button
    type="button"
    class="btn btn-sm btn-primary"
    on:click={() => openForm(testimonial)}>Edit</button
  >
</div>
