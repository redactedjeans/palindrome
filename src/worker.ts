import { apcach, crToBg, maxChroma } from "apcach";
import type { Step } from './types/step'

function getMinMaxChroma(cr: Step): Color {
  return [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(cr.antagonist, cr.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })
}

self.addEventListener('message', (e: MessageEvent) => {
  const colors: Color[] = e.data.crs.map(getMinMaxChroma)
  self.postMessage(colors)
})