<script lang="ts">
	import type { GetCommentsById } from '$lib/invidious/types';
	import Loading from '../layout/Loading.svelte';
	import WatchComments from './WatchComments.svelte';

	export let commentObject: Promise<GetCommentsById>;
	export let channelName: string;
	export let videoId: string;
</script>

{#await commentObject}
	<Loading />
{:then c}
	<WatchComments commentObject={c} {channelName} {videoId} />
{:catch err}
	<p class="text-center">Comments are turned off</p>
{/await}
