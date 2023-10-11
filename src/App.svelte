<script lang="ts">
  import StepList from './components/StepList.svelte'
  import HueList from './components/HueList.svelte'
  import Palette from './components/Palette.svelte'
</script>

<div>
  <h1>Palindrome</h1>
  <div class="sub">Colour Palette Generator</div>
</div>
<main>
  <div>
    <StepList/>

    <HueList/>
  </div>

  <div>
    <Palette/>
  </div>
</main>

<style>
  .sub {
    text-transform: uppercase;
    margin-bottom: 2rem;
    font-weight: 600;
  }
  main {
    display: flex;
    gap: 2.4rem;
  }
  main > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
</style>
