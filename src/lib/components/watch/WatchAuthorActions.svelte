<script lang="ts">
	import type { GetVideoById } from '$lib/invidious/types';
	import {
		IconCircleCheckFilled,
		IconShare3,
		IconThumbUp,
		IconBrandYoutube
	} from '@tabler/icons-svelte';
	import AuthorThumbnail from '../channel/community/AuthorThumbnail.svelte';
	import WatchButton from './WatchButton.svelte';
	import { numberFormatter } from '../video/utils';
	import { page } from '$app/stores';

	export let video: GetVideoById;
	$: authorThumbnail = video.authorThumbnails.at(-1);

	let buttonText = 'Copy link';
</script>

<div class="watch-author-actions-container">
	<div class="author flex gap-4 items-center">
		{#if authorThumbnail}
			<a href={video.authorUrl}>
				<AuthorThumbnail thumbnailObject={authorThumbnail} />
			</a>
		{/if}
		<div class="flex flex-col">
			<a class="font-semibold" href={video.authorUrl}>
				{video.author}
				<!-- Verified not in api repsonse? -->
				{#if false}
					<IconCircleCheckFilled size={16} />
				{/if}
			</a>
			{#if video.subCountText !== '-'}
				<span class="text-sm dark:text-neutral-400">{video.subCountText} subscribers</span>
			{/if}
		</div>
	</div>

	<div class="actions">
		<WatchButton type="button" buttonText={numberFormatter.format(video.likeCount)}>
			<IconThumbUp />
		</WatchButton>

		<WatchButton
			type="button"
			{buttonText}
			handleClick={() => {
				buttonText = 'Copied link!';
				navigator.clipboard.writeText($page.url.toString());
			}}
		>
			<IconShare3 />
		</WatchButton>

		<WatchButton
			type="a"
			href="https://www.youtube.com{$page.url.pathname + $page.url.search}"
			buttonText="Youtube"
		>
			<IconBrandYoutube />
		</WatchButton>
	</div>
</div>

<style>
	.author {
		grid-area: author;
	}

	.actions {
		grid-area: actions;
		justify-content: flex-start;
		flex-wrap: wrap;
		display: flex;
		gap: 0.5rem;
	}

	.watch-author-actions-container {
		display: grid;
		grid-template-areas:
			'author'
			'actions';
		grid-template-rows: min-content min-content;
		gap: 0.75rem;
	}

	@media (min-width: 1536px) {
		.watch-author-actions-container {
			display: grid;
			grid-template-areas: 'author actions';
			grid-template-columns: 1fr 1fr;
		}

		.actions {
			justify-content: end;
		}
	}
</style>
