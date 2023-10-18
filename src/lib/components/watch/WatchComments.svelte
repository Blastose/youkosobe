<script lang="ts">
	import type { GetCommentsById } from '$lib/invidious/types';
	import CommentWrapper from '../comment/CommentWrapper.svelte';

	export let commentObject: GetCommentsById;
	console.log(commentObject);
</script>

<div class="flex flex-col gap-4">
	{#each commentObject.comments as comment}
		<CommentWrapper id={comment.commentId} {comment} type="video" />
	{/each}
</div>
