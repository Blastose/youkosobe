<script lang="ts">
	import type { GetCommentsById } from '$lib/invidious/types';
	import CommentWrapper from '../comment/CommentWrapper.svelte';

	export let commentObject: GetCommentsById;
	export let channelName: string;
	console.log(commentObject);
</script>

<div class="flex flex-col gap-6">
	<div class="flex gap-8">
		<h2 class="text-lg">
			{commentObject.commentCount ?? 0} Comments
		</h2>
		<button>Sort by</button>
	</div>

	{#each commentObject.comments as comment}
		<CommentWrapper {channelName} id={comment.commentId} {comment} type="video" />
	{/each}
</div>
