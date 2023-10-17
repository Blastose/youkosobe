<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';

	export let data;
	console.log(data.channel);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
	{#each data.playlists.playlists as playlist}
		{playlist.title}
	{/each}
</div>
