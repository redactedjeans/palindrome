<script lang="ts">
  import { hues } from '../store'
  import type { Hue } from '../types/hue'

  const addHue = () => {
    hues.update(h => (h.push({
      name: "",
      value: 0,
      shift: 0,
    }), h))
  }
  const updateName = (e: Event, index: number, hue: Hue) => {
    hue.name = (e.target as HTMLInputElement).value
    updateHue(index, hue)
}
  const updateValue = (e: Event, index: number, hue: Hue) => {
    hue.value = parseInt((e.target as HTMLInputElement).value)
    updateHue(index, hue)
  }
  const updateHue = (index: number, hue: Hue) => {
    hues.update(h => (h[index] = hue, h))
  }
</script>

<div class="card">
  <h2>Hues</h2>

  <div class="grid">
    <div class="header">Name</div>
    <div class="header">Hue</div>
    <div class="header">Shift</div>
    {#each $hues as hue, i}
      <input
        value={hue.name} placeholder={`${hue.value}`}
        on:change={e => updateName(e, i, hue)}
      />
      <input
        type="number" min="0" max="360"
        value={hue.value}
        on:change={e => updateValue(e, i, hue)}
      />
      <div class="locked">
        <span>{hue.shift}</span>
        <span>🔒</span>
      </div>
    {/each}
  </div>

  <button type="button" on:click={addHue}>Add Hue</button>
</div>

<style>
  .card {
    grid-column: 1;
  }
  .grid {
    justify-content: stretch; 
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: .8rem 1.2rem;
    margin-bottom: 2rem;
  }
  .grid > * {
    min-width: 0;
  }
  .grid .header {
    font-weight: bold;
  }
  .locked {
    color: #8C8E9D;
    font-size: 1.3rem;
    background-color: white;
    border: 1px solid #E1E3F3;
    border-radius: 6px;
    padding: .8rem 1.2rem;
    display: flex;
    justify-content: space-between;
  }
</style>