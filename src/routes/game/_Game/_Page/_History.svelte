<script>
	import { log } from '../../_store.js';
	import fuzzyTime from '$lib/utils/fuzzyTime.js';
	import { onMount } from 'svelte';
import { space } from 'svelte/internal';

	let now = new Date();
	let listDiv;

	onMount(() => {
    listDiv.scrollIntoView(false);

		setInterval(() => {
			now = new Date();
		}, 3000 + Math.random() * 3000);
	});
</script>

<h1>History</h1>

<div bind:this={listDiv}>
	{#each $log as logItem (logItem.time)}
		<div>
			<span>{fuzzyTime(now, logItem.time)}</span>
			<div>{logItem.message}</div>
		</div>
	{/each}
</div>