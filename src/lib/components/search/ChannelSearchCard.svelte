<script lang="ts">
	import type { ChannelObject } from '$lib/invidious/types';
	import Author from '$lib/components/video/Author.svelte';
	import ClickableDivWrapper from '$lib/components/video/ClickableDivWrapper.svelte';
	import { numberFormatter } from '$lib/components/video/utils';

	export let channelObject: ChannelObject;
	$: thumbnail =
		channelObject.authorThumbnails.find((a) => a.quality === 'medium') ??
		channelObject.authorThumbnails.at(0);
	$: href = `/channel/${channelObject.authorId}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div class="max-w-5xl grid grid-cols-[128px_1fr] sm:grid-cols-[246px_1fr] gap-4">
		{#if thumbnail}
			<img src="" alt="" />
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<p class="text-lg font-semibold">
					{channelObject.author}
				</p>
				<p class="text-sm dark:text-neutral-400">
					<Author
						author={channelObject.author}
						authorUrl={channelObject.authorUrl}
						authorVerified={channelObject.authorVerified}
					/>
					• {numberFormatter.format(channelObject.subCount)} subscribers
				</p>
			</div>

			<div class="line-clamp-2 text-sm dark:text-neutral-400">
				{@html channelObject.descriptionHtml}
			</div>
		</div>
	</div>
</ClickableDivWrapper>
