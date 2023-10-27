<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;
	export let fit: boolean = false;

	function handleOnClick(e: MouseEvent) {
		if (e.ctrlKey) return;
		const target = e.target as HTMLElement | null;
		if (target?.closest('a')) return;
		goto(href);
	}
</script>

<div
	on:click={handleOnClick}
	on:keydown={(e) => {
		if (e.key !== 'Enter' || e.currentTarget !== e.target) return;

		e.preventDefault();
		goto(href);
	}}
	role="link"
	tabindex="0"
	class="cursor-pointer {fit ? 'w-fit h-fit' : ''}"
>
	<slot />
</div>
