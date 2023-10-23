import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';
import type { GetChannelVideosParams } from '$lib/invidious/types';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const sort_by = url.searchParams.get('sort_by') as GetChannelVideosParams['sort_by'] | null;
	const invidious = await createInvidious();
	const videos = await invidious.getChannelVideos(id, {
		sort_by: sort_by ?? 'newest'
	});

	return { videos, sort_by };
};
