# tailwindcss-fully-fluid

A Tailwind CSS plugin that provides all applicable fluid-responsive utilities.


## Installation

Install the plugin with `npm`:

```sh
npm install -D https://github.com/itekhi/tailwindcss-fully-fluid
```

### Usage

1. First, add the plugin to your Tailwind config file:

    - You can import it using ESM import:

      ```js
      import fluidPlugin from 'tailwindcss-fully-fluid';

      export default {
        // ...

        theme: {
          // ...
        },

        plugins: [
          fluidPlugin({
            screenMin: 'sm',
            screenMax: '2xl',
            useClamp: true
          })
        ],
      }
      ```

    - Or using CommonJS `require`:

      ```js
      module.exports = {
        // ...

        plugins: [
          require('tailwindcss-fully-fluid')({
            screenMin: 'sm',
            screenMax: '2xl',
            useClamp: true
          })
        ],
      }
      ```

2. ❕❕ Then, first of all, you should set `screenMin` and `screenMax` in the plugin configuration to your min and max breakpoints. Or leave them at default, which are `sm`(640px) and `2xl`(1536px) from tailwind's configuration. These values will determine where classes will start to resize based on viewport and where to stop.

    > ⚠️ If you use `useClamp`, which is the default, you should not change these values in the middle of your project, as this will change the `clamp` values and your UI will appear smaller or bigger. (See [How it works](#how-it-works)).


### Examples

All classes are the same as in tailwind. Just with `-vw-` in between.
For example `inset-10` from tailwind will be `inset-vw-10`.

- Spacing

    Spacing includes: `padding`, `margin`, `width`, `max-width`, `height`, `max-height`, `gap`, `inset` (or `top`, `left`, `right`, `bottom`), `translate`, `translateX`, `translateY`.

    ```html
    <!-- width, height -->
    <div className="w-vw-20 h-vw-20"></div>
    <div className="max-w-vw-20 max-h-vw-20"></div>

    <!-- margin -->
    <div className="m-vw-10"></div>
    <div className="mt-vw-10 ml-vw-10"></div>

    <!-- margins, insets, transforms can also be negative -->
    <div className="-mb-vw-10 -mr-vw-10 translate-vw-10"></div>
    <div className="-translate-x-vw-24 -translate-y-vw-24"></div>
    ```

- Font sizes
    ```html
    <div className="text-vw-xs"></div>
    <!-- ... -->
    <div className="text-vw-9xl"></div>
    ```

- Border radiuses
    ```html
    <div className="rounded-vw-sm"></div>
    <!-- ... -->
    <div className="rounded-vw-3xl"></div>
    ```


## Configuration

Example with default options:
```js
{
  // ...

  plugins: [
    require('tailwindcss-fully-fluid')({
      screenMin: 'sm',
      screenMax: '2xl',
      useClamp: true,
      extraSizes: {},
      defaultLineHeight: 1.25
    })
  ]
}
```

| Key               | Value                                     | Description                                  |
| ----------------- | ----------------------------------------- | -------------------------------------------- |
| screenMin         | `'sm'` ... `'2xl'` \| `'320px'`           | Min breakpoint where to stop resizing based on viewport. Can be screen name from tailwind theme config, or any custom value. |
| screenMax         | `'sm'` ... `'2xl'` \| `'1920px'`          | Max breakpoint where to stop resizing based on viewport. Can be screen name from tailwind theme config, or any custom value. |
| useClamp          | `true` \| `false`                         | If `true` will use CSS's `clamp` function, otherwise all classes will just use `vw`. |
| useMediaReset     | `true` \| `false` \| `'min'` \| `'max'`   | Not supported anymore!                       |
| extraSizes        | `Object`                                  | See [Adding more sizes](#adding-more-sizes)  |
| defaultLineHeight | `Float` \| `null`                         | I think this options explains itself, it sets line height to all of the font-size classes. Can be null to not set line-height at all. |


## Customization

### Adding more sizes

There are 3 ways you can add more sizes:

1. (Recommended) You can extend tailwind's `spacing`, `fontSize` or `borderRadius` properties.

    This way you will get the normal classes + fluid sizes (plugin will calculate and add these values).

    You can set any values to the keys. But I recommend you to stick with tailwind's intervals of values. For example for `fontSize`, take 2 last values: `8xl: 6rem` and `9xl: 8rem`, the interval is `2rem`, so add it to the last value `8rem` and voila you have the `10xl: 10rem`.

    ```js
    {
      theme: {
        extend: {
          spacing: {
            112: '28rem'
          },
          borderRadius: {
            '4xl': '2rem'
          },
          fontSize: {
            '10xl': '10rem'
          }
        }
      },

      // ...
    }
    ```

2. ~~Another way is through plugin's `extraSizes` configuration.~~ (doesn't work properly...)

    - For `spacing` you can just add any value you want. I recommend to add values in an interval of 8 or 16. For example the last value in [tailwind's spacing](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) is 96, `96 + 16 = 112`, `112 + 16 = 128` and so on.

    - For `fontSize` or `borderRadius` it's a bit harder:

        Key is any name you want that in the end will be like `text-vw-[key]`.

        And for the value of this key - the power of base value. Base value for `fontSize` is `base`(text-base), for `borderRadius` - `DEFAULT`(nothing).

        For example if you want to add `xxs` to the font sizes, the power of base will be `-3`.

        ```js
        // name      // power of
        text-xxs     = -3  // your new value
        text-xs      = -2
        text-sm      = -1
        text-base    = 0   // base value
        text-lg      = 1
        // ...
        text-8xl     = 9
        text-9xl     = 10
        ```

        ```js
        // name      // power of
        rounded-sm   = -1
        rounded      = 0  // base value
        // ...
        rounded-3xl  = 5
        rounded-4xl  = 6  // new value
        ```

    ```js
      {
        plugins: [
          require('tailwindcss-fully-fluid')({
            extraSizes: {
              spacing: [
                112,
                128
              ],
              // NOTE: NOT SUPPORTED ANYMORE
              // fontSize: {
              //   'xxs': -3,
              //   '10xl': 11,
              //   '11xl': 12
              // },
              // borderRadius: {
              //   '4xl': 6,
              //   '5xl': 7
              // }
            }
          })
        ]
      }
    ```


3. The third way is to extend `fluid` object in your `theme` config.

    You should use this only if you need to, for example set `lineHeight` of font sizes.

    I don't know any other use case of this, as it is pretty hard to calculate the right `clampMin`, `clampMax` and `vw` for clamp to stop resizing at right breakpoints.

    > ⚠️ Notice that putting the `fluid` object directly inside `theme` will remove other precalculated values and plugin will crash if you don't set all of the base keys - `spacing`, `fontSize` and `borderRadius`. Rather put `fluid` in `theme.extend` object.

    ```js
    {
      theme: {
        extend: {
          fluid: {
            fontSize: {
              // this is how to change lineHeight for sm size
              'sm': {
                // Recommendation: Set lineHeight unitless.
                lineHeight: 1.1
              },

              // this is how config looks under the hood
              // values for `borderRadius` and `spacing` look the same, but without `lineHeight`.
              'xs': {
                clampMin: '7px',
                clampMax: '16px',
                vw: '0.9375vw',
                lineHeight: 1.25
              },
              // ...
              '9xl': {
                clampMin: '64px',
                clampMax: '192px',
                vw: '10vw',
                lineHeight: 1.25
              }
            }
          }
        }
      }

      // ...
    }
    ```


## How it works

All of the values and classes are taken from your tailwind configuration and then just recalculated to `vw`.

For the minimum breakpoint I will use `640px` (or `sm` in tailwind). (`screenMin` in configuration)

And for the maximum - `1536px` (or `2xl` in tailwind). (`screenMax` in configuration)

For an example value, that needs to be fluid, I'll use `xs` font size - `12px`.
So you can see how this will be the same as in [Customization](#customization).

The calculation of `vw` values goes like this for ALL of the properties in this plugin:

1. Gets the average screen:

    `avgScreen = [min] + (([max] - [min]) / 2) = 640px + ((1536px - 640px) / 2) = 1088px`

    You can see why changing `screenMin` and `screenMax` will change the `vw` values.

2. Then simply gets the proportion between `12px` and `1088px`:

    `vw = (val * 100) / avgScreen = (12px * 100) / 1088px = 1.1029vw`

3. Clamp is calculated with proportion of this `vw` value and `minScreen` or `maxScreen`, like this:

    `clampMin = (vw * minScreen) / 100 = (1.1029vw * 640px) / 100 = 7.0588px = 7px`

    `clampMax = (vw * maxScreen) / 100 = (1.1029vw * 1536px) / 100 = 16.9405px = 16px`

    Also plugin removes float point from this value so `px` are always exact.
    I didn't notice any visible transition between `vw` and `px` values.

4. Final result is this:

    `font-size: clamp(7px, 1.1029vw, 16px)`

    or if you set `useClamp` to `false`:

    `font-size: 1.1029vw`
