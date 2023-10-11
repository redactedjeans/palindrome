import { apcach, crToBg, maxChroma } from "apcach";
import type { Step } from '../types/step'
import type { Chroma } from '../types/chroma'

function getMinMaxChroma(s: Step): Chroma {
  const apca: Color = [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(s.antagonist, s.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })

  return { id: s.id, value: apca.chroma }
}

self.addEventListener('message', (e: MessageEvent) => {
  const chromas: Chroma[] = e.data.map(getMinMaxChroma)
  self.postMessage(chromas)
})