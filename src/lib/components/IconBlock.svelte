<script>
  export let text = ''
</script>

<div class="block">
  <slot />
  <p>{@html text}</p>
</div>

<style lang="scss">
  .block {
    border-radius: 0.5rem;
    background-color: hsla(0,0%,0%,0.3);
    border: 0.35rem solid hsla(0,0%,0%,0.3);
    padding: 1rem 1.2rem;
    display: flex;
    grid-gap: 0.8rem;
    align-items: center;
    
    :global(svg) {
      height: 4rem;
      width: auto;
    }
  }
</style>