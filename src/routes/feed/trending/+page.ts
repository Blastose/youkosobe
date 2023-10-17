import type { PageLoad } from './$types';
import { Invidious } from '$lib/invidious/invidious';

export const load: PageLoad = async () => {
	const invidious = new Invidious('https://invidious.fdn.fr');
	const trending = await invidious.getTrending();

	return { trending };
};
