<script lang="ts">
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="layout-container">
	<div class="header layout-bg sticky top-0 z-50 h-[var(--header-height)]">
		<Header />
	</div>

	<div class="filler" />

	<div class="sidebar layout-bg invisible -ml-64 lg:visible sidebar-animation lg:ml-0">
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
