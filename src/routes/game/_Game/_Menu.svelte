<script>
	import GiTabletopPlayers from 'svelte-icons/gi/GiTabletopPlayers.svelte';
	import GiBlackBook from 'svelte-icons/gi/GiBlackBook.svelte';
	import GiExitDoor from 'svelte-icons/gi/GiExitDoor.svelte';
	import GiSandsOfTime from 'svelte-icons/gi/GiSandsOfTime.svelte';
  import Option from './_Menu/_Option.svelte'
</script>

<div class="menu">
  <Option page="leave" color="hsla(1, 60%, 60%, 1)">
    <GiExitDoor />
  </Option>
  <Option page="help" color="hsla(220, 50%, 60%, 1)">
    <GiBlackBook />
  </Option>
  <Option page="history" color="hsla(35, 90%, 60%, 1)">
    <GiSandsOfTime />
  </Option>
  <Option page="" color="hsla(10, 30%, 40%, 1)">
    <GiTabletopPlayers />
  </Option>
</div>
<div class="bottom-bg" />

<style lang="scss">
	.menu {
		position: relative;
		display: flex;
		justify-content: flex-end;
		background-color: black;
		width: 100%;
		height: 80px;
		left: 0;
	}

	.bottom-bg {
		position: absolute;
		bottom: -100px;
		left: 0;
		width: 100%;
		height: 100px;
		background-color: black;
	}
</style>
