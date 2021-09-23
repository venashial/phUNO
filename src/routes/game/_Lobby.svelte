<script>
	import { players, isHost, code, self } from './_store';
	import Loading from '$lib/components/Loading.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<h2>Invite</h2>
<span class="code">{`${window.location.origin}/game?code=${$code}`}</span>
<button
	class="bg-green"
	on:click={() => {
		navigator.clipboard.writeText(`${window.location.origin}/game?code=${$code}`);
	}}>Copy game link</button
>
<h2 style="m">Players</h2>
<div class="players-list">
	{#each $players as player}
		<div class="player">
			<span> {player.nickname} </span>
			{#if $isHost && player.nickname != $self.nickname}
				<button>Kick</button>
			{/if}
		</div>
	{/each}
</div>

{#if $isHost}
	<button class="bg-yellow" on:click={() => dispatch('start')}>Start game</button>
{:else}
	<span class="dark-block">Wating for host<Loading /></span>
{/if}

<style lang="scss">
	.players-list {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;

		.player {
			display: flex;
			justify-content: space-between;

			button {
				flex: 0;
			}
		}
	}
</style>
