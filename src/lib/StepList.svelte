<script lang="ts">
  type Step = {
    contrast: number;
  }
  enum ContrastType {
    WCAG = "wcag",
    BridgePCA = "bridgepca",
    APCA = "apca",
  }

  let crType: ContrastType = ContrastType.APCA
  let steps: Array<Step> = []
  let newCr: number|null = null

  // TODO: validation (0-108)
  const addStep = () => {
    steps.push({ contrast: newCr ?? 0 })
    steps = steps
    newCr = null
  }
</script>

<div class="card">
  <h2>Target Contrast</h2>

  <div class="grp">
    <label>
      WCAG
      <input
        type="radio"
        name="crType"
        value={ContrastType.WCAG}
        bind:group={crType}
      />
    </label>
    <label>
      BridgePCA
      <input
        type="radio"
        name="crType"
        value={ContrastType.BridgePCA}
        bind:group={crType}
        disabled
      />
    </label>
    <label>
      APCA
      <input
        type="radio"
        name="crType"
        value={ContrastType.APCA}
        bind:group={crType}
      />
    </label>
  </div>

  <ul>
    {#each steps as step}
      <li>
        <input type="number" min="0" max="108" bind:value={step.contrast}/>
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