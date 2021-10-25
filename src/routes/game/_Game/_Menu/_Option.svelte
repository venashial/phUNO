<script>
	import { gamePage } from '../../_store.js';

	export let page = '';
	export let color = '';
</script>

<div
	class="option"
	style="background-color: {$gamePage.page === page ? color : 'transparent'}"
	on:click={() => {
		if ($gamePage.page !== page) {
			$gamePage = { page, color };
		} else $gamePage = { page: '', color: '' };
	}}
>
	<div class="icon">
		<slot />
	</div>
</div>

<style lang="scss">
	.option {
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1 / 1;
		height: 100%;
		border-left: 0.1rem solid hsl(0, 0%, 20%);

		&:first-child {
			margin-right: auto;
			border: none;
		}

		.icon {
			height: 70%;
			width: 70%;
		}
	}
</style>
