<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ThumbnailObject } from '$lib/invidious/types';
	import { IconCircleCheckFilled } from '@tabler/icons-svelte';
	import { formatTime } from './utils';

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

<div
	on:click={() => {
		goto('');
	}}
	on:keydown={(e) => {
		if (e.key !== 'Enter' || e.currentTarget !== e.target) return;

		e.preventDefault();
		goto('');
	}}
	role="link"
	tabindex="0"
	class="flex flex-col gap-1 cursor-pointer"
>
	<div class="relative w-full overflow-hidden">
		<img
			class="rounded-lg w-full hover:scale-105 duration-200"
			src={videoThumbnail.url}
			width={videoThumbnail.width}
			height={videoThumbnail.height}
			alt=""
			loading="lazy"
		/>
		<span class="absolute bottom-2 right-2 bg-black bg-opacity-80 rounded-md p-1 text-xs">
			{formatTime(lengthSeconds)}
		</span>
	</div>

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
				<a
					class="w-fit flex items-center gap-1 dark:hover:text-neutral-200 duration-300"
					href={authorUrl}
				>
					{author}
					{#if authorVerified}
						<IconCircleCheckFilled size={16} />
					{/if}
				</a>
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
