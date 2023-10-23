<script lang="ts">
	export let data;

	let inputElement: HTMLInputElement;
	let checkboxElement: HTMLInputElement;
	let checked: boolean = Boolean(localStorage.getItem('invidious-instance'));

	function handleCheckboxClick(_: MouseEvent) {
		if (checkboxElement.checked) {
			localStorage.setItem('invidious-instance', inputElement.value);
		} else {
			localStorage.removeItem('invidious-instance');
		}
		checked = checkboxElement.checked;
	}

	function handleInput() {
		localStorage.setItem('invidious-instance', inputElement.value);
	}
</script>

<div class="container-youko pt-8">
	<h2 class="text-xl font-semibold">Settings</h2>

	<div class="flex flex-col gap-2">
		<label>
			<p class="text-lg font-semibold">Invidious instance</p>
			<input
				bind:this={inputElement}
				bind:value={data.currentInstance}
				on:input={handleInput}
				class="w-full max-w-xs outline-none focus:ring-2 ring-white rounded-md px-4 py-2"
				type="text"
				list="invidious-instances"
			/>
		</label>
		<label>
			<input
				bind:this={checkboxElement}
				checked={Boolean(localStorage.getItem('invidious-instance'))}
				on:click={handleCheckboxClick}
				type="checkbox"
			/>
			<span>Set as default instance</span>
		</label>
	</div>

	<datalist id="invidious-instances">
		{#each data.instances as instance}
			<option>{instance[1].uri}</option>
		{/each}
	</datalist>

	{#if !checked}
		<p>No default instance is currently set. The instance used will be randomised.</p>
	{:else}
		<p>The default instance is set to {data.currentInstance}</p>
	{/if}

	<a
		class="text-[var(--link-color)]"
		href="https://api.invidious.io/"
		target="_blank"
		rel="noopener noreferrer">View all Invidious instances information</a
	>
</div>
