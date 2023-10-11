
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