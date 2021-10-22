<script>
	import '../app.scss';
  import 'typeface-work-sans';
  import { onMount } from 'svelte';
</script>

<slot />

<style lang="scss">
	:global(html), :global(#svelte) {
		height: 100%;
	}

	:global(body) {
    height: 100%;
		margin: 0;
		padding: 0.5rem;
		font-size: 16px;
		background-color: hsl(220, 10%, 20%);
		font-family: 'Work Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		overflow: hidden;

		@media screen and (max-width: 600px) {
			font-size: 20px;
		}
	}  
</style>
