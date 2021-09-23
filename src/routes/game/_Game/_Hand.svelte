<script>
	import Card from '$lib/components/Card.svelte';

	import { onMount } from 'svelte';

  import { self } from '../_store.js'

  let focusedCard = -1

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
  <div class="hand-bg"></div>
	{#each $self.hand as card, index}
    <Card {...card} focused={index === focusedCard} on:click={() => { focusedCard = focusedCard !== index ? index : -1 }} />
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
