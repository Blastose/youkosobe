<script lang="ts">
	import InfiniteScrolling from '$lib/components/layout/InfiniteScrolling.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import VideoCard from '$lib/components/video/VideoCard.svelte';
	import { createInvidious } from '$lib/invidious/utils';

	export let data;
	$: continuation = data.streams.continuation;
	$: noMoreSearchResults = !Boolean(data.streams.continuation);

	console.log(data.streams.videos);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

{#if data.streams.videos.length > 0}
	<div class="flex flex-col gap-4">
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
		>
			{#each data.streams.videos as video}
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
					type="stream"
				/>
			{/each}
		</div>
		<InfiniteScrolling
			bind:results={data.streams.videos}
			bind:noMoreSearchResults
			fetchMoreResults={async () => {
				const invidious = await createInvidious();
				const res = await invidious.getChannelStreams(data.channel.authorId, {
					sort_by: 'newest',
					continuation
				});
				console.log(res);
				data.streams.continuation = res.continuation;
				noMoreSearchResults = !Boolean(data.streams.continuation);
				return res.videos;
			}}
			onSuccess={async () => {}}
		/>
	</div>
{:else}
	<p class="w-full text-center">This channel has no videos.</p>
{/if}
