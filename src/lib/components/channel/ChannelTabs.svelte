<script lang="ts">
	import ChannelTabButton from './ChannelTabButton.svelte';
	import { page } from '$app/stores';
	import { allChannelTabs } from './channel';
	import { IconSearch } from '@tabler/icons-svelte';

	export let channelUrl: string;
	export let channelTabs: string[];

	function isActiveTab(pathname: string, tabName: string) {
		const splits = pathname.split('/');
		if (splits[1] !== 'channel') return false;

		const tabHrefFragment = splits.at(3);
		if (!tabHrefFragment) {
			if (tabName === 'home') return true;
		}

		return tabHrefFragment === tabName;
	}
</script>

<div class="grid">
	<div class="flex relative custom-scroll overflow-x-auto gap-2 h-12 items-center">
		{#each allChannelTabs as tab}
			{#if channelTabs.includes(tab.hrefFragment)}
				{@const href =
					tab.display === 'home' ? `${channelUrl}` : `${channelUrl}/${tab.hrefFragment}`}
				<ChannelTabButton
					tabName={tab.display}
					{href}
					active={isActiveTab($page.url.pathname, tab.hrefFragment)}
				/>
			{/if}
		{/each}
		<div class="relative">
			<form method="get" action="{channelUrl}/search">
				<label class="flex gap-2 items-center">
					<IconSearch class="text-[#bbb8c3]" />
					<input
						class="search-input bg-transparent px-2 py-2 border-b border-neutral-500 focus:outline-none focus:border-[var(--dark-text)]"
						placeholder="Search"
						name="query"
						type="text"
					/>
				</label>
			</form>
		</div>
	</div>
</div>

<style>
	.search-input {
		transition: border-bottom-color 300ms;
	}
</style>
