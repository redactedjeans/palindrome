<script lang="ts">
  import type { Step } from '../types/step'
  import type { Hue } from '../types/hue'
  import type { Chroma } from '../types/chroma'
  import ApcachWorker from '../lib/worker?worker'
  import { apcach, crToBg, apcachToCss } from "apcach"
  import { steps, hues } from '../lib/store'

  const _createApcachWorker = () => {
    const worker = new ApcachWorker()
    worker.addEventListener('message', (e: MessageEvent) => {
      const chromas = e.data as Chroma[]
      steps.update(ss => {
        for (let chroma of chromas) {
          const i = ss.findIndex(s => s.id === chroma.id)
          ss[i].chroma = chroma.value
        }
        return ss
      })
    })
    return worker
  }
  const getOklch = (step: Step, hue: Hue, index: number) => {
    const apca = apcach(
      crToBg(step.antagonist, step.contrast),
      step.chroma,
      hue.value
    )
    const hex = apcachToCss(apca, "hex")
    return { l: apca.lightness, c: apca.chroma, h: apca.hue, hex: hex }
  }

  let worker: Worker = _createApcachWorker()
  $: done = $steps.every(s => s.chroma !== null)

  // I don't love this but currently to avoid weird race conditions
  // and the minmaxchroma calculation taking forever
  // we just kill the worker on update and create a new one
  steps.subscribe(ss => {
    const missing = ss.filter(s => s.chroma === null)
    // console.log(missing)
    if (missing.length > 0) {
      worker.terminate()
      worker = _createApcachWorker()
      worker.postMessage(missing)
    }
  })
</script>

{#if $steps.length === 0}
  <div class="card info">You have not entered any steps.</div>
{:else if $hues.length === 0}
  <div class="card info">You have not entered any hues.</div>
{:else if !done}
  <div class="card info"><div class="spinner"></div></div>
{:else}
  {#each $hues as hue}
    <div class="card">
      <h2>{hue.name || `${hue.value}`.padStart(3, '0')}</h2>
      <div class="palette">
        {#each $steps as step, i}
          {@const oklch = getOklch(step, hue, i)}
          <div class="swatch"
            style:--bg="oklch({oklch.l} {oklch.c} {oklch.h})"
            style:--fg={step.antagonist}
          >
            <div>{hue.name || `${hue.value}`.padStart(3, '0')}.{`${step.numbering}`.padStart(3, '0')}</div>
            <div>&nbsp;</div>
            <div>oklch({Math.floor(oklch.l * 1000) / 10}% {Math.floor(oklch.c * 1000) / 1000} {oklch.h})</div>
            <div>{oklch.hex.toUpperCase()}</div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
{/if}

<style>
  .spinner {
    height: 1em;
    width: 1em;
    border: 3px solid grey;
    border-left-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .info {
    color: #555;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    text-align: center;
  }
  .palette {
    font-family: 'IBM Plex Mono', 'Courier New', Courier, monospace;
    display: flex;
    flex-direction: column;
    gap: .6rem;
  }
  .swatch {
    border-radius: 8px;
    background-color: var(--bg);
    color: var(--fg);
    padding: 1.6rem .8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>