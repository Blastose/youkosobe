<script lang="ts">
	import Icon from '../icon/Icon.svelte';

	export let type: 'playlist' | 'podcast';
	export let playlistThumbnail: string;
	export let videoCount: number;
	export let href: string;
</script>

<div class="relative w-full h-fit overflow-hidden">
	<a {href}>
		<img
			class="rounded-lg w-full hover:scale-105 duration-200"
			src={playlistThumbnail}
			alt=""
			loading="lazy"
		/>
	</a>
	<span
		class="absolute left-0 bottom-0 flex items-center justify-between w-full bg-black bg-opacity-80 py-1 px-2 text-xs font-semibold"
	>
		{#if type === 'playlist'}
			<Icon height={'24'} width={'24'} name="playlistPlay" />
			<span>{videoCount} videos</span>
		{:else if type === 'podcast'}
			<Icon height={'24'} width={'24'} name="podcast" />
			<span>{videoCount} episodes</span>
		{/if}
	</span>
</div>
