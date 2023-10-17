<script lang="ts">
	import RelatedChannel from '$lib/components/channel/RelatedChannel.svelte';

	export let data;
</script>

<div class="flex flex-wrap gap-8">
	{#if data.channel.relatedChannels.length > 0}
		{#each data.channel.relatedChannels as relatedChannel}
			<RelatedChannel channel={relatedChannel} />
		{/each}
	{:else}
		<p class="w-full text-center">This channel doesn't feature any other channels.</p>
	{/if}
</div>
