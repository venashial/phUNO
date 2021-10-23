<script>
	import Hand from './_Game/_Hand.svelte';
	import Piles from './_Game/_Piles.svelte';
  import Players from './_Game/_Players.svelte';
  import { send } from '$lib/utils/api.js'
</script>

<div class="game">
	<div class="table">
    <button on:click={() => send('leave')}>leave</button>
    <Players />
		<Piles />
	</div>
	<Hand />
</div>

<style lang="scss">
	.game {
    flex: unset !important;
		display: grid;
		grid-template-columns: 1fr 35vw;
		height: 100%;
		width: calc(100% + 1rem);
		margin-top: -0.5rem;

    .table {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem 0;
      max-height: calc(100vh - 5rem);
      grid-gap: 2rem;
    }

		:global(.card) {
			width: calc(33vw - 2.5rem);
		}
	}
</style>
