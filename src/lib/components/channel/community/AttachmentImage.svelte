<script lang="ts">
	import type { ImageAttachment } from '$lib/invidious/types';

	export let attachment: ImageAttachment;
</script>

<img
	class="rounded-lg w-full max-w-lg"
	src={attachment.imageThumbnails.at(2)?.url}
	alt=""
	loading="lazy"
/>
