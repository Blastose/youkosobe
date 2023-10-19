<script lang="ts">
	import type { GetSearch } from '$lib/invidious/types';
	import ChannelSearchCard from './ChannelSearchCard.svelte';
	import PlaylistSearchCard from './PlaylistSearchCard.svelte';
	import VideoSearchCard from './VideoSearchCard.svelte';

	export let results: GetSearch[];
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
</div>
