<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let color = '';
	export let symbol = '';
	export let image = '';
	export let focused = false;
	let animationSpeed = 1;

	let displayColor = [
		'hsl(10, 100%, 41%)',
		'hsl(53, 99%, 47%)',
		'hsl(101, 79%, 33%)',
		'hsl(208, 100%, 35%)',
		'hsl(0, 0%, 10%)'
	][['red', 'yellow', 'green', 'blue', 'black'].indexOf(color)];

	let text = typeof symbol === 'number' || typeof symbol === 'string';

	let display = image ? `<img src="${image}">` : symbol;

	setTimeout(() => {
		animationSpeed = 0.3;
	}, 1000);
</script>

<div
	class="card"
	style="transform: rotate({focused ? 364 : Math.random() * 2 + 359}deg) translate({focused
		? -20
		: Math.random() * 10 - 5}px, {focused
		? -20
		: Math.random() * 10 - 5}px); transition: transform {animationSpeed}s ease-in-out;"
	on:click={() => dispatch('click')}
>
	<div class="inner" style="background-color: {displayColor}" class:focused>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			fill-rule="evenodd"
			stroke-linejoin="round"
			stroke-miterlimit="2"
			clip-rule="evenodd"
			viewBox="0 0 159 252"
		>
			<path fill="none" d="M0 0h158v252H0z" />
			<clipPath id="a">
				<path d="M0 0h158v252H0z" />
			</clipPath>
			<g clip-path="url(#a)">
				<g transform="matrix(1.81291 1.04669 -.96017 1.66307 96 -137)">
					<ellipse cx="56" cy="123" fill="none" rx="31" ry="63" />
					<clipPath id="b">
						<ellipse cx="56" cy="123" rx="31" ry="63" />
					</clipPath>
					<g clip-path="url(#b)">
						<use
							xlink:href="#c"
							width="955"
							height="859"
							transform="matrix(.06862 -.04319 .03962 .0748 6 111)"
						/>
					</g>
					<path
						fill="#fff"
						d="M56 60c17 0 31 28 31 63s-14 63-31 63-31-28-31-63 14-63 31-63Zm0 3c6 0 11 5 16 11 7 11 12 29 12 49s-5 38-12 49c-5 6-10 11-16 11s-11-5-16-11c-7-11-12-29-12-49s5-38 12-49c5-6 10-11 16-11Z"
					/>
				</g>
			</g>
		</svg>
		<div class="center" class:text>{@html display}</div>
		<div class="tiny top" class:text>{@html display}</div>
		<div class="tiny bottom" class:text>{@html display}</div>
	</div>
</div>

<style lang="scss">
	.card {
		--border: 0.4em;
		display: flex;
		border-radius: calc(var(--border) * 1.4);
		background-color: hsl(0, 0%, 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 2.2 / 3.5;
		transition: transform 1s ease-in-out;

		.inner {
			border: var(--border) solid hsl(0, 0%, 100%);
			box-shadow: 0 -0.2em 0.5em hsla(0, 0%, 0%, 0.4);
			border-radius: calc(var(--border) * 1.4);
			position: relative;
			border-radius: calc(var(--border) / 1.2);
			flex: 1;
			height: 100%;
			font-weight: bold;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: border 0.5s ease-in-out;

			&.focused {
       animation: 1.5s ease-in-out infinite pulse;
			}

			@keyframes pulse {
				from {
					border-color: hsl(0, 0%, 100%);
				}

				50% {
					border-color: hsl(0, 0%, 40%);
				}

				to {
					border-color: hsl(0, 0%, 100%);
				}
			}

			svg {
				width: 100%;
				transform: scale(1.02) translateX(0.05em);
			}

			.tiny {
				position: absolute;
				text-shadow: -0.06em 0.06em black;
				-webkit-text-stroke: 0.04em black;

				&.top {
					top: 0;
					left: 0;
				}

				&.bottom {
					bottom: 0;
					right: 0;
				}

				&.text {
					padding: 0.1em 0.4em;
					font-size: 2em;
				}
			}

			.center {
				position: absolute;
				font-size: 5em;
				text-shadow: -0.05em 0.05em black;
				-webkit-text-stroke: 0.03em black;
				font-weight: 600;
			}
		}
	}
</style>
