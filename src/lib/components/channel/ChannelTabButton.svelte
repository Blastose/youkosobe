<script lang="ts">
	export let tabName: string;
	export let href: string;
	export let active: boolean;
</script>

<div
	class="font-semibold whitespace-nowrap capitalize {active ? '' : 'dark:text-neutral-400'}"
	class:active
>
	<a class="px-4 py-2" {href}>
		{tabName}
	</a>
</div>

<style>
	:global(.dark) .active {
		border-bottom: 2px solid var(--dark-text);
	}
</style>
