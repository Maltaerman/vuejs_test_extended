/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        active: '#418AF2',
        success: '#699707',
        error: '#E61610',
      },
    },
  },
  plugins: [],
}
