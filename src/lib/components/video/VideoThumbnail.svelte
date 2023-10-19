<script lang="ts">
	import type { ThumbnailObject } from '$lib/invidious/types';
	import { formatTime } from './utils';

	export let thumbnail: ThumbnailObject;
	export let lengthSeconds: number;
</script>

<div class="relative w-full h-fit overflow-hidden">
	<img
		class="rounded-lg w-full hover:scale-105 duration-200"
		src={thumbnail.url}
		width={thumbnail.width}
		height={thumbnail.height}
		alt=""
		loading="lazy"
	/>
	{#if lengthSeconds !== 0}
		<span class="absolute bottom-2 right-2 bg-black bg-opacity-80 rounded-md p-1 text-xs">
			{formatTime(lengthSeconds)}
		</span>
	{/if}
</div>
