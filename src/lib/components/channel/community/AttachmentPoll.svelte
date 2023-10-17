<script lang="ts">
	import { numberFormatter } from '$lib/components/video/utils';
	import type { PollAttachment } from '$lib/invidious/types';

	export let attachment: PollAttachment;
</script>

<div>
	<p class="text-sm dark:text-neutral-400">{numberFormatter.format(attachment.totalVotes)} votes</p>

	{#each attachment.choices as choice}
		<div class="border border-white rounded-sm">
			{choice.text}
		</div>
	{/each}
</div>
