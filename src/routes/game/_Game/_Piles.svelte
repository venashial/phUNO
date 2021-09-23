<script>
	import Card from '$lib/components/Card.svelte';
  import { discard } from '../_store.js'
</script>

<div class="piles">
	<div class="discard">
		{#each [0,0,0,0] as _}
			<Card color="black" symbol="" />
		{/each}
	</div>
	<div class="discard">
		{#each $discard as card}
			<Card {...card} />
		{/each}
	</div>
</div>

<style lang="scss">
	.piles {
		display: flex;
		font-size: 3vw;
    justify-content: space-around;

		> div {
			display: grid;

			> :global(.card) {
				grid-area: 1/1/2/2;
			}
		}
	}
</style>
