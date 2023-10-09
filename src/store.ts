import { writable, derived } from "svelte/store"
import type { Writable, Readable } from 'svelte/store'
import type { Step } from './types/step'
import type { Hue } from './types/hue'

type DataStore = {
  steps: Array<Step>
  hues: Array<Hue>
}

const steps: Writable<Array<Step>> = writable([])
const hues: Writable<Array<Hue>> = writable([])

// derived store so we can subsribe to any changes across all stores
const data: Readable<DataStore> = derived([steps, hues], ([$steps, $hues]) => {
  return { steps: $steps, hues: $hues }
})

export { steps, hues, data }