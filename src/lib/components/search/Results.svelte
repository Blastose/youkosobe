<script lang="ts">
	import { page } from '$app/stores';
	import type { GetSearch } from '$lib/invidious/types';
	import { onMount } from 'svelte';
	import Loading from '../layout/Loading.svelte';
	import ChannelSearchCard from './ChannelSearchCard.svelte';
	import PlaylistSearchCard from './PlaylistSearchCard.svelte';
	import VideoSearchCard from './VideoSearchCard.svelte';
	import { getSearchFromUrl } from './utils';

	export let results: GetSearch[];

	let pageParam = 2;
	let loadingElement: HTMLDivElement;
	let noMoreSearchResults = false;
	let loadingSearchResults = false;

	onMount(() => {
		const interactionObserver = new IntersectionObserver(async (entries) => {
			if (entries[0].intersectionRatio <= 0) return;

			if (loadingSearchResults) return;

			loadingSearchResults = true;
			try {
				const searchResults = await getSearchFromUrl($page.url, pageParam);
				if (searchResults.length === 0) {
					noMoreSearchResults = true;
					return;
				}
				results = results.concat(searchResults);
				pageParam++;
				console.log(searchResults);
			} catch {}
			loadingSearchResults = false;
		});

		interactionObserver.observe(loadingElement);

		return () => {
			interactionObserver.unobserve(loadingElement);
		};
	});
</script>

<div class="flex flex-col gap-4">
	{#each results as result}
		{#if result.type === 'video'}
			<VideoSearchCard videoObject={result} />
		{:else if result.type === 'playlist'}
			<PlaylistSearchCard playlistObject={result} />
		{:else if result.type === 'channel'}
			<ChannelSearchCard channelObject={result} />
		{/if}
	{/each}

	<div class:hidden={noMoreSearchResults} bind:this={loadingElement}>
		<Loading />
	</div>
	{#if noMoreSearchResults}
		<p class="text-center">No more results</p>
	{/if}
</div>
