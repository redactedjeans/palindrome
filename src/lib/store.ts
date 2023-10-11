import type { Readable, Writable } from 'svelte/store'
import type { Step, Hue, AppState } from '../types'
import { writable, derived } from "svelte/store"

// get initial state from local storage (if any)
const init: AppState = JSON.parse(localStorage.getItem('app-state') ?? '{}')

// initialize stores
const steps: Writable<Step[]> = writable(init.steps ?? [])
const hues: Writable<Hue[]> = writable(init.hues ?? [])
const state: Readable<AppState> = derived([steps, hues], ([$steps, $hues]) => {
  return { steps: $steps, hues: $hues }
})

// update local storage on app state change
state.subscribe(state => {
  localStorage.setItem('app-state', JSON.stringify(state))
})

export { steps, hues }