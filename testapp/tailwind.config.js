/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '112': '24rem'
      }
    },
  },
  plugins: [
    require('../src')({
      useMediaReset: false
    })
  ],
}
