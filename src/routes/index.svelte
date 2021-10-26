<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Overlay from '$lib/components/Overlay.svelte';
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

  const name = import.meta.env.VITE_NAME || 'phUNO'

	function join() {
		const code = prompt(
			"Enter the host's code. Alternatively, have the host send you the link to the game."
		);
		if (code) {
			goto(`/game?code=${code.toUpperCase()}`);
		}
	}

	let colors = [
		'green',
		'red',
		'yellow',
		'blue',
		'green',
		'red',
		'yellow',
		'blue',
		'green',
		'yellow'
	];

	let numbers = [1, 2, 3];

	let recovery = '';

	onMount(() => {
		recovery = localStorage.getItem('recovery') || '';

		setInterval(() => {
			numbers.forEach((number, index) => {
				numbers[index] = number + 1;
				if (numbers[index] > 9) {
					numbers[index] = 1;
				}
			});
		}, 2300);
	});
</script>

<div class="index">
	{#if $page.query.get('message')}
		<Overlay message={$page.query.get('message')} style="error" on:close={() => goto('/')} />
	{/if}

	<div class="card-display">
		{#each numbers as number (number)}
			<div animate:flip>
				<Card color={colors[number]} symbol={number.toString()} cardIndex={number + ''} />
			</div>
		{/each}
	</div>

	<p>This is <b>{name}</b>, an online version of the card game UNO.</p>

	<div class="actions">
		<button class="bg-blue" on:click={join}>Join Game</button>

		<a class="button bg-red" href="game?create" sveltekit:prefetch> Create Game </a>
	</div>
	{#if recovery.length > 0}
		<a class="button bg-green" href="game?create" sveltekit:prefetch> Rejoin last game </a>
	{/if}

	<p class="notes">
		Use a phone to play for the best experience. Rules are not included, but I reccommend <a
			href="https://www.spicy-uno.com/#201259522">Spicy Uno</a
		>. View the source code on GitHub for the
		<a href="https://github.com/venashial/phUNO">website</a>
		& <a href="https://github.com/venashial/phDOS">server</a>.
	</p>
</div>

<style lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 600px;
		margin: auto;
		.actions {
			display: flex;
			gap: 1rem;
			@media screen and (max-width: 400px) {
				flex-direction: column;
			}
		}

		.card-display {
			height: 43vw;
			font-size: 0.8rem;
			max-height: 10rem;
			display: flex;
			padding: 1rem;
			justify-content: center;
			margin-bottom: 2rem;
		}

		.notes {
			margin-top: 3rem;
			color: hsla(0, 0%, 100%, 0.7);
		}
	}
</style>
