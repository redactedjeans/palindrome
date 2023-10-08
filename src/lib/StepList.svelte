<script lang="ts">
  import { steps } from '../store'

  // let crType: ContrastType = ContrastType.APCA
  // let steps: Array<Step> = []
  let newCr: number|null = null

  // TODO: validation (0-108)
  const addStep = () => {
    steps.update(s => (s.push({ contrast: newCr ?? 0 }), s))
    newCr = null
  }
  const updateStep = (event: Event, index: number) => {
    const value = (event.target as HTMLInputElement).value
    steps.update(s => (s[index].contrast = parseInt(value), s))
  }
</script>

<div class="card">
  <h2>Target Contrast (APCA)</h2>

  <ul>
    {#each $steps as step, i}
      <li>
        <input
          type="number" min="0" max="108"
          value={step.contrast}
          on:change={(e) => updateStep(e, i)}
        />
      </li>
    {/each}
    <li>
      <input type="number" min="0" max="108" placeholder="0-108" bind:value={newCr}/>
      <button type="button" on:click={addStep}>+</button>
    </li>
  </ul>
</div>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>