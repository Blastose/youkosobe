<script lang="ts">
	import { numberFormatter } from '$lib/components/video/utils';
	import type { PollAttachment } from '$lib/invidious/types';

	export let attachment: PollAttachment;
</script>

<div class="flex flex-col gap-2">
	<p class="text-sm dark:text-neutral-400">{numberFormatter.format(attachment.totalVotes)} votes</p>

	<div class="flex flex-col gap-2">
		{#each attachment.choices as choice}
			<div class="border p-2 dark:border-[var(--dark-text)] rounded-md">
				{choice.text}
			</div>
		{/each}
	</div>
</div>
