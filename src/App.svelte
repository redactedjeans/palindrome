<script lang="ts">
  import StepList from './lib/StepList.svelte'
  import HueList from './lib/HueList.svelte'
  import Palette from './lib/Palette.svelte'
</script>

<main>
  <div>
    <h1>Palindrome</h1>
    <div class="sub">Colour Palette Generator</div>
  </div>

  <StepList/>

  <HueList/>

  <Palette/>
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
