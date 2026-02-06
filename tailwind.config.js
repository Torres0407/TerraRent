/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#3f4936",
        "primary-dark": "#2c3326",
        "primary-hover": "#2f3828",
        "accent": "#99734c",
        "sand": "#dbc0a3",
        "sand-light": "#f4efe9", 
        "soft-sand": "#dbc0a3",
        "background-light": "#fdfbf7",
        "background-dark": "#191b17",
        "text-main": "#141613",
        "text-muted": "#727a6c",
        "surface-light": "#ffffff",
        "surface-dark": "#232620",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
