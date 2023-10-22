<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore';
	import SearchInput from '../search/SearchInput.svelte';
	import Drawer from './Drawer.svelte';
</script>

<div class="p-4 grid h-full">
	<div class="flex gap-4 items-center justify-between h-full">
		<div class="flex items-center gap-2 sm:gap-4">
			<Drawer />

			<a class="whitespace-nowrap text-lg font-bold" href="/">Youkosobe</a>
		</div>

		<SearchInput />

		<div>
			<button
				class="whitespace-nowrap"
				on:click={() => {
					themeStore.toggle();
				}}>Theme</button
			>
		</div>
	</div>
</div>
