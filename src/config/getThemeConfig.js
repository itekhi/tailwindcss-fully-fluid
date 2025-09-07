import getPixelValue from "../utils/getPixelValue.js";
import getScreens from "../utils/getScreens.js";

/**
 * [getThemeConfig description]
 * @returns {Object}
 */
export default (name, theme, options) => {
  const output = {};

  const exclude = {
    spacing: ["px", "0"],
    borderRadius: ["full", "none"],
  };
  const { minScreen, maxScreen } = getScreens(theme, options);
  const avgScreen = minScreen + (maxScreen - minScreen) / 2;

  const getProportionedValue = (vw) => {
    return (vw * 100) / avgScreen;
  };

  const addSize = (sizeName, vw, extra = {}) => {
    output[sizeName] = {
      clampMin: ((vw * minScreen) / 100).toFixed(0) + "px",
      clampMax: ((vw * maxScreen) / 100).toFixed(0) + "px",
      vw: `${vw}vw`,
      ...extra,
    };
  };
  const fontSizeExtra = () => {
    return options.defaultLineHeight ? { lineHeight: options.defaultLineHeight } : {};
  };

  for (let [sizeName, size] of Object.entries(theme(name))) {
    if (name in exclude && exclude[name].includes(sizeName)) continue;

    const px = getPixelValue(size);
    const vw = getProportionedValue(px);
    const extra = name === "fontSize" && fontSizeExtra();

    addSize(sizeName, vw, extra);
  }

  // references for the extraSizes (base * powerOfBase)
  // const references = {
  //   spacing: 4, // 1 point = px
  //   // fontSize: [
  //   //   getPixelValue(theme("fontSize.base")), // base
  //   //   getPixelValue(theme("fontSize.base")) - getPixelValue(theme("fontSize.sm")), // reference
  //   // ],
  //   // borderRadius: [
  //   //   getPixelValue(theme("borderRadius.DEFAULT")), // base
  //   //   getPixelValue(theme("borderRadius.DEFAULT")) -
  //   //     getPixelValue(theme("borderRadius.sm")), // reference
  //   // ],
  // };
  //
  // adding extraSizes...
  // switch (name) {
  //   case "fontSize":
  //   case "borderRadius":
  //     const extraSizes = options.extraSizes?.[name];
  //     if (!Array.isArray(extraSizes) && typeof extraSizes === "object") {
  //       for (let [sizeName, powerOfBase] of Object.entries(options.extraSizes[name])) {
  //         const px = references[name][0] + references[name][1] * powerOfBase;
  //         const vw = getProportionedValue(px);
  //         const extra = name === "fontSize" && fontSizeExtra();
  //         addSize(sizeName, vw, extra);
  //       }
  //     }
  //     break;

  //   case "spacing":
  //     if (Array.isArray(options.extraSizes?.spacing)) {
  //       for (let extraSize of options.extraSizes?.spacing) {
  //         const px = references.spacing * extraSize;
  //         const vw = getProportionedValue(px);
  //         addSize(extraSize, vw);
  //       }
  //     }
  //     break;
  // }

  return output;
};
