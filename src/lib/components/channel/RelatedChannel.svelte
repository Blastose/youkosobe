<script lang="ts">
	import type { ChannelObject } from '$lib/invidious/types';
	import { numberFormatter } from '$lib/components/video/utils';

	export let channel: ChannelObject;

	$: authorThumbnail = channel.authorThumbnails.at(-1);
</script>

<a class="flex w-[200px] overflow-hidden items-center flex-col gap-1" href={channel.authorUrl}>
	{#if authorThumbnail}
		<img
			src={authorThumbnail.url}
			width={authorThumbnail.width}
			height={authorThumbnail.height}
			class="w-[100px] h-[100px] max-w-none rounded-full"
			alt=""
		/>
	{/if}
	<span class="flex flex-col items-center gap-1">
		<span class="fond-semibold">{channel.author}</span>
		<span class="dark:text-neutral-400 text-sm"
			>{numberFormatter.format(channel.subCount)} subscribers</span
		>
	</span>
</a>
