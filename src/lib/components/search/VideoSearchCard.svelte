<script lang="ts">
	import type { VideoObject } from '$lib/invidious/types';
	import { IconBroadcast } from '@tabler/icons-svelte';
	import Author from '../video/Author.svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let videoObject: VideoObject;
	$: thumbnail =
		videoObject.videoThumbnails.find((v) => v.quality === 'medium') ??
		videoObject.videoThumbnails.at(0);
	$: href = `/watch?v=${videoObject.videoId}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div class="max-w-5xl grid grid-cols-[128px_1fr] sm:grid-cols-[246px_1fr] gap-4">
		{#if thumbnail}
			<VideoThumbnail {href} {thumbnail} lengthSeconds={videoObject.lengthSeconds} />
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
						authorVerified={videoObject.authorVerified}
					/>
					{#if videoObject.publishedText === '0 seconds ago' && videoObject.viewCountText === '0 views'}
						<span
							class="flex gap-1 fond-semibold items-center px-1 dark:bg-red-700 text-[var(--dark-text)] rounded-md w-fit"
						>
							<IconBroadcast size={16} />
							Live
						</span>
					{:else}
						{videoObject.viewCountText} • {videoObject.publishedText}
					{/if}
				</p>
			</div>

			<div class="youtube-html line-clamp-2 text-sm dark:text-neutral-400">
				{@html videoObject.descriptionHtml}
			</div>
		</div>
	</div>
</ClickableDivWrapper>
