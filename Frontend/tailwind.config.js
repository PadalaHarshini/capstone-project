/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          500: "#14b8a6",
          700: "#0f766e",
          900: "#042f2e"
        }
      }
    }
  },
  plugins: []
};
