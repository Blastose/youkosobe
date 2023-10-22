<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Dialog } from '@melt-ui/svelte';

	export let close: Dialog['elements']['close'];
</script>

<button
	use:melt={$close}
	aria-label="Close"
	class="absolute right-[10px] top-[10px] inline-flex p-1
          appearance-none items-center justify-center rounded-full
          dark:text-neutral-200
          dark:hover:bg-neutral-700 focus:shadow-neutral-400 focus:outline-none focus:ring-2
          focus:ring-neutral-400"
>
	<IconX />
</button>
