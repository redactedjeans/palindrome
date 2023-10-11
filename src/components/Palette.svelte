<script lang="ts">
  import type { Step } from '../types/step';
  import type { Hue } from '../types/hue';
  import ApcachWorker from '../lib/worker?worker'
  import { apcach, crToBg, apcachToCss } from "apcach";
  import { steps, hues } from '../lib/store'

  const _createApcachWorker = () => {
    const worker = new ApcachWorker()
    worker.addEventListener('message', (e: MessageEvent) => {
      colors = e.data as Color[]
    })
    return worker
  }
  const getOklch = (step: Step, hue: Hue, index: number) => {
    const apca = apcach(
      crToBg(step.antagonist, step.contrast),
      colors[index].chroma,
      hue.value
    )
    const hex = apcachToCss(apca, "hex")
    return { l: apca.lightness, c: apca.chroma, h: apca.hue, hex: hex }
  }

  let colors: Color[] = []
  let worker: Worker = _createApcachWorker()

  // I don't love this but currently to avoid weird race conditions
  // and the minmaxchroma calculation taking forever
  // we just kill the worker on update and create a new one
  steps.subscribe(() => {
    if (colors.length === 0) {
      worker.terminate()
      worker = _createApcachWorker()
    }
    if ($steps.length > 0) {
      colors = []
      worker.postMessage({ crs: $steps })
    }
  })
</script>

{#if $steps.length === 0}
  <div class="card info">You have not entered any steps.</div>
{:else if $hues.length === 0}
  <div class="card info">You have not entered any hues.</div>
{:else if colors.length === 0}
  <div class="card info"><div class="spinner"></div></div>
{:else if colors.length > 0}
  {#each $hues as hue}
    <div class="card">
      <h2>{hue.name === '' ? `${hue.value}`.padStart(3, '0') : hue.name}</h2>
      <div class="palette">
        {#each $steps as step, i}
          {@const oklch = getOklch(step, hue, i)}
          <div class="swatch"
            style:--bg="oklch({oklch.l} {oklch.c} {oklch.h})"
            style:--fg={step.antagonist}
          >
            <div>{hue.name === '' ? `${hue.value}`.padStart(3, '0') : hue.name}.{`${step.numbering}`.padStart(3, '0')}</div>
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