import type { PageLoad } from './$types';
import { createInvidious } from '$lib/invidious/utils';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const invidious = await createInvidious();
	const podcasts = await invidious.getChannelPodcasts(id);

	return { podcasts };
};
