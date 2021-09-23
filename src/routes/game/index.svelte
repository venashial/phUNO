<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { send } from '$lib/utils/api';
	import { players, isHost, self, code } from './_store.js';
	import Profile from './_Profile.svelte';
	import Lobby from './_Lobby.svelte';
	import Game from './_Game.svelte';

	let state = 'game'; //'profile';

	const isNewGame = typeof $page.query.get('create') === 'string';
	if (isNewGame) $isHost = true;

	const codeFromQuery = $page.query.get('code');
	if (codeFromQuery) $code = codeFromQuery;

	async function join(event) {
		const nickname = event.detail.nickname;
		if (!nickname) {
			alert("Sorry, but you can't be nameless. Enter a name.");
			return;
		}

		if (!isNewGame) {
			// Join game
			const response = await send(
				'/join',
				{
					code: $code,
					nickname
				},
				true
			);

			if (response.error) {
				alert(response.error);
				return;
			}
		}

		if (isNewGame) {
			// Create game
			const response = await send(
				'/create',
				{
					nickname
				},
				true
			);

			if (response.error) {
				alert(response.error);
				return;
			}
		}

		send('/requestUpdate');

		$players.push({ nickname, count: 0 });
		$self.nickname = nickname;

		state = 'lobby';
	}

	function startGame() {
    state = 'game';
  }

	const flyIn = { x: 400, duration: 500 };
	const flyOut = { x: -400, duration: 500 };
</script>

<div class="game">
	{#if state === 'profile'}
		<div in:fly={flyIn} out:fly={flyOut}><Profile on:done={join} {isNewGame} /></div>
	{:else if state === 'lobby'}
		<div in:fly={flyIn} out:fly={flyOut}><Lobby on:start={startGame} /></div>
	{:else if state === 'game'}
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
			@media screen and (max-width: 600px) {
				min-width: calc(100vw - 1rem);
			}
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
