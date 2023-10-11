<script lang="ts">
  import { hues } from '../lib/store'
  import type { Hue } from '../types/hue'

  const addHue = () => {
    hues.update(hs => (hs.push({
      id: Math.max(...$hues.map(h => h.id), 0) + 1,
      name: '',
      value: 0,
      shift: 0,
    }), hs))
  }
  const deleteHue = (i: number) => {
    hues.update(hs => (hs.splice(i, 1), hs))
  }
  const updateName = (e: Event, index: number, hue: Hue) => {
    hue.name = (e.target as HTMLInputElement).value
    updateHue(index, hue)
  }
  const updateValue = (e: Event, index: number, hue: Hue) => {
    const val: string = (e.target as HTMLInputElement).value
    hue.value = parseInt(val === '' ? '0' : val)
    updateHue(index, hue)
  }
  const updateHue = (index: number, hue: Hue) => {
    hues.update(hs => (hs[index] = hue, hs))
  }
</script>

<div class="card">
  <h2>Hues</h2>

  <div class="grid">
    <div class="header">Name</div>
    <div class="header">Hue</div>
    <div class="header">Shift</div>
    <div class="header"><!-- delete button --></div>
    {#each $hues.sort((a, b) => a.value - b.value) as hue, i (hue.id)}
      <input
        value={hue.name} placeholder={`${hue.value}`.padStart(3, '0')}
        on:change={e => updateName(e, i, hue)}
      />
      <input
        type="number" min="000" max="360"
        value={hue.value}
        on:change={e => updateValue(e, i, hue)}
      />
      <div class="locked">
        <span>{hue.shift}</span>
        <span>🔒</span>
      </div>
      <button type="button" class="del" on:click={_ => deleteHue(i)}>
        🗑️
      </button>
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
    grid-template-columns: repeat(4, auto);
    grid-gap: .8rem 1.2rem;
    margin-bottom: 2rem;
  }
  .grid > * {
    min-width: 0;
  }
  .grid .header {
    font-weight: bold;
  }
  .locked > span:last-child {
    margin-left: 2em;
  }
</style>