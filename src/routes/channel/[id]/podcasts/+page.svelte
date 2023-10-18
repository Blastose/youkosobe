<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import PlaylistCard from '$lib/components/video/PlaylistCard.svelte';

	export let data;
	console.log(data.podcasts);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
	{#each data.podcasts.playlists as playlist}
		<PlaylistCard playlistObject={playlist} type={'podcast'} />
	{/each}
</div>
