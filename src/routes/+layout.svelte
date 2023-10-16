<script>
	import '../app.css';
	import { themeStore } from '$lib/stores/themeStore';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		themeStore; // import themeStore to initialize it
	});
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			}
		} else {
			if (localStorage.getItem('theme') === 'dark') {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
</svelte:head>

<Layout>
	<slot />
</Layout>
