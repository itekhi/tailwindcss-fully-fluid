import fluidPlugin from "../src";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        max: "1600px",
      },
      spacing: {
        4.5: "1.125rem",
        104: "26rem",
        112: "28rem",
        120: "30rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      // fluid: {
      //   fontSize: {
      //     xxs: {
      //       clampMin: "5px",
      //       clampMax: "15px",
      //       vw: "0.78125vw",
      //     },
      //     xs: {
      //       lineHeight: 1,
      //     },
      //   },
      // },
    },
  },
  plugins: [
    fluidPlugin({
      screenMax: "max",
      defaultLineHeight: null,
      // useMediaReset: true,
      extraSizes: {
        spacing: [112, 120, 128],
        // fontSize: {
        //   xxs: -3,
        // },
        borderRadius: {
          "2.5xl": 6,
        },
      },
    }),
  ],
};
