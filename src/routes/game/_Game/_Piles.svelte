<script>
	import Card from '$lib/components/Card.svelte';
	import { discard, focused } from '../_store.js';
	import { choose } from '$lib/utils/actions.js';

  $discard:  ($discard) => { if ($discard) console.log(Object.entries($discard)) }
</script>

<div class="piles">
	<div on:click={() => choose('draw')}>
		{#each [0, 0, 0, 0] as _, index}
			<Card color="black" symbol="" floatLeft={false} focused={$focused.location === 'draw' && index === 3} />
		{/each}
	</div>
	<div on:click={() => choose('discard')}>
    <Card color="" symbol="" style="silhouette" />
		{#each Object.entries($discard).reverse() as [cardIndex, card], index (cardIndex)}
			<Card {...card} floatLeft={false} focused={$focused.location === 'discard' && index === Object.keys($discard).length - 1} />
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
