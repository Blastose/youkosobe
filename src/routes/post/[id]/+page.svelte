<script lang="ts">
	import CommunityPostCard from '$lib/components/channel/community/CommunityPostCard.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import { Invidious } from '$lib/invidious/invidious.js';
	import type { GetChannelCommunityPostComments } from '$lib/invidious/types.js';
	import { onMount } from 'svelte';
	import CommentWrapper from '$lib/components/comment/CommentWrapper.svelte';
	import Loading from '$lib/components/layout/Loading.svelte';

	export let data;

	$: post = data.post.comments.at(0);
	$: channelId = data.post.authorId;

	let comments: GetChannelCommunityPostComments | undefined = undefined;
	onMount(async () => {
		const invidious = new Invidious('https://invidious.fdn.fr');
		const fetchedComments = await invidious.getChannelCommunityPostComments(data.postId, {
			ucid: channelId
		});
		comments = fetchedComments;
		console.log(fetchedComments);
	});
</script>

<svelte:head><title>{buildPageTitle('Trending')}</title></svelte:head>

<div class="container-youko flex flex-col pt-4 gap-8">
	{#if post}
		<CommunityPostCard communityPost={post} singlePost={true} />
	{/if}

	{#if comments}
		<div class="flex flex-col gap-8">
			<p>{comments.commentCount} Comments</p>
			<div class="flex flex-col gap-6">
				{#each comments.comments as comment}
					<CommentWrapper
						channelName={post?.author ?? ''}
						{comment}
						id={data.postId}
						type="community"
					/>
				{/each}
			</div>
		</div>
	{:else}
		<Loading />
	{/if}
</div>
