<div class="sidebar custom-scroll">
	{#each { length: 100 } as a}
		<p>sidebar</p>
	{/each}
</div>

<style>
	.sidebar {
		overflow-y: scroll;
		position: sticky;
		top: var(--header-height);
		height: calc(100dvh - var(--header-height));
		width: 240px;
		padding: 0.5rem;
	}
</style>
