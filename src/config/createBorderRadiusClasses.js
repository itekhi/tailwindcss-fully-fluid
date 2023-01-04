const getPixelValue = require("../utils/getPixelValue");
const borderRadiusesMap = require("../utils/nameToPropertiesMaps").borderRadiusesMap;


module.exports = (theme, options) => {
  const classes = {};
  const minScreen = getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640;
  const maxScreen = getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536;

  for (let [cls, properties] of Object.entries(borderRadiusesMap)) {
    for (let [sizeName, conf] of Object.entries(theme('fluid.borderRadius'))) {
      let className = `.rounded${cls ? `-${cls}` : ''}-vw${sizeName !== 'DEFAULT' ? `-${sizeName}` : ''}`;

      if (options.useClamp) {
        classes[className] = {
          ...Object.fromEntries(
            properties.map(p => ([p, `clamp(${conf.clampMin}, ${conf.vw}, ${conf.clampMax})`]))
          )
        }
      } else {
        classes[className] = {
          ...Object.fromEntries(
            properties.map(p => ([p, conf.vw]))
          )
        }
      }

      if (['min', true].includes(options.useMediaReset)) {
        classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = {
          ...Object.fromEntries(
            properties.map(p => ([p, theme(`spacing.${sizeName}`)]))
          )
        }
      }
      if (['max', true].includes(options.useMediaReset)) {
        classes[className][`@media (min-width: ${maxScreen}px)`] = {
          ...Object.fromEntries(
            properties.map(p => ([p, theme(`spacing.${sizeName}`)]))
          )
        }
      }
    }
  }

  return classes;
}
