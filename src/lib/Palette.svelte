<script lang="ts">
  import type { Step } from '../types/step';
  import type { Hue } from '../types/hue';
  import ApcachWorker from '../worker.js?worker'
  import { apcach, crToBg } from "apcach";
  import { steps, hues } from '../store'

  const _createApcachWorker = () => {
    const worker = new ApcachWorker()
    worker.addEventListener('message', (e: MessageEvent) => {
      colors = e.data as Array<Color>
    })
    return worker
  }
  const getOklch = (step: Step, hue: Hue, index: number) => {
    const apca = apcach(
      crToBg(step.antagonist, step.contrast),
      colors[index].chroma,
      hue.value
    )
    return { l: apca.lightness, c: apca.chroma, h: apca.hue }
  }

  let colors: Array<Color> = []
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

<div class="card">
  <div class="title">
    <h2>Palette</h2>
    {#if colors.length === 0 && $steps.length > 0}
      <div class="spinner"></div>
    {/if}
  </div>

  {#if $steps.length === 0}
    <div class="body info">You have not entered any steps.</div>
  {:else if $hues.length === 0}
    <div class="body info">You have not entered any hues.</div>
  {:else if colors.length > 0}
    <div class="body">
      {#each $hues as hue}
        <div class="label">{hue.name}</div>
        <div class="row">
          {#each $steps as step, i}
            {@const oklch = getOklch(step, hue, i)}
            <div class="swatch"
              style:--bg="oklch({oklch.l} {oklch.c} {oklch.h})"
              style:--fg={step.antagonist}
            >
              <div>{Math.round(oklch.l * 1000) / 10}</div>
              <div>{Math.round(oklch.c * 1000) / 1000}</div>
              <div>{oklch.h}</div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    margin: 0;
  }
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
  }
  .body {
    margin-top: 2rem;
  }
  .label {
    font-weight: bold;
    margin-bottom: .6rem;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
  }
  .row:not(:last-child) {
    margin-bottom: 1.2rem;
  }
  .swatch {
    height: 3rem;
    width: 3rem;
    border-radius: 8px;
    background-color: var(--bg);
    color: var(--fg);
  }
  .swatch > div {
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>