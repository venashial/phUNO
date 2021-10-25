<script>
	import Card from '$lib/components/Card.svelte';
	import { players, nickname, isHost } from '../_store';
  import { send } from '$lib/utils/api.js'
</script>

<div class="players">
	<div class="hands">
		{#each $players as player}
			{#if player.nickname !== $nickname}
				<div class="hand">
					<div class="nickname">
						{player.nickname}
						{#if $isHost}
							<button on:click={() => send('kick', { target: player.nickname })}>Kick</button>
						{/if}
					</div>
					<div class="count">
						{#each Array(Math.min(player.count, 9)) as _}
							<Card color="black" symbol="" />
						{/each}
						<div class="layered-count">
							{#each Array(player.count > 9 ? 9 : 0) as _}
								<Card color="black" symbol="" />
							{/each}
						</div>
						<div class="layered-count">
							{#each Array(player.count > 18 ? 9 : 0) as _}
								<Card color="black" symbol="" />
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.players {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex: 1;

		.hands {
			display: flex;
			flex-direction: column;
			grid-gap: 1.5rem;

			.hand {
				.nickname {
					margin-bottom: 0.2rem;
          display: flex;
          grid-gap: 0.5rem;

          button {
            flex: 0;
            font-size: 0.8rem;
            padding: 0 0.2rem;
            margin-bottom: 0.4rem;
          }
				}
				.count {
					position: relative;
					margin-left: 0.5rem;
					font-size: 1vw;
					display: flex;
					:global(.card) {
						width: 1.6rem;
            font-size: 0.3rem;
					}
				}

				.layered-count {
					position: absolute;
					top: 0;
					display: flex;
				}
			}
		}
	}
</style>
