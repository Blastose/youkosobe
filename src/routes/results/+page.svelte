<script lang="ts">
	import { page } from '$app/stores';
	import { buildPageTitle } from '$lib/components/layout/utils.js';
	import Results from '$lib/components/search/Results.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head><title>{buildPageTitle(data.searchQuery)}</title></svelte:head>

<div class="container-youko max-w-5xl pt-8">
	{#key `${$page.url.pathname}${$page.url.search}`}
		<Results results={data.searchResults} />
	{/key}
</div>
