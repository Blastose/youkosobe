<script lang="ts">
	import type { ThumbnailObject } from '$lib/invidious/types';
	import { formatTime } from './utils';

	export let thumbnail: ThumbnailObject;
	export let lengthSeconds: number;
	export let href: string;
</script>

<div class="relative w-full h-fit overflow-hidden">
	<a {href}>
		<img
			class="rounded-lg w-full hover:scale-105 duration-200"
			src={thumbnail.url}
			width={thumbnail.width}
			height={thumbnail.height}
			alt=""
			loading="lazy"
		/>
	</a>
	{#if lengthSeconds !== 0}
		<span class="absolute bottom-2 right-2 bg-black bg-opacity-80 rounded-md p-1 text-xs">
			{formatTime(lengthSeconds)}
		</span>
	{/if}
</div>
