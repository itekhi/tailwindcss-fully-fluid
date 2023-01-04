# tailwindcss-fully-fluid

A Tailwind CSS plugin that provides all applicable fluid-responsive utilities. 


## Installation

Install the plugin with `npm`:

```sh
npm install -D https://github.com/itekhi/tailwindcss-fully-fluid
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-fully-fluid'),
    // ...
  ],
}
```

---

## Usage

First of all, you should set `screenMin` and `screenMax` in the plugin configuration to your min and max breakpoints. Defaults are `sm`(640px) and `2xl`(1536px) from tailwind's configuration.

> ⚠️ If you use `useClamp`, which is the default, you should not change these values in the middle of your project. As this will change the `clamp` values and your UI will appear smaller or bigger. (See [How it works](#how-it-works)).


### Examples

All classes are the same as in tailwind. Just with `-vw-` in between.

For example `inset-10` from tailwind will be `inset-vw-10`.

- Spacing

    Spacing includes: `padding`, `margin`, `width`, `max-width`, `height`, `max-height`, `gap`, `inset` (or `top`, `left`, `right`, `bottom`), `translate` / `translateX` / `translateY`.

    ```html
    <!-- width, height -->
    <div className="w-vw-20 h-vw-20"></div>
    <div className="max-w-vw-20 max-h-vw-20"></div>
    <!-- margin -->
    <div className="m-vw-10"></div>
    <div className="mt-vw-10 ml-vw-10"></div>
    <!-- margins, insets, transforms can be also negative -->
    <div className="-mb-vw-10 -mr-vw-10 -translate-x-vw-24 -translate-y-vw-24"></div>
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


---

## Configuration

```js
{
  // ...

  plugins: [
    require('tailwindcss-fully-fluid')({
      screenMin: 'sm',
      screenMax: '2xl',
      useClamp: true,
      useMediaReset: false
    })
  ]
}
```

| Key           | Value                                     | Description      |
| ------------- | ----------------------------------------- | ---------------- |
| screenMin     | `'sm'` ... `'2xl'` \| `'320px'`           |                  |
| screenMax     | `'sm'` ... `'2xl'` \| `'1920px'`          |                  |
| useClamp      | `true` \| `false`                         |                  |
| useMediaReset | `true` \| `false` \| `'min'` \| `'max'`   |                  |

---

## Customization

If you need more bigger or smaller values, because calculating `clamp` and `vw` values can be boring. I recommend you to extend tailwind's `spacing` property.
Like this:
```js
{
  theme: {
    extend: {
      spacing: {
        112: '28rem'
      }
    }
  },

  // ...
}
```

However you can, for example override `lineHeight` values for text sizes.

Default (calculated) configuration:
```js
{
  theme: {
    fluid: {
      fontSize: {
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
      },
      spacing: {
        1: {
          clampMin: '2px',
          clampMax: '6px',
          vw: '0.3676vw'
        },
        // ...
        96: {
          clampMin: '226px',
          clampMax: '542px',
          vw: '35.2941vw'
        }
      }
    },
    // or place this in extend to extend.
    extend: {
      fluid: {
        // ...
      }
    }
  }

  // ...
}
```

---

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
