<script lang="ts">
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
	<p>TODO (video post)</p>
{:else if attachment.type === 'playlist'}
	<p>TODO (playlist post)</p>
{:else if attachment.type === 'poll'}
	<AttachmentPoll {attachment} />
{/if}
