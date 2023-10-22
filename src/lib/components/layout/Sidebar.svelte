<script lang="ts">
	import { IconHome, IconTrendingUp } from '@tabler/icons-svelte';

	import SidebarItem from './SidebarItem.svelte';
	import Icon from '../icon/Icon.svelte';
</script>

<div class="sidebar custom-scroll overscroll-none flex flex-col gap-2">
	<SidebarItem href={'/'} linkText="Home">
		<IconHome />
	</SidebarItem>
	<SidebarItem href={'/feed/trending'} linkText="Trending">
		<IconTrendingUp />
	</SidebarItem>
	<SidebarItem href={'/playlist'} linkText="Playlists soon!">
		<Icon name="playlistPlay" height="24" width="24" />
	</SidebarItem>
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
