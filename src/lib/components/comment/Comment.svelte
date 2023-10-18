<script lang="ts">
	import type { Comment } from '$lib/invidious/types';
	import AuthorThumbnail from '$lib/components/channel/community/AuthorThumbnail.svelte';
	import { numberFormatter } from '../video/utils';
	import { IconPin, IconThumbUp } from '@tabler/icons-svelte';

	export let comment: Comment;
	export let channelName: string;
	$: authorThumbnail = comment.authorThumbnails.at(-1);
</script>

<div class="grid max-w-4xl grid-cols-[min-content_1fr] gap-2 sm:gap-4">
	{#if authorThumbnail}
		<a class="h-fit" href={comment.authorUrl}>
			<AuthorThumbnail thumbnailObject={authorThumbnail} />
		</a>
	{/if}

	<div class="flex flex-col gap-2">
		<div>
			{#if comment.isPinned}
				<p class="flex gap-1 items-center text-sm dark:text-neutral-400 py-1">
					<IconPin size={16} /> Pinned by {channelName}
				</p>
			{/if}
			<div class="text-sm items-center flex gap-2 flex-wrap">
				<a
					class={comment.authorIsChannelOwner ? 'rounded-lg px-1 dark:bg-neutral-600' : ''}
					href={comment.authorUrl}>{comment.author}</a
				>
				{#if comment.isSponsor && comment.sponsorIconUrl}
					<img class="w-[14px] h-[14px]" src={comment.sponsorIconUrl} alt="" />
				{/if}
				<span class="dark:text-neutral-400">
					{comment.publishedText}
					{#if comment.isEdited}
						(edited)
					{/if}
				</span>
			</div>

			<div class="youtube-html">
				{@html comment.contentHtml}
			</div>
		</div>

		<div class="dark:text-neutral-400 flex gap-4 items-center">
			<p class="flex gap-1 items-center">
				<IconThumbUp />
				{numberFormatter.format(comment.likeCount)}
			</p>
			{#if comment.creatorHeart}
				<div class="relative">
					<img
						class="rounded-full w-[16px] h-[16px]"
						src={comment.creatorHeart.creatorThumbnail}
						alt=""
					/>
					<div class="text-xs absolute top-2 left-2">❤️</div>
				</div>
			{/if}
		</div>

		<slot />
	</div>
</div>
