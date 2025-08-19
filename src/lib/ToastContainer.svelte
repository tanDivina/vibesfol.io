<script lang="ts">
  import { toasts, type Toast } from "$lib/stores/toastStore"
  import { fly } from "svelte/transition"

  const toastIcons = {
    success: `<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6-6H3a2 2 0 00-2 2v16a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2h-5l-2-2H9L7 6z"></path></svg>`,
    error: `<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    info: `<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    warning: `<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>`,
  }

  const toastStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }
</script>

<div class="fixed bottom-5 right-5 z-50 space-y-3">
  {#each $toasts as toast (toast.id)}
    <div
      in:fly={{ y: 20, duration: 300 }}
      out:fly={{ y: 20, duration: 300 }}
      class="alert shadow-lg flex items-start p-4 rounded-lg border {toastStyles[
        toast.type
      ]}"
    >
      <div class="flex-shrink-0">
        {@html toastIcons[toast.type]}
      </div>
      <div class="flex-1">
        <p class="font-medium">{toast.message}</p>
      </div>
      <div class="flex-shrink-0">
        <button
          on:click={() => toasts.remove(toast.id)}
          class="btn btn-sm btn-ghost"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  .alert {
    min-width: 300px;
    max-width: 400px;
  }
</style>
