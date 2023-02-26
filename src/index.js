const plugin = require('tailwindcss/plugin');

const getThemeConfig = require('./config/getThemeConfig');
const createSpacingClasses = require('./config/createSpacingClasses');
const createFontSizeClasses = require('./config/createFontSizeClasses');
const createBorderRadiusClasses = require('./config/createBorderRadiusClasses');


const defaultOptions = {
  screenMin: 'sm',
  screenMax: '2xl',
  useClamp: true, // true | false
  // useMediaReset: false, // 'min' | 'max' | true | false
  extraSizes: {},
  defaultLineHeight: 1.25  // 1.5 | null
}


module.exports = plugin.withOptions(

  function (options) {
    options = Object.assign(defaultOptions, options);

    // TODO: add options check

    return function ({ addUtilities, ...funcs }) {
      addUtilities(createSpacingClasses(funcs, options));
      addUtilities(createFontSizeClasses(funcs, options));
      addUtilities(createBorderRadiusClasses(funcs, options));
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
