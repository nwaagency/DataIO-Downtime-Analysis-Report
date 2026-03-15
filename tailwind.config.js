/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/js/**/*.js",
    "./src/css/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0b1f3f",
        secondary: "#162e55",
      },
      backgroundImage: {
        'blueprint': "linear-gradient(rgba(11, 31, 63, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 31, 63, 0.08) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}