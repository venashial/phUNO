<script>
	import Card from '$lib/components/Card.svelte';
	import { discard, focused } from '../_store.js';
	import { choose } from '$lib/utils/actions.js';
	import { send, receive } from '$lib/utils/crossfade.js';

  let shownDiscard = []

  $: if ($discard) {
    const entries = Object.entries($discard).reverse()
    shownDiscard = entries.length > 6 ? entries.slice(entries.length - 5, entries.length) : entries
  }
</script>

<div class="piles">
	<div on:click={() => choose('draw')}>
		{#each [0, 0, 0, 0] as _, index}
			<div>
				<Card
					color="black"
					symbol=""
					floatLeft={false}
					focused={$focused.location === 'draw' && index === 3}
				/>
			</div>
		{/each}
	</div>
	<div on:click={() => choose('discard')}>
		<div><Card color="" symbol="" style="silhouette" /></div>
		{#each shownDiscard as [cardIndex, card], index (cardIndex)}
			<div in:receive={{ key: cardIndex }} out:send={{ key: cardIndex }} >
				<Card
					{...card}
					floatLeft={false}
					focused={$focused.location === 'discard' && index === shownDiscard.length - 1}
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.piles {
		display: flex;
		justify-content: center;
    grid-gap: max(4vw, 1rem);
    padding-bottom: 1rem;

		> div {
			display: grid;

			> div {
				grid-area: 1/1/2/2;
			}
		}
	}
</style>
