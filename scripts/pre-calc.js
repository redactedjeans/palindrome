import { apcach, crToBg, maxChroma } from "apcach"

// this function is duplicated from the worker (src/lib/worker) because that is TypeScript
// and this is JavaScript and I don't feel like figure all that out
function getMinMaxChroma(step) {
  return [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(step.antagonist, step.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })
}

const data = {}
const bgs = ['#000000', '#ffffff']
const maxContrast = 108
const contrastStep = 1
for (let bg of bgs) {
  const vals = []
  for (let contrast = 0; contrast <= maxContrast; contrast += contrastStep) {
    const color = getMinMaxChroma({contrast: contrast, antagonist: bg})
    vals.push(color.chroma) // index is contrast
    // using error so we can redirect stdout to a file
    console.error(contrast, bg, color.chroma)
  }
  data[bg] = vals
}

console.log(JSON.stringify(data))