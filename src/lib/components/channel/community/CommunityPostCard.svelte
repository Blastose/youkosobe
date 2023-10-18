<script lang="ts">
	import type { CommunityPost } from '$lib/invidious/types';
	import { numberFormatter } from '$lib/components/video/utils';
	import { IconMessage2, IconThumbUp } from '@tabler/icons-svelte';
	import CommunityPostAttachment from './CommunityPostAttachment.svelte';
	import AuthorThumbnail from './AuthorThumbnail.svelte';

	export let communityPost: CommunityPost;
	export let singlePost: boolean = false;
	$: authorThumbnail = communityPost.authorThumbnails.at(-1);
</script>

<div class="grid">
	<div
		class="rounded-lg max-w-4xl grid grid-cols-[min-content_1fr] p-4 gap-2 sm:gap-4 border dark:border-[#696969]"
	>
		<div>
			{#if authorThumbnail}
				<AuthorThumbnail thumbnailObject={authorThumbnail} />
			{/if}
		</div>

		<div class="max-w-2xl flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-2">
				<a href="/channel/{communityPost.authorId}" class="font-semibold">{communityPost.author}</a>
				<p class="text-sm">{communityPost.publishedText}</p>
			</div>
			<div class="youtube-html">{@html communityPost.contentHtml}</div>

			{#if communityPost.attachment}
				<CommunityPostAttachment attachment={communityPost.attachment} />
			{/if}

			<div class="flex gap-4 text-sm dark:text-neutral-300">
				<p class="flex gap-1 items-center">
					<IconThumbUp />
					{numberFormatter.format(communityPost.likeCount)}
				</p>
				{#if !singlePost}
					<a href="/post/{communityPost.commentId}" class="flex gap-1 items-center">
						<IconMessage2 />
						{numberFormatter.format(communityPost.replyCount)}
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
