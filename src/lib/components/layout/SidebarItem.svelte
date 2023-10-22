<script lang="ts">
	export let linkText: string;
	export let href: string;
	import { page } from '$app/stores';

	$: active = href === $page.url.pathname;
</script>

<a
	{href}
	class="px-4 py-2 grid grid-cols-[24px_1fr] gap-4 duration-300 rounded-md
	{active ? 'dark:bg-neutral-700' : 'dark:hover:bg-neutral-800'}
	"
>
	<span><slot /></span>
	<span class="line-clamp-1">{linkText}</span>
</a>
