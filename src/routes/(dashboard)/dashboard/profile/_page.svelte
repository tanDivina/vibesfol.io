<div class="card-actions justify-end">
  <button
    type="submit"
    class="btn btn-primary"
    class:loading
    disabled={loading}
  >
    {loading ? "Saving..." : "Save Profile"}
  </button>
</div>