import { writable } from "svelte/store"
import type { Writable } from 'svelte/store'
import type { Step } from './types/step'
import type { Hue } from './types/hue'

const steps: Writable<Array<Step>> = writable([])
const hues: Writable<Array<Hue>> = writable([])

export { steps, hues }