<script lang="ts">
  import { enhance } from "$app/forms"
  import { invalidateAll } from "$app/navigation"
  import type { PageData, ActionData } from "./$types"

  export let data: PageData

  let selectedFilter = "all"
  let selectedMessage: any = null
  let showDeleteConfirm = false
  let messageToDelete: string | null = null

  $: filteredMessages = data.messages.filter((message) => {
    switch (selectedFilter) {
      case "unread":
        return !message.is_read
      case "starred":
        return message.is_starred
      case "replied":
        return message.replied_at
      default:
        return true
    }
  })

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function openMessage(message: any) {
    selectedMessage = message

    // Mark as read if not already read
    if (!message.is_read) {
      const form = document.createElement("form")
      form.method = "POST"
      form.action = "?/markAsRead"

      const messageIdInput = document.createElement("input")
      messageIdInput.type = "hidden"
      messageIdInput.name = "messageId"
      messageIdInput.value = message.id

      form.appendChild(messageIdInput)
      document.body.appendChild(form)
      form.submit()
    }
  }

  function closeMessage() {
    selectedMessage = null
  }

  function confirmDelete(messageId: string) {
    messageToDelete = messageId
    showDeleteConfirm = true
  }

  function cancelDelete() {
    messageToDelete = null
    showDeleteConfirm = false
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email)
    // You could add a toast notification here
  }

  function composeReply(message: any) {
    const subject = `Re: ${message.subject}`
    const body = `Hi ${message.sender_name},\n\nThank you for reaching out!\n\n---\nOriginal message:\n${message.message}`
    const mailtoLink = `mailto:${message.sender_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }
</script>

<svelte:head>
  <title>Messages | Dashboard</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-bold">Messages</h1>
      <p class="text-gray-600 mt-2">
        Manage contact form submissions from your portfolio
      </p>
    </div>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-2 bg-blue-100 rounded-lg">
          <svg
            class="w-6 h-6 text-blue-600"
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
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Total Messages</p>
          <p class="text-2xl font-bold text-gray-900">{data.stats.total}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-2 bg-yellow-100 rounded-lg">
          <svg
            class="w-6 h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Unread</p>
          <p class="text-2xl font-bold text-gray-900">{data.stats.unread}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-2 bg-purple-100 rounded-lg">
          <svg
            class="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Starred</p>
          <p class="text-2xl font-bold text-gray-900">{data.stats.starred}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Filter Tabs -->
  <div class="bg-white rounded-lg shadow mb-6">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8 px-6">
        <button
          class="py-4 px-1 border-b-2 font-medium text-sm {selectedFilter ===
          'all'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          on:click={() => (selectedFilter = "all")}
        >
          All Messages ({data.stats.total})
        </button>
        <button
          class="py-4 px-1 border-b-2 font-medium text-sm {selectedFilter ===
          'unread'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          on:click={() => (selectedFilter = "unread")}
        >
          Unread ({data.stats.unread})
        </button>
        <button
          class="py-4 px-1 border-b-2 font-medium text-sm {selectedFilter ===
          'starred'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          on:click={() => (selectedFilter = "starred")}
        >
          Starred ({data.stats.starred})
        </button>
        <button
          class="py-4 px-1 border-b-2 font-medium text-sm {selectedFilter ===
          'replied'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          on:click={() => (selectedFilter = "replied")}
        >
          Replied
        </button>
      </nav>
    </div>

    <!-- Messages List -->
    <div class="divide-y divide-gray-200">
      {#if filteredMessages.length === 0}
        <div class="p-8 text-center">
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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No messages</h3>
          <p class="mt-1 text-sm text-gray-500">
            {#if selectedFilter === "all"}
              You haven't received any messages yet.
            {:else if selectedFilter === "unread"}
              No unread messages.
            {:else if selectedFilter === "starred"}
              No starred messages.
            {:else}
              No replied messages.
            {/if}
          </p>
        </div>
      {:else}
        {#each filteredMessages as message (message.id)}
          <button
            class="p-6 hover:bg-gray-50 cursor-pointer {!message.is_read
              ? 'bg-blue-50'
              : ''} w-full text-left"
            on:click={() => openMessage(message)}
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && openMessage(message)}
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-gray-700">
                        {message.sender_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {message.sender_name}
                      </p>
                      {#if message.sender_company}
                        <span class="text-xs text-gray-500"
                          >at {message.sender_company}</span
                        >
                      {/if}
                      {#if !message.is_read}
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          New
                        </span>
                      {/if}
                      {#if message.is_starred}
                        <svg
                          class="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                      {/if}
                      {#if message.replied_at}
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          Replied
                        </span>
                      {/if}
                    </div>
                    <p class="text-sm text-gray-900 font-medium mt-1">
                      {message.subject}
                    </p>
                    <p class="text-sm text-gray-500 truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 text-right">
                <p class="text-xs text-gray-500">
                  {formatDate(message.created_at)}
                </p>
              </div>
            </div>
          </button>
        {/each}
      {/if}
    </div>
  </div>
</div>

<!-- Message Detail Modal -->
{#if selectedMessage}
  <div
    class="fixed inset-0 bg-gray-600-50 overflow-y-auto h-full w-full z-50"
    on:click={closeMessage}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    on:keydown={(e) => e.key === 'Escape' && closeMessage()}
  >
    <div
      class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      role="document"
      tabindex="0"
      on:keydown={(e) => e.stopPropagation()}
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900">
            {selectedMessage.subject}
          </h3>
          <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span>From: {selectedMessage.sender_name}</span>
            <button
              class="text-blue-600 hover:text-blue-800"
              on:click={() => copyEmail(selectedMessage.sender_email)}
              title="Copy email address"
            >
              {selectedMessage.sender_email}
            </button>
            {#if selectedMessage.sender_company}
              <span>at {selectedMessage.sender_company}</span>
            {/if}
          </div>
          <p class="text-xs text-gray-400 mt-1">
            Received: {formatDate(selectedMessage.created_at)}
          </p>
        </div>
        <button
          class="text-gray-400 hover:text-gray-600"
          on:click={closeMessage}
          aria-label="Close message"
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

      <div class="border-t border-gray-200 pt-4 mb-6">
        <p class="text-gray-900 whitespace-pre-wrap">
          {selectedMessage.message}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-2">
          <button
            class="btn btn-primary"
            on:click={() => composeReply(selectedMessage)}
          >
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
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              ></path>
            </svg>
            Reply
          </button>

          <form
            method="POST"
            action="?/markAsReplied"
            use:enhance={() => {
              return async ({ result }) => {
                if (result.type === "success") {
                  await invalidateAll()
                  closeMessage()
                }
              }
            }}
          >
            <input type="hidden" name="messageId" value={selectedMessage.id} />
            <button type="submit" class="btn btn-outline">
              Mark as Replied
            </button>
          </form>
        </div>

        <div class="flex space-x-2">
          <form
            method="POST"
            action="?/toggleStar"
            use:enhance={() => {
              return async ({ result }) => {
                if (result.type === "success") {
                  await invalidateAll()
                }
              }
            }}
          >
            <input type="hidden" name="messageId" value={selectedMessage.id} />
            <input
              type="hidden"
              name="isStarred"
              value={selectedMessage.is_starred}
            />
            <button type="submit" class="btn btn-ghost">
              aria-label={selectedMessage.is_starred ? "Remove star" : "Add star"}
              <svg
                class="w-4 h-4 {selectedMessage.is_starred
                  ? 'text-yellow-400'
                  : 'text-gray-400'}"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            </button>
          </form>

          <button
            class="btn btn-ghost text-red-600 hover:text-red-800"
            on:click={() => confirmDelete(selectedMessage.id)}
            aria-label="Delete message"
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
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
  <div
    class="fixed inset-0 bg-gray-600-50 overflow-y-auto h-full w-full z-50"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
        >
          <svg
            class="h-6 w-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mt-2">Delete Message</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete this message? This action cannot be
            undone.
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <button class="btn btn-outline" on:click={cancelDelete}>
            Cancel
          </button>
          <form
            method="POST"
            action="?/deleteMessage"
            use:enhance={() => {
              return async ({ result }) => {
                if (result.type === "success") {
                  await invalidateAll()
                  cancelDelete()
                  closeMessage()
                }
              }
            }}
          >
            <input type="hidden" name="messageId" value={messageToDelete} />
            <button type="submit" class="btn btn-error"> Delete </button>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .btn {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500;
  }

  .btn-outline {
    @apply text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-blue-500;
  }

  .btn-ghost {
    @apply text-gray-500 bg-transparent border-transparent hover:text-gray-700 hover:bg-gray-100;
  }

  .btn-error {
    @apply text-white bg-red-600 hover:bg-red-700 focus:ring-red-500;
  }
</style>
