import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  plugins: [
    sveltekit(),
    visualizer({
      open: false,
      filename: 'bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true, /// allows to skip import of test functions like `describe`, `it`, `expect`, etc.
  },
  build: {
    rollupOptions: {
      output: {}
    }
  }
})
