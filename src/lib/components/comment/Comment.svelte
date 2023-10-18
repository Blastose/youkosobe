<script lang="ts">
	import type { Comment } from '$lib/invidious/types';
	import AuthorThumbnail from '$lib/components/channel/community/AuthorThumbnail.svelte';
	import { numberFormatter } from '../video/utils';
	import { IconThumbUp } from '@tabler/icons-svelte';

	export let comment: Comment;
	$: authorThumbnail = comment.authorThumbnails.at(-1);
</script>

<div class="grid max-w-4xl grid-cols-[min-content_1fr] gap-2 sm:gap-4">
	{#if authorThumbnail}
		<a href={comment.authorUrl}>
			<AuthorThumbnail thumbnailObject={authorThumbnail} />
		</a>
	{/if}

	<div class="flex flex-col gap-2">
		<div>
			<div class="text-sm flex gap-2 flex-wrap">
				<a href={comment.authorUrl}>{comment.author}</a>
				<span class="dark:text-neutral-400">{comment.publishedText}</span>
			</div>

			<div>
				{@html comment.contentHtml}
			</div>
		</div>

		<p class="text-sm dark:text-neutral-300 flex gap-1 items-center">
			<IconThumbUp size={16} />
			{numberFormatter.format(comment.likeCount)}
		</p>

		<slot />
	</div>
</div>
