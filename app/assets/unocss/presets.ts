import { animatedUno } from 'animated-unocss'
import {
  presetAttributify,
  presetIcons,
  presetMini,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetRadix } from 'unocss-preset-radix'

export const presets = [
  presetUno(),
  presetMini(),
  presetWind(),
  presetAttributify(),
  presetIcons(),
  presetTypography(),
  animatedUno(),
  presetWebFonts({
    fonts: {
      // ...
    },
  }),
  presetRadix({
    darkSelector: '.dark',
    palette: [
      'gray',
      'mauve',
      'slate',
      'sage',
      'olive',
      'sand',
      'gold',
      'bronze',
      'brown',
      'yellow',
      'amber',
      'orange',
      'tomato',
      'red',
      'ruby',
      'crimson',
      'pink',
      'plum',
      'purple',
      'violet',
      'iris',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'jade',
      'green',
      'grass',
      'lime',
      'mint',
      'sky',
      'black',
      'white',
    ],
  }),
  presetAnimations(),
]
