// const getScreens = require("../utils/getScreens");
const borderRadiusesMap = require("../utils/nameToPropertiesMaps").borderRadiusesMap;


module.exports = ({ theme, e }, options) => {
  const classes = {};
  // const { minScreen, maxScreen } = getScreens(theme, options);

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
      let className = '.' + e(`rounded${cls ? `-${cls}` : ''}-vw${sizeName !== 'DEFAULT' ? `-${sizeName}` : ''}`);

      classes[className] = getProperties(conf, properties, options.useClamp);
    }
  }

  return classes;
}
