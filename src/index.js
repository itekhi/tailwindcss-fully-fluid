const plugin = require('tailwindcss/plugin');

const getThemeConfig = require('./config/getThemeConfig');
const createSpacingClasses = require('./config/createSpacingClasses');
const createFontSizeClasses = require('./config/createFontSizeClasses');
const createBorderRadiusClasses = require('./config/createBorderRadiusClasses');


const defaultOptions = {
  screenMin: 'sm',
  screenMax: '2xl',
  useClamp: true, // true | false
  useMediaReset: 'min', // 'min' | 'max' | true | false
  extraSizes: {}
}


module.exports = plugin.withOptions(

  function (options) {
    options = Object.assign(defaultOptions, options);

    // TODO: add options check

    return function ({ addUtilities, theme }) {
      addUtilities(createSpacingClasses(theme, options));
      addUtilities(createFontSizeClasses(theme, options));
      addUtilities(createBorderRadiusClasses(theme, options));
    }
  },

  function (options) {
    options = Object.assign(defaultOptions, options);

    return {
      theme: {
        fluid: ({ theme }) => ({
          spacing: getThemeConfig('spacing', theme, options),
          fontSize: getThemeConfig('fontSize', theme, options),
          borderRadius: getThemeConfig('borderRadius', theme, options)
        })
      }
    }
  }

)
