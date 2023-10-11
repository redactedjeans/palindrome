import type { Step } from '../types'
import { apcach, crToBg, maxChroma } from "apcach"

export default function getMinMaxChroma(step: Step): Color {
  console.log('not found...')
  return [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(step.antagonist, step.contrast), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })
}