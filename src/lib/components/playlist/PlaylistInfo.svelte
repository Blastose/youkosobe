<script lang="ts">
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import { IconPlayerPlay } from '@tabler/icons-svelte';
	import { relativeTime } from '../layout/utils';

	export let playlist: GetPlaylistsByPlid;

	$: playlistWatchUrl = `/watch?v=${playlist.videos.at(0)?.videoId}&list=${playlist.playlistId}`;
</script>

<div
	class="text-white rounded-3xl overflow-hidden bg bg-no-repeat bg-cover"
	style="background-image: url({playlist.playlistThumbnail});"
>
	<div
		class="backdrop-blur-3xl bg-black bg-opacity-40
    p-4 grid grid-rows-[min-content_1fr] sm:grid-rows-none sm:grid-cols-2
    lg:grid-cols-none lg:grid-rows-[min-content_1fr] gap-2 sm:gap-4"
	>
		<div class="group relative flex justify-center w-full h-full">
			<a
				href={playlistWatchUrl}
				class="duration-200 group-hover:opacity-90 opacity-0 flex absolute h-full w-full rounded-3xl items-center justify-center bg-black"
			>
				<IconPlayerPlay />
				Play all
			</a>
			<img class="w-full max-w-sm rounded-3xl" src={playlist.playlistThumbnail} alt="" />
		</div>

		<div class="flex flex-col gap-4">
			<h2 class="text-lg font-bold">{playlist.title}</h2>
			<div>
				<a href="/channel/{playlist.authorId}" class="font-semibold">{playlist.author}</a>
				<p class="text-sm flex flex-wrap gap-2">
					<span>{playlist.videoCount} videos</span>
					<span>{playlist.viewCount.toLocaleString()} views</span>
					<span>Updated {relativeTime(new Date(), playlist.updated)}</span>
				</p>
			</div>

			<a
				class="w-full rounded-3xl font-semibold p-2
        dark:text-black dark:bg-white dark:hover:bg-neutral-300
         flex items-center justify-center gap-2"
				href={playlistWatchUrl}
			>
				<IconPlayerPlay />
				Play all
			</a>

			{#if playlist.description}
				<div>
					{playlist.description}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.bg {
		background-position: 20% 20%;
	}
</style>
