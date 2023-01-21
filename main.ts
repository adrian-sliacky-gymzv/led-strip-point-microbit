const numLeds = 24
const flashColor = NeoPixelColors.Violet

const strip = neopixel.create(DigitalPin.P0, numLeds, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(flashColor))