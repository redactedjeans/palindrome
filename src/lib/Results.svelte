<script lang="ts">
  import ApcachWorker from '../worker.js?worker'

  let color: Color|null = null
  const worker = new ApcachWorker()
  worker.postMessage({ bg: '#fff', cr: 70 })
  worker.addEventListener('message', (e: MessageEvent) => {
    color = e.data as Color
  })
</script>

<div class="card">
  {#if color}
    <div>Lightness: {color.lightness}</div>
    <div>Chroma: {color.chroma}</div>
    <div>Hue: {color.hue}</div>
  {:else}
    <div class="spinner"></div>
  {/if}
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

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>