<script lang="ts">
  import { cssToApcach, apcachToCss } from "apcach"

  let color: string = "#000"
  // FIXME: can I use any background color for this conversion?
  $: oklch = apcachToCss(cssToApcach(color, {bg: '#fff'}), "oklch")
</script>

<div class="card">
  <h2>Background Colour</h2>

  <input type="color" class="grp" bind:value={color}>

  <div>{color}</div>
  <div>pretty sure this is at least somewhat wrong: {oklch}</div>
</div>

<style>
  input[type="color"] {
    width: 100%;
    padding: 0;
    border: none;
  }
</style>