<script lang="ts">
	import '../app.css';
	import { themeStore } from '$lib/stores/themeStore';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import '../nprogress.css';
	import { buildPageTitle } from '$lib/components/layout/utils';
	import { windowSizeStore } from '$lib/stores/windowSizeStore';

	onMount(() => {
		themeStore; // import themeStore to initialize it
	});

	const monitorScreenSize = (node: Window) => {
		const windowQuery = node.matchMedia('(min-width: 1024px)');
		const match = (e: MediaQueryListEvent) => {
			if (e.matches) {
				windowSizeStore.set('large');
			} else {
				windowSizeStore.set('small');
			}
		};

		if (!windowQuery.matches) {
			windowSizeStore.set('small');
		}

		windowQuery.addEventListener('change', match);

		return {
			destroy() {
				windowQuery.removeEventListener('change', match);
			}
		};
	};

	let nprogressTimeoutId: ReturnType<typeof setTimeout>;

	NProgress.configure({
		showSpinner: false
	});

	function setTimeoutNprogress() {
		clearTimeout(nprogressTimeoutId);
		nprogressTimeoutId = setTimeout(() => {
			NProgress.start();
		}, 500);
	}

	$: {
		if ($navigating) {
			setTimeoutNprogress();
		} else if (!$navigating) {
			clearTimeout(nprogressTimeoutId);
			NProgress.done();
		}
	}
</script>

<svelte:window use:monitorScreenSize />

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
	<title>{buildPageTitle()}</title>
</svelte:head>

<Layout>
	<slot />
</Layout>
