<script lang="ts">
	import type { CommunityPost } from '$lib/invidious/types';
	import { numberFormatter } from '$lib/components/video/utils';
	import { fixThumbnailImageUrl } from '$lib/components/video/utils';
	import { IconMessage2, IconThumbUp } from '@tabler/icons-svelte';
	import CommunityPostAttachment from './CommunityPostAttachment.svelte';

	export let communityPost: CommunityPost;
	$: authorThumbnail = communityPost.authorThumbnails.at(-1);
</script>

<div class="grid">
	<div class="rounded-lg max-w-4xl flex p-4 gap-2 sm:gap-4 border dark:border-[#696969]">
		<div>
			{#if authorThumbnail}
				<img
					src={fixThumbnailImageUrl(authorThumbnail.url)}
					width={authorThumbnail.width}
					height={authorThumbnail.height}
					alt=""
					loading="lazy"
					class="rounded-full h-[40px] w-[40px] max-w-none"
				/>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex flex-wrap items-center gap-2">
				<p class="font-semibold">{communityPost.author}</p>
				<p class="text-sm">{communityPost.publishedText}</p>
			</div>
			<div>{@html communityPost.contentHtml}</div>

			{#if communityPost.attachment}
				<CommunityPostAttachment attachment={communityPost.attachment} />
			{/if}

			<div class="flex gap-4 text-sm dark:text-neutral-300">
				<p class="flex gap-1 items-center">
					<IconThumbUp size={16} />
					{numberFormatter.format(communityPost.likeCount)}
				</p>
				<p class="flex gap-1 items-center">
					<IconMessage2 size={16} />
					{numberFormatter.format(communityPost.replyCount)}
				</p>
			</div>
		</div>
	</div>
</div>
