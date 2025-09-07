import getPixelValue from "./getPixelValue.js";

export default (theme, options) => {
  return {
    minScreen:
      getPixelValue(theme(`screens.${options.screenMin}`) || options.screenMin) || 640,
    maxScreen:
      getPixelValue(theme(`screens.${options.screenMax}`) || options.screenMax) || 1536,
  };
};
