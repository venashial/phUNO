<script>
	import '../app.scss';
  const name = import.meta.env.VITE_NAME || 'phUNO'
</script>

<svelte:head>
  <title>{name}: Online Free Multiplayer UNO</title>
  <meta name="description" content="{name} is a free online opensource multiplayer UNO game. Play UNO with friends! Works well on mobile phones!" />
</svelte:head>

<slot />

<style lang="scss">
</style>
