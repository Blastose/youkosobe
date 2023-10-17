import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const invidious = new Invidious('https://invidious.fdn.fr');
	const videos = await invidious.getChannelVideos(id);

	return { videos };
};
