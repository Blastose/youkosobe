<script lang="ts">
	export let type: 'button' | 'a';
	export let buttonText: string;
	export let handleClick: () => void = () => {};
	export let href = '';
</script>

{#if type === 'button'}
	<button
		on:click={handleClick}
		class="flex gap-2 rounded-3xl dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-2"
	>
		<slot />
		{buttonText}
	</button>
{:else if type === 'a'}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="flex gap-2 rounded-3xl dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-2"
	>
		<slot />
		{buttonText}
	</a>
{/if}
