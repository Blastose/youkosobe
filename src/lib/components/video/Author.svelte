<script lang="ts">
	import { IconCircleCheckFilled } from '@tabler/icons-svelte';

	export let authorUrl: string;
	export let author: string;
	export let authorVerified: boolean;
</script>

<a class="w-fit flex items-center gap-1 dark:hover:text-neutral-200 duration-300" href={authorUrl}>
	{author}
	{#if authorVerified}
		<IconCircleCheckFilled size={16} />
	{/if}
</a>
