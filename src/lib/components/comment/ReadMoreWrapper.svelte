<script lang="ts">
	let parentWrapper: HTMLDivElement;
	let wrapper: HTMLDivElement;
	let hide = true;

	function resizeParentWrapper() {
		if (!hide) {
			parentWrapper.style.maxHeight = `${wrapper.clientHeight}px`;
		} else {
			parentWrapper.style.maxHeight = `96px`;
		}
	}

	$: isOverflow =
		parentWrapper?.clientHeight < wrapper?.clientHeight || parentWrapper?.clientHeight > 96;

	// Handles when the user resizes the window and the comment has
	// more/less lines of text
	let timeout: ReturnType<typeof setTimeout>;
	let delay = 300;
	function handleWindowResize() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			resizeParentWrapper();
		}, delay);
	}
</script>

<svelte:window on:resize={handleWindowResize} />

<div class="flex flex-col gap-1">
	<div style:max-height={'96px'} bind:this={parentWrapper} class="overflow-hidden">
		<div bind:this={wrapper}>
			<slot />
		</div>
	</div>
	{#if isOverflow}
		<button
			class="w-fit dark:text-neutral-400 font-semibold"
			on:click={() => {
				hide = !hide;
				resizeParentWrapper();
			}}
		>
			{#if hide}
				Read more
			{:else}
				Show less
			{/if}
		</button>
	{/if}
</div>
