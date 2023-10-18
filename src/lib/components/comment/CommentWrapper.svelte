<script lang="ts">
	import type { Comment } from '$lib/invidious/types';
	import CommentW from './Comment.svelte';
	import { IconChevronDown, IconChevronUp, IconCornerDownRight } from '@tabler/icons-svelte';
	import { Invidious } from '$lib/invidious/invidious';
	import Loading from '../layout/Loading.svelte';

	export let id: string;
	export let comment: Comment;
	export let type: 'community' | 'video';

	let continuation = comment.replies?.continuation;
	let replies: Comment[] = [];
	let gettingReplies = false;
	let repliesState: 'notGet' | 'get' | 'finished' = 'notGet';
	let showReplies = true;

	async function getReplies() {
		if (!continuation) return;
		gettingReplies = true;
		const invidious = new Invidious('https://invidious.fdn.fr');

		let fetchedReplies;
		if (type === 'community') {
			fetchedReplies = await invidious.getChannelCommunityPostComments(id, {
				ucid: comment.authorId,
				action: 'action_get_comment_replies',
				continuation: continuation
			});
		} else {
			fetchedReplies = await invidious.getCommentsById(id, {
				action: 'action_get_comment_replies',
				continuation: continuation
			});
		}

		gettingReplies = false;
		continuation = fetchedReplies.continuation;
		if (!continuation) {
			repliesState = 'finished';
		} else {
			repliesState = 'get';
		}
		replies = replies.concat(fetchedReplies.comments);

		console.log(replies);
	}

	function toggleRepliesVisibility() {
		showReplies = !showReplies;
	}
</script>

<CommentW {comment}>
	<div class="flex flex-col gap-4">
		{#if comment.replies}
			<button
				on:click={() => {
					if (repliesState === 'notGet') {
						getReplies();
					} else {
						toggleRepliesVisibility();
					}
				}}
				disabled={gettingReplies}
				class="flex gap-2 p-2 text-sm items-center w-fit text-[#3ea6ff] font-semibold rounded-3xl hover:bg-[#3ea6ff25] duration-200"
			>
				{#if repliesState === 'notGet' || !showReplies}
					<IconChevronDown />
				{:else}
					<IconChevronUp />
				{/if}
				{comment.replies.replyCount} replies
			</button>
		{/if}

		{#if showReplies}
			<div class="flex flex-col gap-4">
				{#each replies as reply}
					<CommentW comment={reply} />
				{/each}

				{#if gettingReplies}
					<Loading />
				{/if}

				{#if repliesState === 'get' && !gettingReplies}
					<button
						on:click={getReplies}
						disabled={gettingReplies}
						class="flex gap-2 p-2 text-sm items-center w-fit text-[#3ea6ff] font-semibold rounded-3xl hover:bg-[#3ea6ff25] duration-200"
					>
						<IconCornerDownRight />
						Show more replies
					</button>
				{/if}
			</div>
		{/if}
	</div>
</CommentW>
