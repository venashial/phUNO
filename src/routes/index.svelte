<script>
	import { goto } from '$app/navigation';

	function join() {
		const code = prompt(
			"Enter the host's code. Alternatively, have the host send you the link to the game."
		);
		if (code) {
			goto(`/game?code=${code}`);
		}
	}
</script>

<div class="index">
	<p>This is phUNO, an online version of the card game UNO.</p>

	<div class="actions">
		<button class="bg-blue" on:click={join}>Join Game</button>

		<a class="bg-red" href="game?create" sveltekit:prefetch> Create Game </a>
	</div>
</div>

<style lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		gap: 1rem;
    
		.actions {
			display: flex;
			gap: 1rem;
			@media screen and (max-width: 400px) {
				flex-direction: column;
			}
		}
	}
</style>
