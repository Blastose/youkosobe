<script lang="ts">
	import type { GetCommentsById, GetVideoById } from '$lib/invidious/types';
	import Loading from '../layout/Loading.svelte';
	import RecommendedVideoCard from '../video/RecommendedVideoCard.svelte';
	import WatchAuthorActions from './WatchAuthorActions.svelte';
	import WatchComments from './WatchComments.svelte';
	import WatchDescription from './WatchDescription.svelte';

	export let video: GetVideoById;
	export let commentObject: GetCommentsById | undefined;
	export let initialTimestamp: number;

	let videoTitleElement: HTMLParagraphElement;
	let videoElement: HTMLVideoElement;
	$: stream = video.formatStreams.at(1);

	function handleAnchorClick(e: MouseEvent) {
		const target = e.target as HTMLElement | null;
		const a = target?.closest('a');

		if (a?.tagName !== 'A') return;
		if (!a.href) return;

		const [_, searchParamsString] = a.href.split('?');
		const searchParams = new URLSearchParams(searchParamsString);
		const timestamp = searchParams.get('t');
		if (!timestamp) return;
		if (searchParams.get('v') !== video.videoId) return;

		e.preventDefault();
		jumpToTimestamp(Number(timestamp));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function setupHandleAnchorClick(el: HTMLDivElement) {
		el.addEventListener('click', handleAnchorClick);

		return {
			destroy: () => {
				el.removeEventListener('click', handleAnchorClick);
			}
		};
	}

	function handleDescriptionCollapse() {
		const rect = videoTitleElement.getBoundingClientRect();
		if (rect.top < 64) {
			videoTitleElement.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function jumpToTimestamp(timestamp: number) {
		videoElement.currentTime = timestamp;
		videoElement.play();
	}

	function initVideo(el: HTMLVideoElement) {
		el.currentTime = initialTimestamp;
	}
</script>

<div
	use:setupHandleAnchorClick
	class="grid grid-cols-1 lg:grid-cols-[1fr_256px] xl:grid-cols-[1fr_400px] gap-2 sm:gap-8"
>
	<div class="flex flex-col gap-4">
		{#if stream}
			<div class="rounded-lg overflow-hidden">
				<video
					use:initVideo
					bind:this={videoElement}
					class="w-full"
					src={stream.url}
					controls
					muted
				/>
			</div>
		{/if}

		<div class="flex flex-col gap-2">
			<p
				style="scroll-margin-top: var(--header-height);"
				bind:this={videoTitleElement}
				class="text-xl font-semibold"
			>
				{video.title}
			</p>

			<WatchAuthorActions {video} />
		</div>

		<WatchDescription {video} {handleDescriptionCollapse} />

		{#if video.type !== 'livestream'}
			<div>
				{#if commentObject}
					<WatchComments {commentObject} channelName={video.author} />
				{:else}
					<Loading />
				{/if}
			</div>
		{/if}
	</div>

	<div class="recommended-videos-container flex flex-col gap-2">
		{#each video.recommendedVideos as recommendedVideo}
			<div>
				<RecommendedVideoCard {recommendedVideo} />
			</div>
		{/each}
	</div>
</div>

<style>
	.recommended-videos-container {
		container: recommended-videos-container / inline-size;
	}
</style>
