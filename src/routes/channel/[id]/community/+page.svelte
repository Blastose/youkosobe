<script lang="ts">
	import CommunityPostCard from '$lib/components/channel/community/CommunityPostCard.svelte';

	export let data;
	console.log(data.communityPosts);
</script>

<div class="flex flex-col gap-8">
	{#each data.communityPosts.comments as communityPost}
		<CommunityPostCard {communityPost} />
	{/each}
</div>
