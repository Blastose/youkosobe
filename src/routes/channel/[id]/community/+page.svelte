<script lang="ts">
	import CommunityPostCard from '$lib/components/channel/community/CommunityPostCard.svelte';
	import InfiniteScrolling from '$lib/components/layout/InfiniteScrolling.svelte';
	import { createInvidious } from '$lib/invidious/utils';

	export let data;
	$: continuation = data.communityPosts.continuation;
	$: noMoreSearchResults = !Boolean(data.communityPosts.continuation);
	console.log(data.communityPosts);
</script>

<div class="flex flex-col gap-8">
	{#if data.communityPosts.comments.length > 0}
		{#each data.communityPosts.comments as communityPost}
			<CommunityPostCard {communityPost} />
		{/each}

		<InfiniteScrolling
			bind:results={data.communityPosts.comments}
			bind:noMoreSearchResults
			fetchMoreResults={async () => {
				const invidious = await createInvidious();
				const res = await invidious.getChannelCommunityPosts(data.channel.authorId, {
					continuation
				});
				data.communityPosts.continuation = res.continuation;
				noMoreSearchResults = !Boolean(data.communityPosts.continuation);
				return res.comments;
			}}
			onSuccess={async () => {}}
		/>
	{:else}
		<p class="w-full text-center">This channel hasn't posted yet</p>
	{/if}
</div>
