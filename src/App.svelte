<script lang="ts">
  import BgColor from './lib/BgColor.svelte'
  import StepList from './lib/StepList.svelte'
  import Results from './lib/Results.svelte'
</script>

<main>
  <h1>Palindrome</h1>
  <div class="sub">Colour Palette Generator</div>

  <BgColor/>

  <StepList/>

  <Results/>
</main>

<style>
  main {
    max-width: 500px;
    margin: 0 auto;
    padding: 3rem 0;
  }
  .sub {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  :global(.card) {
    background-color: #f1f2fe;
    border-radius: 5px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  :global(.grp) {
    margin-bottom: 1rem;
  }
</style>
