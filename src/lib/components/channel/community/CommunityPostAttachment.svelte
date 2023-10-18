<script lang="ts">
	import PlaylistSearchCard from '$lib/components/search/PlaylistSearchCard.svelte';
	import VideoSearchCard from '$lib/components/search/VideoSearchCard.svelte';
	import type { Attachment } from '$lib/invidious/types';
	import AttachmentImage from './AttachmentImage.svelte';
	import AttachmentMultiImage from './AttachmentMultiImage.svelte';
	import AttachmentPoll from './AttachmentPoll.svelte';

	export let attachment: Attachment;
</script>

{#if attachment.type === 'image'}
	<AttachmentImage {attachment} />
{:else if attachment.type === 'multiImage'}
	<AttachmentMultiImage {attachment} />
{:else if attachment.type === 'video'}
	<VideoSearchCard videoObject={attachment} />
{:else if attachment.type === 'playlist'}
	<PlaylistSearchCard playlistObject={attachment} />
{:else if attachment.type === 'poll'}
	<AttachmentPoll {attachment} />
{/if}
