<script lang="ts">
	import type { GetVideoById } from '$lib/invidious/types';
	import { tick } from 'svelte';
	import { convertNewlinesToBr } from '../layout/utils';
	import { numberFormatter } from '../video/utils';

	export let video: GetVideoById;
	export let handleDescriptionCollapse: () => void;
	let descriptionExpanded = false;

	function toggleDescription() {
		descriptionExpanded = !descriptionExpanded;
	}
</script>

<div
	on:click={() => {
		if (!descriptionExpanded) {
			toggleDescription();
		}
	}}
	on:keydown={(e) => {
		if (e.key !== 'Enter' || e.currentTarget !== e.target) return;

		e.preventDefault();
		if (!descriptionExpanded) {
			toggleDescription();
		}
	}}
	role="link"
	tabindex="0"
	class={descriptionExpanded ? 'cursor-auto' : 'cursor-pointer'}
>
	<div
		class="flex flex-col gap-2 rounded-xl p-3 dark:bg-neutral-800
  {descriptionExpanded ? '' : 'duration-300 dark:hover:bg-neutral-700 '}"
	>
		<p class="flex flex-wrap gap-x-2 font-semibold">
			{#if !descriptionExpanded}
				<span
					>{numberFormatter.format(video.viewCount)}
					{video.type === 'livestream' ? 'watching now' : 'views'}
				</span>
			{:else}
				<span
					>{video.viewCount.toLocaleString()}
					{video.type === 'livestream' ? 'watching now' : 'views'}
				</span>
			{/if}

			{#if !descriptionExpanded}
				<span>
					{#if video.type === 'livestream'}
						Started streaming
					{:else if video.type === 'scheduled'}
						Streamed
					{/if}
					{video.publishedText}
				</span>
			{:else}
				<span>
					{#if video.type === 'livestream'}
						Started streaming
					{:else if video.type === 'scheduled'}
						Streamed
					{/if}
					{new Date(video.published * 1000).toLocaleDateString()}
				</span>
			{/if}

			{#each video.keywords.slice(0, 3) as keyword}
				<a class="text-[var(--link-color)]" href="/hashtag/{keyword}">#{keyword}</a>
			{/each}
		</p>

		<div class:line-clamp-3={!descriptionExpanded} class="youtube-html">
			{@html convertNewlinesToBr(video.descriptionHtml)}
		</div>

		{#if descriptionExpanded}
			<button
				class="w-fit font-semibold"
				on:click={async (e) => {
					descriptionExpanded = false;
					e.stopPropagation();
					await tick();
					handleDescriptionCollapse();
				}}>Show less</button
			>
		{/if}
	</div>
</div>
