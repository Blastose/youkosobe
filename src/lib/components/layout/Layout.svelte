<script lang="ts">
	import { page } from '$app/stores';
	import { sidebarStateStore } from '$lib/stores/sidebarStateStore';
	import { windowSizeStore } from '$lib/stores/windowSizeStore';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';

	$: {
		$page;
		$windowSizeStore;
		if ($page.url.pathname.startsWith('/watch')) {
			sidebarStateStore.set('closed');
		} else {
			if ($windowSizeStore === 'large') {
				sidebarStateStore.set('open');
			} else {
				sidebarStateStore.set('closed');
			}
		}
	}
</script>

<div class="layout-container">
	<div class="header layout-bg sticky top-0 z-50 h-[var(--header-height)]">
		<Header />
	</div>

	<div class="filler" />

	<div
		class="sidebar sidebar-animation layout-bg invisible -ml-64
		{$sidebarStateStore === 'open' ? 'show-sidebar' : ''}"
	>
		<Sidebar />
	</div>

	<div class="content layout-bg flex-grow overflow-x-clip">
		<slot />
	</div>
</div>

<style>
	.layout-bg {
		background-color: var(--light-500);
	}

	.show-sidebar {
		visibility: visible;
		margin-left: 0rem;
	}

	:global(.dark) .layout-bg {
		background-color: var(--dark-500);
	}

	.layout-container {
		display: grid;
		grid-template-areas:
			'filler header header'
			'filler sidebar content';
		grid-template-rows: min-content 1fr;
		grid-template-columns: 0px min-content 1fr;
	}

	.header {
		grid-area: header;
	}

	.filler {
		grid-area: filler;
	}

	.sidebar {
		grid-area: sidebar;
	}

	.content {
		grid-area: content;
	}

	.sidebar-animation {
		transition-duration: 0.45s;
		transition-timing-function: cubic-bezier(0.17, 0.67, 0.23, 1.02);
	}
</style>
