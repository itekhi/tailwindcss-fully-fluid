// const getScreens = require("../utils/getScreens");


module.exports = ({ theme, e }, options) => {
  const classes = {};
  // const { minScreen, maxScreen } = getScreens(theme, options);

  const getProperties = (conf, clamp) => {
    return {
      'font-size': clamp ? `clamp(${conf.clampMin}, ${conf.vw}, ${conf.clampMax})` : conf.vw,
      'line-height': conf.lineHeight
    }
  }

  for (let [sizeName, conf] of Object.entries(theme('fluid.fontSize'))) {
    let className = '.' + e(`text-vw-${sizeName}`);

    classes[className] = getProperties(conf, options.useClamp)
  }

  return classes;
}
