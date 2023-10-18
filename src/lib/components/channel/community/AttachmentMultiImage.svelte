<script lang="ts">
	import type { MultiImageAttachment } from '$lib/invidious/types';

	export let attachment: MultiImageAttachment;
</script>

<!-- TODO Show only one image at a time -->
<div class="flex flex-col gap-2">
	{#each attachment.images as imageThumbnails}
		{@const imageThumbnail = imageThumbnails.at(2)}
		{#if imageThumbnail}
			<img
				class="rounded-lg w-full max-w-lg"
				src={imageThumbnail.url}
				width={imageThumbnail.width}
				height={imageThumbnail.height}
				alt=""
				loading="lazy"
			/>
		{/if}
	{/each}
</div>
