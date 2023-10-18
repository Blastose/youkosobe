<script lang="ts">
	import { fixThumbnailImageUrl } from '$lib/components/video/utils';
	import type { ThumbnailObject } from '$lib/invidious/types';

	export let thumbnailObject: Omit<ThumbnailObject, 'quality'>;
</script>

<img
	src={fixThumbnailImageUrl(thumbnailObject.url)}
	width={thumbnailObject.width}
	height={thumbnailObject.height}
	alt=""
	loading="lazy"
	class="rounded-full h-[40px] w-[40px] max-w-none"
/>
