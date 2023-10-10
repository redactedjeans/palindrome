<script lang="ts">
  import { steps } from '../store'
  import type { Step } from '../types/step'

  const addStep = () => {
    const last = $steps[$steps.length - 1]
    const num = (last ? last.numbering : 0) + 50
    steps.update(s => (s.push({
      numbering: num,
      contrast: last ? last.contrast : 0,
      antagonist: num <= 500 ? '#000000' : '#ffffff',
    }), s))
  }
  const updateNumbering = (e: Event, index: number, step: Step) => {
    step.numbering = parseInt((e.target as HTMLInputElement).value)
    updateStep(index, step)
  }
  const updateContrast = (e: Event, index: number, step: Step) => {
    step.contrast = parseInt((e.target as HTMLInputElement).value)
    updateStep(index, step)
  }
  const updateAntagonist = (e: Event, index: number, step: Step) => {
    step.antagonist = (e.target as HTMLInputElement).value
    updateStep(index, step)
  }
  const updateStep = (index: number, step: Step) => {
    steps.update(s => (s[index] = step, s))
  }
</script>

<div class="card">
  <h2>Steps</h2>

  <div class="grid">
    <div class="header">Numbering</div>
    <div class="header">Contrast</div>
    <div class="header">vs.</div>
    <div class="header">Chroma</div>
    {#each $steps as step, i}
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
    grid-template-columns: repeat(4, 1fr);
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