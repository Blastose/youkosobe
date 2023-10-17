<script lang="ts">
	export let data;
</script>

<div class="flex flex-col gap-4">
	{#each data.channel.relatedChannels as relatedChannel}
		<div>{relatedChannel.author}</div>
	{/each}
</div>
