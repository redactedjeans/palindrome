<script lang="ts">
  import ApcachWorker from '../worker.js?worker'
  import { data } from '../store'

  let colors: Array<Color> = []
  let worker: Worker = new ApcachWorker()

  worker.addEventListener('message', (e: MessageEvent) => {
    colors = e.data as Array<Color>
  })
  data.subscribe(() => {
    if ($data.steps.length > 0) {
      colors = []
      worker.postMessage({ bg: $data.bg, crs: $data.steps })
    }
  })
</script>

<div class="card">
  <h2>Smallest Maximum Chroma</h2>

  {#each colors as color}
    <div class="grp">
      <h3>Target Contrast: {color.contrastConfig.cr}</h3>
      <div>Lightness: {color.lightness}</div>
      <div>Chroma: {color.chroma}</div>
      <div>Hue: {color.hue}</div>
    </div>
  {:else}
    {#if $data.steps.length === 0}
      <div class="info">You have not entered any contrast targets.</div>
    {:else}
      <div class="spinner"></div>
    {/if}
  {/each}
</div>

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
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>