<script lang="ts">
	import type { PlaylistObject } from '$lib/invidious/types';
	import Author from '../video/Author.svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import PlaylistThumbnail from '../video/PlaylistThumbnail.svelte';
	import { formatTime } from '../video/utils';

	export let playlistObject: PlaylistObject;

	$: playlistThumbnail = playlistObject.playlistThumbnail;
	$: playlistUrl = `/playlist?list=${playlistObject.playlistId}`;
</script>

<ClickableDivWrapper href={playlistUrl} fit={true}>
	<div class="grid grid-cols-[128px_1fr] sm:grid-cols-[246px_1fr] gap-4">
		<PlaylistThumbnail {playlistThumbnail} type="playlist" videoCount={playlistObject.videoCount} />

		<div class="flex flex-col gap-2">
			<div>
				<a href={playlistUrl} class="text-lg font-semibold">
					{playlistObject.title}
				</a>
				<p class="text-sm dark:text-neutral-400">
					<Author
						author={playlistObject.author}
						authorUrl={playlistObject.authorUrl}
						authorVerified={playlistObject.authorVerified}
					/>
				</p>
			</div>

			<div class="text-sm flex flex-col gap-4">
				<div class="line-clamp-2">
					{#each playlistObject.videos as video, index}
						<a
							class="block"
							href="/watch?v={video.videoId}&list=${playlistObject.playlistId}&index={index}"
						>
							{video.title} •
							{formatTime(video.lengthSeconds)}
						</a>
					{/each}
				</div>
				<a href={playlistUrl}>VIEW FULL PLAYLIST</a>
			</div>
		</div>
	</div>
</ClickableDivWrapper>
