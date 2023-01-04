const getPixelValue = require("../utils/getPixelValue");


module.exports = (theme, options) => {
  const classes = {};
  const minScreen = getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640;
  const maxScreen = getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536;

  const getDefaultValue = (sizeName) => {
    let defaultSize = theme(`fontSize.${sizeName}`);
    return Array.isArray(defaultSize) ? defaultSize[0] : defaultSize;
  }

  for (let [sizeName, conf] of Object.entries(theme('fluid.fontSize'))) {
    let className = `.text-vw-${sizeName}`;

    if (options.useClamp) {
      classes[className] = {
        'font-size': `clamp(${conf.clampMin}, ${conf.vw}, ${conf.clampMax})`,
      }
    } else {
      classes[className] = {
        'font-size': conf.vw
      }
    }

    classes[className]['line-height'] = conf.lineHeight;

    if (['min', true].includes(options.useMediaReset)) {
      classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = {
        'font-size': getDefaultValue(sizeName)
      }
    }
    if (['max', true].includes(options.useMediaReset)) {
      classes[className][`@media (min-width: ${maxScreen}px)`] = {
        'font-size': getDefaultValue(sizeName)
      }
    }
  }

  return classes;
}
