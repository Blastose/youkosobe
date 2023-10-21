<script lang="ts">
	import SortButton from './SortButton.svelte';
	import { page } from '$app/stores';

	export let basePath: string;
	export let type: 'video' | 'playlist';

	function buildHref(sortValue?: string) {
		if (!sortValue) return basePath;

		return `${basePath}?sort_by=${sortValue}`;
	}

	function isActive(url: URL, value: string | null) {
		return value === url.searchParams.get('sort_by');
	}
</script>

<div class="flex gap-2 flex-wrap">
	{#if type === 'video'}
		<SortButton name="Latest" href={buildHref()} active={isActive($page.url, null)} />
		<SortButton
			name="Popular"
			href={buildHref('popular')}
			active={isActive($page.url, 'popular')}
		/>
		<SortButton name="Oldest" href={buildHref('oldest')} active={isActive($page.url, 'oldest')} />
	{:else if type === 'playlist'}
		<SortButton name="Date added (newest)" href={buildHref()} active={isActive($page.url, null)} />
		<SortButton
			name="Last video added"
			href={buildHref('last')}
			active={isActive($page.url, 'last')}
		/>
	{/if}
</div>
