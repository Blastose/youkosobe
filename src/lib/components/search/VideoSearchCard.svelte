<script lang="ts">
	import type { VideoObject } from '$lib/invidious/types';
	import Author from '../video/Author.svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let videoObject: VideoObject;
	$: thumbnail =
		videoObject.videoThumbnails.find((v) => v.quality === 'medium') ??
		videoObject.videoThumbnails.at(0);
</script>

<ClickableDivWrapper href="/watch?v={videoObject.videoId}" fit={true}>
	<div class="max-w-5xl grid grid-cols-[128px_1fr] sm:grid-cols-[246px_1fr] gap-4">
		{#if thumbnail}
			<VideoThumbnail {thumbnail} lengthSeconds={videoObject.lengthSeconds} />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<a href="/watch?v={videoObject.videoId}" class="text-lg font-semibold">
					{videoObject.title}
				</a>
				<p class="text-sm dark:text-neutral-400">
					<Author
						author={videoObject.author}
						authorUrl={videoObject.authorUrl}
						authorVerified={videoObject.authorVerified}
					/>
					{videoObject.viewCountText} views • {videoObject.publishedText}
				</p>
			</div>

			<div class="youtube-html line-clamp-2 text-sm dark:text-neutral-400">
				{@html videoObject.descriptionHtml}
			</div>
		</div>
	</div>
</ClickableDivWrapper>
