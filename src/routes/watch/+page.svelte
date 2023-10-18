<script lang="ts">
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import Watch from '$lib/components/watch/Watch.svelte';
	import { Invidious } from '$lib/invidious/invidious.js';
	import type { GetCommentsById } from '$lib/invidious/types.js';

	export let data;
	console.log(data.video);
	let commentObject: GetCommentsById | undefined = undefined;

	$: {
		data.id;
		(async () => {
			commentObject = undefined;
			const invidious = new Invidious('https://invidious.fdn.fr');
			const res = await invidious.getCommentsById(data.id);
			commentObject = res;
		})();
	}
</script>

<svelte:head><title>{buildPageTitle(data.video.title)}</title></svelte:head>

<div class="container-youko pt-8">
	{#key data.id}
		<Watch video={data.video} {commentObject} />
	{/key}
</div>
