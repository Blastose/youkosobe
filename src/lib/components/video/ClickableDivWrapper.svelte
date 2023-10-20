<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;
	export let fit: boolean = false;
</script>

<div
	on:click={(e) => {
		if (e.ctrlKey) return;
		goto(href);
	}}
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
