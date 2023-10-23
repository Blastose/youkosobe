<script lang="ts">
	import { createInvidious } from '$lib/invidious/utils';
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import InfiniteScrolling from '../layout/InfiniteScrolling.svelte';
	import PlaylistVideoCard from './PlaylistVideoCard.svelte';

	export let playlist: GetPlaylistsByPlid;
	let pageParam = 2;
	let noMoreSearchResults = false;
</script>

<div class="flex flex-col gap-4">
	{#each playlist.videos as video}
		<div class="grid grid-cols-[50px_1fr] items-center gap-4">
			<span class="text-center dark:text-neutral-400">{video.index + 1}</span>
			<PlaylistVideoCard videoObject={video} playlistId={playlist.playlistId} index={video.index} />
		</div>
	{/each}

	<InfiniteScrolling
		bind:results={playlist.videos}
		bind:noMoreSearchResults
		fetchMoreResults={async () => {
			const invidious = await createInvidious();
			const res = await invidious.getPlaylistsByPlid(playlist.playlistId, {
				page: pageParam
			});
			return res.videos;
		}}
		onSuccess={async () => {
			pageParam++;
		}}
	/>
</div>
