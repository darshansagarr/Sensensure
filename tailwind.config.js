/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: '#007bff',    // For text and headings
          green: '#28a745',   // For data and indicators
        },
      },
    },
  },
  plugins: [],
}