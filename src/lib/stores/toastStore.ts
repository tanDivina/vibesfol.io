import { writable } from "svelte/store"

export interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

const createToastStore = () => {
  const { subscribe, update } = writable<Toast[]>([])

  function addToast(
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
    duration: number = 3000,
  ) {
    const id = Date.now()
    update((toasts) => [...toasts, { id, message, type, duration }])

    if (duration) {
      setTimeout(() => removeToast(id), duration)
    }
  }

  function removeToast(id: number) {
    update((toasts) => toasts.filter((t) => t.id !== id))
  }

  return {
    subscribe,
    show: addToast,
    success: (message: string, duration?: number) =>
      addToast(message, "success", duration),
    error: (message: string, duration?: number) =>
      addToast(message, "error", duration),
    info: (message: string, duration?: number) =>
      addToast(message, "info", duration),
    warning: (message: string, duration?: number) =>
      addToast(message, "warning", duration),
    remove: removeToast,
  }
}

export const toasts = createToastStore()
