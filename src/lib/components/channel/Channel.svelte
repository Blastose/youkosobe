<script lang="ts">
	import type { GetChannelById } from '$lib/invidious/types';
	import { IconChevronRight, IconCircleCheckFilled } from '@tabler/icons-svelte';
	import ChannelTabs from './ChannelTabs.svelte';
	import Hr from '$lib/components/layout/Hr.svelte';
	import { numberFormatter } from '$lib/components/video/utils';

	export let channel: GetChannelById;

	$: authorBanner = channel.authorBanners.at(0);
	$: authorThumbnail = channel.authorThumbnails.at(-1) ?? channel.authorThumbnails[0];
</script>

<div class="flex flex-col gap-4 sm:gap-6">
	{#if authorBanner}
		<div
			class="banner h-[128px] sm:h-[256px] bg-no-repeat bg-cover"
			style:background-image={`url("${authorBanner.url}")`}
		/>
	{/if}

	<div class="flex gap-4 sm:gap-6">
		<img
			class="rounded-full h-[64px] w-[64px] sm:h-[128px] sm:w-[128px]"
			src={authorThumbnail.url}
			width={authorThumbnail.width}
			height={authorThumbnail.height}
			alt=""
			loading="lazy"
		/>

		<div class="flex flex-col gap-2">
			<div>
				<p class="flex font-semibold items-center text-lg gap-2">
					{channel.author}
					{#if channel.authorVerified}
						<IconCircleCheckFilled size={16} />
					{/if}
				</p>
				<p class="dark:text-neutral-400">{numberFormatter.format(channel.subCount)} subscribers</p>
			</div>

			<a
				href="/channel/{channel.authorId}/about"
				class="flex gap-2 items-end dark:text-neutral-400"
			>
				{#if channel.description}
					<span class="max-w-xl line-clamp-2">
						{@html channel.descriptionHtml}
					</span>
				{:else}
					<span>More about this channel</span>
				{/if}
				<span><IconChevronRight /></span>
			</a>
		</div>
	</div>

	<div>
		<ChannelTabs channelUrl="/channel/{channel.authorId}" channelTabs={channel.tabs} />
		<Hr />
	</div>
</div>

<style>
	.banner {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		background-position: 50% 10%;
	}
</style>
