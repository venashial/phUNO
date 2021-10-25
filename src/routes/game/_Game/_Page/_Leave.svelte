<script>
	import { send } from '$lib/utils/api.js';
</script>

<div>
	Are you sure you want to leave?

	<button class="bg-yellow" on:click={() => send('leave')}> Leave game </button>
</div>

<style>
	button {
		margin-top: 1rem;
		width: 100%;
	}
</style>
