import type { Step, Chroma } from '../types'
import { apcach, crToBg, maxChroma } from "apcach"
import rawData from '../assets/chromas.json'

const data = rawData as { [hex: string]: number[] }

function getMinMaxChroma(step: Step): Color {
  return [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(step.antagonist, step.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })
}

self.addEventListener('message', (e: MessageEvent) => {
  const chromas: Chroma[] = e.data.map((s: Step) => {
    // if the given step is within pre-calculated parameters, use lookup table;
    // otherwise calculate the value from scratch
    const apca = (Object.hasOwn(data, s.antagonist) && data[s.antagonist].length > s.contrast)
      ? { chroma: data[s.antagonist][s.contrast] } as Color
      : getMinMaxChroma(s)
    return { id: s.id, value: apca.chroma }
  })

  self.postMessage(chromas)
})