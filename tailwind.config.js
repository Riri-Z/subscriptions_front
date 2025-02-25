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
        "btn-box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.2)",
        custom:
          "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
      },
      colors: {
        primary:  "#526D82", // Couleur principale (fond gris claire)
        secondary:"#27374D", // Couleur secondaire (menu, cartes)
        accent: "#9DB2BF", // Accentuation (boutons, hover, liens)
        "calendar-outside-month":"#415A7B",
        light: "#FFFFFF", // Couleur claire (texte, contrastes)
        disabeled: "#82929B", // disabled button
        "error-color": "#ff6252",
        selected: "#40916C",
        turquoise : "#2A9D8F",
        link: "#4ade80",
      },
      backgroundColor: {
        "custom-green": "#FFFFFF", // "#2D6A4F",
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
