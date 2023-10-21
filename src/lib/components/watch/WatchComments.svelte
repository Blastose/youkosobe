<script lang="ts">
	import type { GetCommentsById, GetCommentsByIdParams } from '$lib/invidious/types';
	import CommentWrapper from '../comment/CommentWrapper.svelte';
	import { page } from '$app/stores';
	import { Invidious } from '$lib/invidious/invidious';
	import Loading from '../layout/Loading.svelte';
	import SortBy from './SortBy.svelte';

	export let commentObject: GetCommentsById;
	export let channelName: string;
	export let videoId: string;
	let loadingComments = false;

	console.log(commentObject);

	async function getComments() {
		commentObject.comments = [];
		loadingComments = true;
		let sort_by = $page.url.searchParams.get('sort_by') as GetCommentsByIdParams['sort_by'] | null;
		if (!sort_by) sort_by = undefined;
		const invidious = new Invidious('https://invidious.fdn.fr');
		const res = await invidious.getCommentsById(videoId, {
			sort_by
		});
		commentObject.comments = res.comments;
		loadingComments = false;
	}
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center gap-8">
		<h2 class="text-lg">
			{commentObject.commentCount?.toLocaleString() ?? 0} Comments
		</h2>
		<SortBy {getComments} {loadingComments} />
	</div>

	{#if loadingComments}
		<Loading />
	{:else}
		{#each commentObject.comments as comment}
			<CommentWrapper {channelName} id={comment.commentId} {comment} type="video" />
		{/each}
	{/if}
</div>
