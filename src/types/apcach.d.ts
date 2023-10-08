declare module 'apcach'

type ContrastConfig = {
  contrastModel: string
  cr: number
  bgColor: string
  fgColor: string
  searchDirection: string
}

type Color = {
  colorSpace: string // FIXME
  lightness: number
  chroma: number
  hue: number
  alpha: number
  contrastConfig: contrastConfig
}