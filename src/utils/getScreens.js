const getPixelValue = require("./getPixelValue");


module.exports = (theme, options) => {
  return {
    minScreen: getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640,
    maxScreen: getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536
  }
}
