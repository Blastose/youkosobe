<script lang="ts">
	import Hr from '$lib/components/layout/Hr.svelte';

	export let values: { display: string; value: string }[];
	export let name: string;
	export let displayName: string;
	export let type: 'radio' | 'checkbox';
	export let checkFirst: boolean;
</script>

<div class="flex flex-col gap-2">
	<h3 class="font-semibold">{displayName}</h3>
	<Hr />

	{#each values as value, index}
		<label class="flex items-center gap-2">
			<input checked={checkFirst && index === 0} {name} value={value.value} {type} />
			{value.display}
		</label>
	{/each}
</div>
