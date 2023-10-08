import { apcach, crToBg, maxChroma } from "apcach";

self.addEventListener('message', (e: MessageEvent) => {
  const color: Color = [...Array(360)].reduce((min, _, hue) => {
    const col = apcach(crToBg(e.data.bg, e.data.cr), maxChroma(), hue)
    return (!min || col.chroma < min.chroma) ? col : min
  })

  self.postMessage(color)
})