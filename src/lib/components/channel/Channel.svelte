<script lang="ts">
	import type { GetChannelById } from '$lib/invidious/types';
	import { IconCircleCheckFilled } from '@tabler/icons-svelte';
	import ChannelTabs from './ChannelTabs.svelte';

	export let channel: GetChannelById;

	$: authorBanner = channel.authorBanners[0];
	$: authorThumbnail = channel.authorThumbnails.at(-1) ?? channel.authorThumbnails[0];

	const numberFormatter = Intl.NumberFormat('en', {
		notation: 'compact',
		maximumSignificantDigits: 3
	});
</script>

<div class="flex flex-col gap-4 sm:gap-6">
	<div
		class="banner h-[128px] sm:h-[256px] bg-no-repeat bg-cover"
		style:background-image={`url("${authorBanner.url}")`}
	/>

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
				href="/channels/{channel.authorId}/about"
				class="dark:text-neutral-400 max-w-xl line-clamp-2">{@html channel.descriptionHtml}</a
			>
		</div>
	</div>

	<div>
		<ChannelTabs channelUrl="/channel/{channel.authorId}" />
		<hr class="dark:border-[#696969]" />
	</div>
</div>

<style>
	.banner {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		background-position: 50% 10%;
	}
</style>
