/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem'
      },
      fluid: {
        fontSize: {
          xxs: {
            clampMin: '5px',
            clampMax: '15px',
            vw: '0.78125vw'
          },
          xs: {
            lineHeight: 1
          }
        }
      }
    },
  },
  plugins: [
    require('../src')({
      screenMax: '1920px',
      defaultLineHeight: null,
      // useMediaReset: true,
      // extraSizes: {
      //   spacing: [112],
      //   fontSize: {
      //     'xxs': -3
      //   },
      //   borderRadius: {
      //     '4xl': 6
      //   }
      // }
    })
  ],
}
