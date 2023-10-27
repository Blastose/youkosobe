<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import Watch from '$lib/components/watch/Watch.svelte';

	export let data;
	console.log(data.video);
</script>

<svelte:head><title>{buildPageTitle(data.video.title)}</title></svelte:head>

<div class="container-youko pt-8">
	{#key data.id}
		<Watch
			video={data.video}
			commentObject={data.streamed.commentObject}
			initialTimestamp={data.initialTimestamp}
			playlist={data.playlist}
		/>
	{/key}
</div>
