import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';
import type { GetChannelVideosParams } from '$lib/invidious/types';

export const load: PageLoad = async ({ params, url }) => {
	const id = params.id;
	const sort_by = url.searchParams.get('sort_by') as GetChannelVideosParams['sort_by'] | null;
	const invidious = new Invidious('https://invidious.fdn.fr');
	const videos = await invidious.getChannelVideos(id, {
		sort_by: sort_by ?? 'newest'
	});

	return { videos, sort_by };
};
