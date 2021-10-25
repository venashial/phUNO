<script>
	import Hand from './_Game/_Hand.svelte';
	import Piles from './_Game/_Piles.svelte';
	import Players from './_Game/_Players.svelte';
	import Menu from './_Game/_Menu.svelte';
	import { gamePage } from './_store.js';
	import Leave from './_Game/_Page/_Leave.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="game" style="height: {window.innerHeight}px; max-height: {window.innerHeight}px">
	{#if $gamePage.page}
		<div
			class="page"
			style="background-color: {$gamePage.color.replace('1)', '0.6)')}"
			transition:fly={{ y: -1000, duration: 1000 }}
		>
			{#if $gamePage.page === 'leave'}
				<Leave />
			{/if}
		</div>
	{/if}
	<div class="hand-table">
		<div class="table">
			<Players />
			<Piles />
		</div>
		<Hand />
	</div>
	<Menu />
</div>

<style lang="scss">
	.game {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100vw;
		overflow: hidden;
		margin-top: -0.5rem;
		position: relative;

		.page {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			width: calc(100% - 2rem);
			height: calc(100% - 110px);
			display: flex;
			flex-direction: column;
			color: white;
			padding: 1rem;
			backdrop-filter: blur(7px);
		}

		.hand-table {
			display: grid;
			grid-template-columns: 1fr 9rem;
			height: calc(100% - 80px);
			max-height: calc(100% - 80px);

			/*
    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 15rem;
      width: 100vw
    }
    */

			.table {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0.5rem 0;
				max-height: calc(100vh - 5rem);
				grid-gap: 2rem;
			}
		}
	}
</style>
