<script lang="ts">
  import type { Step } from '../types/step';
  import type { Hue } from '../types/hue';
  import ApcachWorker from '../worker.js?worker'
  import { apcach, crToBg } from "apcach";
  import { steps, hues } from '../store'

  let colors: Array<Color> = []
  let worker: Worker = new ApcachWorker()

  steps.subscribe(() => {
    if ($steps.length > 0) {
      colors = []
      worker.postMessage({ crs: $steps })
    }
  })
  worker.addEventListener('message', (e: MessageEvent) => {
    colors = e.data as Array<Color>
  })

  const getOklch = (step: Step, hue: Hue, index: number) => {
    const apca = apcach(
      crToBg(step.antagonist, step.contrast),
      colors[index]?.chroma ?? 0,
      hue.value
    )

    return `oklch(${apca.lightness} ${apca.chroma} ${apca.hue})`
  }
</script>

<div class="card">
  <div class="title">
    <h2>Palette</h2>
    {#if $steps.length > 0 && $hues.length > 0 && colors.length === 0}
      <div class="spinner"></div>
    {/if}
  </div>

  {#if $steps.length === 0}
    <div class="info">You have not entered any steps.</div>
  {:else if $hues.length === 0}
    <div class="info">You have not entered any hues.</div>
  {:else if colors.length > 0}
    {#each $hues as hue}
      <div class="label">{hue.name}</div>
      <div class="row">
        {#each $steps as step, i}
          <div class="swatch" style="--color: {getOklch(step, hue, i)}"></div>
        {/each}
      </div>
    {/each}
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
  .title:not(:has(.spinner)) {
    margin-bottom: 2rem;
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
  .label {
    font-weight: bold;
    margin-bottom: .6rem;
  }
  .row {
    display: flex;
    gap: .8rem;
  }
  .row:not(:last-child) {
    margin-bottom: 1.2rem;
  }
  .swatch {
    height: 3rem;
    width: 3rem;
    border-radius: 8px;
    background-color: var(--color);
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>