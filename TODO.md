# TODO

## Enhancements
- dark mode
  - user prefs + a toggle
- export palette
- debug mode (hide lch numbers in swatches by default, show in debug mode)
- allow deletion of steps/hues
- remember steps/hues on reload (localStorage?)
- allow saving various palettes
  - dropdown menu to select current palette, auto-save on change
- add validation (?) and :invalid styles
- options/settings
  - colour space (hsl, oklch)
  - colour gamut (srgb, p3, rec2020)
  - contrast formula (wcag, bridge-pca, apca)

## Bugs
- contrast of 108 always returns black (even against white background)
- a better way of interrupting the worker than killing it would be nice
- the worker code it very very slow
  - memoization would help, but can only be implemented if the worker isn't terminated on cancel
  - for common cases, pre-calculating a big table for each (integer) contrast value against black/white