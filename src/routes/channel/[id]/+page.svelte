<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import VideoCard from '$lib/components/video/VideoCard.svelte';

	export let data;
	console.log(data.channel);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
	{#each data.channel.latestVideos as latestVideo}
		{@const thumbnail =
			latestVideo.videoThumbnails.find((v) => v.quality === 'medium') ??
			latestVideo.videoThumbnails[0]}
		<VideoCard
			author={latestVideo.author}
			authorUrl={latestVideo.authorUrl}
			authorVerified={latestVideo.authorVerified}
			lengthSeconds={latestVideo.lengthSeconds}
			publishedText={latestVideo.publishedText}
			title={latestVideo.title}
			videoId={latestVideo.videoId}
			videoThumbnail={thumbnail}
			viewCountText={latestVideo.viewCountText}
			type="video"
		/>
	{/each}
</div>
