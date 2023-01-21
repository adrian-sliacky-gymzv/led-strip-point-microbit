// ############################################
const startY = 0
const numLeds = 24
const ledOverflow = true

const flashColor = NeoPixelColors.Violet
const stripColor = NeoPixelColors.Red
const flashDelay = 320 // delay in ms
const buttonDelay = 250 // delay in ms

// how to plot LEDs
const reversed = false

const buttonsSwapped = false
const controlsSwapped = false

// ############################################

let y = startY

let button1 = Button.A
let button2 = Button.B

if (buttonsSwapped) {
    button1 = Button.B
    button2 = Button.A
}

let increment = 1
if (controlsSwapped) {
    increment = -1
}

const mod = (a: number, b: number) => ledOverflow ? ((a % b) + b) % b : Math.max(Math.min(a, numLeds - 1), 0)

const strip = neopixel.create(DigitalPin.P0, numLeds, NeoPixelMode.RGB)

for (let i = 0; i < 3; i++) {
    strip.showColor(neopixel.colors(flashColor))
    basic.pause(flashDelay)
    strip.showColor(neopixel.colors(NeoPixelColors.White))
    basic.pause(flashDelay)
}

loops.everyInterval(buttonDelay, () => {
    if (input.buttonIsPressed(button1)) {
        y = mod(y + increment, numLeds)
    }
    if (input.buttonIsPressed(button2)) {
        y = mod(y - increment, numLeds)
    }

    strip.clear()
    if (reversed) {
        for (let i = 0; i < numLeds; i++) {
            if (!(i === y)) {
                strip.setPixelColor(i, stripColor)
            }
        }
    } else {
        strip.setPixelColor(y, stripColor)
    }
    strip.show()
})

if (input.buttonIsPressed(Button.AB)) { } // for initializing A + B button in makecode Simulator