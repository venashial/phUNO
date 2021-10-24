<script>
	import { page } from '$app/stores';
	import { isHost, code, overlay } from './_store.js';
	import { send } from '$lib/utils/api';
	import { goto } from '$app/navigation';

	let nickname;

	if (!$page.query.get('code') && typeof $page.query.get('create') !== 'string') {
		goto('/');
	}

	const isNewGame = typeof $page.query.get('create') === 'string';
	if (isNewGame) $isHost = true;

	const codeFromQuery = $page.query.get('code');
	if (codeFromQuery) $code = codeFromQuery.toLowerCase();

	async function join() {
		if (!nickname) {
			$overlay = {
				show: true,
        closable: true,
				style: 'warning',
				message: "Sorry, but you can't be nameless. Enter a name."
			};
			return;
		}

		if (!isNewGame) {
			// Join game
			await send('join', {
				code: $code,
				nickname
			});
		}

		if (isNewGame) {
			// Create game
			await send('create', {
				nickname
			});
		}
	}
</script>

<p>What's your name?</p>
<input type="text" bind:value={nickname} placeholder="..." />
<button
	on:click={() => {
		join();
	}}>{isNewGame ? 'Create' : 'Join'} room</button
>
