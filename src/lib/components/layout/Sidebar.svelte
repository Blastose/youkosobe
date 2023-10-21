<script lang="ts">
	import { IconHome, IconPlaylist, IconTrendingUp } from '@tabler/icons-svelte';

	import SidebarItem from './SidebarItem.svelte';
	import Hr from './Hr.svelte';
	import Icon from '../icon/Icon.svelte';
</script>

<div class="sidebar custom-scroll flex flex-col gap-2">
	<SidebarItem href={'/'} linkText="Home">
		<IconHome />
	</SidebarItem>
	<SidebarItem
		href={'/playlist?list=PLUhYAiEwD-whqQ2Ak4wBJxO6WnS15l8AN'}
		linkText="The Black Paradeeeeeeeeeeeeeeeee"
	>
		<Icon name="playlistPlay" height="24" width="24" />
	</SidebarItem>
	{#each { length: 25 } as a, index}
		<SidebarItem href={'/feed/trending'} linkText="Trending">
			<IconTrendingUp />
		</SidebarItem>
		{#if index % 10 === 0}
			<Hr />
		{/if}
	{/each}
</div>

<style>
	.sidebar {
		overflow-y: scroll;
		position: sticky;
		top: var(--header-height);
		height: calc(100dvh - var(--header-height));
		width: 240px;
		padding: 0.5rem;
	}
</style>
