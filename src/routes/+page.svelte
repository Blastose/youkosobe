<script>
	import { buildPageTitle } from '$lib/components/layout/utils';
</script>

<div class="container-youko flex flex-col gap-4">
	<h1 class="text-3xl font-bold">Welcome to Youkosobe</h1>
	<div>
		<p>Youkosobe is an alternate Invidious front-end built with Invidious's api.</p>
		<p>
			You can change the current Invidious instance in the <a
				class="text-[var(--link-color)]"
				href="/settings">settings</a
			>.
		</p>
	</div>
</div>

<svelte:head><title>{buildPageTitle()}</title></svelte:head>
