import { apcach, crToBg, maxChroma } from "apcach";
import type { Step } from './types/step'

self.addEventListener('message', (e: MessageEvent) => {
  if (e.data.crs.length === 0) return

  const colors: Array<Color> = e.data.crs.map((cr: Step) => [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(e.data.bg, cr.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  }))

  self.postMessage(colors)
})