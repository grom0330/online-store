/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '7xl': '1200px'
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')]
}
