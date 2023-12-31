<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GetCommentsById, GetPlaylistsByPlid, GetVideoById } from '$lib/invidious/types';
	import PlaylistWatchContainer from '../playlist/PlaylistWatchContainer.svelte';
	import RecommendedVideoCard from '../video/RecommendedVideoCard.svelte';
	import WatchAuthorActions from './WatchAuthorActions.svelte';
	import WatchDescription from './WatchDescription.svelte';
	import { page } from '$app/stores';
	import WatchCommentsPromise from './WatchCommentsPromise.svelte';

	export let video: GetVideoById;
	export let commentObject: Promise<GetCommentsById>;
	export let initialTimestamp: number;
	export let playlist: GetPlaylistsByPlid | undefined;

	let videoTitleElement: HTMLParagraphElement;
	let videoElement: HTMLVideoElement;
	$: stream = video.formatStreams.find((v) => v.type.startsWith('video/mp4;'));

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
		el.volume = Number(localStorage.getItem('playervolume')) ?? 0.5;
		el.play();
	}

	function persistVolumeInLocalStorage(_: Event) {
		localStorage.setItem('playervolume', String(videoElement.volume));
	}

	function playNextVideoInPlaylist() {
		if (!playlist) return;

		const nextVideo = playlist.videos.find(
			(v) => v.index === Number($page.url.searchParams.get('index'))
		);
		if (!nextVideo) return;
		goto(`/watch?v=${nextVideo.videoId}&list=${playlist.playlistId}&index=${nextVideo.index}`);
	}
</script>

<div
	use:setupHandleAnchorClick
	class="grid grid-cols-1 lg:grid-cols-[1fr_256px] xl:grid-cols-[1fr_400px] gap-2 sm:gap-8"
>
	<div class="flex flex-col gap-4">
		{#if stream}
			<div class="rounded-lg overflow-hidden">
				<!-- svelte-ignore a11y-media-has-caption -->
				<video
					use:initVideo
					bind:this={videoElement}
					on:ended={playNextVideoInPlaylist}
					on:volumechange={persistVolumeInLocalStorage}
					class="w-full max-h-[calc(80vh_-_var(--header-height))]"
					src={stream.url}
					controls
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
				<WatchCommentsPromise {commentObject} channelName={video.author} videoId={video.videoId} />
			</div>
		{/if}
	</div>

	<div class="recommended-videos-container flex flex-col gap-4">
		{#if playlist}
			<PlaylistWatchContainer {playlist} />
		{/if}

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
