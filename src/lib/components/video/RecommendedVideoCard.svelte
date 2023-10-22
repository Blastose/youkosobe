<script lang="ts">
	import type { GetVideoById } from '$lib/invidious/types';
	import { IconBroadcast } from '@tabler/icons-svelte';
	import ClickableDivWrapper from '../video/ClickableDivWrapper.svelte';
	import VideoThumbnail from '../video/VideoThumbnail.svelte';

	export let recommendedVideo: GetVideoById['recommendedVideos'][number];
	$: thumbnail =
		recommendedVideo.videoThumbnails.find((v) => v.quality === 'medium') ??
		recommendedVideo.videoThumbnails.at(0);
	$: isLivestream = recommendedVideo.viewCount === 0 && recommendedVideo.lengthSeconds === 0;
	$: href = `/watch?v=${recommendedVideo.videoId}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div class="recommended-video-card max-w-5xl">
		{#if thumbnail}
			<VideoThumbnail {href} {thumbnail} lengthSeconds={recommendedVideo.lengthSeconds} />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<a {href} title={recommendedVideo.title} class="line-clamp-2 font-semibold">
					{recommendedVideo.title}
				</a>
				<p class="flex flex-col text-sm dark:text-neutral-400">
					<span title={recommendedVideo.author} class="line-clamp-1">{recommendedVideo.author}</span
					>
					<!-- Livestream -->
					{#if isLivestream}
						<span>{recommendedVideo.viewCountText} watching</span>
						<span
							class="flex gap-1 fond-semibold items-center px-1 dark:bg-red-700 text-[var(--dark-text)] rounded-md w-fit"
						>
							<IconBroadcast size={16} />
							Live
						</span>
					{:else}
						<span>{recommendedVideo.viewCountText} views</span>
					{/if}
				</p>
			</div>
		</div>
	</div>
</ClickableDivWrapper>

<style>
	.recommended-video-card {
		display: grid;
		grid-template-columns: 128px 1fr;
		gap: 0.5rem;
	}
	@container (min-width: 400px) {
		.recommended-video-card {
			grid-template-columns: 168px 1fr;
		}
	}
</style>
