import { writable, derived } from "svelte/store"
import type { Writable, Readable } from 'svelte/store'
import type { Step } from './types/step'

type DataStore = {
  bg: string
  steps: Array<Step>
}

const bg: Writable<string> = writable('#000000')
const steps: Writable<Array<Step>> = writable([])

// derived store so we can subsribe to any changes across all stores
const data: Readable<DataStore> = derived([bg, steps], ([$bg, $steps]) => {
  return { bg: $bg, steps: $steps }
})

export { bg, steps, data }