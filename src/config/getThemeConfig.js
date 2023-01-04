const getPixelValue = require('../utils/getPixelValue');


/**
 * [getThemeConfig description]
 * @returns {Object}
 */
module.exports = (name, theme, options) => {
  const output = {};
  const minScreen = getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640;
  const maxScreen = getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536;
  const avgScreen = minScreen + ((maxScreen - minScreen) / 2);
  const exclude = {
    'spacing': ['px', '0'],
    'borderRadius': ['full', 'none']
  }

  for (let [sizeName, size] of Object.entries(theme(name))) {
    if (name in exclude && exclude[name].includes(sizeName)) continue;

    size = Array.isArray(size) ? size[0] : size;
    let vw = (getPixelValue(size) * 100) / avgScreen;

    output[sizeName] = {
      clampMin: ((vw * minScreen) / 100).toFixed(0) + 'px',
      clampMax: ((vw * maxScreen) / 100).toFixed(0) + 'px',
      vw: `${vw}vw`
    }
  }

  return output;
}
