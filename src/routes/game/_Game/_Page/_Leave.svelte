<script>
	import { send } from '$lib/utils/api.js';
</script>

<h3>Are you sure you want to leave?</h3>

<button class="bg-white" on:click={() => send('leave')}> Leave game </button>
