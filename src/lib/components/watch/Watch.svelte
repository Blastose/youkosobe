<script lang="ts">
	import type { GetCommentsById, GetVideoById } from '$lib/invidious/types';
	import WatchAuthorActions from './WatchAuthorActions.svelte';
	import WatchComments from './WatchComments.svelte';
	import WatchDescription from './WatchDescription.svelte';

	export let video: GetVideoById;
	export let commentObject: GetCommentsById | undefined;

	let videoTitleElement: HTMLParagraphElement;
	$: streamUrl = video.formatStreams.at(1)?.url;

	function handleDescriptionCollapse() {
		videoTitleElement.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-[1fr_256px] xl:grid-cols-[1fr_400px] gap-2 sm:gap-8">
	<div class="flex flex-col gap-4">
		{#if streamUrl}
			<div class="rounded-lg overflow-hidden">
				<video class="w-full" src={streamUrl} controls muted />
			</div>
		{/if}

		<div class="flex flex-col gap-2">
			<p
				style="scroll-margin-top: var(--header-height);"
				bind:this={videoTitleElement}
				class="text-xl font-semibold"
			>
				{video.title}
			</p>

			<WatchAuthorActions {video} />
		</div>

		<WatchDescription {video} {handleDescriptionCollapse} />

		<div>
			{#if commentObject}
				<WatchComments {commentObject} />
			{:else}
				<p>Loading comments...</p>
			{/if}
		</div>
	</div>

	<div>
		<!-- TODO playlist on top -->
		{#each video.recommendedVideos as recommendedVideo}
			<div>
				{recommendedVideo.title}
			</div>
		{/each}
	</div>
</div>
