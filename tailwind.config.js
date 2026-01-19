export default {

   darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2b6cee",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-dark": "#1e293b",
        "type-fire": "#F08030",
        "type-flying": "#A890F0",
      },
      fontFamily: {
        display: ["Spline Sans", "sans-serif"],
        body: ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Force generation of responsive grid classes used in the app
  safelist: [
    'grid-cols-1',
    'sm:grid-cols-2',
    'md:grid-cols-3',
    'lg:grid-cols-4',
    'xl:grid-cols-5',
  ],
  plugins: [require("@tailwindcss/forms")],
};