<script lang="ts">
	export let data;
</script>

<div class="flex flex-col gap-4">
	{#each data.communityPosts.comments as communityPost}
		<div>{@html communityPost.contentHtml}</div>
	{/each}
</div>
