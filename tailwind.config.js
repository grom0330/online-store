/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '7xl': '1200px'
      },
      fontFamily: { seaweed: ['Seaweed Script', 'sans-serif'] }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
