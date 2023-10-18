<script lang="ts">
	export let linkText: string;
	export let href: string;
</script>

<a {href} class="px-4 py-2 flex gap-4 duration-300 dark:hover:bg-neutral-800 rounded-md">
	<slot />
	{linkText}
</a>
