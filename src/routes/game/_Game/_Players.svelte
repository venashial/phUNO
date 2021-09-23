<script>
	import Card from '$lib/components/Card.svelte';
	import { players, self } from '../_store';
</script>

<div class="players">
	<div class="hands">
		{#each $players as player}
			{#if player.nickname !== $self.nickname}
				<div class="hand">
					<div class="nickname">
						{player.nickname}
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
				}
				.count {
					position: relative;
					margin-left: 0.5rem;
					font-size: 1vw;
					display: flex;
					:global(.card) {
						width: 6vw;
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
