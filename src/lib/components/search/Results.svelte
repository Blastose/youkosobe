<script lang="ts">
	import { page } from '$app/stores';
	import type { GetSearch } from '$lib/invidious/types';
	import ChannelSearchCard from './ChannelSearchCard.svelte';
	import PlaylistSearchCard from './PlaylistSearchCard.svelte';
	import VideoSearchCard from './VideoSearchCard.svelte';
	import { getSearchFromUrl } from './utils';
	import Filter from './filter/Filter.svelte';
	import InfiniteScrolling from '../layout/InfiniteScrolling.svelte';

	export let results: GetSearch[];

	let pageParam = 2;
	let noMoreSearchResults = false;
</script>

<div class="flex flex-col gap-4">
	<div class="self-end">
		<Filter />
	</div>

	{#each results as result}
		{#if result.type === 'video'}
			<VideoSearchCard videoObject={result} />
		{:else if result.type === 'playlist'}
			<PlaylistSearchCard playlistObject={result} />
		{:else if result.type === 'channel'}
			<ChannelSearchCard channelObject={result} />
		{/if}
	{/each}

	<InfiniteScrolling
		bind:results
		bind:noMoreSearchResults
		fetchMoreResults={async () => {
			return await getSearchFromUrl($page.url, pageParam);
		}}
		onSuccess={async () => {
			pageParam++;
		}}
	/>

	{#if noMoreSearchResults}
		<p class="text-center">No more results</p>
	{/if}
</div>
