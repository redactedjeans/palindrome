<script lang="ts">
  import BgColor from './lib/BgColor.svelte'
  import StepList from './lib/StepList.svelte'
  import Results from './lib/Results.svelte'

  import { bg, steps } from './store'
</script>

<main>
  <div>
    <h1>Palindrome</h1>
    <div class="sub">Colour Palette Generator</div>
  </div>

  <div class="card">
    <code>{JSON.stringify($bg)}</code>
    <code>{JSON.stringify($steps)}</code>
  </div>

  <StepList/>

  <BgColor/>

  <Results/>
</main>

<style>
  main {
    max-width: 500px;
    margin: 0 auto;
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .sub {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
</style>
