<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import VideoCard from '$lib/components/video/VideoCard.svelte';

	export let data;
	console.log(data.channel);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
	{#each data.shorts.videos as video}
		{@const thumbnail =
			video.videoThumbnails.find((v) => v.quality === 'medium') ?? video.videoThumbnails[0]}
		<VideoCard
			author={video.author}
			authorUrl={video.authorUrl}
			authorVerified={video.authorVerified}
			lengthSeconds={video.lengthSeconds}
			publishedText={video.publishedText}
			title={video.title}
			videoId={video.videoId}
			videoThumbnail={thumbnail}
			viewCountText={video.viewCountText}
		/>
	{/each}
</div>
