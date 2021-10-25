<script>
	import { fly } from 'svelte/transition';
	import { send } from '$lib/utils/api';
	import '$lib/utils/api';
	import { state, overlay, code } from './_store.js';
	import Profile from './_Profile.svelte';
	import Lobby from './_Lobby.svelte';
	import Game from './_Game.svelte';
	import { onMount } from 'svelte';
	import Overlay from '$lib/components/Overlay.svelte';

	onMount(() => {
		send('register', {
			recovery: localStorage.getItem('recovery')
		});
	});

	$: {
		$state;
		if ($state === 'lobby') window.history.replaceState(null, null, `?code=${$code.toUpperCase()}`);
	}

	const flyIn = { x: 400, duration: 500 };
	const flyOut = { x: -400, duration: 500 };
</script>

{#if $overlay.show}
	<Overlay
		style={$overlay.style}
		message={$overlay.message}
		closable={$overlay.closable}
		on:close={() => {
			$overlay.show = false;
		}}
	/>
{/if}

<div class="game">
	{#if $state === 'profile'}
		<div in:fly={flyIn} out:fly={flyOut}><Profile /></div>
	{:else if $state === 'lobby'}
		<div in:fly={flyIn} out:fly={flyOut}><Lobby /></div>
	{:else if $state === 'game'}
		<div in:fly={flyIn} out:fly={flyOut}><Game /></div>
	{/if}
</div>

<style lang="scss">
	.game {
		display: grid;
		height: 100%;

		> div {
			grid-area: 1/1/2/2;
			min-width: 40vw;
			min-width: 100vw;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			> :global(*:not(.game)) {
				flex: 0.04 1;
			}
		}
	}
</style>
