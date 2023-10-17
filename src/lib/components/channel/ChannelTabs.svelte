<script lang="ts">
	import ChannelTabButton from './ChannelTabButton.svelte';
	import { page } from '$app/stores';
	import { allChannelTabs } from './channel';

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
	<div class="flex custom-scroll overflow-x-auto gap-8">
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
	</div>
</div>
