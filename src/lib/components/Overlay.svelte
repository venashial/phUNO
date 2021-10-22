<script>
	import { createEventDispatcher } from 'svelte';
	export let style = 'warning';
	export let message = '';

	const dispatch = createEventDispatcher();
</script>

<div class="wrapper">
	<div class="card {style}">
		<button
			on:click={() => {
				dispatch('close');
			}}>✕</button
		>
		<h1>{style === 'warning' ? '⚠️' : ''}{style === 'error' ? '🚷' : ''}</h1>
		<p>{message}</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		background-color: hsla(0, 0%, 0%, 0.2);
		backdrop-filter: blur(4px);

		.card {
			width: 70vw;
			position: relative;
			margin-top: -20vh;
			color: black;
			padding: 6vw 6.5vw;
			border-radius: 1rem;
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

			&.warning {
				background-color: hsl(45, 100%, 80%);
			}

			&.error {
				background-color: hsl(7, 100%, 80%);
			}

			h1 {
				text-align: center;
				margin-bottom: 1rem;
				font-size: 5rem;
			}

			button {
				position: absolute;
				top: -1.5rem;
				right: -1.5rem;
				width: 4rem;
				height: 4rem;
				font-size: 2rem;
				line-height: 2rem;
				background-color: hsl(1, 50%, 50%);
				border: 0.3rem solid hsl(1, 50%, 30%);
				border-radius: 100%;
				color: #fff;
				font-weight: bold;
				box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
			}
		}
	}
</style>
