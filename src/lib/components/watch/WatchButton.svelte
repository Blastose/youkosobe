<script lang="ts">
	export let buttonText: string;
	export let handleClick: () => void = () => {};
</script>

<button
	on:click={handleClick}
	class="flex gap-2 rounded-3xl dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-2"
>
	<slot />
	{buttonText}
</button>
