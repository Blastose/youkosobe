<script lang="ts">
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import PlaylistVideoCard from './PlaylistVideoCard.svelte';

	export let playlist: GetPlaylistsByPlid;
</script>

<div class="flex flex-col gap-4">
	{#each playlist.videos as video}
		<div class="grid grid-cols-[50px_1fr] items-center gap-4">
			<span class="text-center dark:text-neutral-400">{video.index}</span>
			<PlaylistVideoCard videoObject={video} playlistId={playlist.playlistId} index={video.index} />
		</div>
	{/each}
</div>
