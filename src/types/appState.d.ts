import type Step from './step'
import type Hue from './hue'

type AppState = {
  steps: Step[]
  hues: Hue[]
}

export default AppState