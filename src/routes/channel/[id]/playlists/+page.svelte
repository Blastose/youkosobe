<script lang="ts">
	import SortButtons from '$lib/components/channel/SortButtons.svelte';
	import InfiniteScrolling from '$lib/components/layout/InfiniteScrolling.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import PlaylistCard from '$lib/components/video/PlaylistCard.svelte';
	import { Invidious } from '$lib/invidious/invidious.js';

	export let data;
	$: continuation = data.playlists.continuation;
	$: noMoreSearchResults = !Boolean(data.playlists.continuation);
	console.log(data.playlists);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

{#if data.playlists.playlists.length > 0}
	<div class="flex flex-col gap-4">
		<SortButtons type="playlist" basePath="/channel/{data.channel.authorId}/playlists" />
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
		>
			{#each data.playlists.playlists as playlist}
				<PlaylistCard playlistObject={playlist} type={'playlist'} />
			{/each}
		</div>

		<InfiniteScrolling
			bind:results={data.playlists.playlists}
			bind:noMoreSearchResults
			fetchMoreResults={async () => {
				const invidious = new Invidious('https://invidious.fdn.fr');
				const res = await invidious.getChannelPlaylists(data.channel.authorId, {
					sort_by: data.sort_by ?? 'newest',
					continuation
				});
				data.playlists.continuation = res.continuation;
				noMoreSearchResults = !Boolean(data.playlists.continuation);
				return res.playlists;
			}}
			onSuccess={async () => {}}
		/>
	</div>
{:else}
	<p class="w-full text-center">This channel has no playlists.</p>
{/if}
