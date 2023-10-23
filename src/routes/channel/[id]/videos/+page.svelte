<script lang="ts">
	import SortButtons from '$lib/components/channel/SortButtons.svelte';
	import InfiniteScrolling from '$lib/components/layout/InfiniteScrolling.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import VideoCard from '$lib/components/video/VideoCard.svelte';
	import { createInvidious } from '$lib/invidious/utils';

	export let data;
	$: continuation = data.videos.continuation;
	$: noMoreSearchResults = !Boolean(data.videos.continuation);
	console.log(data.channel);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="flex flex-col gap-4">
	<SortButtons type="video" basePath="/channel/{data.channel.authorId}/videos" />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
		{#each data.videos.videos as video, index (`${index}${video.videoId}`)}
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
				type="video"
			/>
		{/each}
	</div>
	<InfiniteScrolling
		bind:results={data.videos.videos}
		bind:noMoreSearchResults
		fetchMoreResults={async () => {
			const invidious = await createInvidious();
			const res = await invidious.getChannelVideos(data.channel.authorId, {
				sort_by: data.sort_by ?? 'newest',
				continuation
			});
			data.videos.continuation = res.continuation;
			noMoreSearchResults = !Boolean(data.videos.continuation);
			return res.videos;
		}}
		onSuccess={async () => {}}
	/>
</div>
