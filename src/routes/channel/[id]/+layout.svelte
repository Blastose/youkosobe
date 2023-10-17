<script lang="ts">
	import Channel from '$lib/components/channel/Channel.svelte';
	import { buildPageTitle } from '$lib/components/layout/utils.js';

	export let data;
	console.log(data.channel);
</script>

<svelte:head><title>{buildPageTitle(data.channel.author)}</title></svelte:head>

<div class="container-youko flex flex-col gap-4 sm:gap-8">
	<Channel channel={data.channel} />

	<slot />
</div>
