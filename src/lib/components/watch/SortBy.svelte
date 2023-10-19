<script lang="ts">
	import { page } from '$app/stores';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { IconMenuDeep } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';

	export let getComments: () => void;
	export let loadingComments: boolean;

	$: currentSort = $page.url.searchParams.get('sort_by');

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false,
		positioning: { placement: 'bottom-start' }
	});

	function chagePageSortParams(newValue?: string) {
		if (newValue) {
			$page.url.searchParams.set('sort_by', newValue);
		} else {
			$page.url.searchParams.delete('sort_by');
		}
		history.replaceState('', '', $page.url);
	}
</script>

<button
	disabled={loadingComments}
	class="flex gap-1 items-center"
	type="button"
	use:melt={$trigger}
	aria-label="Change comment sort"
>
	<span class="icon-flip">
		<IconMenuDeep />
	</span>
	Sort by
</button>

{#if $open}
	<div
		class="flex flex-col bg-white dark:bg-neutral-800 rounded-lg overflow-hidden"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<button
			on:click={() => {
				chagePageSortParams();
				getComments();
			}}
			class="text-left py-4 px-8
      {!currentSort ? 'bg-neutral-700 hover:bg-neutral-600' : 'hover:bg-neutral-600'}"
			use:melt={$item}
		>
			Top comments
		</button>
		<button
			on:click={() => {
				chagePageSortParams('new');
				getComments();
			}}
			class="text-left py-4 px-8
      {currentSort === 'new' ? 'bg-neutral-700 hover:bg-neutral-600' : 'hover:bg-neutral-600'}"
			use:melt={$item}
		>
			Newest first
		</button>
	</div>
{/if}

<style>
	.icon-flip {
		transform: scale(-1, 1);
	}
</style>
