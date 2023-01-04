const plugin = require('tailwindcss/plugin');

const getThemeConfig = require('./config/getThemeConfig');
const createSpacingClasses = require('./config/createSpacingClasses');
const createFontSizeClasses = require('./config/createFontSizeClasses');
const createBorderRadiusClasses = require('./config/createBorderRadiusClasses');


const defaultOptions = {
  screenMin: 'sm',
  screenMax: '2xl',
  useMediaReset: 'min', // 'min' | 'max' | true | false
  useClamp: true, // true | false
}


module.exports = plugin.withOptions(

  function (options) {
    options = Object.assign(defaultOptions, options);

    // TODO: add options check

    return function ({ addUtilities, theme }) {
      addUtilities(createFontSizeClasses(theme, options));
      addUtilities(createSpacingClasses(theme, options));
      addUtilities(createBorderRadiusClasses(theme, options));
    }
  },

  function (options) {
    options = Object.assign(defaultOptions, options);

    return {
      theme: {
        fluid: ({ theme }) => ({
          fontSize: getThemeConfig('fontSize', theme, options),
          spacing: getThemeConfig('spacing', theme, options),
          borderRadius: getThemeConfig('borderRadius', theme, options)
        })
      }
    }
  }

)
