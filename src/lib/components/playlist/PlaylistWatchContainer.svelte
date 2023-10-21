<script lang="ts">
	import { page } from '$app/stores';
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import PlaylistVideoCard from './PlaylistVideoCard.svelte';

	export let playlist: GetPlaylistsByPlid;

	let open = true;

	$: playlistIndex = $page.url.searchParams.get('index');

	function scrollToVideo(container: HTMLDivElement) {
		const vids = container.querySelectorAll<HTMLDivElement>('div[data-index]');
		for (const v of vids) {
			if (v.dataset.index === playlistIndex) {
				v.scrollIntoView();
				break;
			}
		}
	}
</script>

<div class="flex flex-col border border-[#696969] rounded-xl">
	<div class="py-3 px-4 dark:bg-neutral-800 flex flex-col rounded-t-xl gap-2">
		<a href="/playlist?list={playlist.playlistId}" class="text-xl font-semibold">{playlist.title}</a
		>
		<p class="text-sm dark:text-neutral-400">
			<a href="/channel/{playlist.authorId}">{playlist.author}</a>
			-
			{Number(playlistIndex) + 1} / {playlist.videoCount}
		</p>
	</div>

	<div use:scrollToVideo class="flex flex-col overflow-y-scroll max-h-96">
		{#each playlist.videos as video}
			<div
				data-index={video.index}
				class="py-2
      {Number(playlistIndex) === video.index
					? 'dark:bg-neutral-700'
					: 'dark:hover:bg-neutral-700  '}
      grid grid-cols-[30px_1fr] pr-4 items-center"
			>
				<span class="text-center text-xs dark:text-neutral-400">{video.index + 1}</span>
				<PlaylistVideoCard
					videoObject={video}
					playlistId={playlist.playlistId}
					index={video.index}
					thumbnailSize={'small'}
				/>
			</div>
		{/each}
	</div>
</div>
