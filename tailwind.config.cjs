/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        saasstartertheme: {
          "primary": "#180042",
          "primary-content": "#fefbf6",
          "secondary": "#c7b9f8",
          "secondary-content": "#180042",
          "accent": "#db2777",
          "accent-content": "#180042",
          "neutral": "#180042",
          "neutral-content": "#fefbf6",
          "base-100": "#fefbf6",
          "base-200": "#faedd6",
          "base-300": "#f0e6c7",
          "base-content": "#180042",
          "info": "#3abff8",
          "info-content": "#002b3d",
          "success": "#37d399",
          "success-content": "#002b20",
          "warning": "#fbbd23",
          "warning-content": "#382800",
          "error": "#f77272",
          "error-content": "#470000",
        },
      },
    ],
  },
}