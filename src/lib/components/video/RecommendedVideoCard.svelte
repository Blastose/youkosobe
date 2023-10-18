<script lang="ts">
	import type { GetVideoById } from '$lib/invidious/types';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let recommendedVideo: GetVideoById['recommendedVideos'][number];
	$: thumbnail =
		recommendedVideo.videoThumbnails.find((v) => v.quality === 'medium') ??
		recommendedVideo.videoThumbnails.at(0);
</script>

<ClickableDivWrapper href="/watch?v={recommendedVideo.videoId}" fit={true}>
	<div class="max-w-5xl grid grid-cols-[168px_1fr] gap-2">
		{#if thumbnail}
			<VideoThumbnail {thumbnail} lengthSeconds={recommendedVideo.lengthSeconds} />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<a href="/watch?v={recommendedVideo.videoId}" class="line-clamp-2 font-semibold">
					{recommendedVideo.title}
				</a>
				<p class="flex flex-col text-sm dark:text-neutral-400">
					<span>{recommendedVideo.author}</span>
					<span>{recommendedVideo.viewCountText} views</span>
				</p>
			</div>
		</div>
	</div>
</ClickableDivWrapper>
