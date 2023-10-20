<script lang="ts">
	import type { ChannelObject } from '$lib/invidious/types';
	import Author from '$lib/components/video/Author.svelte';
	import ClickableDivWrapper from '$lib/components/video/ClickableDivWrapper.svelte';
	import { fixThumbnailImageUrl, numberFormatter } from '$lib/components/video/utils';

	export let channelObject: Omit<ChannelObject, 'authorThumbnails'> & {
		authorThumbnails: {
			quality?: string;
			url: string;
			width: number;
			height: number;
		}[];
	};
	$: thumbnail =
		channelObject.authorThumbnails.find((a) => a.quality === 'medium') ??
		channelObject.authorThumbnails.at(0);
	$: href = `/channel/${channelObject.authorId}`;
</script>

<ClickableDivWrapper {href} fit={true}>
	<div class="max-w-5xl grid grid-cols-[128px_1fr] sm:grid-cols-[246px_1fr] gap-4">
		{#if thumbnail}
			<div class="flex justify-center">
				<img
					class="w-[80px] h-[80px] sm:w-[136px] sm:h-[136px] rounded-full"
					src={fixThumbnailImageUrl(thumbnail.url)}
					width={thumbnail.width}
					height={thumbnail.height}
					alt=""
				/>
			</div>
		{/if}

		<div class="flex flex-col gap-2">
			<div>
				<p class="text-lg font-semibold">
					{channelObject.author}
				</p>
				<p class="flex items-center gap-1 text-sm dark:text-neutral-400">
					<Author
						author={channelObject.author}
						authorUrl={channelObject.authorUrl}
						authorVerified={channelObject.authorVerified}
					/>
					<span>• {numberFormatter.format(channelObject.subCount)} subscribers</span>
				</p>
			</div>

			<div class="youtube-html line-clamp-2 text-sm dark:text-neutral-400">
				{@html channelObject.descriptionHtml}
			</div>
		</div>
	</div>
</ClickableDivWrapper>
