<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Overlay from '$lib/components/Overlay.svelte';
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import IconBlock from '$lib/components/IconBlock.svelte';
	import GiCardPlay from 'svelte-icons/gi/GiCardPlay.svelte';
	import GiBlackBook from 'svelte-icons/gi/GiBlackBook.svelte';
	import GiTechnoHeart from 'svelte-icons/gi/GiTechnoHeart.svelte';

	const name = import.meta.env.VITE_NAME || 'phUNO';

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

	<IconBlock text="This is <b>{name}</b>, an online version of the card game UNO."
		><GiCardPlay /></IconBlock
	>

	<IconBlock
		text="Play by your own rules! Try <a href='https://www.spicy-uno.com/#201259522'>Spicy Uno</a> for a refreshing take."
		><GiBlackBook /></IconBlock
	>

	<IconBlock
		text="Want to make {name} better? Contribute to the <a href='https://github.com/venashial/phUNO'>website</a>
		& <a href='https://github.com/venashial/phDOS'>server</a>."><GiTechnoHeart /></IconBlock
	>
  
  <div class="spacer"></div>

	<div class="actions">
		<button class="bg-blue" on:click={join}>Join Game</button>

		<a class="button bg-red" href="game?create" sveltekit:prefetch> Create Game </a>
		{#if recovery.length > 0}
			<a class="button bg-green" href="game?create" sveltekit:prefetch> Rejoin last game </a>
		{/if}
	</div>
</div>

<style lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 600px;
		margin: auto;
		height: calc(100% - 1rem);

    .card-display {
			height: 43vw;
			font-size: 0.8rem;
			max-height: 10rem;
			display: flex;
			padding: 1rem;
			justify-content: center;
			margin: 2rem 0;
		}

    .spacer {
      margin-top: 10rem;
    }

		.actions {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      width: calc(100% - 2rem);
			display: flex;
      flex-direction: column;
			gap: 1rem;
			margin-top: auto;
      font-size: 1.5rem;
		}

		.notes {
			margin-top: 3rem;
			color: hsla(0, 0%, 100%, 0.7);
		}
	}
</style>
