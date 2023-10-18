<script lang="ts">
	import Hr from '$lib/components/layout/Hr.svelte';

	export let data;

	console.log(data.channel);
</script>

<div
	class="grid grid-cols-1 sm:grid-cols-[1fr_128x] md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_333px] gap-12"
>
	<div class="flex flex-col gap-4">
		<h2 class="text-lg">Description</h2>
		<div class="youtube-html">
			{#if data.channel.description}
				{@html data.channel.descriptionHtml}
			{:else}
				No description
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-lg">Stats</h2>
		<Hr />
		<p>Joined {new Date(data.channel.joined * 1000).toLocaleDateString()}</p>
		<Hr />
		<p>{data.channel.totalViews.toLocaleString()} views</p>
	</div>
</div>
