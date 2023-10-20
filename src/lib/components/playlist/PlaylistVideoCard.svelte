<script lang="ts">
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import Author from '../video/Author.svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let playlistId: string;
	export let index: number;
	export let videoObject: GetPlaylistsByPlid['videos'][number];
	$: thumbnail =
		videoObject.videoThumbnails.find((v) => v.quality === 'medium') ??
		videoObject.videoThumbnails.at(0);
	$: href = `/watch?v=${videoObject.videoId}&list=${playlistId}&index=${index}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div class="max-w-5xl grid grid-cols-[160px_1fr] gap-4">
		{#if thumbnail}
			<VideoThumbnail {thumbnail} lengthSeconds={videoObject.lengthSeconds} />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<a {href} class="text-lg font-semibold">
					{videoObject.title}
				</a>
				<p class="text-sm dark:text-neutral-400">
					<Author
						author={videoObject.author}
						authorUrl={videoObject.authorUrl}
						authorVerified={false}
					/>
				</p>
			</div>
		</div>
	</div>
</ClickableDivWrapper>
