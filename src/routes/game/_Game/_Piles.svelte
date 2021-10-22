<script>
	import Card from '$lib/components/Card.svelte';
	import { discard, focused } from '../_store.js';
	import { choose } from '$lib/utils/actions.js';
</script>

<div class="piles">
	<div on:click={() => {}}>
		{#each [0, 0, 0, 0] as _, index}
			<Card color="black" symbol="" on:click={() => choose('draw')} floatLeft={false} focused={$focused.location === 'draw' && index === 3} />
		{/each}
	</div>
	<div>
		{#each $discard as card, index}
			<Card {...card} on:click={() => choose('discard')} floatLeft={false} focused={$focused.location === 'discard' && index === $discard.length - 1} />
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
