<script lang="ts" context="module">
	export type IconType = keyof typeof icons;
	const icons = {
		playlistPlay: {
			box: 24,
			svg: `<path d="M3 10H14V12H3V10M3 6H14V8H3V6M3 14H10V16H3V14M16 13V21L22 17L16 13Z" stroke-width="0" fill="currentColor" />`
		},
		podcast: {
			box: 24,
			svg: `<path d="M17,18.25V21.5H7V18.25C7,16.87 9.24,15.75 12,15.75C14.76,15.75 17,16.87 17,18.25M12,5.5A6.5,6.5 0 0,1 18.5,12C18.5,13.25 18.15,14.42 17.54,15.41L16,14.04C16.32,13.43 16.5,12.73 16.5,12C16.5,9.5 14.5,7.5 12,7.5C9.5,7.5 7.5,9.5 7.5,12C7.5,12.73 7.68,13.43 8,14.04L6.46,15.41C5.85,14.42 5.5,13.25 5.5,12A6.5,6.5 0 0,1 12,5.5M12,1.5A10.5,10.5 0 0,1 22.5,12C22.5,14.28 21.77,16.39 20.54,18.11L19.04,16.76C19.96,15.4 20.5,13.76 20.5,12A8.5,8.5 0 0,0 12,3.5A8.5,8.5 0 0,0 3.5,12C3.5,13.76 4.04,15.4 4.96,16.76L3.46,18.11C2.23,16.39 1.5,14.28 1.5,12A10.5,10.5 0 0,1 12,1.5M12,9.5A2.5,2.5 0 0,1 14.5,12A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5Z" stroke-width="0" fill="currentColor" />`
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
