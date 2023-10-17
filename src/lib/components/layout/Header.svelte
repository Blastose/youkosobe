<script lang="ts">
	import { IconMenu2 } from '@tabler/icons-svelte';
	import { themeStore } from '$lib/stores/themeStore';
</script>

<div class="p-4 grid h-full">
	<div class="flex items-center justify-between h-full">
		<div class="flex items-center gap-2 sm:gap-4">
			<button aria-label="Sidebar">
				<IconMenu2 />
			</button>
			<a class="text-lg font-bold" href="/">Youkosobe</a>
		</div>

		<div>
			<form method="get" action="/results">
				<input name="search_query" class="rounded-md" type="text" placeholder="search" />
			</form>
		</div>

		<div>
			<button
				on:click={() => {
					themeStore.toggle();
				}}>Theme</button
			>
		</div>
	</div>
</div>
