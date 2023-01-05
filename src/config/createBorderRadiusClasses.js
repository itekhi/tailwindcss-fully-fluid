const getScreens = require("../utils/getScreens");
const borderRadiusesMap = require("../utils/nameToPropertiesMaps").borderRadiusesMap;


module.exports = (theme, options) => {
  const classes = {};
  const { minScreen, maxScreen } = getScreens(theme, options);

  const getProperties = (conf, properties, clamp) => {
    return Object.fromEntries(
      properties.map(property => (
        [
          property,
          clamp ? `clamp(${conf.clampMin}, ${conf.vw}, ${conf.clampMax})` : conf.vw
        ]
      ))
    )
  }

  for (let [cls, properties] of Object.entries(borderRadiusesMap)) {
    for (let [sizeName, conf] of Object.entries(theme('fluid.borderRadius'))) {
      let className = `.rounded${cls ? `-${cls}` : ''}-vw${sizeName !== 'DEFAULT' ? `-${sizeName}` : ''}`;

      classes[className] = getProperties(conf, properties, options.useClamp);

      // TODO: These media should be out of for loop, because for each of the classes, new media is added...
      if (['min', true].includes(options.useMediaReset)) {
        classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = {
          ...Object.fromEntries(
            properties.map(p => ([p, theme(`borderRadius.${sizeName}`)]))
          )
        }
      }
      if (['max', true].includes(options.useMediaReset)) {
        classes[className][`@media (min-width: ${maxScreen}px)`] = {
          ...Object.fromEntries(
            properties.map(p => ([p, theme(`borderRadius.${sizeName}`)]))
          )
        }
      }
    }
  }

  return classes;
}
