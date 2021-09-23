<script>
	import { createEventDispatcher } from 'svelte';

	let nickname;

	export let isNewGame = false;

	const dispatch = createEventDispatcher();
</script>

<p>What's your name?</p>
<input type="text" bind:value={nickname} placeholder="..." />
<button
	on:click={() => {
		dispatch('done', { nickname });
	}}>{isNewGame ? 'Create' : 'Join'} room</button
>