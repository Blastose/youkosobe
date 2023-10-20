<script lang="ts">
	import type { GetPlaylistsByPlid } from '$lib/invidious/types';
	import PlaylistInfo from './PlaylistInfo.svelte';
	import PlaylistVideos from './PlaylistVideos.svelte';

	export let playlist: GetPlaylistsByPlid;
</script>

<div class="grid gap-4 grid-cols-1 lg:grid-cols-[300px_1fr]">
	<div class="playlist-info">
		<PlaylistInfo {playlist} />
	</div>

	<PlaylistVideos {playlist} />
</div>

<style>
	.playlist-info {
		position: static;
		top: 0;
	}

	@media (min-width: 1024px) {
		.playlist-info {
			position: sticky;
			height: fit-content;
			/* The 2rem is from the padding on the +page.svelte */
			top: calc(var(--header-height) + 2rem);
		}
	}
</style>
