/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        translucent: 'rgba(0,0,0,0.5)'
      }
    }
  }
}
