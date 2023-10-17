<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import VideoCard from '$lib/components/video/VideoCard.svelte';

	export let data;
	console.log(data.trending);
</script>

<svelte:head><title>{buildPageTitle('Trending')}</title></svelte:head>

<div class="container-youko">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
		{#each data.trending as trendingVideo}
			{@const thumbnail =
				trendingVideo.videoThumbnails.find((v) => v.quality === 'medium') ??
				trendingVideo.videoThumbnails[0]}
			<VideoCard
				author={trendingVideo.author}
				authorUrl={trendingVideo.authorUrl}
				authorVerified={trendingVideo.authorVerified}
				lengthSeconds={trendingVideo.lengthSeconds}
				publishedText={trendingVideo.publishedText}
				title={trendingVideo.title}
				videoId={trendingVideo.videoId}
				videoThumbnail={thumbnail}
				viewCountText={trendingVideo.viewCountText}
				type="video"
			/>
		{/each}
	</div>
</div>
