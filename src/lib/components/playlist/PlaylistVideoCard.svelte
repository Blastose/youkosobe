<script lang="ts">
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import Author from '../video/Author.svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let playlistId: string;
	export let index: number;
	export let videoObject: GetPlaylistsByPlid['videos'][number];
	export let thumbnailSize: 'small' | 'normal' = 'normal';
	$: thumbnail =
		videoObject.videoThumbnails.find((v) => v.quality === 'medium') ??
		videoObject.videoThumbnails.at(0);
	$: href = `/watch?v=${videoObject.videoId}&list=${playlistId}&index=${index}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div
		class="max-w-5xl grid gap-4
		{thumbnailSize === 'small' ? 'grid-cols-[100px_1fr]' : 'grid-cols-[160px_1fr]'}"
	>
		{#if thumbnail}
			<VideoThumbnail {thumbnail} lengthSeconds={videoObject.lengthSeconds} />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<a
					{href}
					class={thumbnailSize === 'small' ? 'font-semibold line-clamp-2' : 'text-lg font-semibold'}
				>
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
