// import getScreens from '../utils/getScreens.js';
import { spacingsMap } from "../utils/nameToPropertiesMaps.js";

export default ({ theme, e }, options) => {
  const classes = {};
  // const { minScreen, maxScreen } = getScreens(theme, options);

  // list of all the tailwind classes that can have negative value
  const negatives = [
    "m",
    "my",
    "mx",
    "mt",
    "ml",
    "mr",
    "mb",
    "inset",
    "inset-y",
    "inset-x",
    "top",
    "left",
    "right",
    "bottom",
    "translate",
    "translate-x",
    "translate-y",
    "border-spacing",
  ];

  const getProperties = (conf, cls, properties, clamp, negative) => {
    let pre = negative ? "-" : "";
    let val =
      typeof conf === "object"
        ? clamp
          ? `clamp(${pre}${conf.clampMin}, ${pre}${conf.vw}, ${pre}${conf.clampMax})`
          : `${pre}${conf.vw}`
        : `${pre}${conf}`;

    return Object.fromEntries(
      properties.map((property) => {
        if (property === "translate") {
          return ["transform", `${property}(${val}, ${val})`];
        } else if (property === "translateX" || property === "translateY") {
          return ["transform", `${property}(${val})`];
        }

        switch (cls) {
          case "border-spacing":
            return [property, `${val} ${val}`];
          case "border-spacing-x":
            return [property, `0 ${val}`];
          case "border-spacing-y":
            return [property, `${val} 0`];

          default:
            return [property, val];
        }
      }),
    );
  };

  for (const [cls, properties] of Object.entries(spacingsMap)) {
    for (const [sizeName, conf] of Object.entries(theme("fluid.spacing"))) {
      let className = "." + e(`${cls}-vw-${sizeName}`);

      classes[className] = getProperties(conf, cls, properties, options.useClamp, false);

      if (negatives.includes(cls)) {
        classes[`.-${className.substring(1)}`] = getProperties(
          conf,
          cls,
          properties,
          options.useClamp,
          true,
        );
      }
    }
  }

  // TODO: Add space-x space-y classes. They need `first-child:` and `last-child:` pseudos.

  return classes;
};
