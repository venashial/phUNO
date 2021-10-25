<script>
	import Card from '$lib/components/Card.svelte';
	import { hand, focused } from '../_store.js';
	import { choose } from '$lib/utils/actions.js';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

	let cardsElement;
	let backgroundElement;
	let overlap = 0;

	function convertRemToPixels(rem = 0) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	function fitCards() {
		if (backgroundElement && cardsElement) {
			// get entire height of cards el
			const p = backgroundElement.clientHeight - convertRemToPixels(5);

			// get individual card height
			const a = cardsElement.firstElementChild.offsetHeight;

			// get number of cards
			const c = Object.entries($hand).length;

			if (c * (a + 30) - 30 < p) {
				// The cards won't overflow
				overlap = 30;
			} else {
				overlap = (p - a * c) / (-1 + c);
			}
		}
	}

	$: if (cardsElement && sortedCards && sortedCards.length > 0) {
		setTimeout(() => {
			fitCards();
		}, 100);
	}

	onMount(() => {
		window.addEventListener('resize', fitCards);
	});

	let sortedCards = [];

	$: if ($hand && Object.entries($hand).length !== sortedCards.length) {
		sortedCards = Object.entries($hand).sort((a, b) => {
			if (a[1].color === b[1].color) {
				return parseInt(b[1].symbol) - parseInt(a[1].symbol);
			} else {
				return a[1].color.charCodeAt(0) - b[1].color.charCodeAt(0);
			}
		});
	}
</script>

<div class="hand">
	<div class="hand-bg" on:click={() => choose('hand')} bind:this={backgroundElement} />
	<div class="cards" bind:this={cardsElement} style="">
		{#each sortedCards as [cardIndex, card], index (cardIndex)}
			<div
				style="margin-top: {index !== 0 ? overlap : 0}px;
      "
				animate:flip={{ duration: 500 }}
			>
				<Card
					{...card}
					{cardIndex}
					focused={$focused.location === 'hand' && $focused.cardIndex === cardIndex}
					on:click={() => choose('hand', cardIndex)}
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.hand {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100%;
		height: 100%;
		max-height: 100%;

		.hand-bg {
			background-color: hsla(0, 0%, 0%, 0.4);
			position: absolute;
			width: 100%;
			height: 100%;
		}

		.cards {
			width: 100%;
			height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			padding-right: 1rem;
			pointer-events: none;

			:global(.card) {
				cursor: pointer;
				pointer-events: auto;
			}
		}
	}
</style>
