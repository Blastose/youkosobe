<script lang="ts">
	import type { PlaylistObject } from '$lib/invidious/types';
	import ClickableDivWrapper from './ClickableDivWrapper.svelte';
	import PlaylistThumbnail from './PlaylistThumbnail.svelte';

	export let playlistObject: PlaylistObject;
	export let type: 'playlist' | 'podcast';

	$: playlistThumbnail = playlistObject.playlistThumbnail;
	$: firstVideoOfPlaylistId = playlistObject.videos.at(0)?.videoId;
	$: playlistUrl = `/playlist?list=${playlistObject.playlistId}`;
</script>

<ClickableDivWrapper href={playlistUrl}>
	<div class="flex flex-col gap-1">
		<PlaylistThumbnail
			href={playlistUrl}
			{playlistThumbnail}
			{type}
			videoCount={playlistObject.videoCount}
		/>

		<div class="flex flex-col gap-2">
			<a
				title={playlistObject.title}
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
</ClickableDivWrapper>
