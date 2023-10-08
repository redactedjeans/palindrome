<script lang="ts">
  import { cssToApcach, apcachToCss } from "apcach"
  import { bg } from "../store"

  // FIXME: can I use any background color for this conversion?
  $: oklch = apcachToCss(cssToApcach($bg, {bg: '#fff'}), "oklch")

  const updateBg = (e: Event) => { bg.set((e.target as HTMLInputElement).value) }
</script>

<div class="card">
  <h2>Background Colour</h2>

  <input type="color" class="grp" value={$bg} on:change={updateBg}>

  <div>{$bg}</div>
  <div>pretty sure this is at least somewhat wrong: {oklch}</div>
</div>

<style>
  input[type="color"] {
    width: 100%;
    padding: 0;
    border: none;
  }
</style>