<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PlaylistObject } from '$lib/invidious/types';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let playlistObject: PlaylistObject;
	export let type: 'playlist' | 'podcast';

	$: playlistThumbnail = playlistObject.playlistThumbnail;
	$: firstVideoOfPlaylistId = playlistObject.videos.at(0)?.videoId;
	$: playlistUrl = `/playlist?list=${playlistObject.playlistId}`;
</script>

<div
	on:click={() => {
		goto(playlistUrl);
	}}
	on:keydown={(e) => {
		if (e.key !== 'Enter' || e.currentTarget !== e.target) return;

		e.preventDefault();
		goto(playlistUrl);
	}}
	role="link"
	tabindex="0"
	class="flex flex-col gap-1 cursor-pointer"
>
	<div class="relative w-full overflow-hidden">
		<img
			class="rounded-lg w-full hover:scale-105 duration-200"
			src={playlistThumbnail}
			alt=""
			loading="lazy"
		/>
		<span
			class="absolute left-0 bottom-0 flex items-center justify-between w-full bg-black bg-opacity-80 py-1 px-2 text-xs font-semibold"
		>
			{#if type === 'playlist'}
				<Icon height={'24'} width={'24'} name="playlistPlay" />
				<span>{playlistObject.videoCount} videos</span>
			{:else if type === 'podcast'}
				<Icon height={'24'} width={'24'} name="podcast" />
				<span>{playlistObject.videoCount} episodes</span>
			{/if}
		</span>
	</div>

	<div class="flex flex-col gap-2">
		<a
			href={firstVideoOfPlaylistId
				? `/watch?v=${firstVideoOfPlaylistId}&list=${playlistObject.playlistId}`
				: playlistUrl}
			class="line-clamp-2">{playlistObject.title}</a
		>
		<a href={playlistUrl} class="flex flex-col text-sm dark:text-neutral-400">
			{#if type === 'playlist'}
				View full playlist
			{:else if type === 'podcast'}
				View full podcast
			{/if}
		</a>
	</div>
</div>
