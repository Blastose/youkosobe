<script lang="ts">
	import Playlist from '$lib/components/playlist/Playlist.svelte';

	export let data;
	console.log(data.playlist);
</script>

<div class="container-youko pt-8">
	<Playlist playlist={data.playlist} />
</div>
