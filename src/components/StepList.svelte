<script lang="ts">
  import { steps } from '../lib/store'
  import type { Step } from '../types/step'

  const addStep = () => {
    const last = $steps[$steps.length - 1]
    const num = (last ? last.numbering : 0) + 50
    steps.update(ss => (ss.push({
      id: Math.max(...$steps.map(s => s.id), 0) + 1,
      numbering: num,
      contrast: last ? last.contrast : 0,
      antagonist: num <= 500 ? '#000000' : '#ffffff',
    }), ss))
  }
  const deleteStep = (i: number) => {
    steps.update(ss => (ss.splice(i, 1), ss))
  }
  const updateNumbering = (e: Event, index: number, step: Step) => {
    const val: string = (e.target as HTMLInputElement).value
    step.numbering = parseInt(val === '' ? '0' : val)
    updateStep(index, step)
  }
  const updateContrast = (e: Event, index: number, step: Step) => {
    const val: string = (e.target as HTMLInputElement).value
    step.contrast = parseInt(val === '' ? '0' : val)
    updateStep(index, step)
  }
  const updateAntagonist = (e: Event, index: number, step: Step) => {
    step.antagonist = (e.target as HTMLInputElement).value
    updateStep(index, step)
  }
  const updateStep = (index: number, step: Step) => {
    steps.update(ss => (ss[index] = step, ss))
  }
</script>

<div class="card">
  <h2>Steps</h2>

  <div class="grid">
    <div class="header">Numbering</div>
    <div class="header">Contrast</div>
    <div class="header">vs.</div>
    <div class="header">Chroma</div>
    <div class="header"><!-- delete button --></div>
    {#each $steps.sort((a, b) => a.numbering - b.numbering) as step, i (step.id)}
      <input
        type="number" min="0" max="1000"
        value={step.numbering}
        on:change={e => updateNumbering(e, i, step)}
      />
      <input
        type="number" min="0" max="108"
        value={step.contrast}
        on:change={e => updateContrast(e, i, step)}
      />
      <input
        type="color"
        value={step.antagonist}
        on:change={e => updateAntagonist(e, i, step)}
      />
      <div class="locked">
        <span>Auto</span>
        <span>🔒</span>
      </div>
      <button type="button" class="del" on:click={_ => deleteStep(i)}>
        🗑️
      </button>
    {/each}
  </div>

  <button type="button" on:click={addStep}>Add Step</button>
</div>

<style>
  .card {
    grid-column: 1;
  }
  .grid {
    justify-content: stretch; 
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: .8rem 1.2rem;
    margin-bottom: 2rem;
  }
  .grid > * {
    min-width: 0;
  }
  .grid > input[type="color"] {
    min-width: 2.5em;
  }
  .grid .header {
    font-weight: bold;
  }
  .locked > span:last-child {
    margin-left: 1em;
  }
</style>