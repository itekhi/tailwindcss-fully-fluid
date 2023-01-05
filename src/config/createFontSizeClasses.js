const getScreens = require("../utils/getScreens");


module.exports = (theme, options) => {
  const classes = {};
  const { minScreen, maxScreen } = getScreens(theme, options);

  const getProperties = (conf, clamp) => {
    return {
      'font-size': clamp ? `clamp(${conf.clampMin}, ${conf.vw}, ${conf.clampMax})` : conf.vw,
      'line-height': conf.lineHeight
    }
  }

  for (let [sizeName, conf] of Object.entries(theme('fluid.fontSize'))) {
    let className = `.text-vw-${sizeName}`;

    classes[className] = getProperties(conf, options.useClamp)

    // TODO: Find a way to compose these media classes into one.
    if (['min', true].includes(options.useMediaReset)) {
      // TODO: line-height is not resetting, I don't know how to retrieve it. See theme('fontSize')
      classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = {
        'font-size': theme(`fontSize.${sizeName}`)
      }
    }
    if (['max', true].includes(options.useMediaReset)) {
      // TODO: line-height is not resetting, I don't know how to retrieve it. See theme('fontSize')
      classes[className][`@media (min-width: ${maxScreen}px)`] = {
        'font-size': theme(`fontSize.${sizeName}`)
      }
    }
  }

  return classes;
}
