<script lang="ts">
	import Hr from '$lib/components/layout/Hr.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import ChannelSearchCard from '$lib/components/search/ChannelSearchCard.svelte';
	import PlaylistSearchCard from '$lib/components/search/PlaylistSearchCard.svelte';
	import VideoSearchCard from '$lib/components/search/VideoSearchCard.svelte';

	export let data;
	console.log(data.searchResults);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="flex flex-col gap-4">
	{#if data.searchResults.length > 0}
		{#each data.searchResults as searchResult}
			{#if searchResult.type === 'video'}
				<VideoSearchCard videoObject={searchResult} />
			{:else if searchResult.type === 'playlist'}
				<PlaylistSearchCard playlistObject={searchResult} />
			{:else if searchResult.type === 'channel'}
				<!-- I don't think you can get any channel results from searching a channel -->
				<ChannelSearchCard channelObject={searchResult} />
			{/if}
			<Hr />
		{/each}
	{:else}
		<p class="w-full text-center">This channel has no content that matched "{data.query}."</p>
	{/if}
</div>
