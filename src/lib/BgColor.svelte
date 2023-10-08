<script lang="ts">
  let color: string = "#000"
</script>

<div class="card">
  <h2>Background Colour</h2>

  <input type="color" class="grp" bind:value={color}>

  <div>{color}</div>
  <div>{color}</div>
</div>

<style>
  input[type="color"] {
    width: 100%;
    padding: 0;
    border: none;
  }
</style>