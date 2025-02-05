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
        "background-color": "#1B4332",
        "card-color": "#2D6A4F",
        "dark-green-color":"#052e16",
        "lighter-green-color":"#40916C",
        "hover-color":"#052e16",
        "error-color":"#FF6B6B",
        "button-disabled-color": "#B7E4C7",
        "main-text-color": "#ffffff",
        "dark-button-color": "#21182b",
      },
      backgroundColor:{
        "custom-green": "#2D6A4F",
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
