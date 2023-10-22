<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import { IconMenu2 } from '@tabler/icons-svelte';
	import Sidebar from './Sidebar.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { sidebarStateStore } from '$lib/stores/sidebarStateStore';
	import { windowSizeStore } from '$lib/stores/windowSizeStore';

	const {
		elements: { trigger, overlay, content, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false
	});

	onNavigate((nav) => {
		if (nav.to?.url.pathname.startsWith('/watch')) {
			// show hide animation
		} else {
			// don't show hide animation
		}
		open.set(false);
	});
</script>

{#if $windowSizeStore === 'small' || $page.url.pathname.startsWith('/watch')}
	<button class="dark:hover:bg-neutral-800 duration-300 rounded-full p-2" use:melt={$trigger}>
		<IconMenu2 />
	</button>
{:else}
	<button
		class="dark:hover:bg-neutral-800 duration-300 rounded-full p-2"
		on:click={() => {
			if ($sidebarStateStore === 'open') {
				sidebarStateStore.set('closed');
			} else {
				sidebarStateStore.set('open');
			}
		}}
	>
		<IconMenu2 />
	</button>
{/if}

<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="fixed left-0 top-0 z-50 h-screen w-full
      max-w-[240px]
      bg-[var(--dark-500)]
      focus:outline-none"
			transition:fly={{
				x: -350,
				duration: 300,
				opacity: 1
			}}
		>
			<div class="flex items-center pl-4 h-[var(--header-height)] gap-2 sm:gap-4">
				<button class="dark:hover:bg-neutral-800 duration-300 rounded-full p-2" use:melt={$close}>
					<IconMenu2 />
				</button>

				<a class="text-lg font-bold" href="/">Youkosobe</a>
			</div>

			<Sidebar />
		</div>
	{/if}
</div>
