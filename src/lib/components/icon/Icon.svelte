<script lang="ts" context="module">
	export type IconType = keyof typeof icons;
	const icons = {
		a: {
			box: 24,
			svg: `<path d="M3 10H14V12H3V10M3 6H14V8H3V6M3 14H10V16H3V14M16 13V21L22 17L16 13Z" stroke-width="0" fill="currentColor" />`
		}
	};
</script>

<script lang="ts">
	export let name: IconType;
	export let width: string;
	export let height: string;
	export let hidden: boolean = true;
	let className: string = '';
	export { className as class };

	const icon = icons[name];
</script>

<svg
	fill="none"
	stroke="currentColor"
	stroke-width="1"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden={hidden}
	class={className}
	{width}
	{height}
	viewBox="0 0 {icon.box} {icon.box}"
>
	{@html icon.svg}
</svg>
