<script lang="ts">
	import ChannelTabButton from './ChannelTabButton.svelte';
	import { page } from '$app/stores';
	import { channelTabs } from './channel';

	export let channelUrl: string;

	function isActiveTab(pathname: string, tabName: string) {
		const splits = pathname.split('/');
		if (splits[1] !== 'channel') return false;

		const a = splits.at(3);
		if (!a) {
			if (tabName === 'home') return true;
		}

		return a === tabName;
	}
</script>

<div class="grid">
	<div class="flex custom-scroll overflow-x-auto gap-8">
		{#each channelTabs as tab}
			{@const href = tab.display === 'home' ? `${channelUrl}` : `${channelUrl}/${tab.hrefFragment}`}
			<ChannelTabButton
				tabName={tab.display}
				{href}
				active={isActiveTab($page.url.pathname, tab.hrefFragment)}
			/>
		{/each}
	</div>
</div>
