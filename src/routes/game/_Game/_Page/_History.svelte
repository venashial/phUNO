<script>
	import { log } from '../../_store.js';
	import fuzzyTime from '$lib/utils/fuzzyTime.js';
	import { onMount } from 'svelte';

	let now = new Date();
	let tableDiv;

	onMount(() => {
		setInterval(() => {
			now = new Date();
		}, 3000 + Math.random() * 3000);

    tableDiv.scrollIntoView({ behavior: 'smooth', block: 'end' })
	});
</script>

<div class="table" bind:this={tableDiv}>
	<div><h1>History</h1></div>

	{#each $log as logItem, index (logItem.time)}
		<div>
			<div>{logItem.message}</div>
			<div class="time">{fuzzyTime(now, logItem.time)}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.table {
		position: relative;
		padding: 1rem 0 2rem 2rem;
		display: flex;
		flex-direction: column;
		grid-gap: 3rem;

		&:before {
			content: '';
			position: absolute;
			top: 1rem;
			left: 0.4rem;
			width: 0.3rem;
			height: calc(100% - 1rem);
			background-color: hsla(0, 0%, 100%, 0.5);
			border-radius: 0.3rem;
		}

		> div {
			position: relative;
			&:not(:first-child) {
				& {
					padding: 0.4rem 0.5rem;
					background-color: hsla(0, 0%, 100%, 0.2);
					border-radius: 0.5rem;
				}

				.time {
					position: absolute;
          font-size: 1rem;
					bottom: -1.4rem;
					left: 0;
					width: 100%;
					text-align: end;
				}

				&:before {
					content: '';
					position: absolute;
					top: 0rem;
					left: -2.5rem;
					width: 2rem;
					height: 2rem;
					background-color: hsla(0, 0%, 100%, 1);
					border-radius: 100%;
				}
			}
		}
	}
</style>
