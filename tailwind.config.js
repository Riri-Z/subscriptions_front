/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        "box-shadow-color": "0 0 0 2px rgba(160, 128, 255, 0.5)",
      },
      colors: {
        "button-color": "#9370db",
        "hover-button-color": "#a080ff",
        "border-button-color": "rgba(255, 255, 255, 0.3)",
        "box-shadow-color": "rgba(160, 128, 255, 0.5)",
        "cta-color": "#e3b616",
        "primary-white-color": "#fafafa",
        "dark-button-color": "#21182b",
        "card-color": "#282828",
        "green-color": "#166534",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #551F91 0%, #3B1C7A 100%)",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      laptop: "1440px",
      // => @media (min-width: 1440px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

    },
  },
  plugins: [],
};
