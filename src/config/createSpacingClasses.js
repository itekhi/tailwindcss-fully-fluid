const getScreens = require('../utils/getScreens');
const spacingsMap = require('../utils/nameToPropertiesMaps').spacingsMap;


module.exports = (theme, options) => {
  const classes = {};
  const { minScreen, maxScreen } = getScreens(theme, options);
  const negatives = [
    'm', 'my', 'mx', 'mt', 'ml', 'mr', 'mb',
    'inset', 'inset-y', 'inset-x', 'top', 'left', 'right', 'bottom',
    'translate', 'translate-x', 'translate-y',
    'border-spacing'
  ];

  const getProperties = (conf, cls, properties, clamp, negative) => {
    let pre = negative ? '-' : '';
    let val = typeof conf === 'object'
      ? clamp ? `clamp(${pre}${conf.clampMin}, ${pre}${conf.vw}, ${pre}${conf.clampMax})` : `${pre}${conf.vw}`
      : `${pre}${conf}`;

    return Object.fromEntries(
      properties.map(property => {
        switch (cls) {
          case 'border-spacing':
            return [property, `${val} ${val}`]
          case 'border-spacing-x':
            return [property, `0 ${val}`]
          case 'border-spacing-y':
            return [property, `${val} 0`]

          default:
            switch (property) {
              case 'translateX':
              case 'translateY':
                return ['transform', `${property}(${val})`];
              case 'translate':
                return ['transform', `${property}(${val}, ${val})`];

              default:
                return [property, val];
            }
        }
      })
    )
  }

  for (let [cls, properties] of Object.entries(spacingsMap)) {
    for (let [sizeName, conf] of Object.entries(theme('fluid.spacing'))) {
      let className = `.${cls}-vw-${sizeName}`;

      classes[className] = getProperties(conf, cls, properties, options.useClamp, false)

      if (cls in negatives) {
        classes[`.-${className.substring(1)}`] = getProperties(conf, cls, properties, options.useClamp, true)
      }

      // TODO: These media should be out of for loop, because for each of the classes, new media is added...
      if (['min', true].includes(options.useMediaReset)) {
        classes[className][`@media (max-width: ${minScreen - 0.01}px)`] = getProperties(
          theme(`spacing.${sizeName}`), properties, false, false
        )

        if (cls in negatives) {
          classes[`.-${className.substring(1)}`][`@media (max-width: ${minScreen - 0.01}px)`] = getProperties(
            theme(`spacing.${sizeName}`), properties, false, true
          )
        }
      }
      if (['max', true].includes(options.useMediaReset)) {
        classes[className][`@media (min-width: ${maxScreen}px)`] = getProperties(
          theme(`spacing.${sizeName}`), properties, false, false
        )

        if (cls in negatives) {
          classes[`.-${className.substring(1)}`][`@media (min-width: ${maxScreen}px)`] = getProperties(
            theme(`spacing.${sizeName}`), properties, false, true
          )
        }
      }
    }
  }

  // TODO: Add space-x space-y classes. They need `first-child:` and `last-child:` pseudos.

  return classes;
}
