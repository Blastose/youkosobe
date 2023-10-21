<script lang="ts">
	export let linkText: string;
	export let href: string;
</script>

<a
	{href}
	class="px-4 py-2 grid grid-cols-[24px_1fr] gap-4 duration-300 dark:hover:bg-neutral-800 rounded-md"
>
	<span><slot /></span>
	<span class="line-clamp-1">{linkText}</span>
</a>
