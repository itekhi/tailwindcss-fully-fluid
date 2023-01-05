const getPixelValue = require('../utils/getPixelValue');
const getScreens = require('../utils/getScreens');


/**
 * [getThemeConfig description]
 * @returns {Object}
 */
module.exports = (name, theme, options) => {
  const output = {};
  const exclude = {
    spacing: ['px', '0'],
    borderRadius: ['full', 'none']
  }
  const references = {
    spacing: 4, // 1 point = px
    fontSize: [
      getPixelValue(theme('fontSize.base')), // base
      getPixelValue(theme('fontSize.base')) - getPixelValue(theme('fontSize.sm')) // reference
    ],
    borderRadius: [
      getPixelValue(theme('borderRadius.DEFAULT')), // base
      getPixelValue(theme('borderRadius.DEFAULT')) - getPixelValue(theme('borderRadius.sm')) // reference
    ]
  }
  const { minScreen, maxScreen } = getScreens(theme, options);
  const avgScreen = minScreen + ((maxScreen - minScreen) / 2);

  const getProportioned = (vw) => {
    return (vw * 100) / avgScreen;
  }

  const addSize = (name, vw, extra={}) => {
    output[name] = {
      clampMin: ((vw * minScreen) / 100).toFixed(0) + 'px',
      clampMax: ((vw * maxScreen) / 100).toFixed(0) + 'px',
      vw: `${vw}vw`,
      ...extra
    }
  }

  for (let [sizeName, size] of Object.entries(theme(name))) {
    if (name in exclude && exclude[name].includes(sizeName)) continue;

    addSize(
      sizeName,
      getProportioned(getPixelValue(size)),
      name === 'fontSize' ? { lineHeight: 1.25 } : {}
    );
  }

  if (['fontSize', 'borderRadius'].includes(name)) {
    if (typeof options.extraSizes?.[name] === 'object' && !Array.isArray(options.extraSizes?.[name])) {
      for (let [sizeName, powerOfBase] of Object.entries(options.extraSizes[name])) {
        addSize(
          sizeName,
          getProportioned((references[name][0] + (references[name][1] * powerOfBase))),
          name === 'fontSize' ? { lineHeight: 1.25 } : {}
        )
      }
    }
  } else if (name === 'spacing') {
    if (Array.isArray(options.extraSizes?.spacing)) {
      for (let extraSize of options.extraSizes?.spacing) {
        addSize(
          extraSize,
          ((references.spacing * extraSize) * 100) / avgScreen
        )
      }
    }
  }

  return output;
}
