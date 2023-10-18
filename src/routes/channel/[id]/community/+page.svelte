<script lang="ts">
	import CommunityPostCard from '$lib/components/channel/community/CommunityPostCard.svelte';

	export let data;
	console.log(data.communityPosts);
</script>

<div class="flex flex-col gap-8">
	{#if data.communityPosts.comments.length > 0}
		{#each data.communityPosts.comments as communityPost}
			<CommunityPostCard {communityPost} />
		{/each}
	{:else}
		<p class="w-full text-center">This channel hasn't posted yet</p>
	{/if}
</div>
