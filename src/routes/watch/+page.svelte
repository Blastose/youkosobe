<script lang="ts">
	import { page } from '$app/stores';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import Watch from '$lib/components/watch/Watch.svelte';
	import { Invidious } from '$lib/invidious/invidious.js';
	import type { GetCommentsById, GetCommentsByIdParams } from '$lib/invidious/types.js';

	export let data;
	console.log(data.video);
	let commentObject: GetCommentsById | 'commentsDisabled' | undefined = undefined;

	$: {
		data.id;
		(async () => {
			if (data.video.type === 'livestream') return;
			commentObject = undefined;
			let sort_by = $page.url.searchParams.get('sort_by') as
				| GetCommentsByIdParams['sort_by']
				| null;
			if (!sort_by) sort_by = undefined;
			const invidious = new Invidious('https://invidious.fdn.fr');
			try {
				const res = await invidious.getCommentsById(data.id, {
					sort_by
				});
				commentObject = res;
			} catch {
				commentObject = 'commentsDisabled';
			}
		})();
	}
</script>

<svelte:head><title>{buildPageTitle(data.video.title)}</title></svelte:head>

<div class="container-youko pt-8">
	{#key data.id}
		<Watch video={data.video} {commentObject} initialTimestamp={data.initialTimestamp} />
	{/key}
</div>
