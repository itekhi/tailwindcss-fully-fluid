/*

Not used for now.
TODO: Find a way to do it easier than passing this much arguments...

*/

module.exports = (properties, { mode, defaultValue, propNames, minScreen, maxScreen }) => {
  if (!defaultValue) return properties;

  const output = properties;
  var value = {
    ...Object.fromEntries(
      propNames.map(prop => {
        return [prop, defaultValue]
      })
    )
  };

  // for some reason theme('fontSize.xs') doesn't return lineHeight... when theme('fontSize') does...

  // if (typeof defaultValue === 'object') {
  //   value = {
  //     ...Object.fromEntries(
  //       propNames.map(prop => {
  //         return [prop, defaultValue[0]]
  //       })
  //     )
  //   }

  //   if (typeof defaultValue[1] === 'object') {
  //     if ('lineHeight' in defaultValue[1]) {
  //       value['line-height'] = defaultValue[1].lineHeight;
  //     }
  //   }
  // } else if (typeof defaultValue === 'string') {
  //   value = {
  //     ...Object.fromEntries(
  //       propNames.map(prop => {
  //         return [prop, defaultValue]
  //       })
  //     )
  //   }
  // }

  if (['min', true].includes(mode)) {
    output[`@media (max-width: ${maxScreen - 0.01}px)`] = value
  }

  if (['max', true].includes(mode)) {
    output[`@media (min-width: ${minScreen}px)`] = value
  }

  return output;
}
