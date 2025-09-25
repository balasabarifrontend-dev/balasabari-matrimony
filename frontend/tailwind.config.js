/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // include ts if you ever use it
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        brand: {
          red: "#dc2626", // Tailwind red-600
          yellow: "#facc15", // Tailwind yellow-400
        },
      },
    },
  },
  plugins: [],
};
