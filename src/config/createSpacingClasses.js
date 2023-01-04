const getPixelValue = require('../utils/getPixelValue');
const spacingsMap = require('../utils/nameToPropertiesMaps').spacingsMap;


module.exports = (theme, options) => {
  const classes = {};
  const minScreen = getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640;
  const maxScreen = getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536;
  const negatives = [
    'm', 'my', 'mx', 'mt', 'ml', 'mr', 'mb',
    'inset', 'inset-y', 'inset-x', 'top', 'left', 'right', 'bottom',
    'translate', 'translate-x', 'translate-y'
  ];

  const getProperties = (conf, properties, clamp, negative) => {
    let pre = negative ? '-' : '';
    let val = typeof conf === 'object'
      ? clamp ? `clamp(${pre}${conf.clampMin}, ${pre}${conf.vw}, ${pre}${conf.clampMax})` : `${pre}${conf.vw}`
      : conf;

    return Object.fromEntries(
      properties.map(property => {
        switch (property) {
          case 'translateX':
          case 'translateY':
            return ['transform', `${property}(${val})`];

          case 'translate':
            return ['transform', `${property}(${val}, ${val})`];

          default:
            return [property, val];
        }
      })
    )
  }

  for (let [cls, properties] of Object.entries(spacingsMap)) {
    for (let [sizeName, conf] of Object.entries(theme('fluid.spacing'))) {
      let className = `.${cls}-vw-${sizeName}`;

      if (options.useClamp) {
        classes[className] = getProperties(conf, properties, true, false)

        if (cls in negatives) {
          classes[`.-${className.substring(1)}`] = getProperties(conf, properties, true, true)
        }
      } else {
        classes[className] = getProperties(conf, properties, false, false)

        if (cls in negatives) {
          classes[`.-${className.substring(1)}`] = getProperties(conf, properties, false, true)
        }
      }

      if (['min', true].includes(options.useMediaReset)) {
        classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = getProperties(
          theme(`spacing.${sizeName}`), properties, false, false
        )
      }
      if (['max', true].includes(options.useMediaReset)) {
        classes[className][`@media (min-width: ${maxScreen}px)`] = getProperties(
          theme(`spacing.${sizeName}`), properties, false, false
        )
      }
    }
  }

  // TODO: Add space-x space-y classes. They need `first-child:` and `last-child:` pseudos.

  return classes;
}
