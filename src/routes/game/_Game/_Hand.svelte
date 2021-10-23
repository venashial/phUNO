<script>
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
  import { hand, focused } from '../_store.js'
  import { choose } from '$lib/utils/actions.js'

	let handEl;

	function checkOverflow(el) {
		const curOverflow = el.style.overflow;

		if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

		const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

		el.style.overflow = curOverflow;

		return isOverflowing;
	}

	function fitCards() {
		if (checkOverflow(handEl)) {
			for (let i = 2; i < handEl.children.length; i++) {
				const card = handEl.children[i];
				card.style.marginTop = (parseInt(card.style.marginTop) || 0) - 1.5 + 'px';
			}

			requestAnimationFrame(fitCards);
		}
	}
  
	onMount(() => {
		handEl = document.getElementsByClassName('hand')[0];
		requestAnimationFrame(fitCards);
	});
</script>

<div class="hand">
  <div class="hand-bg" on:click={() => choose('hand')}></div>
	{#each Object.entries($hand) as [cardIndex, card] (cardIndex)}
    <Card {...card} focused={$focused.location === 'hand' && $focused.cardIndex === cardIndex} on:click={() => choose('hand', cardIndex)} />
  {/each}
</div>

<style lang="scss">
	.hand {
		padding: 0.5rem 1rem 0.5rem 0.5rem;
		overflow-y: hidden;
    overflow-x: auto;
		font-size: 3vw;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
    position: relative;

    .hand-bg {
      background-color: hsla(0, 0%, 0%, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }

    :global(.card) {
      cursor: pointer;
    }
	}
</style>
