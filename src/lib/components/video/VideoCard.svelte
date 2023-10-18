<script lang="ts">
	import type { ThumbnailObject } from '$lib/invidious/types';
	import VideoThumbnail from './VideoThumbnail.svelte';
	import ClickableDivWrapper from './ClickableDivWrapper.svelte';
	import Author from './Author.svelte';

	export let title: string;
	export let videoThumbnail: ThumbnailObject;
	export let videoId: string;
	export let authorThumbnail: ThumbnailObject | undefined = undefined;
	export let author: string;
	export let authorVerified: boolean;
	export let authorUrl: string;
	export let publishedText: string;
	export let viewCountText: string;
	export let lengthSeconds: number;
	export let type: 'video' | 'short' | 'stream';
</script>

<ClickableDivWrapper href="/watch?v={videoId}">
	<div class="flex flex-col gap-1">
		<VideoThumbnail thumbnail={videoThumbnail} {lengthSeconds} />

		<div class="flex gap-1">
			{#if authorThumbnail}
				<img
					src={authorThumbnail.url}
					width={authorThumbnail.width}
					height={authorThumbnail.height}
					alt=""
					loading="lazy"
					class="rounded-full"
				/>
			{/if}
			<div class="flex flex-col">
				<a href="/watch?v={videoId}" class="line-clamp-2">{title}</a>
				<p class="flex flex-col text-sm dark:text-neutral-400">
					<Author {author} {authorUrl} {authorVerified} />
					<span>
						{viewCountText}
						{#if type === 'video'}
							• {publishedText}
						{:else if type === 'stream'}
							• Streamed {publishedText}
						{/if}
					</span>
				</p>
			</div>
		</div>
	</div>
</ClickableDivWrapper>
