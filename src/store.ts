import { writable } from "svelte/store"
import type { Writable } from 'svelte/store'
import type { Step } from './types/step'
import type { Hue } from './types/hue'

const steps: Writable<Step[]> = writable([])
const hues: Writable<Hue[]> = writable([])

export { steps, hues }