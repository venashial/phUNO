<script>
	import { players, isHost, code, nickname } from './_store';
	import Loading from '$lib/components/Loading.svelte';
	import { send } from '$lib/utils/api.js';
</script>

<h2>Invite</h2>
<div class="code">{`${window.location.origin}/game?code=${$code.toUpperCase()}`}</div>
<button
	class="bg-green"
	on:click={() => {
		navigator.clipboard.writeText(`${window.location.origin}/game?code=${$code.toUpperCase()}`);
	}}>Copy game link</button
>
{#if navigator.share}
<button
	class="bg-red"
	on:click={() => {
    navigator.share({
     title: 'UNO Game Invite',
     url: `${window.location.origin}/game?code=${$code.toUpperCase()}`
   })
	}}>Share link</button
>
{/if}

<h2 style="m">Players</h2>
<div class="players-list">
	{#each $players as player}
		<div class="player">
			<span>
        <b>{player.nickname}</b> {player.nickname === $nickname ? '(You)' : ''} {player.isHost ? '(Host)' : ''}
      </span>
			{#if $isHost && player.nickname !== $nickname}
				<button on:click={() => send('kick', { target: player.nickname })}>Kick</button>
			{/if}
		</div>
	{/each}
</div>

{#if $isHost}
	<button
		class="bg-yellow"
		on:click={async () => {
			await send('startGame');
		}}>Start game</button
	>
{:else}
	<span class="dark-block">Wating for host<Loading /></span>
{/if}
<button
class="bg-blue"
style="margin-top: auto; margin-bottom: 2rem;"
on:click={async () => {
  await send('leave');
}}>Leave room</button
>

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

	.code {
		font-family: monospace;
		background-color: hsl(0, 0%, 40%);
		padding: 0.2rem 0.4rem;
		border-radius: 0.2rem;
		border: 0.2rem solid transparent;
		overflow-x: auto;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h2:not(:first-child) {
		margin-top: 1rem;
	}
</style>
